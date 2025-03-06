import { Header } from "@/widgets/Header";
import type { Metadata } from "next";
import "../styles/global.styles.scss";
import "react-loading-skeleton/dist/skeleton.css";
import { GlobalRoutes } from "@/types/articles";
import { JetBrains_Mono } from "next/font/google";

import localFont from "next/font/local";
import classNames from "classnames";

const pulsewidthFont = localFont({
  src: "../../public/fonts/Pulsewidth-1.0.0.otf",
  weight: "700",
  style: "normal",
  variable: "--font-pulsewidth",
  preload: true
});
const pulsewidthDotFont = localFont({
  src: "../../public/fonts/Pulsewidth-Dot-1.0.0.otf",
  weight: "700",
  style: "normal",
  variable: "--font-pulsewidth-dot"
});
const strretchSansFont = localFont({
  src: "../../public/fonts/STRRETCH-SANS.ttf",
  weight: "700",
  style: "normal",
  variable: "--font-strretch-sans"
});
const jetBrainsFont = JetBrains_Mono({ preload: true, variable: "--font-jetbrains", subsets: ["cyrillic"] });

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_NAME,
  description: "personal web page"
};

// className={classNames(pulsewidthFont.className, pulsewidthDotFont.className, strretchSansFont.className)}
export default async function RootLayout(props: { params: Promise<any>; children: React.ReactNode }) {
  return (
    <html lang='ru' className={classNames(pulsewidthFont.variable, pulsewidthDotFont.variable, strretchSansFont.variable, jetBrainsFont.variable)}>
      <body>
        <Header homeHref={GlobalRoutes.home} />
        {props.children}
      </body>
    </html>
  );
}
