"use client";

import { useState, useEffect, useRef } from "react";
import { Project, ProjectType, MediaItem, defaultProjects } from "@/lib/projects";

const STORAGE_KEY = "ig_projects";
const SESSION_KEY = "ig_admin_auth";
const ADMIN_USER = "ismail";
const ADMIN_PASS = "igecgili2025";

const ACCENT_OPTIONS = ["#a855f7","#f59e0b","#10b981","#3b82f6","#ef4444","#ec4899","#f97316","#06b6d4"];
const COLOR_OPTIONS  = ["#1a0533","#1a1209","#091a14","#0a1020","#1a0a0a","#0a0a1a","#111","#0d1117"];

const empty = (): Omit<Project,"id"> => ({
  title: "", description: "", tags: [], type: "Gerçek Proje",
  color: "#111", accent: "#a855f7", imageUrl: "", link: "", media: [],
});

/* ── GİRİŞ EKRANI ── */
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      sessionStorage.setItem(SESSION_KEY, "1");
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2500);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter, sans-serif" }}>
      <div style={{ background: "#fff", borderRadius: "24px", padding: "48px 40px", width: "100%", maxWidth: "400px", border: "1px solid #e8e8e8", boxShadow: "0 8px 40px rgba(0,0,0,0.07)" }}>
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div style={{ width: 56, height: 56, borderRadius: "16px", background: "#111", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", margin: "0 auto 16px" }}>🔒</div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "22px", color: "#111", marginBottom: "6px" }}>Admin Girişi</h1>
          <p style={{ fontSize: "13px", color: "#999" }}>Proje paneline erişmek için giriş yap</p>
        </div>
        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "#555", marginBottom: "6px", display: "block" }}>Kullanıcı Adı</label>
            <input type="text" value={user} onChange={e => setUser(e.target.value)} placeholder="kullanıcı adı" autoComplete="username"
              style={{ width: "100%", padding: "12px 16px", borderRadius: "12px", border: error ? "1.5px solid #ef4444" : "1.5px solid #e0e0e0", fontSize: "14px", fontFamily: "inherit", outline: "none", background: "#fafafa", color: "#111", boxSizing: "border-box" }}
              onFocus={e => { if (!error) e.target.style.borderColor = "#111"; }} onBlur={e => { if (!error) e.target.style.borderColor = "#e0e0e0"; }} />
          </div>
          <div>
            <label style={{ fontSize: "12px", fontWeight: 600, color: "#555", marginBottom: "6px", display: "block" }}>Şifre</label>
            <div style={{ position: "relative" }}>
              <input type={showPass ? "text" : "password"} value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••" autoComplete="current-password"
                style={{ width: "100%", padding: "12px 44px 12px 16px", borderRadius: "12px", border: error ? "1.5px solid #ef4444" : "1.5px solid #e0e0e0", fontSize: "14px", fontFamily: "inherit", outline: "none", background: "#fafafa", color: "#111", boxSizing: "border-box" }}
                onFocus={e => { if (!error) e.target.style.borderColor = "#111"; }} onBlur={e => { if (!error) e.target.style.borderColor = "#e0e0e0"; }} />
              <button type="button" onClick={() => setShowPass(s => !s)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: "16px", color: "#aaa" }}>{showPass ? "🙈" : "👁"}</button>
            </div>
          </div>
          {error && <div style={{ padding: "10px 14px", borderRadius: "10px", background: "#fef2f2", border: "1px solid #fee2e2", fontSize: "13px", color: "#ef4444", textAlign: "center" }}>Kullanıcı adı veya şifre hatalı</div>}
          <button type="submit" style={{ padding: "14px", borderRadius: "12px", background: "#111", color: "#fff", border: "none", cursor: "pointer", fontSize: "14px", fontWeight: 600, marginTop: "4px", fontFamily: "inherit" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")} onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
}

/* ── MEDYA YÜKLEYİCİ ── */
function MediaUploader({ media, onChange }: { media: MediaItem[]; onChange: (m: MediaItem[]) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");

  const handleFiles = async (files: FileList) => {
    setUploading(true);
    setError("");
    const results: MediaItem[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setProgress(`Yükleniyor ${i + 1}/${files.length}: ${file.name}`);

      const fd = new FormData();
      fd.append("file", file);
      fd.append("upload_preset", "portfolio_upload");

      const isVideo = file.type.startsWith("video/");
      const endpoint = isVideo
        ? "https://api.cloudinary.com/v1_1/dqilpsjcc/video/upload"
        : "https://api.cloudinary.com/v1_1/dqilpsjcc/image/upload";

      try {
        const res = await fetch(endpoint, { method: "POST", body: fd });
        const data = await res.json();
        if (data.secure_url) {
          results.push({ type: isVideo ? "video" : "image", url: data.secure_url, name: file.name });
        } else {
          setError(`Hata: ${data.error?.message || "Yükleme başarısız"}`);
        }
      } catch (e) {
        setError(`Bağlantı hatası: ${String(e)}`);
      }
    }

    if (results.length > 0) onChange([...media, ...results]);
    setUploading(false);
    setProgress("");
  };

  const removeItem = (idx: number) => onChange(media.filter((_, i) => i !== idx));

  return (
    <div>
      {/* Yükleme alanı */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); e.currentTarget.style.borderColor = "#111"; }}
        onDragLeave={e => { e.currentTarget.style.borderColor = "#e0e0e0"; }}
        onDrop={e => { e.preventDefault(); e.currentTarget.style.borderColor = "#e0e0e0"; if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files); }}
        style={{
          border: "2px dashed #e0e0e0", borderRadius: "12px", padding: "28px",
          textAlign: "center", cursor: "pointer", transition: "border-color .2s",
          background: "#fafafa", marginBottom: "12px",
        }}
      >
        {uploading ? (
          <div>
            <div style={{ fontSize: "24px", marginBottom: "8px" }}>⏳</div>
            <p style={{ fontSize: "13px", color: "#555" }}>{progress}</p>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: "28px", marginBottom: "8px" }}>📁</div>
            <p style={{ fontSize: "14px", fontWeight: 600, color: "#111", marginBottom: "4px" }}>Dosya sürükle veya tıkla</p>
            <p style={{ fontSize: "12px", color: "#aaa" }}>JPG, PNG, MP4, MOV desteklenir • Çoklu seçim yapılabilir</p>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,video/mp4,video/quicktime,video/webm"
          style={{ display: "none" }}
          onChange={e => { if (e.target.files?.length) handleFiles(e.target.files); }}
        />
      </div>

      {error && (
        <p style={{ fontSize: "13px", color: "#e00", marginBottom: "10px", padding: "10px 14px", background: "#fff0f0", borderRadius: "8px" }}>{error}</p>
      )}

      {/* Yüklenen dosyalar */}
      {media.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: "10px" }}>
          {media.map((item, idx) => (
            <div key={idx} style={{ position: "relative", borderRadius: "10px", overflow: "hidden", border: "1px solid #e0e0e0", background: "#f5f5f5" }}>
              {item.type === "image" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.url} alt={item.name} style={{ width: "100%", height: "90px", objectFit: "cover", display: "block" }} />
              ) : (
                <div style={{ width: "100%", height: "90px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#1a1a1a" }}>
                  <span style={{ fontSize: "24px" }}>🎬</span>
                  <span style={{ fontSize: "10px", color: "#aaa", marginTop: "4px", textAlign: "center", padding: "0 4px", wordBreak: "break-all" }}>
                    {item.name.length > 18 ? item.name.slice(0, 15) + "..." : item.name}
                  </span>
                </div>
              )}
              <button
                onClick={() => removeItem(idx)}
                style={{ position: "absolute", top: "4px", right: "4px", width: "22px", height: "22px", borderRadius: "50%", background: "rgba(0,0,0,0.6)", border: "none", color: "#fff", fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}
              >×</button>
              <div style={{ padding: "4px 6px", fontSize: "10px", color: "#888", background: "#f5f5f5" }}>
                {item.type === "video" ? "🎬 Video" : "🖼 Görsel"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── ANA PANEL ── */
function AdminPanel() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState(empty());
  const [tagInput, setTagInput] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    setProjects(stored ? JSON.parse(stored) : defaultProjects);
  }, []);

  const persist = (list: Project[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    setProjects(list);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    if (editId) {
      persist(projects.map(p => p.id === editId ? { ...form, id: editId } : p));
      setEditId(null);
    } else {
      persist([...projects, { ...form, id: Date.now().toString() }]);
    }
    setForm(empty()); setTagInput("");
  };

  const startEdit = (p: Project) => {
    setEditId(p.id);
    setForm({ title: p.title, description: p.description, tags: p.tags, type: p.type, color: p.color, accent: p.accent, imageUrl: p.imageUrl ?? "", link: p.link ?? "", media: p.media ?? [] });
    setTagInput("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const remove = (id: string) => { if (confirm("Bu proje silinsin mi?")) persist(projects.filter(p => p.id !== id)); };
  const addTag = () => { const t = tagInput.trim(); if (t && !form.tags.includes(t)) setForm(f => ({ ...f, tags: [...f.tags, t] })); setTagInput(""); };
  const moveUp   = (i: number) => { if (i === 0) return; const l = [...projects]; [l[i-1],l[i]]=[l[i],l[i-1]]; persist(l); };
  const moveDown = (i: number) => { if (i === projects.length-1) return; const l=[...projects]; [l[i],l[i+1]]=[l[i+1],l[i]]; persist(l); };
  const logout = () => { sessionStorage.removeItem(SESSION_KEY); window.location.reload(); };

  const inp: React.CSSProperties = { width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #e0e0e0", fontSize: "14px", fontFamily: "inherit", outline: "none", background: "#fafafa", color: "#111", boxSizing: "border-box" };
  const lbl: React.CSSProperties = { fontSize: "12px", fontWeight: 600, color: "#555", marginBottom: "6px", display: "block" };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5", fontFamily: "Inter, sans-serif", padding: "32px 20px" }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <div>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "28px", color: "#111", marginBottom: "4px" }}>Proje Paneli</h1>
            <p style={{ fontSize: "13px", color: "#888" }}>Portföyündeki projeleri buradan yönet</p>
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            {saved && <span style={{ fontSize: "13px", color: "#22c55e", fontWeight: 600 }}>✓ Kaydedildi</span>}
            <a href="/" style={{ padding: "9px 18px", borderRadius: "999px", background: "#f0f0f0", color: "#555", textDecoration: "none", fontSize: "13px", fontWeight: 600 }}>← Siteye Dön</a>
            <button onClick={logout} style={{ padding: "9px 18px", borderRadius: "999px", background: "#111", color: "#fff", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}>Çıkış</button>
          </div>
        </div>

        {/* FORM */}
        <div style={{ background: "#fff", borderRadius: "20px", padding: "28px", marginBottom: "24px", border: "1px solid #e8e8e8" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#111", marginBottom: "20px" }}>
            {editId ? "✏️ Projeyi Düzenle" : "＋ Yeni Proje Ekle"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
              <div>
                <label style={lbl}>Proje Adı *</label>
                <input style={inp} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Proje adını gir" required />
              </div>
              <div>
                <label style={lbl}>Tür</label>
                <select style={inp} value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as ProjectType }))}>
                  <option>Gerçek Proje</option>
                  <option>Keşif</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={lbl}>Açıklama</label>
              <textarea style={{ ...inp, height: "80px", resize: "vertical" }} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Kısa açıklama..." />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
              <div>
                <label style={lbl}>Proje Linki (opsiyonel)</label>
                <input style={inp} value={form.link} onChange={e => setForm(f => ({ ...f, link: e.target.value }))} placeholder="https://..." />
              </div>
              <div>
                <label style={lbl}>Kapak Görseli URL (opsiyonel)</label>
                <input style={inp} value={form.imageUrl} onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))} placeholder="Yüklenen dosya URL'si otomatik gelir" />
              </div>
            </div>

            {/* MEDYA YÜKLEYİCİ */}
            <div style={{ marginBottom: "16px" }}>
              <label style={lbl}>Görseller & Videolar</label>
              <MediaUploader
                media={form.media ?? []}
                onChange={media => {
                  const firstImage = media.find(m => m.type === "image");
                  setForm(f => ({ ...f, media, imageUrl: f.imageUrl || firstImage?.url || "" }));
                }}
              />
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={lbl}>Etiketler</label>
              <div style={{ display: "flex", gap: "8px", marginBottom: "8px", flexWrap: "wrap" }}>
                {form.tags.map(t => (
                  <span key={t} style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "4px 12px", borderRadius: "999px", background: "#f0f0f0", fontSize: "12px", color: "#555" }}>
                    {t}
                    <button type="button" onClick={() => setForm(f => ({ ...f, tags: f.tags.filter(x => x !== t) }))} style={{ border: "none", background: "none", cursor: "pointer", color: "#aaa", fontSize: "14px", lineHeight: 1 }}>×</button>
                  </span>
                ))}
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <input style={{ ...inp, flex: 1 }} value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }} placeholder="Etiket yaz, Enter'a bas..." />
                <button type="button" onClick={addTag} style={{ padding: "10px 16px", borderRadius: "10px", background: "#f0f0f0", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}>Ekle</button>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
              <div>
                <label style={lbl}>Arka Plan Rengi</label>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {COLOR_OPTIONS.map(c => <button key={c} type="button" onClick={() => setForm(f => ({ ...f, color: c }))} style={{ width: 28, height: 28, borderRadius: "6px", background: c, border: form.color === c ? "3px solid #111" : "2px solid #e0e0e0", cursor: "pointer" }} />)}
                </div>
              </div>
              <div>
                <label style={lbl}>Vurgu Rengi</label>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {ACCENT_OPTIONS.map(c => <button key={c} type="button" onClick={() => setForm(f => ({ ...f, accent: c }))} style={{ width: 28, height: 28, borderRadius: "6px", background: c, border: form.accent === c ? "3px solid #111" : "2px solid #e0e0e0", cursor: "pointer" }} />)}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button type="submit" style={{ padding: "12px 24px", borderRadius: "999px", background: "#111", color: "#fff", border: "none", cursor: "pointer", fontSize: "14px", fontWeight: 600 }}>
                {editId ? "Güncelle" : "Projeyi Ekle"}
              </button>
              {editId && (
                <button type="button" onClick={() => { setEditId(null); setForm(empty()); setTagInput(""); }} style={{ padding: "12px 24px", borderRadius: "999px", background: "#f0f0f0", color: "#555", border: "none", cursor: "pointer", fontSize: "14px", fontWeight: 600 }}>İptal</button>
              )}
            </div>
          </form>
        </div>

        {/* LİSTE */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {projects.map((p, i) => (
            <div key={p.id} style={{ background: "#fff", borderRadius: "16px", padding: "18px 20px", border: "1px solid #e8e8e8", display: "flex", alignItems: "center", gap: "16px" }}>
              {/* Kapak */}
              {p.imageUrl || (p.media && p.media[0]?.type === "image") ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.imageUrl || p.media![0].url} alt={p.title} style={{ width: 56, height: 56, borderRadius: "10px", objectFit: "cover", flexShrink: 0, border: `2px solid ${p.accent}` }} />
              ) : (
                <div style={{ width: 56, height: 56, borderRadius: "10px", background: p.color, flexShrink: 0, border: `2px solid ${p.accent}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>
                  {p.media?.find(m => m.type === "video") ? "🎬" : "🖼"}
                </div>
              )}

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <span style={{ fontWeight: 700, fontSize: "14px", color: "#111" }}>{p.title}</span>
                  <span style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "4px", background: "#f0f0f0", color: "#666" }}>{p.type}</span>
                  {p.media && p.media.length > 0 && (
                    <span style={{ fontSize: "11px", padding: "2px 8px", borderRadius: "4px", background: "#eff6ff", color: "#3b82f6" }}>
                      {p.media.length} medya
                    </span>
                  )}
                </div>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {p.tags.map(t => <span key={t} style={{ fontSize: "11px", color: "#888", background: "#f5f5f5", padding: "2px 8px", borderRadius: "4px" }}>{t}</span>)}
                </div>
              </div>

              <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
                <button onClick={() => moveUp(i)} disabled={i===0} style={{ padding: "6px 10px", border: "1px solid #e0e0e0", borderRadius: "8px", background: "#fff", cursor: i===0?"default":"pointer", opacity: i===0?0.3:1, fontSize: "13px" }}>↑</button>
                <button onClick={() => moveDown(i)} disabled={i===projects.length-1} style={{ padding: "6px 10px", border: "1px solid #e0e0e0", borderRadius: "8px", background: "#fff", cursor: i===projects.length-1?"default":"pointer", opacity: i===projects.length-1?0.3:1, fontSize: "13px" }}>↓</button>
                <button onClick={() => startEdit(p)} style={{ padding: "6px 14px", border: "1px solid #e0e0e0", borderRadius: "8px", background: "#fff", cursor: "pointer", fontSize: "13px", fontWeight: 500 }}>Düzenle</button>
                <button onClick={() => remove(p.id)} style={{ padding: "6px 14px", border: "1px solid #fee2e2", borderRadius: "8px", background: "#fff", cursor: "pointer", fontSize: "13px", color: "#ef4444" }}>Sil</button>
              </div>
            </div>
          ))}
          {projects.length === 0 && <div style={{ textAlign: "center", padding: "48px", color: "#aaa" }}>Henüz proje yok.</div>}
        </div>
      </div>
    </div>
  );
}

/* ── ANA SAYFA ── */
export default function AdminPage() {
  const [auth, setAuth] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    setAuth(sessionStorage.getItem(SESSION_KEY) === "1");
    setChecking(false);
  }, []);

  if (checking) return null;
  if (!auth) return <LoginScreen onLogin={() => setAuth(true)} />;
  return <AdminPanel />;
}
