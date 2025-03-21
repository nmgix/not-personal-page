import classnames from "classnames";
import styles from "./articles-page.module.scss";
import { ArticlesHandle } from "./components/ArticlesHandle";
import { getPopularTags } from "../../serverfunctions/tags";
import { ArticleFields } from "@/types/consts";
import { urldecode } from "@/helpers/url";
import { getAllDocsFolders, getArticles, getDocBySlugShorten, getLatestDocs } from "@/serverfunctions/getDoc";
import { LatestBox } from "./components/latest-box/LatestBox";

export type QueryParams = { [key in ArticleFields]: string };

export default async function Articles(props: { params: Promise<void>; searchParams?: Promise<QueryParams> }) {
  const articlesAmount = getAllDocsFolders().length;

  const query = await props.searchParams;
  const fetchedTags = getPopularTags(8);
  const fetchedArticles = !query
    ? ({ articles: [], total: 0 } as ReturnType<typeof getArticles>)
    : getArticles({
        category: query[ArticleFields.category],
        tag: query[ArticleFields.tag],
        text: query[ArticleFields.text]
          ?.split("+")
          .filter(w => w.length > 0)
          .map(w => urldecode(w))
      });

  const latestPosts = getLatestDocs(2).map(d => {
    const [category, slug] = d.file.split("/");
    return getDocBySlugShorten(category, slug);
  });

  return (
    <div className={classnames("page", styles.articles)}>
      <h3 className={styles.header}>
        &#91;статьи&#93;<mark>{articlesAmount}</mark>
      </h3>
      <div className={styles.latestPosts}>
        {latestPosts[0] ? <LatestBox {...latestPosts[0]} externalClassnames={styles.box1} /> : <div className={classnames("box", styles.box1)} />}
        {latestPosts[1] ? <LatestBox {...latestPosts[1]} externalClassnames={styles.box2} /> : <div className={classnames("box", styles.box2)} />}
      </div>
      <ArticlesHandle tags={fetchedTags} query={query} preset={fetchedArticles} />
    </div>
  );
}
