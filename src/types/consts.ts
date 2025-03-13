import { AvailableIcons } from "@/components/Generic/Icon";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";

export const articleCategories: { type: string; title: string; icon: keyof typeof AvailableIcons }[] = [
  { type: "note", title: "статьи", icon: "tech-article" },
  { type: "project", title: "проекты", icon: "video" },
  { type: "blog", title: "блог", icon: "blog" }
];
export const inputPlacholderWords = ["мультисемплинг", "геймдев", "разработка"];
export enum ArticleFields {
  tag = "article_tag",
  text = "article-text",
  page = "page",
  category = "article-category"
}
export const bottomCleverBarShowThreshold = 70; //px

export const articleTypes = ["note", "blog", "project"] as const;

const pulsewidthFont = localFont({
  src: "../../public/fonts/Pulsewidth-1.0.0.otf",
  weight: "700",
  style: "normal",
  variable: "--font-pulsewidth",
  preload: true,
  fallback: ["Arial", "sans-serif"]
});
const pulsewidthDotFont = localFont({
  src: "../../public/fonts/Pulsewidth-Dot-1.0.0.otf",
  weight: "700",
  style: "normal",
  variable: "--font-pulsewidth-dot",
  fallback: ["Arial", "sans-serif"]
});
const strretchSansFont = localFont({
  src: "../../public/fonts/STRRETCH-SANS.ttf",
  weight: "700",
  style: "normal",
  variable: "--font-strretch-sans",
  fallback: ["Helvetica", "Arial", "sans-serif"]
});
const jetBrainsFont = JetBrains_Mono({
  preload: true,
  variable: "--font-jetbrains",
  subsets: ["cyrillic"],
  fallback: ["Helvetica", "Arial", "sans-serif"]
});

export const usedFonts = [pulsewidthFont, pulsewidthDotFont, strretchSansFont, jetBrainsFont];

export enum KeybindsScopes {
  globalSearch = "global-search"
}
