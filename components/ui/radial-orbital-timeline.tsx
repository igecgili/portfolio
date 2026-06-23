"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.FC<{ style?: React.CSSProperties }>;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

const BASE_RADIUS = 160;
const TOP_ANGLE = 270; // 12 o'clock in standard math coords

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

export default function RadialOrbitalTimeline({ timelineData }: RadialOrbitalTimelineProps) {
  const [mounted, setMounted] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const RADIUS = isMobile ? 110 : BASE_RADIUS;
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseIds, setPulseIds] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(rotationAngle);
  const rafRef = useRef<number | null>(null);
  const autoRef = useRef(autoRotate);

  // keep refs in sync
  rotationRef.current = rotationAngle;
  autoRef.current = autoRotate;

  // Auto-rotate
  useEffect(() => {
    let last = performance.now();
    let id: number;
    const tick = (now: number) => {
      if (autoRef.current) {
        const dt = now - last;
        setRotationAngle((prev) => (prev + 0.018 * dt) % 360);
      }
      last = now;
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  const smoothRotateTo = useCallback((targetAngle: number, duration = 900) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const start = rotationRef.current;
    // shortest path
    let diff = ((targetAngle - start) % 360 + 540) % 360 - 180;
    const startTime = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = easeInOut(progress);
      setRotationAngle(start + diff * eased);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  const getTargetRotation = useCallback((index: number) => {
    const total = timelineData.length;
    return TOP_ANGLE - (index / total) * 360;
  }, [timelineData.length]);

  const toggleItem = useCallback((id: number, index: number) => {
    if (expandedId === id) {
      setExpandedId(null);
      setAutoRotate(true);
      setPulseIds(new Set());
    } else {
      setExpandedId(id);
      setAutoRotate(false);
      setPulseIds(new Set(timelineData.find(i => i.id === id)?.relatedIds ?? []));
      smoothRotateTo(getTargetRotation(index));
    }
  }, [expandedId, timelineData, smoothRotateTo, getTargetRotation]);

  const handleBgClick = (e: React.MouseEvent) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedId(null);
      setAutoRotate(true);
      setPulseIds(new Set());
    }
  };

  const calculatePosition = (index: number) => {
    const angle = ((index / timelineData.length) * 360 + rotationAngle) % 360;
    const radian = (angle * Math.PI) / 180;
    const x = RADIUS * Math.cos(radian);
    const y = RADIUS * Math.sin(radian);
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(0.35, Math.min(1, 0.35 + 0.65 * ((1 - Math.sin(radian)) / 2)));
    return { x, y, zIndex, opacity };
  };

  const getStatusLabel = (s: TimelineItem["status"]) =>
    s === "completed" ? "UZMAN" : s === "in-progress" ? "AKTİF" : "ÖĞRENİYOR";

  const getStatusClass = (s: TimelineItem["status"]) =>
    s === "completed"
      ? "text-black bg-white border-white"
      : s === "in-progress"
      ? "text-black bg-white border-white"
      : "text-white/60 bg-transparent border-white/25";

  if (!mounted) return <div style={{ height: isMobile ? "300px" : "420px" }} />;

  return (
    <div
      ref={containerRef}
      onClick={handleBgClick}
      className="w-full flex items-center justify-center overflow-hidden"
      style={{ height: isMobile ? "300px" : "420px", borderRadius: "16px", background: "transparent" }}
    >
      <div className="relative w-full max-w-2xl h-full flex items-center justify-center">
        <div
          ref={orbitRef}
          className="absolute w-full h-full flex items-center justify-center"
          style={{ perspective: "1000px" }}
        >
          {/* Merkez */}
          <div
            className="absolute w-12 h-12 rounded-full flex items-center justify-center z-10"
            style={{ background: "linear-gradient(135deg, #6366f1, #3b82f6, #14b8a6)" }}
          >
            <div className="absolute w-16 h-16 rounded-full border border-white/20 animate-ping opacity-70" />
            <div className="absolute w-20 h-20 rounded-full border border-white/10 animate-ping opacity-50"
              style={{ animationDelay: "0.5s" }} />
            <div className="w-6 h-6 rounded-full bg-white/80" />
          </div>

          {/* Orbit halkası */}
          <div
            className="absolute rounded-full border border-black/10 pointer-events-none"
            style={{ width: RADIUS * 2, height: RADIUS * 2 }}
          />

          {timelineData.map((item, index) => {
            const pos = calculatePosition(index);
            const isExpanded = expandedId === item.id;
            const isRelated = !isExpanded && expandedId !== null &&
              (timelineData.find(i => i.id === expandedId)?.relatedIds ?? []).includes(item.id);
            const isPulsing = pulseIds.has(item.id);
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="absolute cursor-pointer"
                style={{
                  transform: `translate(${pos.x}px, ${pos.y}px)`,
                  zIndex: isExpanded ? 200 : pos.zIndex,
                  opacity: isExpanded ? 1 : pos.opacity,
                  transition: "opacity 0.3s",
                }}
                onClick={(e) => { e.stopPropagation(); toggleItem(item.id, index); }}
              >
                {/* Halo */}
                <div
                  className={`absolute rounded-full ${isPulsing ? "animate-pulse" : ""}`}
                  style={{
                    background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)",
                    width: item.energy * 0.3 + 36,
                    height: item.energy * 0.3 + 36,
                    left: -(item.energy * 0.3 + 36 - 40) / 2,
                    top: -(item.energy * 0.3 + 36 - 40) / 2,
                  }}
                />

                {/* Node */}
                <div
                  className={[
                    "rounded-full flex items-center justify-center border-2 transition-all duration-300",
                    isMobile ? "w-8 h-8" : "w-10 h-10",
                    isExpanded
                      ? "bg-black text-white border-black scale-150 shadow-lg shadow-black/20"
                      : isRelated
                      ? "bg-black/20 text-black border-black animate-pulse"
                      : "bg-white text-black border-black/20 shadow-sm",
                  ].join(" ")}
                >
                  <Icon style={{ width: isMobile ? 11 : 14, height: isMobile ? 11 : 14 }} />
                </div>

                {/* Etiket */}
                <div
                  className={`absolute whitespace-nowrap font-semibold tracking-wider transition-all duration-300 ${
                    isExpanded ? "text-black" : "text-black/60"
                  }`}
                  style={{ fontSize: isMobile ? "9px" : "12px", top: isMobile ? 36 : 46, left: "50%", transform: "translateX(-50%)" }}
                >
                  {item.title}
                </div>

                {/* Açılan kart */}
                {isExpanded && (
                  <div
                    className="absolute overflow-visible"
                    style={{
                      top: 70,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: isMobile ? "170px" : "220px",
                      zIndex: 999,
                      background: "#0f0f0f",
                      borderRadius: "14px",
                      border: "1px solid rgba(255,255,255,0.12)",
                      boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
                      padding: "14px 16px 12px",
                    }}
                  >
                    {/* Bağlantı çizgisi */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-white/30" />

                    {/* Üst satır */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                      <span
                        className={`inline-flex items-center rounded-md text-xs font-semibold border ${getStatusClass(item.status)}`}
                        style={{ padding: "3px 8px", letterSpacing: "0.06em", fontSize: "10px" }}
                      >
                        {getStatusLabel(item.status)}
                      </span>
                      <span style={{ fontSize: "10px", fontFamily: "monospace", color: "rgba(255,255,255,0.4)" }}>
                        {item.date}
                      </span>
                    </div>

                    {/* Başlık */}
                    <p style={{ fontSize: "13px", fontWeight: 700, color: "#fff", marginBottom: "6px", lineHeight: 1.3 }}>
                      {item.title}
                    </p>

                    {/* Açıklama */}
                    <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.65)", lineHeight: 1.6, marginBottom: "10px" }}>
                      {item.content}
                    </p>

                    {/* Yeterlilik */}
                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "10px", marginBottom: "10px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "10px", color: "rgba(255,255,255,0.45)" }}>
                          <Zap size={10} /> Yeterlilik
                        </span>
                        <span style={{ fontSize: "10px", fontFamily: "monospace", color: "rgba(255,255,255,0.45)" }}>
                          {item.energy}%
                        </span>
                      </div>
                      <div style={{ width: "100%", height: "4px", background: "rgba(255,255,255,0.08)", borderRadius: "99px", overflow: "hidden" }}>
                        <div style={{
                          width: `${item.energy}%`, height: "100%", borderRadius: "99px",
                          background: "linear-gradient(to right, #6366f1, #14b8a6)",
                        }} />
                      </div>
                    </div>

                    {/* İlgili araçlar — sadece desktop */}
                    {item.relatedIds.length > 0 && !isMobile && (
                      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "14px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "10px" }}>
                          <Link size={11} color="rgba(255,255,255,0.35)" />
                          <span style={{ fontSize: "11px", letterSpacing: "0.1em", color: "rgba(255,255,255,0.35)", fontWeight: 600 }}>
                            İLGİLİ ARAÇLAR
                          </span>
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                          {item.relatedIds.map((relId) => {
                            const rel = timelineData.find((i) => i.id === relId);
                            const relIdx = timelineData.findIndex((i) => i.id === relId);
                            return (
                              <button
                                key={relId}
                                onClick={(e) => { e.stopPropagation(); toggleItem(relId, relIdx); }}
                                style={{
                                  display: "inline-flex", alignItems: "center", gap: "4px",
                                  padding: "5px 10px", borderRadius: "6px",
                                  border: "1px solid rgba(255,255,255,0.15)",
                                  background: "transparent", color: "rgba(255,255,255,0.6)",
                                  fontSize: "12px", cursor: "pointer",
                                  transition: "all 0.15s",
                                }}
                                onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "#fff"; }}
                                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
                              >
                                {rel?.title} <ArrowRight size={10} />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
