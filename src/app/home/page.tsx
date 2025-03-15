import { RandomHeroWidget } from "@/widgets/RandomHeroWidget";
import styles from "./home-page.module.scss";
import classnames from "classnames";
import { BoxesScrollbar } from "@/components/Specialized/BoxesScrollbar";
import { ArticlesPreview } from "@/widgets/ArticlesPreview";
import { Image } from "@/components/Generic/Image";

import { VideosPreview } from "@/widgets/VideosPreview";
import { ArticleListElementProps, ArticleVideoPreview, GlobalRoutes } from "@/types/articles";
import { articleTypes } from "@/types/consts";
import { getArticleMetaField, getCategorySlugs, getDocBySlugShorten, getLatestDocs, getRandomArticles } from "../../serverfunctions/getDoc";
import { getDocTopTag } from "@/serverfunctions/tags";
import { AvailableIcons, Icon } from "@/components/Generic/Icon";
import Link from "next/link";

export default function Home() {
  // надо проверку zod делать всех полей, надоело ?. юзать
  const articlePreviewList: ArticleListElementProps[] = getLatestDocs(2)
    .map(d => getDocBySlugShorten(d.file.split("/")[0] as (typeof articleTypes)[number], d.file.split("/")[1]))
    .map(latestArticle => ({
      title: latestArticle?.meta.title ?? latestArticle?.slug ?? "somehow title didnt load UwU",
      categoryImg: latestArticle?.meta.categoryImg ?? "tech-article",
      tags: [],
      date: latestArticle?.meta.date ?? new Date(0).toISOString(),
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

  const scrollbarItems: { title: string; icon: keyof typeof AvailableIcons; href: string }[] = getRandomArticles(0, 10).articles.map(c => {
    const [category, slug] = c.split("/");
    const docTitle = getArticleMetaField(category, slug, "title");
    const title = docTitle && typeof docTitle === "string" ? docTitle : c;
    const docTag = getDocTopTag(category, slug).tag;
    const icon: keyof typeof AvailableIcons = Object.values(AvailableIcons).includes(docTag)
      ? (docTag as keyof typeof AvailableIcons)
      : "tech-article";
    return { title, icon, href: `${GlobalRoutes.article}${c}` };
  });

  return (
    <div className={classnames("page", styles.home)}>
      {/* @ts-ignore */}
      <RandomHeroWidget externalClassnames={styles.randomWidget} externalWidgetClassnames={{ viewer: styles.viewer }} />
      <BoxesScrollbar
        list={scrollbarItems.map(a => (
          <Link href={a.href} style={{ display: "flex", color: "var(--color-font-default)" }} prefetch={false}>
            <Icon icon={a.icon} />
            <span>{a.title}</span>
          </Link>
        ))}
      />
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
