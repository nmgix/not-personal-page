import { ImageElement } from "@/components/Specialized/ImageList";
import { type PickKey } from "@/helpers/typescript";
import { AvailableIcons } from "./consts";

export type ArticleTag = {
  popularity: number;
  tag: string;
};

export type TArticleDefault = {
  title: string;
  tags: string[];
  date: string;
  TTRmins: number;
  categoryImg: PickKey<typeof AvailableIcons, "blog" | "tech-article" | "video">;
  // text: string; //хз как частями загружать
  textPreview?: string;
  imagesSrc?: ImageElement[];
};
export type ArticleListElementProps = Omit<TArticleDefault, "text"> & {
  slug: string;
  previewImages?: boolean;
};
export type ArticleData = {
  meta: Omit<TArticleDefault, "imagesSrc">;
  text: string;
  slug: string;
  // fullPath: string;
};

export type ArticleProps = {
  id: string;
  title: string;
  tags: string[];
};

export type ArticleVideoPreview = {
  meta: Omit<TArticleDefault, "imagesSrc"> &
    Partial<{
      videoSrc: string;
      imagePlaceholderSrc: string;
      relatedTagsIcons: (keyof typeof AvailableIcons)[];
    }>;
  slug: string;
};
