"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const socials = [
  { label: "E-posta", href: "mailto:igecgili@gmail.com" },
  { label: "WhatsApp", href: "https://wa.me/905535017666" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ismailgecgili/" },
  { label: "Behance", href: "https://www.behance.net/ismailgecgili" },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" ref={ref} style={{
      background: "#f8f8f8", borderRadius: "20px",
      margin: "8px 12px 12px", padding: "72px 40px 52px",
      textAlign: "center", position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Başlık */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: "clamp(2rem, 6vw, 5rem)",
            letterSpacing: "-0.04em", lineHeight: 1.0,
            color: "#111", marginBottom: "16px",
          }}
        >
          İLETİŞİM
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          style={{ fontSize: "14px", color: "#888", lineHeight: 1.8, maxWidth: "420px", margin: "0 auto 36px" }}
        >
          Aşağıdaki kanallardan bana ulaşabilirsiniz. En hızlı yanıtı e-posta veya WhatsApp üzerinden alabilirsiniz.
        </motion.p>

        {/* Sosyal pill'ler */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "44px" }}
        >
          {socials.map(s => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" style={{
              display: "inline-flex", alignItems: "center",
              padding: "8px 18px", borderRadius: "999px",
              border: "1px solid #e0e0e0", background: "#fff",
              fontSize: "13px", color: "#555", textDecoration: "none",
              transition: "all .2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "#111"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#111"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#555"; e.currentTarget.style.borderColor = "#e0e0e0"; }}
            >
              {s.label}
            </a>
          ))}
        </motion.div>

        <div style={{ borderTop: "1px solid #ebebeb", paddingTop: "24px" }}>
          <p style={{ fontSize: "12px", color: "#bbb" }}>İsmail Geçgili — Tüm hakları saklıdır.</p>
        </div>
      </div>
    </section>
  );
}
