import { BottomCleverBar } from "@/widgets/BottomCleverBar";
import { BarTypes } from "@/widgets/BottomCleverBar/serverutils";

export default async function Layout({
  children,
  params
}: Readonly<{
  children: React.ReactNode | React.ReactNode[];
  params: Promise<{ category: string; name: string }>;
}>) {
  let _params = await params;
  const type = _params.category in Object.keys(BarTypes) ? _params.category : "note";
  return (
    <>
      {children}
      <BottomCleverBar currentBars={BarTypes[type].bars} hideInTop={BarTypes[type].hideInTop} />
    </>
  );
}
