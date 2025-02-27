import { Header } from "@/widgets/Header";
import type { Metadata } from "next";
import "../styles/global.styles.scss";
import "react-loading-skeleton/dist/skeleton.css";
import { GlobalRoutes } from "@/types/articles";
import { headers } from "next/headers";
import { Bars, BottomCleverBar, TemplateVariant } from "@/widgets/BottomCleverBar";
import { ArticleBar } from "./article/[category]/[name]/components/bar";
import { ArticlesSearchBar } from "./articles/components/bar";

export type Bars = { [key: string]: { bars: TemplateVariant; hideInTop: boolean; href: string } };
const DefaultBar: TemplateVariant = [null, <>{process.env.NEXT_PUBLIC_NAME}</>];
const BarTypes: Bars = {
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

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_NAME,
  description: "personal web page"
};

function getMatchedKey(pathname: string) {
  // const matchedKey = Object.keys(BarTypes).find(key => pathname.startsWith(key) && (pathname.length === key.length || pathname[key.length] === "/"));

  const matchedKey = Object.keys(BarTypes).find(key => {
    const href = BarTypes[key].href;
    const includes = pathname.includes(href);
    console.log({ pathname, key, href, includes });
    return includes;
  });
  return matchedKey ? matchedKey.replace(/\//g, "") : null;
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode | React.ReactNode[];
}>) {
  const headersList = await headers();
  const fullUrl = headersList.get("referer") || "";

  console.log({ fullUrl });

  type BarTypeKeys = keyof typeof BarTypes;
  const type: BarTypeKeys | null = getMatchedKey(fullUrl) as BarTypeKeys;
  console.log({ type });
  const bars = BarTypes[type].bars;

  return (
    <html lang='ru'>
      <body>
        <Header homeHref={GlobalRoutes.home} />
        {children}
        <BottomCleverBar currentBars={bars} hideInTop={BarTypes[type].hideInTop} />
      </body>
    </html>
  );
}
