"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Project, defaultProjects, MediaItem } from "@/lib/projects";

const STORAGE_KEY = "ig_projects";
const filters = ["Tümü", "Gerçek Proje", "Konsept"];

function MediaModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [idx, setIdx] = useState(0);
  const items: MediaItem[] = project.media ?? [];
  const current = items[idx];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIdx(i => Math.min(i + 1, items.length - 1));
      if (e.key === "ArrowLeft") setIdx(i => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [items.length, onClose]);

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
        {/* Başlık */}
        <div style={{ padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #222" }}>
          <div>
            <p style={{ fontWeight: 700, fontSize: "16px", color: "#fff", marginBottom: "2px" }}>{project.title}</p>
            <p style={{ fontSize: "12px", color: "#666" }}>{items.length > 0 ? `${idx + 1} / ${items.length}` : ""}</p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#888", fontSize: "22px", cursor: "pointer", lineHeight: 1 }}>✕</button>
        </div>

        {/* Medya */}
        <div style={{ flex: 1, overflow: "hidden", background: "#000", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "400px" }}>
          {!current && (
            <p style={{ color: "#555", fontSize: "14px" }}>Bu projede medya yok.</p>
          )}
          {current?.type === "image" && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={current.url} alt={current.name} style={{ maxWidth: "100%", maxHeight: "60vh", objectFit: "contain" }} />
          )}
          {current?.type === "video" && (
            <video src={current.url} controls autoPlay style={{ maxWidth: "100%", maxHeight: "60vh" }} />
          )}
        </div>

        {/* Gezinme + bilgi */}
        <div style={{ padding: "16px 24px", borderTop: "1px solid #222", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.6, maxWidth: "60%" }}>{project.description}</p>
          {items.length > 1 && (
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => setIdx(i => Math.max(i - 1, 0))} disabled={idx === 0}
                style={{ padding: "8px 16px", borderRadius: "8px", border: "1px solid #333", background: "none", color: idx === 0 ? "#444" : "#fff", cursor: idx === 0 ? "default" : "pointer" }}>←</button>
              <button onClick={() => setIdx(i => Math.min(i + 1, items.length - 1))} disabled={idx === items.length - 1}
                style={{ padding: "8px 16px", borderRadius: "8px", border: "1px solid #333", background: "none", color: idx === items.length - 1 ? "#444" : "#fff", cursor: idx === items.length - 1 ? "default" : "pointer" }}>→</button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState("Tümü");
  const [projects, setProjects] = useState<Project[]>(defaultProjects);
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setProjects(JSON.parse(stored));
  }, []);

  const filtered = active === "Tümü" ? projects : projects.filter(p => p.type === active);

  const getThumb = (p: Project) => {
    if (p.imageUrl) return { type: "image" as const, url: p.imageUrl };
    const first = p.media?.[0];
    if (first) return { type: first.type, url: first.url };
    return null;
  };

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
          {filtered.map((p, i) => {
            const thumb = getThumb(p);
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(0,0,0,0.08)" }}
                style={{ borderRadius: "16px", overflow: "hidden", border: "1px solid #ebebeb", cursor: "pointer" }}
                onClick={() => setSelected(p)}
              >
                {/* Görsel */}
                <div style={{
                  height: "200px",
                  background: thumb?.type === "image" ? `url(${thumb.url}) center/cover` : `linear-gradient(135deg, ${p.color} 0%, #222 100%)`,
                  position: "relative", display: "flex", alignItems: "center", justifyContent: "center",
                  overflow: "hidden",
                }}>
                  {thumb?.type === "video" && (
                    <video
                      src={thumb.url}
                      muted
                      loop
                      playsInline
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                      onMouseEnter={e => (e.currentTarget as HTMLVideoElement).play()}
                      onMouseLeave={e => { (e.currentTarget as HTMLVideoElement).pause(); (e.currentTarget as HTMLVideoElement).currentTime = 0; }}
                    />
                  )}
                  {!thumb && (
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
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selected && <MediaModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
