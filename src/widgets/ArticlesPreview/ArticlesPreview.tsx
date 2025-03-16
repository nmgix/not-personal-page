import { ArticleListElementProps } from "@/types/articles";
import classnames from "classnames";
import styles from "./articles-preview.module.scss";
import Link from "next/link";
import { ExternalClassnames } from "@/types/components";
import { GlobalRoutes, homeArticlePreviewConsts } from "@/types/consts";

type ArticlesPreviewProps = {
  list: ArticleListElementProps[];
  articlesRenderLimit?: number;
} & ExternalClassnames;

export const ArticlesPreview = ({ list, externalClassnames, articlesRenderLimit = homeArticlePreviewConsts.max }: ArticlesPreviewProps) => {
  return (
    <div className={classnames("box", styles.articlesPreview, externalClassnames)}>
      <div className={classnames("fadeBottom", styles.articlesPreviewInsideWrapper)}>
        <Link prefetch={false} href={GlobalRoutes.articles} className={styles.articlesPreviewLink} />
        <h3 className={styles.header}>
          статьи<mark>&#40;{list.length}&#41;</mark>
        </h3>
        <div className={classnames(styles.list)}>
          {list &&
            list.slice(0, articlesRenderLimit).map((article, i) => (
              <Link
                prefetch={false}
                key={article.slug}
                href={`${GlobalRoutes.article}${article.slug}`}
                className={classnames("fadeBottom", styles.element)}
                tabIndex={i < 1 ? i : -1}>
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
    </div>
  );
};
