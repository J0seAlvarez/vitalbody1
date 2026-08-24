import Marquee from "react-fast-marquee";
import { Sparkle } from "@phosphor-icons/react";

const phrases = ["Wellness & Beauty", "Body", "Heart", "Soul", "Ventura, CA", "You Deserve This"];

export const EditorialMarquee = () => (
  <section
    className="overflow-hidden border-y border-sand/10 bg-forest py-8 sm:py-10"
    data-testid="editorial-marquee"
    aria-hidden="true"
  >
    <Marquee speed={28} gradient={false} pauseOnHover={false}>
      {phrases.concat(phrases).map((phrase, i) => (
        <span key={i} className="mx-8 flex items-center gap-16">
          <span className="whitespace-nowrap font-display text-3xl font-light italic tracking-tight text-linen/50 sm:text-5xl">
            {phrase}
          </span>
          <Sparkle size={20} weight="thin" className="shrink-0 text-clay/60" />
        </span>
      ))}
    </Marquee>
  </section>
);
