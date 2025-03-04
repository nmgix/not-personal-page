import { ArticlesGlobalSearch } from "@/widgets/ArticlesGlobalSearch";
import { BottomCleverBar } from "@/widgets/BottomCleverBar";
import { BarTypes } from "@/widgets/BottomCleverBar/serverutils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_NAME} | Articles`,
  description: "my whole bunch of articles~!!"
};
export default function RootLayout({
  children,
  articlemodal
}: Readonly<{
  children: React.ReactNode | React.ReactNode[];
  articlemodal: React.ReactNode;
}>) {
  return (
    <>
      <ArticlesGlobalSearch />
      {children}
      {articlemodal}
      <BottomCleverBar currentBars={BarTypes["articles"].bars} hideInTop={BarTypes["articles"].hideInTop} />
    </>
  );
}
