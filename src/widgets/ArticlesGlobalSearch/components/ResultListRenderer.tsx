import classnames from "classnames";
import { ArticleListElementProps } from "@/types/articles";
import styles from "./result-list-renderer.module.scss";
import classNames from "classnames";
import { useMemo, useRef, useState } from "react";
import { Button } from "@/components/Generic/Buttons/Default/Default-Button";
import { Icon } from "@/components/Generic/Icon";
import Link from "next/link";
import { selectTextExample } from "./helpers";
import { useFade } from "@/hooks/useFade";

const ListElement = ({ article, searchedPhrase }: { article: ArticleListElementProps; searchedPhrase: string }) => {
  const text = useMemo(() => selectTextExample(100, article.textPreview, searchedPhrase), [article.textPreview, searchedPhrase]);

  return (
    <li className={styles.elementWrapper}>
      <Link href={article.href} className={styles.element}>
        <div className={styles.title}>
          {article.category && <Icon icon={article.category} />}
          &#91;<p>{article.title}</p>&#93;
        </div>
        <p className={styles.text}>...{text}...</p>
      </Link>
    </li>
  );
};

type ResultListRenderProps = {
  list: ArticleListElementProps[];
  searchedPhrase: string;
  extraClassnames?: string | string[];
};

const _renderListVariant = ["blocks", "rows"] as const;

export const ResultListRenderer = ({ list, searchedPhrase, extraClassnames }: ResultListRenderProps) => {
  const [renderListVariant, setRenderVariant] = useState<number>(0);
  const cycleVariant = () => {
    setRenderVariant(currIdx => (currIdx + 1) % _renderListVariant.length);
  };
  const listRef = useRef<HTMLUListElement>(null);
  const { updateScrollFn } = useFade(listRef as React.RefObject<HTMLElement>, false, {
    sideOne: "fadeTop",
    sideTwo: "fadeBottom",
    bothSides: "fadeTopBottom"
  });

  return (
    <div className={classnames(styles.resultListRenderer, extraClassnames)}>
      <div className={classnames(styles.top)}>
        <span className={styles.title}>&#91;results&#93;&nbsp;{list.length}&nbsp;found</span>
        <Button title={`grid: mode: ${_renderListVariant[renderListVariant]}`} onClick={cycleVariant} externalClassnames={styles.button}>
          <Icon icon={`grid-${_renderListVariant[renderListVariant]}`} />
        </Button>
      </div>
      <ul onScroll={updateScrollFn} className={classNames(styles.list, styles[`${_renderListVariant[renderListVariant]}Grid`])}>
        {list.map(article => (
          <ListElement key={article.id} article={article} searchedPhrase={searchedPhrase} />
        ))}
      </ul>
    </div>
  );
};
