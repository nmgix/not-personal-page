import { ArticleBar } from "@/app/article/[category]/[name]/components/bar";
import { TemplateVariant } from "./BottomCleverBar";
import { ArticlesSearchBar } from "@/app/articles/components/bar";

export type Bars = { [key: string]: { bars: TemplateVariant; hideInTop: boolean; href: string } };
const DefaultBar: TemplateVariant = [null, <>{process.env.NEXT_PUBLIC_NAME}</>];
export const BarTypes: Bars = {
  home: {
    href: "/home",
    bars: DefaultBar,
    hideInTop: true
  },
  article: {
    href: "/article/",
    bars: ArticleBar,
    hideInTop: false
  },
  blog: {
    href: "/blog/",
    bars: ArticleBar,
    hideInTop: false
  },
  project: {
    href: "/project/",
    bars: ArticleBar,
    hideInTop: false
  },
  articles: {
    href: "/articles",
    bars: ArticlesSearchBar,
    hideInTop: false //true
  }
};

export function getMatchedKey(pathname: string) {
  // const matchedKey = Object.keys(BarTypes).find(key => pathname.startsWith(key) && (pathname.length === key.length || pathname[key.length] === "/"));

  const matchedKey = Object.keys(BarTypes).find(key => {
    const href = BarTypes[key].href;
    const includes = pathname.includes(href);
    // console.log({ pathname, key, href, includes });
    return includes;
  });
  return matchedKey ? (matchedKey.replace(/\//g, "") as BarTypeKeys) : null;
}

export type BarTypeKeys = keyof typeof BarTypes;
