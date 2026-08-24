import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star } from "@phosphor-icons/react";
import { Reveal } from "@/components/Reveal";

const ease = [0.76, 0, 0.24, 1];

const testimonials = [
  {
    quote:
      "I walked in carrying the whole week on my shoulders and floated out an hour later. The calmest room in Ventura.",
    name: "Marisol G.",
    service: "Massage Therapy",
  },
  {
    quote:
      "They never rush you here. My facial felt like it lasted a beautiful eternity — and my skin glowed for days after.",
    name: "Dana R.",
    service: "Facials & Skin Care",
  },
  {
    quote:
      "Finally, a salon that listens. I showed one photo and walked out with exactly the cut I had imagined for months.",
    name: "Priya S.",
    service: "Hair Salon",
  },
  {
    quote:
      "The hot stone treatment melted tension I didn't even know I was holding. I rebooked before I reached my car.",
    name: "Elena T.",
    service: "Body Treatment",
  },
  {
    quote: "Gentle, precise and so kind — even a waxing appointment feels like self-care here.",
    name: "Jordan M.",
    service: "Waxing",
  },
];

export const Testimonials = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const current = testimonials[index];

  return (
    <section id="kind-words" className="bg-sand py-28 sm:py-40" data-testid="testimonials-section">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-clay" data-testid="testimonials-overline">
            Kind Words
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-12 gap-10">
          <div className="col-span-12 lg:col-span-9">
            <Reveal delay={0.05}>
              <div className="flex gap-1.5" data-testid="testimonial-stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={18} weight="fill" className="text-clay" />
                ))}
              </div>
            </Reveal>

            <div className="relative mt-10 min-h-[15rem] sm:min-h-[13rem]">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.7, ease }}
                  data-testid="testimonial-card"
                >
                  <p
                    className="max-w-4xl font-display text-3xl font-light italic leading-snug tracking-tight text-forest sm:text-5xl"
                    data-testid="testimonial-quote"
                  >
                    “{current.quote}”
                  </p>
                  <footer className="mt-8 flex items-baseline gap-4">
                    <span className="text-sm font-semibold uppercase tracking-[0.25em] text-forest" data-testid="testimonial-author">
                      {current.name}
                    </span>
                    <span className="text-xs uppercase tracking-[0.25em] text-clay" data-testid="testimonial-service">
                      {current.service}
                    </span>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
            </div>
          </div>

          <div className="col-span-12 flex items-end justify-between lg:col-span-3 lg:flex-col lg:items-end">
            <span className="font-display text-xl font-light text-clay/70" data-testid="testimonial-counter">
              {String(index + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
            </span>
            <div className="flex gap-3">
              {testimonials.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Show testimonial ${i + 1}`}
                  data-testid={`testimonial-dot-${i}`}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    i === index ? "w-8 bg-forest" : "w-2 bg-forest/25 hover:bg-forest/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
