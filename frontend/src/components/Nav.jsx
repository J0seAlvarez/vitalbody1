import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { label: "Philosophy", target: "#philosophy", testId: "nav-link-philosophy" },
  { label: "Rituals", target: "#services", testId: "nav-link-services" },
  { label: "Visit", target: "#visit", testId: "nav-link-visit" },
];

export const Nav = ({ onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "border-b border-forest/10 bg-sand/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
      data-testid="main-nav"
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 sm:px-10">
        <button
          onClick={() => onNavigate("#top")}
          className={`text-left transition-colors duration-500 ${scrolled ? "text-forest" : "text-sand"}`}
          data-testid="nav-brand"
        >
          <span className="block font-display text-2xl font-medium leading-none tracking-tight">
            Vital Body
          </span>
          <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.35em] opacity-70">
            Healing Spa &amp; Salon
          </span>
        </button>

        <nav className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <button
              key={link.target}
              onClick={() => onNavigate(link.target)}
              data-testid={link.testId}
              className={`group relative text-xs font-semibold uppercase tracking-[0.25em] transition-colors duration-500 ${
                scrolled ? "text-forest" : "text-sand"
              }`}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-current transition-[width] duration-500 ease-out group-hover:w-full" />
            </button>
          ))}
        </nav>

        <button
          onClick={() => onNavigate("#booking")}
          data-testid="nav-book-cta"
          className={`rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-500 ${
            scrolled
              ? "bg-forest text-sand hover:bg-clay"
              : "bg-sand/10 text-sand backdrop-blur-md ring-1 ring-sand/40 hover:bg-sand hover:text-forest"
          }`}
        >
          Book a Visit
        </button>
      </div>
    </motion.header>
  );
};
