import classnames from "classnames";
import styles from "./articles-page.module.scss";
import { ArticlesHandle } from "./components/ArticlesHandle";
import { mockArticlesAmount } from "@/types/mocks";
import { getPopularTags } from "../../serverfunctions/tags";
import { ArticleFields } from "@/types/consts";
import { getArticle } from "@/serverfunctions/getArticles";
import { urldecode } from "@/helpers/url";

export type QueryParams = { [key in ArticleFields]: string };

export default async function Articles(props: { params: Promise<void>; searchParams?: Promise<QueryParams> }) {
  const query = await props.searchParams;
  const fetchedTags = getPopularTags(8);
  const fetchedArticles = !query
    ? []
    : getArticle(
        query[ArticleFields.tag],
        query[ArticleFields.text]
          ?.split("+")
          .filter(w => w.length > 0)
          .map(w => urldecode(w))
      );

  return (
    <div className={classnames("page", styles.articles)}>
      <h3 className={styles.header}>
        &#91;статьи&#93;<mark>{mockArticlesAmount}</mark>
      </h3>
      <div className={styles.latestPosts}>
        <div className={classnames("box", styles.box1)} />
        <div className={classnames("box", styles.box2)} />
      </div>
      <ArticlesHandle tags={fetchedTags} presetQuery={query} presetArticles={fetchedArticles} />
    </div>
  );
}
