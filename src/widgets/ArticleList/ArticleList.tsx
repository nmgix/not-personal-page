import classnames from "classnames";
import { ArticleListElement } from "@/components/Specialized/ArticleListElement";
import { ArticleListElementProps } from "@/types/articles";
import styles from "./article-list.module.scss";

type ArticleListProps = {
  list: ArticleListElementProps[];
  externalClassnames?: string | string[];
};

export const ArticleList = ({ list, externalClassnames }: ArticleListProps) => {
  return (
    <div className={classnames(styles.articleList, externalClassnames)}>
      {list.map(article => (
        <ArticleListElement key={article.id} {...article} />
      ))}
    </div>
  );
};

ArticleList.displayName = "ArticleList";
