import { Clock, EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react";
import { Reveal } from "@/components/Reveal";

const LOGO_IMG =
  "https://customer-assets-rejwkqb3.emergentagent.net/job_5a8ebf1c-fc8d-4b29-90e2-691fe48b0816/artifacts/8wtv9m4u_logo.png";

export const Footer = ({ onNavigate }) => (
  <footer id="visit" className="bg-forest text-sand" data-testid="footer-section">
    <div className="mx-auto max-w-[1400px] px-6 pt-24 sm:px-10 sm:pt-32">
      <Reveal>
        <h2
          className="whitespace-nowrap font-display font-light leading-none tracking-tighter text-sand"
          style={{ fontSize: "clamp(3rem, 11.5vw, 11rem)" }}
          data-testid="footer-brand"
        >
          Vital <span className="italic text-clay-light">Body</span>
        </h2>
      </Reveal>

      <div className="mt-16 grid grid-cols-12 gap-10 border-t border-sand/15 py-14 sm:mt-24">
        <div className="col-span-12 sm:col-span-4">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-clay-light">Visit Us</p>
          <div className="mt-6 flex flex-col gap-5 text-base text-sand/80">
            <a
              href="https://maps.google.com/?q=309+Borchard+Dr+Ventura+CA"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 transition-colors hover:text-sand"
              data-testid="footer-address"
            >
              <MapPin size={20} weight="thin" className="mt-1 shrink-0 text-clay-light" />
              309 Borchard Dr.
              <br />
              Ventura, California
            </a>
            <a href="tel:+18056436888" className="flex items-center gap-3 transition-colors hover:text-sand" data-testid="footer-phone">
              <Phone size={20} weight="thin" className="shrink-0 text-clay-light" />
              (805) 643-6888
            </a>
            <a href="mailto:jaweal@yahoo.com" className="flex items-center gap-3 transition-colors hover:text-sand" data-testid="footer-email">
              <EnvelopeSimple size={20} weight="thin" className="shrink-0 text-clay-light" />
              jaweal@yahoo.com
            </a>
          </div>
        </div>

        <div className="col-span-12 sm:col-span-4">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-clay-light">Hours</p>
          <div className="mt-6 flex flex-col gap-3 text-base text-sand/80" data-testid="footer-hours">
            <p className="flex items-center gap-3">
              <Clock size={20} weight="thin" className="shrink-0 text-clay-light" />
              Monday – Saturday · 9:00 AM – 6:00 PM
            </p>
            <p className="pl-8 text-sand/60">Sunday · Closed</p>
          </div>
        </div>

        <div className="col-span-12 sm:col-span-4">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-clay-light">Explore</p>
          <div className="mt-6 flex flex-col items-start gap-3 text-base text-sand/80">
            <button onClick={() => onNavigate("#philosophy")} className="transition-colors hover:text-sand" data-testid="footer-link-philosophy">
              Philosophy
            </button>
            <button onClick={() => onNavigate("#services")} className="transition-colors hover:text-sand" data-testid="footer-link-services">
              Rituals
            </button>
            <button onClick={() => onNavigate("#booking")} className="transition-colors hover:text-sand" data-testid="footer-link-booking">
              Book a Visit
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start justify-between gap-6 border-t border-sand/15 py-8 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <span className="rounded-sm bg-sand px-3 py-2">
            <img src={LOGO_IMG} alt="Vital Body Healing Spa & Salon logo" className="h-8 w-auto" data-testid="footer-logo" />
          </span>
          <span className="text-xs uppercase tracking-[0.3em] text-sand/50">
            A Place of Transformation
          </span>
        </div>
        <p className="text-xs tracking-wide text-sand/40" data-testid="footer-copyright">
          © {new Date().getFullYear()} Vital Body Healing Spa &amp; Salon · Ventura, CA
        </p>
      </div>
    </div>
  </footer>
);
