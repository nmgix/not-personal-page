import { Header } from "@/widgets/Header";
import type { Metadata } from "next";
import "../styles/global.styles.scss";
import "react-loading-skeleton/dist/skeleton.css";
import { GlobalRoutes } from "@/types/articles";
import { headers } from "next/headers";
import { BottomCleverBar, TemplateVariant } from "@/widgets/BottomCleverBar";
import { BarTypeKeys, BarTypes, getMatchedKey } from "@/widgets/BottomCleverBar/serverutils";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_NAME,
  description: "personal web page"
};

export default async function RootLayout(props: any) {
  const headersList = await headers();
  // иногда referer null: https://github.com/vercel/next.js/issues/59301
  const fullUrl = headersList.get("referer") || "";
  const type: BarTypeKeys | null = getMatchedKey(fullUrl);
  // console.log({ type, fullUrl, referer: headersList.get("referer"), myUrl: headersList.get("my-url") });
  const bars: TemplateVariant = type ? BarTypes[type].bars : [null, null];

  // console.log(props);
  // const symbols = Object.getOwnPropertySymbols(JSON.parse(JSON.stringify(props.params)));
  // const needed = symbols[3] as unknown as any;
  // const headersReq = (props.params[needed] as { url: any; headers: any }).headers;
  // console.log(headersReq.get("host"));
  // const req = structuredClone(props.params[needed] as { url: any; headers: any });
  // console.log({ req: Object.keys(req).join("\n") });
  // const request = props[needed] as unknown as NextRequest;

  const symbols = Object.getOwnPropertySymbols(props.params);
  // console.log(props.params);
  const needed = symbols[7] as unknown as any;
  const req = props.params[needed] as { url: { pathname: string }; headers: {} };
  console.log(structuredClone(req));
  // console.log(Object.getOwnPropertyDescriptor(req, "headers"));

  return (
    <html lang='ru'>
      <body>
        <Header homeHref={GlobalRoutes.home} />
        {props.children}
        {/* проблема в том что он не будет, скорее всего, обновлять при смене локации в роутере */}
        <BottomCleverBar currentBars={bars} hideInTop={type ? BarTypes[type].hideInTop : false} />
      </body>
    </html>
  );
}
