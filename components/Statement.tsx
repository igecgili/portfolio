"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Statement() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} style={{
      background: "#f8f8f8", borderRadius: "20px",
      margin: "8px 12px", padding: "80px 40px",
      textAlign: "center", position: "relative", overflow: "hidden",
    }}>
      {/* Watermark */}
      <span style={{
        position: "absolute", fontFamily: "'Syne'", fontWeight: 800,
        fontSize: "clamp(5rem, 14vw, 12rem)", color: "transparent",
        WebkitTextStroke: "1px rgba(0,0,0,0.05)",
        top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        whiteSpace: "nowrap", pointerEvents: "none", userSelect: "none",
      }}>TASARIM</span>

      <div style={{ position: "relative", zIndex: 1 }}>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ fontSize: "12px", letterSpacing: "0.12em", color: "#aaa", fontWeight: 600, marginBottom: "24px" }}
        >
          / FELSEFE
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1 }}
          style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: "clamp(2.8rem, 7vw, 6rem)",
            letterSpacing: "-0.04em", lineHeight: 1.0,
            color: "#111", marginBottom: "28px",
          }}
        >
          Tasarım &<br />Yapay Zeka.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
          style={{ fontSize: "15px", color: "#888", lineHeight: 1.85, maxWidth: "520px", margin: "0 auto 36px" }}
        >
          Tasarımı yalnızca görsel üretim olarak değil, marka, ürün ve fikirler
          arasında anlamlı bir bağ kurma süreci olarak ele alıyorum. Yapay zekayı
          bu sürecin vazgeçilmez bir parçası olarak kullanıyorum.
        </motion.p>

        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "12px 24px", borderRadius: "999px",
            border: "1.5px solid #e0e0e0", background: "#fff",
            fontSize: "13px", fontWeight: 600, color: "#111",
            textDecoration: "none", transition: "all .2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "#111"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#111"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#111"; e.currentTarget.style.borderColor = "#e0e0e0"; }}
        >
          Birlikte Çalışalım ↗
        </motion.a>
      </div>
    </section>
  );
}
