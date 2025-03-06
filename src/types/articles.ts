import { AvailableIcons } from "@/components/Generic/Icon";
import { ImageElement } from "@/components/Specialized/ImageList";
import { type PickKey } from "@/helpers/typescript";

export const tagPopularityBaseDecrementLevel = 50;
export const articleFileName = "text.md";

export enum GlobalRoutes {
  root = "/",
  home = "/home",
  articles = "/articles/",
  article = "/article/"
  // note = "/note/"
  // blog = "/blog/",
  // project = "/project/"
}

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
export type ArticleListElementProps = Omit<TArticleDefault, "date" | "text"> & {
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

// export type VideoPreviewProps = {
//   id: string;
//   shortenedVideoSrc: string;
//   videoLength: number;
//   title: string;
//   shortenedDescription: string;
//   thumbnailSrc: string;
//   relatedTags?: (keyof typeof AvailableIcons)[];
// } & ExternalClassnames;

export type ArticleVideoPreview = {
  meta: Omit<TArticleDefault, "imagesSrc" | "date"> &
    Partial<{
      videoSrc: string;
      imagePlaceholderSrc: string;
      relatedTagsIcons: (keyof typeof AvailableIcons)[];
    }>;
  slug: string;
};
