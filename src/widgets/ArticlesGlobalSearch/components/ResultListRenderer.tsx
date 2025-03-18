import classnames from "classnames";
import { ArticleListElementProps } from "@/types/articles";
import styles from "./result-list-renderer.module.scss";
import classNames from "classnames";
import { useMemo, useRef, useState } from "react";
import { Button } from "@/components/Generic/Buttons/Default/DefaultButton";
import { Icon } from "@/components/Generic/Icon";
import Link from "next/link";
import { selectTextExample } from "./helpers";
import { useFade } from "@/hooks/useFade";
import { ExternalClassnames } from "@/types/components";
import { GlobalRoutes } from "@/types/consts";
import { useInView } from "react-intersection-observer";

const ListElement = ({ article, searchedPhrase }: { article: ArticleListElementProps; searchedPhrase: string }) => {
  const text = useMemo(() => selectTextExample(100, article.textPreview, searchedPhrase), [article.textPreview, searchedPhrase]);

  return (
    <li className={styles.elementWrapper}>
      <Link prefetch={false} href={`${GlobalRoutes.article}${article.slug}`} className={styles.element}>
        <div className={styles.title}>
          {article.categoryImg && <Icon icon={article.categoryImg} />}
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
  total?: number;
  onBottomReach?: () => void;
} & ExternalClassnames;

const _renderListVariant = ["blocks", "rows"] as const;

export const ResultListRenderer = ({ list, searchedPhrase, externalClassnames, total, onBottomReach }: ResultListRenderProps) => {
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

  const { ref } = useInView({
    threshold: 0,
    trackVisibility: !!list,
    delay: 100,
    onChange: inView => {
      if (inView && !!onBottomReach) onBottomReach();
    }
  });

  return (
    <div className={classnames(styles.resultListRenderer, externalClassnames)}>
      <div className={classnames(styles.top)}>
        <span className={styles.title}>&#91;results&#93;&nbsp;{total ?? list.length}&nbsp;found</span>
        <Button title={`grid: mode: ${_renderListVariant[renderListVariant]}`} onClick={cycleVariant} externalClassnames={styles.button}>
          <Icon icon={`grid-${_renderListVariant[renderListVariant]}`} />
        </Button>
      </div>
      <ul onScroll={updateScrollFn} className={classNames(styles.list, styles[`${_renderListVariant[renderListVariant]}Grid`])}>
        {list.map(article => (
          <ListElement key={article.slug} article={article} searchedPhrase={searchedPhrase} />
        ))}
        <div className={"intersectionObserverTriggerItem"} ref={ref} />
      </ul>
    </div>
  );
};
