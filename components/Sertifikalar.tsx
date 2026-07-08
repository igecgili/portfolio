"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const sertifikalar = [
  {
    id: 1,
    image: "https://res.cloudinary.com/dqilpsjcc/image/upload/v1783546220/mkw2p64rqefeayzwuyk8.jpg",
    title: "Figma Eğitimi: Temelden İleri Seviyeye",
    subtitle: "UserGets • Mart 2025",
  },
  {
    id: 2,
    image: "https://res.cloudinary.com/dqilpsjcc/image/upload/v1783546057/ysc2fkak0wb6sf22wu43.jpg",
    title: "Generative AI Specialist",
    subtitle: "Global Cert / IATELS • Aralık 2025",
  },
];

function ImageModal({ src, title, onClose }: { src: string; title: string; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)",
        zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px",
      }}
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        style={{
          background: "#111", borderRadius: "20px", overflow: "hidden",
          maxWidth: "900px", width: "100%", maxHeight: "90vh",
          display: "flex", flexDirection: "column",
        }}
      >
        <div style={{ padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #222" }}>
          <p style={{ fontWeight: 700, fontSize: "15px", color: "#fff" }}>{title}</p>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#888", fontSize: "22px", cursor: "pointer", lineHeight: 1 }}>✕</button>
        </div>
        <div style={{ flex: 1, overflow: "hidden", background: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={title} style={{ maxWidth: "100%", maxHeight: "75vh", objectFit: "contain" }} />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Sertifikalar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [selected, setSelected] = useState<{ src: string; title: string } | null>(null);

  return (
    <section id="sertifikalar" ref={ref} style={{
      background: "#ffffff", borderRadius: "20px",
      margin: "8px 12px", padding: "52px 40px",
      position: "relative", overflow: "hidden",
    }}>
      <span className="watermark" style={{ top: -10, left: -10, zIndex: 0 }}>SERTİFİKA</span>

      <div style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: "36px" }}
        >
          <h2 className="section-label">SERTİFİKALAR</h2>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "24px",
        }}>
          {sertifikalar.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(0,0,0,0.08)" }}
              onClick={() => setSelected({ src: s.image, title: s.title })}
              style={{ borderRadius: "16px", overflow: "hidden", border: "1px solid #ebebeb", cursor: "pointer" }}
            >
              <div className="project-card-img" style={{
                height: "220px", background: `url(${s.image}) center/cover`,
                position: "relative",
              }}>
                <div className="project-card-overlay" style={{
                  position: "absolute", bottom: "12px", right: "12px",
                  opacity: 0, transition: "opacity 0.25s ease",
                }}>
                  <div style={{
                    padding: "6px 14px", borderRadius: "999px",
                    background: "#fff", color: "#111",
                    fontSize: "11px", fontWeight: 700,
                  }}>Görüntüle ↗</div>
                </div>
              </div>

              <div style={{ padding: "20px 24px", background: "#fff" }}>
                <p style={{ fontWeight: 700, fontSize: "15px", color: "#111", marginBottom: "6px", lineHeight: 1.3 }}>
                  {s.title}
                </p>
                <p style={{ fontSize: "13px", color: "#888", lineHeight: 1.5 }}>
                  {s.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <ImageModal src={selected.src} title={selected.title} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
