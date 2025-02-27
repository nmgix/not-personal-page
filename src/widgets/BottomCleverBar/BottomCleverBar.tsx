"use client";

import classnames from "classnames";
import styles from "./bottom-clever-bar.module.scss";
import { JSX, ReactElement, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { bottomCleverBarShowThreshold } from "@/types/consts";
import { ArticleBar } from "@/app/article/[category]/[name]/components/bar";
import { ArticlesSearchBar } from "@/app/articles/components/bar";
import { ArticlesAmountBar } from "@/app/articles/components/bar/secondBar";
export type TemplateComponent = ReactElement | null;
export type TemplateVariant = [TemplateComponent, TemplateComponent];

// client компонент, так что без разницы где объвлять функцию
// function getMatchedKey(pathname: string) {
//   const matchedKey = articleKeys.find(key => pathname.startsWith(key) && (pathname.length === key.length || pathname[key.length] === "/"));
//   return matchedKey ? matchedKey.replace(/\//g, "") : null;
// }

// разные bartypes рендерятся потому что весь этот компонент ререндерится (бесполезно useState вызывать, он будет отрабатывать один раз, но ререндер при переходе на старинцу, так что ререндер каждый раз ибо компонент маунтится с нуля)
export const BottomCleverBar = ({ currentBars, hideInTop }: { currentBars: TemplateVariant; hideInTop: boolean }) => {
  // const str = usePathname();
  // const type: BarTypeKeys | null = getMatchedKey(str) as BarTypeKeys;

  const [firstBar, secondBar] = currentBars;
  const [atTop, setAtTop] = useState(true);
  useEffect(() => {
    const checkThreshold = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      setAtTop(scrollTop < bottomCleverBarShowThreshold);
    };
    document.addEventListener("scroll", checkThreshold);

    // наверное в clean function толку мало потому что фулл ререндер происходит, нода анмаунтится или нет, не помню
    // "state is not preserved in Client Components"
    // в good to know читать ^
    // https://nextjs.org/docs/app/api-reference/file-conventions/template#children-required
    return () => {
      document.removeEventListener("scroll", checkThreshold);
    };
  }, []);
  //

  console.log({ secondBar });

  const render = (
    <div className={classnames(styles.bottomCleverBar, hideInTop && atTop && styles.hideBar)}>
      {firstBar && (
        <div className={classnames("box", styles.barOne)}>
          {firstBar}
          {/* <FirstBar/> */}
          {/* firstBar() */}
        </div>
      )}
      {secondBar && <div className={classnames("box", styles.barOne)}>{secondBar}</div>}
      {/* <ArticlesAmountBar /> */}
    </div>
  );
  // if (!BarTypes[type].hideInTop) return render; // будет давать варнинг что порядок хуков изменился
  return render;
};
