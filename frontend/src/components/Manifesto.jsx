import { Reveal } from "@/components/Reveal";

const chapters = [
  {
    num: "01",
    title: "The Body",
    copy: "Skilled hands and honest touch. Massage, body treatments and hair care that gently unwind whatever the world has wound up.",
  },
  {
    num: "02",
    title: "The Heart",
    copy: "A room that exhales. Soft light, warm linen, unhurried appointments — time that finally belongs entirely to you.",
  },
  {
    num: "03",
    title: "The Soul",
    copy: "You leave different than you arrived. Lighter, brighter, quietly restored — unmistakably vital.",
  },
];

export const Manifesto = () => (
  <section id="philosophy" className="bg-sand py-28 sm:py-40" data-testid="manifesto-section">
    <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
      <Reveal>
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-clay" data-testid="manifesto-overline">
          Our Philosophy
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <h2
          className="mt-8 max-w-5xl font-display text-4xl font-light leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          data-testid="manifesto-statement"
        >
          We offer a unique space where you will feel nurtured and revitalized — in{" "}
          <span className="italic text-clay">body</span>,{" "}
          <span className="italic text-clay">heart</span> and{" "}
          <span className="italic text-clay">soul</span>.
        </h2>
      </Reveal>

      <div className="mt-24 sm:mt-36">
        {chapters.map((chapter, i) => (
          <Reveal key={chapter.num} delay={i * 0.08}>
            <div
              className="grid grid-cols-12 items-baseline gap-4 border-t border-forest/15 py-12 sm:py-16"
              data-testid={`manifesto-chapter-${chapter.num}`}
            >
              <span className="col-span-3 font-display text-5xl font-light text-clay/70 sm:col-span-2 sm:text-7xl">
                {chapter.num}
              </span>
              <h3 className="col-span-9 font-display text-3xl font-light tracking-tight sm:col-span-3 sm:text-5xl">
                {chapter.title}
              </h3>
              <p className="col-span-12 mt-4 max-w-xl text-base leading-relaxed tracking-wide text-forest-soft sm:col-span-6 sm:col-start-7 sm:mt-0 sm:text-lg">
                {chapter.copy}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
