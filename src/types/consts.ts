import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";

export const homeArticlePreviewConsts = {
  amount: 2,
  max: 3
};
export const articlesSearchConsts = {
  articlesPerPage: 5
};
export const apiConsts = {
  articleFilename: "text.md",
  articleFolder: "articles"
};

export const articleCategories: { type: string; title: string; icon: keyof typeof AvailableIcons }[] = [
  { type: "note", title: "статьи", icon: "tech-article" },
  { type: "project", title: "проекты", icon: "video" },
  { type: "blog", title: "блог", icon: "blog" }
];
export const articleTypes = ["note", "blog", "project"] as const;
export const AvailableModels = {
  dragons_liberation: "gltf/dragons_liberation.glb",
  corkboard: "gltf/corkboard.glb",
  fish: "gltf/fish.glb",
  tuna_fish: "gltf/tuna_fish.glb"
} as const;
export enum GlobalRoutes {
  root = "/",
  home = "/home",
  articles = "/articles/",
  article = "/article/"
}
export enum AvailableIcons {
  "arrow-link",
  "tech-article",
  "drag-left",
  "filter",
  "blog",
  "video",
  "grid-blocks",
  "grid-rows",
  "code"
}

// остальное не важно
export const tagPopularityBaseDecrementLevel = 50;
export const bottomCleverBarShowThreshold = 70; //px
export const inputPlacholderWords = ["мультисемплинг", "геймдев", "разработка"];
export enum ArticleFields {
  category = "article-category",
  tag = "article_tag",
  text = "article-text",
  page = "page",
  limit = "limit"
}
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
