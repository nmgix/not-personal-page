"use client";

import classnames from "classnames";
import styles from "./bottom-clever-bar.module.scss";
import { JSX, useEffect, useState } from "react";
import { BackButton } from "@/components/Generic/Buttons";
import { usePathname } from "next/navigation";
import { mockArticlesAmount } from "@/types/mocks";
import { bottomCleverBarShowThreshold } from "@/types/consts";
type TemplateVariant = [(() => JSX.Element | null) | null, (() => JSX.Element | null) | null];

const DefaultBar: TemplateVariant = [null, () => <>{process.env.NEXT_PUBLIC_NAME}</>];
const ArticleBar: TemplateVariant = [null, BackButton];
const ArticlesSearchBar: TemplateVariant = [null, () => <>{mockArticlesAmount} articles</>];

const BarTypes: { [key: string]: { bars: TemplateVariant; hideInTop: boolean } } = {
  home: {
    bars: DefaultBar,
    hideInTop: true
  },
  article: {
    bars: ArticleBar,
    hideInTop: false
  },
  blog: {
    bars: ArticleBar,
    hideInTop: false
  },
  project: {
    bars: ArticleBar,
    hideInTop: false
  },
  articles: {
    bars: ArticlesSearchBar,
    hideInTop: true
  }
};
const articleKeys = Object.keys(BarTypes).map(k => `/${k}`);

export type BarTypeKeys = keyof typeof BarTypes;
// client компонент, так что без разницы где объвлять функцию
function getMatchedKey(pathname: string) {
  const matchedKey = articleKeys.find(key => pathname.startsWith(key) && (pathname.length === key.length || pathname[key.length] === "/"));
  return matchedKey ? matchedKey.replace(/\//g, "") : null;
}

// разные bartypes рендерятся потому что весь этот компонент ререндерится (бесполезно useState вызывать, он будет отрабатывать один раз, но ререндер при переходе на старинцу, так что ререндер каждый раз ибо компонент маунтится с нуля)
export const BottomCleverBar = () => {
  const str = usePathname();
  const type: BarTypeKeys | null = getMatchedKey(str) as BarTypeKeys;
  // console.log(str);
  if (!type) return null;

  const [firstBar, secondBar] = BarTypes[type].bars;
  const [atTop, setAtTop] = useState(true);

  const render = (
    <div className={classnames(styles.bottomCleverBar, BarTypes[type].hideInTop && atTop && styles.hideBar)}>
      {firstBar !== null && <div className={classnames("box", styles.barOne)}>{firstBar()}</div>}
      {secondBar !== null && <div className={classnames("box", styles.barTwo)}>{secondBar()}</div>}
    </div>
  );
  // if (!BarTypes[type].hideInTop) return render; // будет давать варнинг что порядок хуков изменился

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

  return render;
};
