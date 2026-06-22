"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    const tick = () => {
      setTime(new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Istanbul" }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => { window.removeEventListener("scroll", onScroll); clearInterval(id); };
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        background: scrolled ? "rgba(10,10,10,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        transition: "background .4s, border-color .4s, backdrop-filter .4s",
      }}
    >
      <div className="container flex items-center justify-between" style={{ height: "64px" }}>
        {/* Logo */}
        <a href="#hero" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "18px", color: "var(--text-primary)", textDecoration: "none", letterSpacing: "-0.02em" }}>
          İG<span style={{ color: "var(--text-muted)" }}>.</span>
        </a>

        {/* Nav links — hidden on mobile */}
        <nav className="hidden md:flex items-center gap-10">
          {[["#projects", "Work"], ["#about", "Hakkımda"], ["#contact", "İletişim"]].map(([href, label]) => (
            <a key={href} href={href} style={{ fontSize: "13px", color: "var(--text-muted)", textDecoration: "none", letterSpacing: "0.05em", transition: "color .2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--text-primary)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}>
              {label}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-6">
          <span className="hidden md:block" style={{ fontSize: "11px", fontFamily: "monospace", color: "var(--text-muted)" }}>
            IST {time}
          </span>
          <a href="#contact" style={{
            fontSize: "11px", letterSpacing: "0.12em", fontWeight: 500,
            color: "var(--text-primary)", border: "1px solid var(--border)",
            padding: "10px 20px", textDecoration: "none", transition: "border-color .2s, background .2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "var(--border)"; }}
          >
            HIRE ME
          </a>
        </div>
      </div>
    </motion.header>
  );
}
