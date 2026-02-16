"use client";

import { useScroll } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import FerrariScrollCanvas from "@/components/FerrariScrollCanvas";
import FerrariExperience from "@/components/FerrariExperience";
import { features } from "@/data/carData";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <main className="bg-ferrari-black min-h-screen text-white selection:bg-ferrari-red">
      <Navbar />

      {/* SCROLL SEQUENCE (Locked for 600vh) */}
      <section ref={containerRef} className="relative h-[600vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-ferrari-black">
          <FerrariScrollCanvas
            scrollYProgress={scrollYProgress}
            totalFrames={172}
            imageFolderPath="/images"
          />
          <FerrariExperience scrollYProgress={scrollYProgress} />
        </div>
      </section>

      {/* REST OF SITE */}
      <div className="relative z-20 bg-ferrari-black border-t border-gray-800 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
        <SpecsGrid />
        <Features />
        <Footer />
      </div>
    </main>
  );
}

function SpecsGrid() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
      <h3 className="text-4xl font-orbitron font-bold mb-12 text-center text-ferrari-red tracking-wide">
        TECHNICAL SPECIFICATIONS
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {[
          { label: "0-60 MPH", value: "< 3s" },
          { label: "TOP SPEED", value: "> 217 MPH" },
          { label: "TOTAL POWER", value: "950 CV" }
        ].map((spec, i) => (
          <div
            key={i}
            className="p-8 border border-gray-800 hover:border-ferrari-red transition-all duration-300 group cursor-default"
          >
            <p className="text-ferrari-red font-orbitron text-sm tracking-widest mb-2 group-hover:text-white transition-colors">{spec.label}</p>
            <p className="text-4xl font-rajdhani font-bold">{spec.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Features() {
  return (
    <section className="py-24 bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto px-6">
        <h3 className="text-4xl font-orbitron font-bold mb-16 text-center tracking-wide">
          ENGINEERING MASTERPIECE
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {features.map((f, i) => (
            <div key={i} className="space-y-4 border-l-2 border-ferrari-yellow pl-6">
              <h4 className="text-2xl font-orbitron text-white tracking-wide">
                {f.title}
              </h4>
              <p className="text-gray-400 font-rajdhani text-lg leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 text-center border-t border-gray-800 text-gray-500 font-rajdhani text-sm uppercase tracking-widest">
      <p>© {new Date().getFullYear()} Ferrari S.p.A. - A tribute project.</p>
    </footer>
  );
}
