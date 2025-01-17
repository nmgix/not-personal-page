export type ArticleListElementProps = {
  id: string;
  title: string;
  tags: string[];
  TTRmins: number; // time-to-read-mins
  src: string; // article src
  previewImages?: boolean;
  imagesSrc?: string[]; // images (if exist) src links, amount of items in array is used to calculate "N+" amount of images in element
  textPreview?: string;
};

export type ArticleProps = {
  id: string;
  title: string;
  tags: string[];
};
