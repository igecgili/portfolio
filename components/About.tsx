"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const services = [
  {
    title: "DESEN & GRAFİK TASARIM",
    desc: "Desen tasarımından grafik tasarıma, kurumsal kimlik çalışmalarından dijital tasarımlara uzanan geniş bir alanda; estetik, işlev ve ticari beklentileri buluşturan işler üretiyorum.",
  },
  {
    title: "BASKI NAKIŞ UZMANLIĞI",
    desc: "Dijital baskı, emprime baskı, transfer baskı, nakış ve süzene metotlarında renk aşamasından ürünün final haline kadar gerekli proseslerde teknik bilgi ve deneyim sahibiyim.",
  },
  {
    title: "AI GÖRSEL & VİDEO ÜRETİMİ",
    desc: "Midjourney, Kling, Claude, Seedream ve Sora gibi araçlarla ürünün formunu, dokusunu ve kullanım hissini doğru şekilde aktaran, ticari sunuma hazır görseller tasarlıyorum.",
  },
  {
    title: "KURUMSAL KİMLİK",
    desc: "Markanın karakterini doğru yansıtan, uzun vadede sürdürülebilir görsel sistemler kuruyorum. Logo, renk sistemi, tipografi ve tüm temas noktalarında tutarlı bir görsel dil.",
  },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="services" ref={ref} style={{
      background: "#ffffff", borderRadius: "20px",
      margin: "8px 12px", padding: "52px 40px",
      position: "relative", overflow: "hidden",
    }}>

      {/* Başlık */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        style={{ marginBottom: "36px" }}
      >
        <h2 className="section-label">UZMANLIKLARIM</h2>
      </motion.div>

      {/* Accordion */}
      <div style={{ borderTop: "1px solid #ebebeb" }}>
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
          >
            {/* Başlık satırı */}
            <div
              onClick={() => setOpen(open === i ? null : i)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "24px 0", cursor: "pointer",
                borderBottom: open === i ? "none" : "1px solid #ebebeb",
                transition: "opacity .15s",
              }}
              onMouseEnter={e => { if (open !== i) e.currentTarget.style.opacity = "0.5"; }}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              <h3 style={{
                fontFamily: "Inter, system-ui, sans-serif", fontWeight: 700,
                fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
                color: "#111", letterSpacing: "0.02em", margin: 0,
              }}>
                {s.title}
              </h3>
              <span style={{
                width: 32, height: 32, borderRadius: "50%",
                border: "1.5px solid #e0e0e0",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, transition: "transform .25s, background .2s, border-color .2s",
                transform: open === i ? "rotate(180deg)" : "rotate(0deg)",
                background: open === i ? "#111" : "transparent",
                borderColor: open === i ? "#111" : "#e0e0e0",
                color: open === i ? "#fff" : "#888",
                fontSize: 13,
              }}>▾</span>
            </div>

            {/* Açılır içerik — animasyonlu */}
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <div style={{
                    background: "#111", borderRadius: "16px",
                    padding: "28px 32px", marginBottom: "4px",
                    borderBottom: "1px solid #ebebeb",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                  }}>
                    <p style={{
                      fontSize: "14px", color: "rgba(255,255,255,0.75)",
                      lineHeight: 1.85, maxWidth: "520px", margin: 0,
                    }}>
                      {s.desc}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
