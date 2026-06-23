"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Pen, Layers, Bot, Cpu, Scissors, Monitor,
  Sparkles, Video, Image, Wand2, Film, Zap,
} from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const stats = [
  { value: "10+", label: "Yıl Deneyim" },
  { value: "5", label: "Şirket" },
  { value: "2", label: "Sertifika" },
];

const skillsData = [
  {
    id: 1, title: "Photoshop", date: "2014+",
    content: "Görsel düzenleme, retouching, desen hazırlama ve baskı öncesi teknik işlemler.",
    category: "Tasarım", icon: Pen, relatedIds: [2, 3], status: "completed" as const, energy: 95,
  },
  {
    id: 2, title: "Illustrator", date: "2014+",
    content: "Vektör çizim, logo tasarımı, kurumsal kimlik ve desen üretimi.",
    category: "Tasarım", icon: Layers, relatedIds: [1, 4], status: "completed" as const, energy: 90,
  },
  {
    id: 3, title: "Figma", date: "2020+",
    content: "UI/UX tasarım, prototipleme ve dijital ürün geliştirme.",
    category: "Tasarım", icon: Monitor, relatedIds: [1, 2], status: "completed" as const, energy: 80,
  },
  {
    id: 4, title: "Corel Draw", date: "2014+",
    content: "Vektör tasarım, baskı hazırlık ve grafik üretim.",
    category: "Tasarım", icon: Scissors, relatedIds: [2], status: "completed" as const, energy: 85,
  },
  {
    id: 5, title: "Midjourney", date: "2023+",
    content: "AI ile ticari sunuma hazır ürün görseli ve kavram tasarımı üretimi.",
    category: "AI", icon: Sparkles, relatedIds: [6, 7], status: "completed" as const, energy: 92,
  },
  {
    id: 6, title: "Kling / Sora", date: "2024+",
    content: "AI video üretimi, ürün animasyonu ve sunum filmi oluşturma.",
    category: "AI", icon: Film, relatedIds: [5, 8], status: "in-progress" as const, energy: 75,
  },
  {
    id: 7, title: "Seedream", date: "2024+",
    content: "Tekstil deseni ve ürün görselleştirme için AI görüntü üretimi.",
    category: "AI", icon: Image, relatedIds: [5], status: "in-progress" as const, energy: 78,
  },
  {
    id: 8, title: "Claude", date: "2024+",
    content: "Strateji, içerik ve tasarım kararlarında yapay zeka destekli düşünce ortağı.",
    category: "AI", icon: Zap, relatedIds: [5, 9], status: "completed" as const, energy: 95,
  },
  {
    id: 9, title: "Nano Banana", date: "2024+",
    content: "AI destekli profesyonel ürün görselleştirme ve sunum.",
    category: "AI", icon: Wand2, relatedIds: [5, 8], status: "in-progress" as const, energy: 72,
  },
  {
    id: 10, title: "Texprint", date: "2016+",
    content: "Dijital baskı takip ve renk yönetim yazılımı.",
    category: "Tekstil", icon: Cpu, relatedIds: [1], status: "completed" as const, energy: 88,
  },
];

export default function Hakkimda() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="hakkimda"
      ref={ref}
      className="hakkimda-section"
      style={{
        background: "#fff",
        borderRadius: "20px",
        margin: "8px 12px",
        padding: "64px 40px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "60px",
          alignItems: "start",
        }}
        className="hakkimda-grid"
      >
        {/* Sol — metin */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{ fontSize: "12px", letterSpacing: "0.12em", color: "#aaa", fontWeight: 600, marginBottom: "24px" }}
          >
            / HAKKIMDA
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 800,
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              letterSpacing: "-0.03em", lineHeight: 1.1,
              color: "#111", marginBottom: "28px",
            }}
          >
            Tasarım &<br />Yapay Zeka.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            style={{ fontSize: "15px", color: "#555", lineHeight: 1.9, marginBottom: "20px" }}
          >
            Tasarımı yalnızca görsel üretim olarak değil, marka, ürün ve fikirler arasında
            anlamlı bir bağ kurma süreci olarak ele alan bir tasarımcıyım. Desen tasarımından
            grafik tasarıma, kurumsal kimlik çalışmalarından dijital tasarımlara kadar uzanan
            geniş bir alanda; estetik, işlev ve ticari beklentileri aynı potada buluşturan
            işler üretiyorum.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.35 }}
            style={{ fontSize: "15px", color: "#555", lineHeight: 1.9, marginBottom: "36px" }}
          >
            Yapay zeka destekli üretim süreçlerini, tasarımın önüne geçen bir araç olarak değil;
            gerçekçilik, hız ve sunum kalitesini artıran profesyonel bir destek olarak
            kullanıyorum. Teknoloji geliştikçe çalışma yöntemlerimi güncelliyor, yeni araçları
            tasarım sürecime etkin şekilde entegre ediyorum.
          </motion.p>

          {/* İstatistikler */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.45 }}
            style={{ display: "flex", gap: "32px" }}
          >
            {stats.map((s) => (
              <div key={s.label}>
                <p style={{
                  fontFamily: "'Syne', sans-serif", fontWeight: 800,
                  fontSize: "2rem", color: "#111", letterSpacing: "-0.04em", marginBottom: "4px",
                }}>{s.value}</p>
                <p style={{ fontSize: "12px", color: "#aaa", fontWeight: 500 }}>{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Sağ — orbital beceriler (sadece desktop) */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ borderRadius: "16px" }}
          className="hakkimda-orbital-desktop"
        >
          <div style={{
            fontSize: "11px", letterSpacing: "0.12em",
            color: "#aaa", fontWeight: 600,
            paddingLeft: "2px", marginBottom: "12px",
          }}>
            BECERİLER & AI ARAÇLARI — <span style={{ color: "#bbb", fontWeight: 400 }}>Üzerine tıkla</span>
          </div>
          <RadialOrbitalTimeline timelineData={skillsData} />
        </motion.div>
      </div>

      {/* Mobil — orbital beceriler tam genişlik */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="hakkimda-orbital-mobile"
      >
        <div style={{
          fontSize: "11px", letterSpacing: "0.12em",
          color: "#aaa", fontWeight: 600,
          paddingLeft: "2px", marginBottom: "12px",
        }}>
          BECERİLER & AI ARAÇLARI — <span style={{ color: "#bbb", fontWeight: 400 }}>Üzerine tıkla</span>
        </div>
        <RadialOrbitalTimeline timelineData={skillsData} />
      </motion.div>
    </section>
  );
}
