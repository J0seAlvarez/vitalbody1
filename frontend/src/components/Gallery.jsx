import { Reveal } from "@/components/Reveal";

const SALON_IMG =
  "https://customer-assets-rejwkqb3.emergentagent.net/job_5a8ebf1c-fc8d-4b29-90e2-691fe48b0816/artifacts/535vu1hq_salon.png";

const photos = [
  {
    src: SALON_IMG,
    caption: "The Studio — 309 Borchard Dr.",
    span: "col-span-12 md:col-span-7",
    ratio: "aspect-[16/11]",
  },
  {
    src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1200&auto=format&fit=crop",
    caption: "Quiet Rituals",
    span: "col-span-12 md:col-span-5",
    ratio: "aspect-[16/11] md:aspect-[4/5]",
  },
  {
    src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop",
    caption: "Treatment Rooms",
    span: "col-span-12 md:col-span-5",
    ratio: "aspect-[4/3] md:aspect-[4/5]",
  },
  {
    src: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=1200&auto=format&fit=crop",
    caption: "Warm Stone Therapy",
    span: "col-span-12 md:col-span-7",
    ratio: "aspect-[16/10]",
  },
];

export const Gallery = () => (
  <section id="gallery" className="bg-forest py-28 sm:py-40" data-testid="gallery-section">
    <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
      <Reveal>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-clay-light" data-testid="gallery-overline">
              Step Inside
            </p>
            <h2
              className="mt-6 font-display text-4xl font-light leading-tight tracking-tight text-sand sm:text-6xl"
              data-testid="gallery-heading"
            >
              A quiet corner <span className="italic text-clay-light">of Ventura</span>
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-sand/70">
            Soft light, warm linen and room to breathe — feel the space before you
            ever walk through the door.
          </p>
        </div>
      </Reveal>

      <div className="mt-20 grid grid-cols-12 gap-6">
        {photos.map((photo, i) => (
          <Reveal key={photo.caption} delay={i * 0.07} className={photo.span}>
            <figure
              className={`group relative overflow-hidden ${photo.ratio}`}
              data-testid={`gallery-item-${i}`}
            >
              <img
                src={photo.src}
                alt={photo.caption}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-forest/0 transition-colors duration-700 group-hover:bg-forest/25" />
              <figcaption className="absolute bottom-0 left-0 translate-y-2 bg-forest/80 px-5 py-3 opacity-90 backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-sand">
                  {photo.caption}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
