import { UnexpectedErrorBoundary } from "@/components/Specialized/TestComponents";
import { BottomCleverBar } from "@/widgets/BottomCleverBar";
import { BarTypes } from "@/widgets/BottomCleverBar/serverutils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${process.env.NEXT_PUBLIC_NAME} | Home`,
  description: "home page UwU"
};
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode | React.ReactNode[];
}>) {
  return (
    <>
      <UnexpectedErrorBoundary />
      {children}
      <BottomCleverBar currentBars={BarTypes["home"].bars} hideInTop={BarTypes["home"].hideInTop} />
    </>
  );
}
