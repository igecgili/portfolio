"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  ["#hakkimda", "Hakkımda"],
  ["#projects", "Çalışmalar"],
  ["#services", "Hizmetler"],
  ["#experience", "Deneyim"],
  ["#contact", "İletişim"],
];

function GlassFilter() {
  return (
    <svg style={{ position: "absolute", width: 0, height: 0 }}>
      <defs>
        <filter id="lg-filter" x="-20%" y="-50%" width="140%" height="200%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.001 0.005" numOctaves="1" seed="17" result="turbulence" />
          <feComponentTransfer in="turbulence" result="mapped">
            <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
            <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
            <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
          </feComponentTransfer>
          <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />
          <feSpecularLighting in="softMap" surfaceScale="5" specularConstant="1" specularExponent="100" lightingColor="white" result="specLight">
            <fePointLight x="-200" y="-200" z="300" />
          </feSpecularLighting>
          <feComposite in="specLight" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litImage" />
          <feDisplacementMap in="SourceGraphic" in2="softMap" scale="40" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}

function LiquidGlassLink({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize: "12px", fontWeight: 500, color: "#fff",
        textDecoration: "none", padding: "6px 14px",
        borderRadius: "999px", whiteSpace: "nowrap",
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2)",
        transform: hovered ? "scale(1.08)" : "scale(1)",
        background: hovered ? "rgba(255,255,255,0.2)" : "transparent",
        boxShadow: hovered ? "inset 2px 2px 1px rgba(255,255,255,0.5), inset -1px -1px 1px rgba(255,255,255,0.3)" : "none",
      }}
    >
      {label}
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
      <GlassFilter />

      <AnimatePresence>
        {showNav && (
          <div style={{
            position: "fixed", top: navTop, left: 0, right: 0,
            display: "flex", justifyContent: "center",
            zIndex: 999, pointerEvents: "none",
          }}>
            <motion.div
              initial={{ y: -80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -80, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ pointerEvents: "auto", position: "relative" }}
            >
              {/* Gerçek cam katmanı — filter burada, dışarıda */}
              <div style={{
                position: "absolute", inset: 0,
                borderRadius: "999px",
                backdropFilter: "blur(3px)",
                WebkitBackdropFilter: "blur(3px)",
                filter: "url(#lg-filter)",
                zIndex: 0,
              }} />
              {/* Beyaz tint + border */}
              <div style={{
                position: "absolute", inset: 0,
                borderRadius: "999px",
                background: "rgba(255,255,255,0.18)",
                border: "1px solid rgba(255,255,255,0.45)",
                boxShadow: "inset 2px 2px 1px rgba(255,255,255,0.5), inset -1px -1px 1px rgba(255,255,255,0.3), 0 4px 24px rgba(0,0,0,0.15)",
                zIndex: 1,
              }} />
              {/* Linkler */}
              <div style={{
                position: "relative", zIndex: 2,
                padding: "6px 8px",
                display: "flex", alignItems: "center", gap: "2px",
              }}>
                {navLinks.map(([href, label]) => (
                  <LiquidGlassLink key={href} href={href} label={label} />
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

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
