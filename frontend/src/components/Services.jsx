import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { Reveal } from "@/components/Reveal";

const ease = [0.76, 0, 0.24, 1];

const services = [
  {
    num: "01",
    name: "Massage Therapy",
    copy: "Deep relaxation through professional, intuitive massage tailored to your body.",
    img: "https://images.unsplash.com/photo-1639162906614-0603b0ae95fd?q=80&w=1200&auto=format&fit=crop",
  },
  {
    num: "02",
    name: "Facials & Skin Care",
    copy: "Restorative facials and exfoliation rituals for your skin's natural glow and longevity.",
    img: "https://images.unsplash.com/photo-1555820585-c5ae44394b79?q=80&w=1200&auto=format&fit=crop",
  },
  {
    num: "03",
    name: "Hair Salon",
    copy: "Cut, colour and styling in a calm, light-filled studio — beauty without the rush.",
    img: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=1200&auto=format&fit=crop",
  },
  {
    num: "04",
    name: "Body Treatment",
    copy: "Hot stone therapy and full-body rituals that melt stress and restore warmth.",
    img: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=1200&auto=format&fit=crop",
  },
  {
    num: "05",
    name: "Waxing",
    copy: "Gentle, precise waxing with soothing aftercare — smooth skin, calm mind.",
    img: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1200&auto=format&fit=crop",
  },
];

export const Services = () => {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="bg-sand-deep py-28 sm:py-40" data-testid="services-section">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-clay" data-testid="services-overline">
                The Rituals
              </p>
              <h2
                className="mt-6 font-display text-4xl font-light leading-tight tracking-tight sm:text-6xl"
                data-testid="services-heading"
              >
                Five ways to <span className="italic text-clay">return to yourself</span>
              </h2>
            </div>
            <p className="max-w-sm text-base leading-relaxed text-forest-soft">
              Every service is an unhurried appointment — call us and we will find the
              ritual, and the hour, that suits you.
            </p>
          </div>
        </Reveal>

        <div className="mt-20 grid grid-cols-12 gap-10">
          <div className="col-span-12 lg:col-span-7">
            {services.map((service, i) => (
              <Reveal key={service.num} delay={i * 0.05}>
                <button
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className="group flex w-full items-center gap-6 border-t border-forest/15 py-8 text-left transition-colors duration-500 last:border-b hover:bg-forest/[0.03] sm:gap-10 sm:py-10"
                  data-testid={`service-item-${service.num}`}
                >
                  <span className="font-display text-xl font-light text-clay/70 sm:text-2xl">
                    {service.num}
                  </span>
                  <span className="flex-1">
                    <span className="block font-display text-3xl font-light tracking-tight transition-transform duration-500 group-hover:translate-x-2 sm:text-5xl">
                      {service.name}
                    </span>
                    <span className="mt-2 block max-w-md text-sm leading-relaxed text-forest-soft sm:text-base">
                      {service.copy}
                    </span>
                    <span className="mt-3 block text-[11px] font-semibold uppercase tracking-[0.25em] text-clay" data-testid={`service-pricing-${service.num}`}>
                      Call for pricing · (805) 643-6888
                    </span>
                  </span>
                  <ArrowUpRight
                    size={28}
                    weight="thin"
                    className="shrink-0 text-clay opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100"
                  />
                </button>
              </Reveal>
            ))}
          </div>

          <div className="col-span-12 hidden lg:col-span-5 lg:block">
            <div className="sticky top-28 aspect-[3/4] overflow-hidden rounded-none" data-testid="services-image-frame">
              <AnimatePresence mode="wait">
                <motion.img
                  key={services[active].img}
                  src={services[active].img}
                  alt={services[active].name}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease }}
                  className="h-full w-full object-cover"
                  data-testid="services-active-image"
                />
              </AnimatePresence>
              <div className="absolute bottom-0 left-0 bg-forest/80 px-5 py-3 backdrop-blur-sm">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-sand">
                  {services[active].name}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:hidden">
          {services.map((service) => (
            <div key={service.num} className="aspect-[4/3] overflow-hidden" data-testid={`service-mobile-img-${service.num}`}>
              <img src={service.img} alt={service.name} className="h-full w-full object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
