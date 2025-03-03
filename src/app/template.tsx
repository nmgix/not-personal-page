import { urldecode } from "@/helpers/url";
import { BottomCleverBar, TemplateVariant } from "@/widgets/BottomCleverBar";
import { BarTypeKeys, BarTypes, getMatchedKey } from "@/widgets/BottomCleverBar/serverutils";
import { headers } from "next/headers";

export default async function Template({ children }: { children: React.ReactNode }) {
  // const headersList = await headers();
  // иногда referer null: https://github.com/vercel/next.js/issues/59301
  // const fullUrl = headersList.get("referer") || "";
  // const type: BarTypeKeys | null = getMatchedKey(fullUrl);
  // const bars: TemplateVariant = type ? BarTypes[type].bars : [null, null];
  // console.log({ type });
  // console.log("template", headersList.has("host"));
  // ЗАДАЧА ПОЛУЧИТЬ CURRENT PATHNAME
  // console.log(import.meta.url); // Альтернатива __filename в ESM
  // console.log(process.cwd());
  // console.log(globalThis);
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

  const symbols = Object.getOwnPropertySymbols(globalThis);
  const needed = symbols[symbols.length - 1];
  // @ts-ignore
  const curr = globalThis;
  console.log(curr);
  // const idk = globalThis.__incrementalCache.requestHeaders;
  // console.log(globalThis.__incrementalCache.requestHeaders);

  // console.log(globalThis.__NEXT_HTTPS_AGENT);
  // console.log(globalThis);
  // console.log(globalThis);
  // console.log({ currentPathname });

  const type: BarTypeKeys | null = getMatchedKey("");
  const bars: TemplateVariant = type ? BarTypes[type].bars : [null, null];

  return (
    <div>
      {children} {/* проблема в том что он не будет, скорее всего, обновлять при смене локации в роутере */}
      <BottomCleverBar currentBars={bars} hideInTop={type ? BarTypes[type].hideInTop : false} />
    </div>
  );
}
