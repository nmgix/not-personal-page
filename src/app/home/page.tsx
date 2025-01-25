import { RandomHeroWidget } from "@/widgets/RandomHeroWidget";
import styles from "./home-page.module.scss";
import classnames from "classnames";
import { mockList } from "@/components/Specialized/BoxesScrollbar/BoxesScrollbar.stories";
import { BoxesScrollbar } from "@/components/Specialized/BoxesScrollbar";
import { ArticlesPreview } from "@/widgets/ArticlesPreview";
import { mockArticlesFound } from "@/types/mocks";
import { Image } from "@/components/Generic/Image";

export default function Home() {
  return (
    <div className={classnames("page", styles.home)}>
      <RandomHeroWidget externalClassnames={styles.randomWidget} externalWidgetClassnames={{ viewer: styles.viewer }} />
      <BoxesScrollbar list={mockList} />
      <div className={styles.mainTabs}>
        <ArticlesPreview list={mockArticlesFound} externalClassnames={styles.articlesPreview} articlesRenderLimit={2} />
        <Image
          src='/assets/person.png'
          alt='guy standing'
          externalClassnames={styles.guyStanding}
          showAlt={false}
          size={{ width: 80, height: 170 }}
          priority={false}
        />
        <div className={classnames("box", styles.box1)} />
        <div className={classnames("box", styles.box2)} />
        <div className={classnames("box", styles.box3)} />
      </div>
    </div>
  );
}
