"use client";

import { useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import VmLogo from "./VmLogo";
import { navData } from "@/data/vmData";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [scrolledFar, setScrolledFar] = useState(false);
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
    setScrolledFar(latest > 50);
    setVisible(latest > window.innerHeight);
  });

  return (
    <nav
      className={[
        "fixed top-0 w-full z-50 py-4 transition-all duration-500",
        visible ? "opacity-100" : "opacity-0 pointer-events-none",
        scrolled
          ? "backdrop-blur-md border-b border-white/5"
          : "bg-transparent",
      ].join(" ")}
      style={scrolled ? { backgroundColor: "rgba(0,51,114,0.70)" } : {}}
      aria-label="Navegação principal"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
      <VmLogo height={36} width={120} />

      <a
        href="#cta"
        aria-label="Quero fazer parte do Vendas Mais"
        className="font-black uppercase tracking-widest px-8 py-3 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-vm-gold hover:scale-105"
        style={{
          backgroundColor: "#C8941A",
          color: "#050A14",
          boxShadow: scrolledFar
            ? "0 0 24px rgba(200,148,26,0.45)"
            : "0 0 16px rgba(200,148,26,0.30)",
          letterSpacing: "0.14em",
          fontSize: 12,
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#E8A820")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#C8941A")}
      >
        {navData.cta.toUpperCase()}
      </a>
      </div>
    </nav>
  );
}
