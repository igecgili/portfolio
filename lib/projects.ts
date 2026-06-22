export type ProjectType = "Gerçek Proje" | "Keşif";

export interface MediaItem {
  type: "image" | "video";
  url: string;
  name: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  type: ProjectType;
  color: string;
  accent: string;
  imageUrl?: string;
  link?: string;
  media?: MediaItem[];
}

export const defaultProjects: Project[] = [
  {
    id: "1",
    title: "AI Ürün Kampanyası",
    description: "Yapay zeka destekli cilt bakım markası için görsel kimlik",
    tags: ["AI Tasarım", "Marka"],
    type: "Gerçek Proje",
    color: "#1a0533",
    accent: "#a855f7",
    media: [],
  },
  {
    id: "2",
    title: "Lüks Marka Landing Page",
    description: "Premium marka için yüksek dönüşümlü açılış sayfası",
    tags: ["UI/UX", "Landing Page"],
    type: "Gerçek Proje",
    color: "#1a1209",
    accent: "#f59e0b",
    media: [],
  },
];
