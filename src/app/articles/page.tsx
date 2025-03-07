import classnames from "classnames";
import styles from "./articles-page.module.scss";
import { ArticlesHandle } from "./components/ArticlesHandle";
import { mockArticlesAmount } from "@/types/mocks";
import { getPopularTags } from "../../serverfunctions/tags";
import { ArticleFields } from "@/types/consts";

export type QueryParams = { [key in keyof typeof ArticleFields]: string };

export default async function Articles(props: { params: Promise<void>; searchParams?: Promise<QueryParams> }) {
  const query = await props.searchParams;
  const fetchedTags = getPopularTags(8);
  // console.log(fetchedTags);
  return (
    <div className={classnames("page", styles.articles)}>
      <h3 className={styles.header}>
        &#91;статьи&#93;<mark>{mockArticlesAmount}</mark>
      </h3>
      <div className={styles.latestPosts}>
        <div className={classnames("box", styles.box1)} />
        <div className={classnames("box", styles.box2)} />
      </div>
      <ArticlesHandle tags={fetchedTags} presetState={query} />
    </div>
  );
}
