import { BottomCleverBar } from "@/widgets/BottomCleverBar";
import { BarTypes } from "@/widgets/BottomCleverBar/serverutils";

export default function Layout({
  children,
  params
}: Readonly<{
  children: React.ReactNode | React.ReactNode[];
  params: any;
}>) {
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

  console.log({ params });
  // из params вытаскивать чему равен текущий category: article/blog/project и вставлять в BarTypes[сюда]
  return (
    <>
      {children}
      <BottomCleverBar currentBars={BarTypes["article"].bars} hideInTop={BarTypes["article"].hideInTop} />
    </>
  );
}
