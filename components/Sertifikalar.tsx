"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const sertifikalar = [
  {
    id: 1,
    image: "", // Cloudinary URL buraya
    title: "Sertifika Başlığı",
    subtitle: "Kurum Adı • 2024",
  },
  {
    id: 2,
    image: "", // Cloudinary URL buraya
    title: "Sertifika Başlığı",
    subtitle: "Kurum Adı • 2024",
  },
];

export default function Sertifikalar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

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
              style={{ borderRadius: "16px", overflow: "hidden", border: "1px solid #ebebeb" }}
            >
              {/* Görsel */}
              <div style={{
                height: "220px", background: s.image ? `url(${s.image}) center/cover` : "#f5f5f5",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {!s.image && (
                  <span style={{ fontSize: "13px", color: "#bbb" }}>Görsel yükleniyor...</span>
                )}
              </div>

              {/* Metin */}
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
    </section>
  );
}
