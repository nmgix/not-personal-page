"use client";

import classnames from "classnames";
import { ArticleListElement } from "./components/ArticleListElement";
import { ArticleListElementProps } from "@/types/articles";
import styles from "./article-list.module.scss";
import { ExternalClassnames } from "@/types/components";
import Skeleton from "react-loading-skeleton";
import { useInView } from "react-intersection-observer";

type ArticleListProps = {
  list: ArticleListElementProps[] | null | undefined;
  skeletonItems?: number;
  onBottomReach?: () => void;
} & ExternalClassnames;

export const ArticleList = ({ list, externalClassnames, skeletonItems = 3, onBottomReach }: ArticleListProps) => {
  const { ref } = useInView({
    threshold: 0,
    trackVisibility: !!list,
    delay: 100,
    onChange: inView => {
      if (inView && !!onBottomReach) onBottomReach();
    }
  });

  return (
    <div className={classnames(styles.articleList, externalClassnames)}>
      {list === undefined
        ? Array(skeletonItems)
            .fill(null)
            .map((_, idx) => <Skeleton style={{ minHeight: 80, borderRadius: 15, backgroundColor: "#bfbfbf" }} key={idx} />)
        : list !== null &&
          list.map((article, idx) =>
            article === undefined || Object.keys(article).length == 0 ? (
              <Skeleton style={{ minHeight: 80 }} key={idx} />
            ) : (
              <ArticleListElement key={article.slug} {...article} />
            )
          )}
      <div className={"intersectionObserverTriggerItem"} ref={ref} />
    </div>
  );
};

ArticleList.displayName = "ArticleList";
