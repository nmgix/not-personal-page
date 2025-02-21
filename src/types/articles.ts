import { AvailableIcons } from "@/components/Generic/Icon";
import { ImageElement } from "@/components/Specialized/ImageList";
import { type PickKey } from "@/helpers/typescript";

export type ArticleListElementProps = Omit<TArticleDefault, "date" | "text"> & {
  previewImages?: boolean;
};

export const tagPopularityBaseDecrementLevel = 50;
export const articleFileName = "text.md";

export type ArticleTag = {
  popularity: number;
  tag: string;
};

export type TArticleDefault = {
  id: string;
  title: string;
  tags: string[];
  date: number;
  TTRmins: number;
  href: string;
  categoryImg: PickKey<typeof AvailableIcons, "blog" | "tech-article" | "video">;
  text: string | string[]; //хз как частями загружать
  textPreview?: string;
  imagesSrc?: ImageElement[];
};

export type ArticleProps = {
  id: string;
  title: string;
  tags: string[];
};

export const articleTypes = ["article", "blog", "project"] as const;

export type ArticleData = {
  meta: Omit<TArticleDefault, "imagesSrc" | "href">;
  text: string;
  slug: string;
  fullPath: string;
};
