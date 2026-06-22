"use client";

import { motion } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
const socials = [
  {
    label: "Instagram", href: "#",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>,
  },
  {
    label: "LinkedIn", href: "#",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>,
  },
  {
    label: "Behance", href: "#",
    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7.5 11.4c.6-.3 1-.9 1-1.7C8.5 8 7.3 7 5.7 7H1v10h4.9c1.8 0 3.1-.9 3.1-2.7 0-1.1-.6-1.9-1.5-2zM3 9h2.4c.6 0 1 .3 1 .9s-.4.9-1 .9H3V9zm2.6 6H3v-2.2h2.6c.8 0 1.2.4 1.2 1.1S6.4 15 5.6 15zm8.7-6.6h3.5V7.5h-3.5v.9zm-1 1.7c0-2.2 1.6-3.6 3.7-3.6 2.2 0 3.5 1.5 3.5 3.8v.6H15c.1 1 .8 1.6 1.8 1.6.7 0 1.3-.3 1.6-.9h1.8c-.4 1.6-1.7 2.5-3.4 2.5-2.2 0-3.7-1.4-3.7-4zm1.9-.8h3.4c-.2-.9-.8-1.4-1.7-1.4-.9 0-1.5.5-1.7 1.4z"/></svg>,
  },
];
const RADIUS = 220;

function FitText({ children }: { children: React.ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fit = () => {
      const wrap = wrapRef.current;
      const inner = innerRef.current;
      if (!wrap || !inner) return;
      inner.style.fontSize = "300px";
      const ratio = (wrap.offsetWidth / inner.scrollWidth) * 0.82;
      inner.style.fontSize = Math.floor(300 * ratio) + "px";
    };
    fit();
    const ro = new ResizeObserver(fit);
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={wrapRef} style={{ width: "100%", overflow: "hidden" }}>
      <div
        ref={innerRef}
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 0.88,
          whiteSpace: "nowrap",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const [photoMouse, setPhotoMouse] = useState({ x: -9999, y: -9999 });

  const onPhotoMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setPhotoMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
  }, []);
  const onPhotoLeave = useCallback(() => setPhotoMouse({ x: -9999, y: -9999 }), []);

  // Yumuşak radial gradient mask — keskin değil, fade-out
  const mask = `radial-gradient(circle ${RADIUS}px at ${photoMouse.x}px ${photoMouse.y}px, black 30%, transparent 100%)`;

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        background: "#fff",
        borderRadius: "20px",
        margin: "12px",
        overflow: "hidden",
        height: "calc(100vh - 24px)",
        minHeight: "600px",
        maxHeight: "960px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* NAV */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "18px 28px", flexShrink: 0,
        position: "relative", zIndex: 30, background: "#fff",
        flexWrap: "wrap", gap: "10px",
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "7px",
          padding: "7px 16px", borderRadius: "999px",
          border: "1px solid #e0e0e0", fontSize: "12px", fontWeight: 500, color: "#555",
        }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
          Available for New Project
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          {[["#hakkimda","Hakkımda"],["#projects","Çalışmalar"],["#services","Hizmetler"],["#experience","Deneyim"],["#contact","İletişim"]].map(([href,label]) => (
            <a key={href} href={href} style={{ fontSize: "13px", color: "#666", textDecoration: "none", fontWeight: 500 }}>{label}</a>
          ))}
        </div>
        <a href="https://wa.me/905535017666" target="_blank" rel="noreferrer" style={{
          display: "inline-flex", alignItems: "center", gap: "7px",
          padding: "10px 22px", borderRadius: "999px",
          background: "#111", color: "#fff", textDecoration: "none", fontSize: "13px", fontWeight: 600,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.549 4.103 1.508 5.837L.057 23.25a.75.75 0 0 0 .916.921l5.562-1.479A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.714 9.714 0 0 1-4.95-1.355l-.354-.212-3.664.973.986-3.587-.231-.371A9.712 9.712 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/></svg>
          İletişime Geç ↗
        </a>
      </nav>

      {/* MAIN */}
      <div style={{ flex: 1, position: "relative" }}>

        {/* ── İSİM ── tam genişlik, dikey merkez, z-index 5 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-52%)",
            left: "5%", right: "5%",
            zIndex: 5,
          }}
        >
          <FitText>
            <span style={{ color: "transparent", WebkitTextStroke: "2px #111" }}>İSMAİL</span>
            <span style={{ color: "#111" }}>GEÇGİLİ</span>
          </FitText>
        </motion.div>

        {/* ── FOTOĞRAF ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "94%",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          {/* Wrapper — img boyutunda, mouse burada izleniyor */}
          <div
            ref={photoRef}
            onMouseMove={onPhotoMove}
            onMouseLeave={onPhotoLeave}
            style={{ position: "relative", height: "100%", pointerEvents: "auto" }}
          >
            {/* Gri katman */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/photo2.png"
              alt="İsmail Geçgili"
              style={{ height: "100%", width: "auto", display: "block", filter: "grayscale(1)" }}
            />
            {/* Renkli katman — yumuşak mask, wrapper koordinatlarıyla */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/photo2.png"
              alt=""
              aria-hidden
              style={{
                position: "absolute",
                top: 0, left: 0,
                height: "100%", width: "100%",
                display: "block",
                WebkitMaskImage: mask,
                maskImage: mask,
              }}
            />
          </div>
        </motion.div>

        {/* ── ALT BİLGİ ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.0 }}
          style={{
            position: "absolute",
            bottom: 28, left: "5%", right: "5%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            zIndex: 20,
          }}
        >
          <div style={{ maxWidth: "260px" }}>
            <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "20px", color: "#111", marginBottom: "8px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              Tasarımcı & AI Üreticisi
            </p>
            <p style={{ fontSize: "13px", color: "#888", lineHeight: 1.75, marginBottom: "18px" }}>
              Grafik tasarım ve yapay zeka araçlarını<br />birleştirerek ticari değer yaratan<br />işler üretiyorum.
            </p>
            <a href="#contact" style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "11px 22px", borderRadius: "999px",
              background: "#111", color: "#fff", textDecoration: "none", fontSize: "13px", fontWeight: 600,
            }}>Birlikte Çalışalım ↗</a>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-end" }}>
            {socials.map(({ label, icon, href }) => (
              <a key={label} href={href} title={label} style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px",
                padding: "8px 14px", borderRadius: "999px", minWidth: "120px",
                border: "1px solid #e0e0e0", background: "rgba(255,255,255,0.92)",
                color: "#555", textDecoration: "none", fontSize: "12px", fontWeight: 500,
                transition: "all .2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = "#111"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#111"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.92)"; e.currentTarget.style.color = "#555"; e.currentTarget.style.borderColor = "#e0e0e0"; }}
              >
                {icon}
                {label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
