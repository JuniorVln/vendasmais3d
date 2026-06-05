"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import VMScrollCanvas from "@/components/VMScrollCanvas";
import VMExperience from "@/components/VMExperience";
import PostScrollSections from "@/components/PostScrollSections";
import { TOTAL_FRAMES, FRAMES_PATH } from "@/data/vmData";

export default function Home() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <main className="font-sans" style={{ backgroundColor: "#050A14" }}>
      {/* ── Scroll-locked sequence: 600vh ── */}
      <section
        ref={containerRef}
        className="relative"
        style={{ height: "900vh" }}
        aria-label="Experiência interativa de apresentação"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <VMScrollCanvas
            scrollYProgress={scrollYProgress}
            totalFrames={TOTAL_FRAMES}
            framesPath={FRAMES_PATH}
          />
          <VMExperience scrollYProgress={scrollYProgress} />
        </div>
      </section>

      {/* ── Post-sequence natural scroll ── */}
      <div className="relative z-20" style={{ backgroundColor: "#050A14" }}>
        <PostScrollSections />
      </div>
    </main>
  );
}
