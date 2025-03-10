import { AvailableIcons } from "@/components/Generic/Icon";

export const articleCategories: { type: string; title: string; icon: keyof typeof AvailableIcons }[] = [
  { type: "note", title: "статьи", icon: "tech-article" },
  { type: "project", title: "проекты", icon: "video" },
  { type: "blog", title: "блог", icon: "blog" }
];
export const inputPlacholderWords = ["мультисемплинг", "геймдев", "разработка"];
export enum ArticleFields {
  tag = "article_tag",
  text = "article-text",
  page = "page"
}
export const bottomCleverBarShowThreshold = 70; //px

export const articleTypes = ["note", "blog", "project"] as const;
