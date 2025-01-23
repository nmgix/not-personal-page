export type PageTree = {
  label: string;
  href: string;
  children?: PageTree[];
  noLink?: true;
};
