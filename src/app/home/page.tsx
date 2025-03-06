import { RandomHeroWidget } from "@/widgets/RandomHeroWidget";
import styles from "./home-page.module.scss";
import classnames from "classnames";
import { mockList } from "@/components/Specialized/BoxesScrollbar/types";
import { BoxesScrollbar } from "@/components/Specialized/BoxesScrollbar";
import { ArticlesPreview } from "@/widgets/ArticlesPreview";
import { Image } from "@/components/Generic/Image";

import { VideosPreview } from "@/widgets/VideosPreview";
import { ArticleListElementProps, ArticleVideoPreview } from "@/types/articles";
import { articleTypes } from "@/types/consts";
import { getCategorySlugs, getDocBySlugShorten, getLatestDocs } from "../../serverfunctions/getDoc";

export default function Home() {
  const latestArticlesShorten = getLatestDocs(2).map(d =>
    getDocBySlugShorten(d.file.split("/")[0] as (typeof articleTypes)[number], d.file.split("/")[1])
  );

  // надо проверку zod делать всех полей, надоело ?. юзать
  const articlePreviewList: ArticleListElementProps[] = latestArticlesShorten.map(latestArticle => ({
    title: latestArticle?.meta.title ?? latestArticle?.slug ?? "somehow title didnt load UwU",
    categoryImg: latestArticle?.meta.categoryImg ?? "tech-article",
    tags: [],
    imagesSrc: [],
    previewImages: false,
    textPreview: latestArticle?.meta.textPreview,
    TTRmins: latestArticle?.meta.TTRmins ?? -1,
    slug: latestArticle?.slug ?? ""
  }));

  const projects: ArticleVideoPreview[] = getCategorySlugs("project")
    .map(_slug => {
      // console.log(_slug);
      const [category, slug] = _slug.split("/");
      return getDocBySlugShorten(category, slug) as ArticleVideoPreview;
    })
    .filter(p => !!p);

  return (
    <div className={classnames("page", styles.home)}>
      {/* @ts-ignore */}
      <RandomHeroWidget externalClassnames={styles.randomWidget} externalWidgetClassnames={{ viewer: styles.viewer }} />
      <BoxesScrollbar list={mockList} />
      <div className={styles.mainTabs}>
        <ArticlesPreview list={articlePreviewList} externalClassnames={styles.articlesPreview} articlesRenderLimit={2} />
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
          projects<mark>{projects.length}</mark>
        </h3>
        <VideosPreview videos={projects} />
      </div>
    </div>
  );
}
