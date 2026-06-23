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
    <svg style={{ display: "none" }}>
      <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox">
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
        <feDisplacementMap in="SourceGraphic" in2="softMap" scale="200" xChannelSelector="R" yChannelSelector="G" />
      </filter>
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
        position: "relative",
        display: "inline-block",
        fontSize: "12px",
        fontWeight: 500,
        color: "#111",
        textDecoration: "none",
        padding: "6px 14px",
        borderRadius: "999px",
        whiteSpace: "nowrap",
        transition: "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 2.2)",
        boxShadow: hovered ? "0 6px 12px rgba(0,0,0,0.15), 0 0 20px rgba(0,0,0,0.08)" : "none",
        overflow: "hidden",
      }}
    >
      {/* Distortion blur layer */}
      <span style={{
        position: "absolute", inset: 0, borderRadius: "999px",
        backdropFilter: "blur(3px)",
        filter: hovered ? "url(#glass-distortion)" : "none",
        isolation: "isolate",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s ease",
        zIndex: 0,
      }} />
      {/* White tint layer */}
      <span style={{
        position: "absolute", inset: 0, borderRadius: "999px",
        background: "rgba(255,255,255,0.3)",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s ease",
        zIndex: 1,
      }} />
      {/* Glass rim (inset shadow) */}
      <span style={{
        position: "absolute", inset: 0, borderRadius: "999px",
        boxShadow: "inset 2px 2px 1px rgba(255,255,255,0.6), inset -1px -1px 1px rgba(255,255,255,0.4)",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.3s ease",
        zIndex: 2,
      }} />
      {/* Text */}
      <span style={{ position: "relative", zIndex: 3 }}>{label}</span>
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
              style={{
                pointerEvents: "auto",
                background: "rgba(255,255,255,0.55)",
                backdropFilter: "blur(28px) saturate(200%)",
                WebkitBackdropFilter: "blur(28px) saturate(200%)",
                border: "1px solid rgba(255,255,255,0.75)",
                borderRadius: "999px",
                padding: "6px 8px",
                display: "flex", alignItems: "center", gap: "2px",
                boxShadow: "0 2px 20px rgba(0,0,0,0.07), inset 0 1px 1px rgba(255,255,255,0.9)",
              }}
            >
              {navLinks.map(([href, label]) => (
                <LiquidGlassLink key={href} href={href} label={label} />
              ))}
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
