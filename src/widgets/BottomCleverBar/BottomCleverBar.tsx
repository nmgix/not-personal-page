"use client";

import classnames from "classnames";
import styles from "./bottom-clever-bar.module.scss";
import { ReactElement, useEffect, useState } from "react";
import { bottomCleverBarShowThreshold } from "@/types/consts";
import { ExternalClassnames } from "@/types/components";
export type TemplateComponent = ReactElement | null;
export type TemplateVariant = [TemplateComponent, TemplateComponent];

// разные bartypes рендерятся потому что весь этот компонент ререндерится (бесполезно useState вызывать, он будет отрабатывать один раз, но ререндер при переходе на старинцу, так что ререндер каждый раз ибо компонент маунтится с нуля)
export const BottomCleverBar = ({
  currentBars,
  hideInTop,
  externalClassnames,
  style
}: { currentBars: TemplateVariant | [] | null | undefined; hideInTop: boolean; style?: React.CSSProperties } & ExternalClassnames) => {
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
  }, [atTop]);

  const render = (
    <div style={style} className={classnames(styles.bottomCleverBar, hideInTop && atTop && styles.hideBar, externalClassnames)}>
      {!!currentBars && currentBars[0] && <div className={classnames("box", styles.barOne)}>{currentBars[0]}</div>}
      {!!currentBars && currentBars[1] && <div className={classnames("box", styles.barOne)}>{currentBars[1]}</div>}
    </div>
  );
  // if (!BarTypes[type].hideInTop) return render; // будет давать варнинг что порядок хуков изменился
  return render;
};
