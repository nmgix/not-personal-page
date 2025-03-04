import { Header } from "@/widgets/Header";
import type { Metadata } from "next";
import "../styles/global.styles.scss";
import "react-loading-skeleton/dist/skeleton.css";
import { GlobalRoutes } from "@/types/articles";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_NAME,
  description: "personal web page"
};

export default async function RootLayout(props: { params: Promise<any>; children: React.ReactNode }) {
  return (
    <html lang='ru'>
      <body>
        <Header homeHref={GlobalRoutes.home} />
        {props.children}
      </body>
    </html>
  );
}
