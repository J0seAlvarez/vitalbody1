import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "@phosphor-icons/react";

const SALON_IMG =
  "https://customer-assets-rejwkqb3.emergentagent.net/job_5a8ebf1c-fc8d-4b29-90e2-691fe48b0816/artifacts/535vu1hq_salon.png";

const ease = [0.76, 0, 0.24, 1];

const MaskedLine = ({ children, delay }) => (
  <span className="block overflow-hidden pb-[0.08em]">
    <motion.span
      className="block"
      initial={{ y: "115%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1.2, ease, delay }}
    >
      {children}
    </motion.span>
  </span>
);

export const Hero = ({ onNavigate }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-screen flex-col justify-end overflow-hidden bg-forest"
      data-testid="hero-section"
    >
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <motion.img
          src={SALON_IMG}
          alt="Inside the Vital Body spa and salon in Ventura"
          initial={{ scale: 1.18 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 3, ease }}
          className="h-[120%] w-full object-cover"
          data-testid="hero-image"
        />
      </motion.div>
      <div className="absolute inset-0 bg-forest/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/20 to-forest/40" />

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-16 pt-40 sm:px-10 sm:pb-24"
      >
        <div className="overflow-hidden">
          <motion.p
            initial={{ y: "120%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1, ease, delay: 0.35 }}
            className="text-xs font-semibold uppercase tracking-[0.4em] text-clay-light"
            data-testid="hero-overline"
          >
            Vital Body — Ventura, California
          </motion.p>
        </div>

        <h1
          className="mt-6 font-display text-6xl font-light leading-[0.92] tracking-tighter text-sand sm:text-8xl lg:text-[9.5rem]"
          data-testid="hero-headline"
        >
          <MaskedLine delay={0.5}>A Place of</MaskedLine>
          <MaskedLine delay={0.65}>
            <span className="italic text-clay-light">Transformation</span>
          </MaskedLine>
        </h1>

        <div className="mt-10 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-md overflow-hidden">
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease, delay: 1.1 }}
              className="text-base leading-relaxed tracking-wide text-sand/80 sm:text-lg"
              data-testid="hero-subcopy"
            >
              Nurtured and revitalized in body, heart and soul. Wellness and beauty,
              blended under one roof. You deserve this.
            </motion.p>
          </div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease, delay: 1.25 }}
            className="flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => onNavigate("#booking")}
              data-testid="hero-book-button"
              className="group rounded-full bg-sand px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-forest transition-colors duration-500 hover:bg-clay-light"
            >
              Book Your Visit
            </button>
            <button
              onClick={() => onNavigate("#services")}
              data-testid="hero-services-button"
              className="rounded-full px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-sand ring-1 ring-sand/40 transition-all duration-500 hover:bg-sand/10 hover:ring-sand"
            >
              Explore Rituals
            </button>
          </motion.div>
        </div>
      </motion.div>

      <motion.button
        onClick={() => onNavigate("#philosophy")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 right-8 z-10 hidden text-sand/70 transition-colors hover:text-sand sm:block"
        data-testid="hero-scroll-indicator"
        aria-label="Scroll down"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="block"
        >
          <ArrowDown size={28} weight="thin" />
        </motion.span>
      </motion.button>
    </section>
  );
};
