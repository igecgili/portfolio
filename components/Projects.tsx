"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Project, defaultProjects } from "@/lib/projects";

const STORAGE_KEY = "ig_projects";
const filters = ["Tümü", "Gerçek Proje", "Keşif"];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState("Tümü");
  const [projects, setProjects] = useState<Project[]>(defaultProjects);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setProjects(JSON.parse(stored));
  }, []);

  const filtered = active === "Tümü" ? projects : projects.filter(p => p.type === active);

  return (
    <section id="projects" ref={ref} style={{
      background: "#ffffff", borderRadius: "20px",
      margin: "8px 12px", padding: "52px 40px",
      position: "relative", overflow: "hidden",
    }}>
      <span className="watermark" style={{ top: -10, left: -10, zIndex: 0 }}>PORTFÖLİO</span>

      <div style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: "32px" }}
        >
          <h2 className="section-label" style={{ marginBottom: "24px" }}>SEÇİLMİŞ ÇALIŞMALAR</h2>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
            <div style={{ display: "flex", gap: "8px" }}>
              {filters.map(f => (
                <button key={f} onClick={() => setActive(f)} style={{
                  padding: "7px 16px", borderRadius: "999px", fontSize: "13px", fontWeight: 500,
                  border: "1px solid #e0e0e0", cursor: "pointer", fontFamily: "inherit",
                  background: active === f ? "#111" : "transparent",
                  color: active === f ? "#fff" : "#666",
                  transition: "all .2s",
                }}>
                  {f}
                </button>
              ))}
            </div>
            <a href="/admin" style={{ fontSize: "13px", color: "#888", textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}>
              Projeleri Yönet ↗
            </a>
          </div>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
          {filtered.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(0,0,0,0.08)" }}
              style={{ borderRadius: "16px", overflow: "hidden", border: "1px solid #ebebeb", cursor: "pointer" }}
              onClick={() => p.link && window.open(p.link, "_blank")}
            >
              {/* Görsel */}
              <div style={{
                height: "200px",
                background: p.imageUrl ? `url(${p.imageUrl}) center/cover` : `linear-gradient(135deg, ${p.color} 0%, #222 100%)`,
                position: "relative", display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {!p.imageUrl && (
                  <div style={{
                    width: "65%", height: "65%", background: "rgba(255,255,255,0.05)",
                    borderRadius: "10px", border: "1px solid rgba(255,255,255,0.1)",
                    padding: "12px", display: "flex", flexDirection: "column", gap: "8px",
                  }}>
                    <div style={{ width: "40%", height: "5px", borderRadius: "3px", background: p.accent, opacity: 0.8 }} />
                    <div style={{ width: "70%", height: "4px", borderRadius: "2px", background: "rgba(255,255,255,0.15)" }} />
                    <div style={{ width: "55%", height: "4px", borderRadius: "2px", background: "rgba(255,255,255,0.1)" }} />
                    <div style={{ flex: 1, background: "rgba(255,255,255,0.04)", borderRadius: "6px", marginTop: "4px" }} />
                  </div>
                )}
                {p.type === "Gerçek Proje" && (
                  <div style={{
                    position: "absolute", top: "12px", left: "12px",
                    background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)",
                    borderRadius: "6px", padding: "4px 10px",
                    fontSize: "10px", color: "rgba(255,255,255,0.8)", letterSpacing: "0.05em", fontWeight: 600,
                  }}>
                    GERÇEK PROJE
                  </div>
                )}
                <div style={{
                  position: "absolute", bottom: "12px", right: "12px",
                  width: "30px", height: "30px", borderRadius: "50%",
                  background: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px",
                }}>↗</div>
              </div>

              {/* Bilgi */}
              <div style={{ padding: "16px 20px", background: "#fff" }}>
                <p style={{ fontWeight: 600, fontSize: "15px", color: "#111", marginBottom: "6px", lineHeight: 1.3 }}>
                  {p.title}
                </p>
                {p.description && (
                  <p style={{ fontSize: "12px", color: "#888", lineHeight: 1.6, marginBottom: "10px" }}>{p.description}</p>
                )}
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {p.tags.map(t => (
                    <span key={t} style={{
                      fontSize: "11px", padding: "4px 10px",
                      borderRadius: "4px", border: "1px solid #eee",
                      color: "#777", background: "#fafafa",
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
