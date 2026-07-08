"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const experiences = [
  {
    company: "PRİVİLEGED COMPANY",
    role: "E-Ticaret Operasyonları Uzmanı & AI Content Creator",
    period: "2026 — Devam ediyor",
    desc: "Privileged Company bünyesinde faaliyet gösteren dört farklı e-ticaret markasının operasyon süreçlerini uçtan uca yönettim. Shopify altyapılı mağazaların yönetimi, ürün süreçleri, dijital pazarlama ve marka geliştirme çalışmalarının yanı sıra yapay zekâ destekli içerik üretim süreçlerini yönettim.",
  },
  {
    company: "KOTON EKSPORT",
    role: "Baskı Nakış Uzmanı",
    period: "2025 — Devam ediyor",
    desc: "İmalat ve Fason departmanı bünyesinde koleksiyon hazırlama sürecinin baskı-nakış aşamasında Ar-Ge çalışmaları yürütüyor; tasarım departmanına destek veriyor ve tüm ürün gruplarının baskı-nakış takibini yapıyorum.",
  },
  {
    company: "MARKALAB",
    role: "Baskı Nakış Uzmanı",
    period: "2023 — 2025",
    desc: "Sampling Room departmanında koleksiyon hazırlama sürecinin baskı-nakış Ar-Ge çalışmalarını yürüttüm; tasarım departmanına destek vererek ürün gruplarının baskı-nakış takibini yaptım.",
  },
  {
    company: "ACAR KIDS",
    role: "Tasarımcı",
    period: "2022 — 2023",
    desc: "Üretim departmanında tasarladığım desenlerin tasarım aşamasından numune ve üretime kadar hazırlama ve üretim takibi görevlerini üstlendim.",
  },
  {
    company: "MODATEKS",
    role: "Tasarımcı",
    period: "2016 — 2022",
    desc: "Üretim departmanında desenlerin baskı öncesi aşamasından (renk, metraj, kalıp, düzen vb.) ürünün final haline kadarki süreçleri takip edip gerekli onayları verdim.",
  },
  {
    company: "USS DİJİTAL",
    role: "Grafik Tasarım — Desinatör",
    period: "2014 — 2015",
    desc: "Desen tasarımcılığının yanı sıra markaların grafik tasarım istek ve ihtiyaçlarına yönelik çalışmalar gerçekleştirdim.",
  },
];

const skills = ["Adobe Photoshop", "Adobe Illustrator", "Figma", "Corel Draw", "Texprint", "Microsoft Office"];
const aiTools = ["Midjourney", "Kling", "Claude", "Seedream", "Sora", "Nano Banana Pro"];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="experience" ref={ref} style={{
      background: "#1a1a1a", borderRadius: "20px",
      margin: "8px 12px", padding: "52px 40px",
      position: "relative", overflow: "hidden",
    }}>
      <span className="watermark watermark-dark" style={{ top: -8, right: -8, zIndex: 0 }}>DENEYİM</span>

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Başlık */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "40px", flexWrap: "wrap", gap: "12px" }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(1.5rem, 4vw, 2.5rem)", color: "#fff", letterSpacing: "-0.02em" }}
          >
            <span style={{ color: "rgba(255,255,255,0.25)", marginRight: "3px" }}>/</span>DENEYİM
          </motion.h2>
          <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)" }}>10+ yıl deneyim</span>
        </div>

        {/* İş deneyimi */}
        {experiences.map((e, i) => (
          <motion.div
            key={e.company}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.07 }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              padding: "20px 0",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              transition: "opacity .2s",
              opacity: hovered !== null && hovered !== i ? 0.3 : 1,
              cursor: "default",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "16px", marginBottom: hovered === i ? "10px" : 0, flexWrap: "wrap" }}>
              <div>
                <p style={{ fontWeight: 700, fontSize: "15px", color: "#fff", marginBottom: "3px" }}>{e.company}</p>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)" }}>{e.role}</p>
              </div>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", whiteSpace: "nowrap", paddingTop: "2px" }}>{e.period}</span>
            </div>
            {hovered === i && (
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginTop: "8px", maxWidth: "600px" }}>{e.desc}</p>
            )}
          </motion.div>
        ))}

        {/* Beceriler + AI Araçları */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          style={{ marginTop: "44px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}
        >
          <div>
            <p style={{ fontSize: "11px", letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", marginBottom: "14px", fontWeight: 600 }}>YAZILIM & ARAÇLAR</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {skills.map(s => (
                <span key={s} style={{ padding: "6px 14px", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.1)", fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>{s}</span>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontSize: "11px", letterSpacing: "0.1em", color: "rgba(255,255,255,0.3)", marginBottom: "14px", fontWeight: 600 }}>AI ARAÇLARI</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {aiTools.map(s => (
                <span key={s} style={{ padding: "6px 14px", borderRadius: "999px", border: "1px solid rgba(255,255,255,0.1)", fontSize: "12px", color: "rgba(255,255,255,0.6)" }}>{s}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
