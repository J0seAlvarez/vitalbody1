from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import ipaddress
import logging
from pathlib import Path
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse
import httpx
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ["EMERGENT_EMAIL_KEY"]
EMAIL_FROM_NAME = os.environ["EMAIL_FROM_NAME"]
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO")
OWNER_EMAIL = os.environ["OWNER_EMAIL"]

_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str, reply_to: Optional[str] = None) -> Optional[str]:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if reply_to or EMAIL_REPLY_TO:
        payload["contact_email"] = reply_to or EMAIL_REPLY_TO
    try:
        async with httpx.AsyncClient(timeout=30) as http:
            resp = await http.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        return resp.json().get("id")
    except httpx.HTTPStatusError as e:
        logger.error(f"Email send failed: {e.response.status_code} {e.response.text}")
        raise HTTPException(status_code=502, detail="Failed to send email")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Email send error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to send email")


class Enquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    service: str
    preferred_date: Optional[str] = None
    message: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class EnquiryCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    service: str
    preferred_date: Optional[str] = None
    message: Optional[str] = None


@api_router.get("/")
async def root():
    return {"message": "Vital Body API"}


def _detail_row(label: str, value: str) -> str:
    return (
        f'<tr><td style="padding:10px 16px 10px 0;font-size:11px;letter-spacing:2px;'
        f'text-transform:uppercase;color:#9E8166;vertical-align:top;white-space:nowrap">{label}</td>'
        f'<td style="padding:10px 0;font-size:15px;color:#1A251D">{value}</td></tr>'
    )


async def send_enquiry_notification(obj) -> None:
    phone_html = (
        f'<a href="tel:{escape(obj.phone)}" style="color:#1A251D">{escape(obj.phone)}</a>'
        if obj.phone else "—"
    )
    rows = (
        _detail_row("Name", escape(obj.name))
        + _detail_row("Email", escape(obj.email))
        + _detail_row("Phone", phone_html)
        + _detail_row("Service", escape(obj.service))
        + _detail_row("Preferred date", escape(obj.preferred_date) if obj.preferred_date else "—")
        + _detail_row("Message", escape(obj.message) if obj.message else "—")
    )
    subject = "New appointment enquiry — Vital Body"
    html = (
        '<table role="presentation" width="100%" style="background:#F4F2EC;padding:32px 0">'
        '<tr><td align="center">'
        '<table role="presentation" width="560" style="background:#ffffff;padding:36px;font-family:Arial,sans-serif">'
        '<tr><td>'
        '<p style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#9E8166;margin:0 0 10px">'
        'Vital Body Healing Spa &amp; Salon</p>'
        '<h1 style="font-family:Georgia,serif;font-weight:normal;font-size:26px;color:#1A251D;margin:0 0 24px">'
        'New appointment enquiry</h1>'
        f'<table role="presentation" width="100%" style="border-top:1px solid #EAE6DB">{rows}</table>'
        '<p style="font-size:12px;color:#888;margin:32px 0 0">Sent by the Vital Body Healing Spa &amp; Salon '
        'website. We never ask for your password or card details by email.</p>'
        '</td></tr></table></td></tr></table>'
    )
    await send_email(to=OWNER_EMAIL, subject=subject, html=html)


@api_router.post("/enquiries", response_model=Enquiry)
async def create_enquiry(input: EnquiryCreate):
    obj = Enquiry(**input.model_dump())
    doc = obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.enquiries.insert_one(doc)
    try:
        await send_enquiry_notification(obj)
    except Exception as e:
        logger.error(f"Enquiry notification email failed: {e}")
    return obj


@api_router.get("/enquiries", response_model=List[Enquiry])
async def list_enquiries():
    docs = await db.enquiries.find({}, {"_id": 0}).to_list(1000)
    for d in docs:
        if isinstance(d.get('created_at'), str):
            d['created_at'] = datetime.fromisoformat(d['created_at'])
    return docs


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
