import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { Toaster } from "sonner";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { EditorialMarquee } from "@/components/EditorialMarquee";
import { Manifesto } from "@/components/Manifesto";
import { Services } from "@/components/Services";
import { Gallery } from "@/components/Gallery";
import { Testimonials } from "@/components/Testimonials";
import { Booking } from "@/components/Booking";
import { Footer } from "@/components/Footer";

const Grain = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none fixed inset-0 z-[90] opacity-[0.05] mix-blend-multiply"
    style={{
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      backgroundSize: "180px 180px",
    }}
  />
);

export default function App() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.4, smoothWheel: true });
    lenisRef.current = lenis;
    let rafId;
    const loop = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const scrollTo = (id) => {
    lenisRef.current?.scrollTo(id, { duration: 1.8 });
  };

  return (
    <div className="min-h-screen bg-sand font-sans text-forest antialiased" data-testid="app-root">
      <Grain />
      <Nav onNavigate={scrollTo} />
      <main>
        <Hero onNavigate={scrollTo} />
        <EditorialMarquee />
        <Manifesto />
        <Services />
        <Gallery />
        <Testimonials />
        <Booking />
      </main>
      <Footer onNavigate={scrollTo} />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: { background: "#1A251D", color: "#F4F2EC", border: "1px solid rgba(244,242,236,0.15)" },
        }}
      />
    </div>
  );
}
