import classnames from "classnames";
import styles from "./articles-page.module.scss";
import { BoxesScrollbar } from "@/components/Specialized/BoxesScrollbar";
import { Input } from "@/components/Generic/Input";
import { DefaultButton } from "@/components/Generic/Buttons";
import { Icon } from "@/components/Generic/Icon";
import { ArticleList } from "@/widgets/ArticleList";
import { mockArticlesFound } from "@/types/mocks";

const mockArticlesAmount = 103;

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
      {/* будет клиентским компонентом со стейтом в будущем */}
      {/* всем boxes scrollbar . list . elems будет onClick и в controls уходить выбранный тег, точнее в input сбоку */}
      <div className={styles.controls}>
        <BoxesScrollbar
          externalClassnames={styles.controlsTags}
          list={[<span>#gamedev</span>, <span>#c++</span>, <span>#thoughts</span>, <span>#c++</span>, <span>#thoughts</span>]}
        />
        <Input externalClassnames={styles.controlsInput} name='article tag search' ref={null} placeholder={"#tag"} />
        <DefaultButton externalClassnames={styles.controlsFilter} title='filter by tags' onClick={undefined}>
          <Icon icon='filter' />
        </DefaultButton>
      </div>
      <ArticleList list={mockArticlesFound} externalClassnames={styles.articlesFound} />
    </div>
  );
}
