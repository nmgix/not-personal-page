import { RandomHeroWidget } from "@/widgets/RandomHeroWidget";
import styles from "./home-page.module.scss";
import classnames from "classnames";
import { mockList } from "@/components/Specialized/BoxesScrollbar/types";
import { BoxesScrollbar } from "@/components/Specialized/BoxesScrollbar";
import { ArticlesPreview } from "@/widgets/ArticlesPreview";
import { Image } from "@/components/Generic/Image";

import { /*mockArticlesFound,*/ mockProjectsShortened } from "@/types/mocks";
import { VideosPreview } from "@/widgets/VideosPreview";
import { getDocBySlugShorten, getLatestDocs } from "../api/getDoc";
import { ArticleListElementProps, articleTypes } from "@/types/articles";

const globalArticlesHref = "/articles/";

export default function Home() {
  const latestArticlesShorten = getLatestDocs(2).map(d =>
    getDocBySlugShorten(d.file.split("/")[0] as (typeof articleTypes)[number], d.file.split("/")[1])
  );
  console.log(latestArticlesShorten);
  const articlePreviewList: ArticleListElementProps[] = latestArticlesShorten.map(la => ({
    categoryImg: la?.meta.categoryImg ?? "tech-article",
    href: "todo",
    id: "todo to remove id",
    tags: [],
    title: la?.meta.title ?? "somehow title didnt load UwU",
    imagesSrc: [],
    previewImages: false,
    textPreview: la?.meta.textPreview,
    TTRmins: la?.meta.TTRmins ?? -1
  }));
  //  categoryImg: lA?.category, href: 'todo', id: '', title:
  return (
    <div className={classnames("page", styles.home)}>
      <RandomHeroWidget externalClassnames={styles.randomWidget} externalWidgetClassnames={{ viewer: styles.viewer }} />
      <BoxesScrollbar list={mockList} />
      <div className={styles.mainTabs}>
        <ArticlesPreview
          articlesHref={globalArticlesHref}
          list={articlePreviewList}
          externalClassnames={styles.articlesPreview}
          articlesRenderLimit={2}
        />
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
      {/* projects lower */}
      <div className={styles.projects}>
        <h3 className={styles.projectsTitle}>
          projects<mark>{mockProjectsShortened.length}</mark>
        </h3>
        <VideosPreview videos={mockProjectsShortened} />
      </div>
    </div>
  );
}
