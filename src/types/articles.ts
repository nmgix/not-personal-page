import { AvailableIcons } from "@/components/Generic/Icon";
import { ImageElement } from "@/components/Specialized/ImageList";
import { type PickKey } from "@/helpers/typescript";

export type ArticleListElementProps = {
  id: string;
  title: string;
  tags: string[];
  TTRmins: number; // time-to-read-mins
  href: string; // article src
  category: PickKey<typeof AvailableIcons, "blog" | "tech-article" | "video">;
  previewImages?: boolean;
  imagesSrc?: ImageElement[]; // images (if exist) src links, amount of items in array is used to calculate "N+" amount of images in element
  textPreview?: string;
};

export type TArticleDefault = {
  id: string;
  title: string;
  tags: string[];
  date: number;
  TTRmins: number;
  href: string;
  category: PickKey<typeof AvailableIcons, "blog" | "tech-article" | "video">;
  text: string | string[]; //хз как частями загружать
  textPreview?: string;
  imagesSrc?: ImageElement[];
};

export type ArticleProps = {
  id: string;
  title: string;
  tags: string[];
};
