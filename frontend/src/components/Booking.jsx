import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { CheckCircle, Phone } from "@phosphor-icons/react";
import { toast } from "sonner";
import { Reveal } from "@/components/Reveal";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const AMBIENT_IMG =
  "https://images.pexels.com/photos/33529508/pexels-photo-33529508.jpeg?auto=compress&cs=tinysrgb&w=1600";

const serviceOptions = [
  "Massage Therapy",
  "Facials & Skin Care",
  "Hair Salon",
  "Body Treatment",
  "Waxing",
  "Not sure yet",
];

const initialForm = { name: "", email: "", phone: "", service: "", preferred_date: "", message: "" };

const inputClass =
  "w-full border-b border-forest/20 bg-transparent py-3 text-base text-forest placeholder:text-forest/35 outline-none transition-colors duration-300 focus:border-clay";

export const Booking = () => {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(`${API}/enquiries`, {
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        service: form.service,
        preferred_date: form.preferred_date || null,
        message: form.message || null,
      });
      setSubmitted(true);
      toast.success("Enquiry received — we will be in touch shortly.");
    } catch (err) {
      toast.error("Something went wrong. Please call us at (805) 643-6888.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="booking" className="relative overflow-hidden py-28 sm:py-40" data-testid="booking-section">
      <img
        src={AMBIENT_IMG}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-forest/70" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 sm:px-10">
        <div className="grid grid-cols-12 gap-12">
          <div className="col-span-12 flex flex-col justify-between lg:col-span-5">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-clay-light" data-testid="booking-overline">
                Begin Your Visit
              </p>
              <h2
                className="mt-6 font-display text-4xl font-light leading-[1.05] tracking-tight text-sand sm:text-6xl"
                data-testid="booking-heading"
              >
                Your transformation starts with a{" "}
                <span className="italic text-clay-light">single hour</span>
              </h2>
              <p className="mt-8 max-w-md text-base leading-relaxed text-sand/75 sm:text-lg">
                Tell us what your body is asking for and we will call you back to
                arrange the perfect appointment.
              </p>
            </Reveal>

            <Reveal delay={0.15} className="mt-12">
              <a
                href="tel:+18056436888"
                className="group inline-flex items-center gap-4 text-sand"
                data-testid="booking-call-link"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full ring-1 ring-sand/40 transition-all duration-500 group-hover:bg-sand group-hover:text-forest">
                  <Phone size={22} weight="thin" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-[0.3em] text-sand/60">
                    Prefer to call?
                  </span>
                  <span className="font-display text-2xl font-light tracking-tight">
                    (805) 643-6888
                  </span>
                </span>
              </a>
            </Reveal>
          </div>

          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.1}>
              <div className="rounded-2xl bg-white/95 p-8 shadow-2xl shadow-forest/40 backdrop-blur-md sm:p-12" data-testid="booking-card">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-start gap-6 py-8"
                    data-testid="booking-success"
                  >
                    <CheckCircle size={48} weight="thin" className="text-clay" />
                    <h3 className="font-display text-3xl font-light tracking-tight sm:text-4xl">
                      Thank you, {form.name.split(" ")[0]}.
                    </h3>
                    <p className="max-w-md text-base leading-relaxed text-forest-soft">
                      Your enquiry has been received. We will reach out shortly to
                      confirm your appointment — or call us anytime at (805) 643-6888.
                    </p>
                    <button
                      onClick={() => { setForm(initialForm); setSubmitted(false); }}
                      className="text-xs font-semibold uppercase tracking-[0.25em] text-clay underline-offset-4 hover:underline"
                      data-testid="booking-send-another"
                    >
                      Send another enquiry
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-7" data-testid="booking-form">
                    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                      <label className="block">
                        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-forest-soft">
                          Name
                        </span>
                        <input
                          required
                          value={form.name}
                          onChange={update("name")}
                          placeholder="Your full name"
                          className={inputClass}
                          data-testid="booking-name-input"
                        />
                      </label>
                      <label className="block">
                        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-forest-soft">
                          Email
                        </span>
                        <input
                          required
                          type="email"
                          value={form.email}
                          onChange={update("email")}
                          placeholder="you@email.com"
                          className={inputClass}
                          data-testid="booking-email-input"
                        />
                      </label>
                    </div>

                    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                      <label className="block">
                        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-forest-soft">
                          Phone <span className="normal-case text-forest/40">(optional)</span>
                        </span>
                        <input
                          value={form.phone}
                          onChange={update("phone")}
                          placeholder="(805) 000-0000"
                          className={inputClass}
                          data-testid="booking-phone-input"
                        />
                      </label>
                      <label className="block">
                        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-forest-soft">
                          Service
                        </span>
                        <select
                          required
                          value={form.service}
                          onChange={update("service")}
                          className={`${inputClass} cursor-pointer`}
                          data-testid="booking-service-select"
                        >
                          <option value="" disabled>
                            Choose a ritual
                          </option>
                          {serviceOptions.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>

                    <label className="block">
                      <span className="text-xs font-semibold uppercase tracking-[0.25em] text-forest-soft">
                        Preferred Date <span className="normal-case text-forest/40">(optional)</span>
                      </span>
                      <input
                        type="date"
                        value={form.preferred_date}
                        onChange={update("preferred_date")}
                        className={`${inputClass} cursor-pointer`}
                        data-testid="booking-date-input"
                      />
                    </label>

                    <label className="block">
                      <span className="text-xs font-semibold uppercase tracking-[0.25em] text-forest-soft">
                        Message <span className="normal-case text-forest/40">(optional)</span>
                      </span>
                      <textarea
                        rows={3}
                        value={form.message}
                        onChange={update("message")}
                        placeholder="Anything we should know — tension, occasion, preferences…"
                        className={`${inputClass} resize-none`}
                        data-testid="booking-message-input"
                      />
                    </label>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="mt-2 rounded-full bg-forest px-10 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-sand transition-colors duration-500 hover:bg-clay disabled:cursor-not-allowed disabled:opacity-50"
                      data-testid="booking-submit-button"
                    >
                      {submitting ? "Sending…" : "Request Appointment"}
                    </button>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
