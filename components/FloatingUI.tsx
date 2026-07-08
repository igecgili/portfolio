"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  ["#hakkimda", "Hakkımda"],
  ["#projects", "Çalışmalar"],
  ["#services", "Uzmanlıklarım"],
  ["#experience", "Deneyim"],
  ["#contact", "İletişim"],
];

function NavLink({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize: "12px", fontWeight: 500,
        color: hovered ? "#000" : "#444",
        textDecoration: "none", padding: "6px 14px",
        borderRadius: "999px", whiteSpace: "nowrap",
        background: hovered ? "rgba(255,255,255,0.5)" : "transparent",
        border: hovered ? "1px solid rgba(255,255,255,0.7)" : "1px solid transparent",
        boxShadow: hovered ? "inset 0 1px 1px rgba(255,255,255,0.6)" : "none",
        transition: "all 0.25s ease",
        transform: hovered ? "scale(1.05)" : "scale(1)",
      }}
    >
      {label}
    </a>
  );
}

export default function FloatingUI() {
  const [showNav, setShowNav] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [navTop, setNavTop] = useState(18);
  const lastYRef = useRef(0);

  useEffect(() => {
    const heroNav = document.getElementById("hero-nav");
    if (heroNav) {
      const rect = heroNav.getBoundingClientRect();
      setNavTop(Math.round(rect.top + rect.height / 2 - 18));
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setShowTop(y > 400);
      setShowNav(y > 300 && y < lastYRef.current);
      lastYRef.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showNav && (
          <div style={{
            position: "fixed", top: navTop, left: 0, right: 0,
            display: "flex", justifyContent: "center",
            zIndex: 999, pointerEvents: "none",
          }} className="floating-nav-desktop">
            <motion.div
              initial={{ y: -80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -80, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                pointerEvents: "auto",
                padding: "6px 8px",
                display: "flex", alignItems: "center", gap: "2px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.75)",
                backdropFilter: "blur(24px) saturate(200%)",
                WebkitBackdropFilter: "blur(24px) saturate(200%)",
                border: "1px solid rgba(0,0,0,0.08)",
                boxShadow: "0 2px 16px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,1)",
              }}
            >
              {navLinks.map(([href, label]) => (
                <NavLink key={href} href={href} label={label} />
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
