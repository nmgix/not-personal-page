import classnames from "classnames";
import styles from "./articles-page.module.scss";
import { ArticlesHandle } from "./components/ArticlesHandle";
import { mockArticlesAmount } from "@/types/mocks";

export default function Articles() {
  return (
    <div className={classnames("page", styles.articles)}>
      <h3 className={styles.header}>
        &#91;статьи&#93;<mark>{mockArticlesAmount}</mark>
      </h3>
      <div className={styles.latestPosts}>
        <div className={classnames("box", styles.box1)} />
        <div className={classnames("box", styles.box2)} />
      </div>
      <ArticlesHandle />
    </div>
  );
}
