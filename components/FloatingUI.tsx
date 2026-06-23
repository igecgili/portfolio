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
        transform: hovered ? "scale(1.06)" : "scale(1)",
        isolation: "isolate",
        overflow: "hidden",
        /* Liquid glass on hover */
        background: hovered ? "rgba(255,255,255,0.35)" : "transparent",
        backdropFilter: hovered ? "blur(12px) saturate(180%)" : "none",
        WebkitBackdropFilter: hovered ? "blur(12px) saturate(180%)" : "none",
        boxShadow: hovered
          ? "inset 2px 2px 1px rgba(255,255,255,0.7), inset -1px -1px 1px rgba(255,255,255,0.4), 0 4px 16px rgba(0,0,0,0.1)"
          : "none",
        border: hovered ? "1px solid rgba(255,255,255,0.6)" : "1px solid transparent",
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
                background: "rgba(255,255,255,0.5)",
                backdropFilter: "blur(32px) saturate(200%)",
                WebkitBackdropFilter: "blur(32px) saturate(200%)",
                border: "1px solid rgba(255,255,255,0.8)",
                borderRadius: "999px",
                padding: "6px 8px",
                display: "flex", alignItems: "center", gap: "2px",
                boxShadow: "0 2px 24px rgba(0,0,0,0.06), inset 0 1px 1px rgba(255,255,255,0.95)",
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
