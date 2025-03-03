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

export default async function RootLayout(props: { params: Promise<any>; children: React.ReactNode }) {
  // const headersList = await headers();
  // // иногда referer null: https://github.com/vercel/next.js/issues/59301
  // const fullUrl = headersList.get("referer") || "";
  // const type: BarTypeKeys | null = getMatchedKey(fullUrl);
  // const bars: TemplateVariant = type ? BarTypes[type].bars : [null, null];
  // console.log({ type });

  // BACKUP PLAN:
  // const symbols = Object.getOwnPropertySymbols(props.params);
  // // console.log(props.params);
  // const needed = symbols[7] as unknown;
  // // @ts-ignore
  // const req = props.params[needed] as { url: { pathname: string }; headers: {} };
  // // const referer = Object.getOwnPropertyDescriptors(req.headers)["headers"].value["referer"];
  // // console.log({ referer });
  // const referer = Object.getOwnPropertyDescriptors(req.headers)["headers"].value;
  // console.log({ headers: referer });
  // @ts-ignore
  // (await props.params)["wow"] = "ww";

  return (
    <html lang='ru'>
      <body>
        <Header homeHref={GlobalRoutes.home} />
        {props.children}
      </body>
    </html>
  );
}
