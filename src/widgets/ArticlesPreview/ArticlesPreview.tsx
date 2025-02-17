import { ArticleListElementProps } from "@/types/articles";
import classnames from "classnames";
import styles from "./articles-preview.module.scss";
import Link from "next/link";

type ArticlesPreviewProps = {
  list: ArticleListElementProps[];
  articlesHref: string;
  articlesRenderLimit?: number;
  externalClassnames?: string | string[];
};

export const ArticlesPreview = ({ list, externalClassnames, articlesRenderLimit, articlesHref }: ArticlesPreviewProps) => {
  return (
    <Link href={articlesHref} className={classnames("box", styles.articlesPreview, externalClassnames)}>
      <div className={classnames("fadeBottom", styles.articlesPreviewInsideWrapper)}>
        <h3 className={styles.header}>
          статьи<mark>&#40;{list.length}&#41;</mark>
        </h3>
        <div className={classnames(styles.list)}>
          {list &&
            list.slice(0, articlesRenderLimit ?? 3).map(article => (
              <Link href={article.href} className={classnames("fadeBottom", styles.element)} onClick={e => e.stopPropagation()}>
                <div className={styles.articleHeader}>
                  <h4 className={styles.title}>{article.title}</h4>
                  <span className={styles.ttr}>{article.TTRmins}min</span>
                </div>
                {article.textPreview ? (
                  <p className={classnames("fadeBottom", styles.textPreview)}>{article.textPreview.slice(0, 100)}</p>
                ) : undefined}
              </Link>
            ))}
        </div>
      </div>
    </Link>
  );
};
