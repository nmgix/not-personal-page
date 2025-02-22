import { Header } from "@/widgets/Header";
import type { Metadata } from "next";
import "../styles/global.styles.scss";
import { GlobalRoutes } from "@/types/articles";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_NAME,
  description: "personal web page"
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode | React.ReactNode[];
}>) {
  return (
    <html lang='ru'>
      <body>
        <Header homeHref={GlobalRoutes.home} />
        {children}
      </body>
    </html>
  );
}
