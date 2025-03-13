import { Header } from "@/widgets/Header";
import type { Metadata } from "next";
import "../styles/global.styles.scss";
import "react-loading-skeleton/dist/skeleton.css";
import { GlobalRoutes } from "@/types/articles";
import { JetBrains_Mono } from "next/font/google";

import localFont from "next/font/local";
import classnames from "classnames";
import { usedFonts } from "@/types/consts";
import { AppHotkeysWrapper, ArticlesGlobalSearch } from "@/widgets/ArticlesGlobalSearch";
import { HotkeysProvider } from "react-hotkeys-hook";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_NAME,
  description: "personal web page"
};

// className={classNames(pulsewidthFont.className, pulsewidthDotFont.className, strretchSansFont.className)}
export default async function RootLayout(props: { params: Promise<any>; children: React.ReactNode }) {
  return (
    <html lang='ru' className={classnames(...usedFonts.map(f => f.variable))}>
      <body>
        <AppHotkeysWrapper>
          <Header homeHref={GlobalRoutes.home} />
          {props.children}
          <ArticlesGlobalSearch />
        </AppHotkeysWrapper>
      </body>
    </html>
  );
}
