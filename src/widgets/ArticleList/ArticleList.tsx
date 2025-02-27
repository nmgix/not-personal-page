import classnames from "classnames";
import { ArticleListElement } from "@/components/Specialized/ArticleListElement";
import { ArticleListElementProps } from "@/types/articles";
import styles from "./article-list.module.scss";
import { ExternalClassnames } from "@/types/components";
import Skeleton from "react-loading-skeleton";

type ArticleListProps = {
  list: ArticleListElementProps[] | null | undefined;
  skeletonItems?: number;
} & ExternalClassnames;

export const ArticleList = ({ list, externalClassnames, skeletonItems = 3 }: ArticleListProps) => {
  return (
    <div className={classnames(styles.articleList, externalClassnames)}>
      {list === undefined
        ? Array(skeletonItems)
            .fill(null)
            .map((_, idx) => <Skeleton style={{ minHeight: 80 }} key={idx} />)
        : list !== null &&
          list.map((article, idx) =>
            article === undefined || Object.keys(article).length == 0 ? (
              <Skeleton style={{ minHeight: 80 }} key={idx} />
            ) : (
              <ArticleListElement key={article.slug} {...article} />
            )
          )}
    </div>
  );
};

ArticleList.displayName = "ArticleList";
