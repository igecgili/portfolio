"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  ["#hakkimda", "Hakkımda"],
  ["#projects", "Çalışmalar"],
  ["#services", "Hizmetler"],
  ["#experience", "Deneyim"],
  ["#contact", "İletişim"],
];

function LiquidGlassButton({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLAnchorElement>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  return (
    <a
      ref={ref}
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={onMouseMove}
      style={{
        position: "relative",
        fontSize: "12px", fontWeight: 500,
        color: hovered ? "#000" : "#444",
        textDecoration: "none",
        padding: "6px 14px",
        borderRadius: "999px",
        whiteSpace: "nowrap",
        transition: "color 0.2s",
        isolation: "isolate",
        overflow: "hidden",
        display: "inline-block",
      }}
    >
      {/* Liquid glass hover layer */}
      <span
        style={{
          position: "absolute", inset: 0,
          borderRadius: "999px",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.25s ease",
          background: "rgba(255,255,255,0.55)",
          backdropFilter: "blur(12px) saturate(200%)",
          WebkitBackdropFilter: "blur(12px) saturate(200%)",
          border: "1px solid rgba(255,255,255,0.8)",
          boxShadow: "inset 0 1px 1px rgba(255,255,255,0.9), 0 4px 16px rgba(0,0,0,0.08)",
          // Liquid distortion: radial highlight follows mouse
          backgroundImage: hovered
            ? `radial-gradient(circle 40px at ${pos.x}px ${pos.y}px, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.2) 60%, transparent 100%)`
            : "none",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <span style={{ position: "relative", zIndex: 1 }}>{label}</span>
    </a>
  );
}

export default function FloatingUI() {
  const [showNav, setShowNav] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [navTop, setNavTop] = useState(18);

  useEffect(() => {
    const heroNav = document.getElementById("hero-nav");
    if (heroNav) {
      const rect = heroNav.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      setNavTop(Math.round(centerY - 18));
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setShowTop(y > 400);
      setShowNav(y > 300 && y < lastY);
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  return (
    <>
      {/* SVG filter for extra liquid distortion */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="liquid-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      {/* Floating sticky nav */}
      <AnimatePresence>
        {showNav && (
          <div style={{ position: "fixed", top: navTop, left: 0, right: 0, display: "flex", justifyContent: "center", zIndex: 999, pointerEvents: "none" }}>
            <motion.div
              initial={{ y: -80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -80, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                pointerEvents: "auto",
                background: "rgba(255,255,255,0.6)",
                backdropFilter: "blur(28px) saturate(200%)",
                WebkitBackdropFilter: "blur(28px) saturate(200%)",
                border: "1px solid rgba(255,255,255,0.7)",
                borderRadius: "999px",
                padding: "6px 8px",
                display: "flex", alignItems: "center", gap: "2px",
                boxShadow: "0 2px 20px rgba(0,0,0,0.08), inset 0 1px 1px rgba(255,255,255,0.8)",
              }}
            >
              {navLinks.map(([href, label]) => (
                <LiquidGlassButton key={href} href={href} label={label} />
              ))}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Scroll to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              position: "fixed", bottom: 28, right: 28,
              zIndex: 999,
              width: 44, height: 44, borderRadius: "50%",
              background: "#111", color: "#fff",
              border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "18px", boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              transition: "background 0.15s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#333"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "#111"; }}
            aria-label="Yukarı çık"
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
