import { AvailableIcons } from "@/components/Generic/Icon";

export const articleCategories: { type: string; title: string; icon: keyof typeof AvailableIcons }[] = [
  { type: "article", title: "статьи", icon: "tech-article" },
  { type: "project", title: "проекты", icon: "video" },
  { type: "blog", title: "блог", icon: "blog" }
];
export const inputPlacholderWords = ["мультисемплинг", "геймдев", "разработка"];
export enum ArticleFields {
  type = "article_type",
  text = "article-text"
}
export const bottomCleverBarShowThreshold = 70; //px