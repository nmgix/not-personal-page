import { Header } from "@/app/components/Header";
import type { Metadata } from "next";
import "../styles/global.styles.scss";
import "react-loading-skeleton/dist/skeleton.css";

import classnames from "classnames";
import { GlobalRoutes, usedFonts } from "@/types/consts";
import { ArticlesGlobalSearch } from "@/widgets/ArticlesGlobalSearch";
import { CookiePopup } from "@/widgets/CookiePopup";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_NAME,
  description: "personal web page"
};

// className={classNames(pulsewidthFont.className, pulsewidthDotFont.className, strretchSansFont.className)}
export default async function RootLayout(props: { params: Promise<any>; children: React.ReactNode }) {
  return (
    <html lang='ru' className={classnames(...usedFonts.map(f => f.variable))}>
      <body>
        <Header homeHref={GlobalRoutes.home} />
        {props.children}
        <ArticlesGlobalSearch />
        <CookiePopup />
      </body>
    </html>
  );
}
