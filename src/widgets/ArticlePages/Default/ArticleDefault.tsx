import classnames from "classnames";
import { ArticleTag, TArticleDefault } from "@/types/articles";
import { ExternalClassnames } from "@/types/components";
import styles from "./article-default.module.scss";
import { dateTimeAgo } from "@/helpers/dateTimeAgo";
import Link from "next/link";
import { ImageList } from "@/components/Specialized/ImageList";
import { BackButton } from "@/components/Generic/Buttons";
import Markdown from "markdown-to-jsx";

export type ArticleDefaultProps = { mappedTextLinks?: { href: string; title?: string }[]; mappedTags?: ArticleTag[]; slug: string } & Omit<
  TArticleDefault,
  "tags"
> &
  ExternalClassnames;
export const ArticleDefault = ({
  title,
  mappedTags,
  text,
  mappedTextLinks,
  // TTRmins,
  imagesSrc,
  externalClassnames,
  date,
  slug
}: ArticleDefaultProps) => {
  const d = new Date(date);
  const timeAgo = dateTimeAgo(d);
  const localDate = d
    .toLocaleTimeString("ru-RU", {
      // hour: "2-digit",
      // minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",

      timeZone: process.env.NEXT_PUBLIC_TIMEZONE
    })
    .replace("-", "/");

  return (
    <div className={classnames("page", styles.articleDefault, externalClassnames)}>
      <BackButton />
      <div>
        <div className={styles.rightPanel}>
          <span className={styles.articleDate}>
            {localDate} &#40;{timeAgo}&#41;
          </span>
          {mappedTags !== undefined && mappedTags?.length > 0 && (
            <div className={styles.tags}>
              {mappedTags.map(t => (
                <Link key={t.tag} href={`/articles?article_type=${t.tag}&article-text=&page=1`} style={{ opacity: (70 - t.popularity) / 100 }}>
                  #{t.tag}
                </Link>
              ))}
            </div>
          )}
          {mappedTextLinks !== undefined && mappedTextLinks?.length > 0 && (
            <div className={styles.links}>
              {mappedTextLinks.map(l => (
                <a href={l.href} rel='noreferrer'>
                  {l.title ? l.title : l.href}
                </a>
              ))}
            </div>
          )}
          {imagesSrc !== undefined && imagesSrc.length > 0 && (
            <ImageList galleryButton images={imagesSrc} size={{ width: 50, height: 50 }} externalClassnames={styles.images} imageThreshold={3} />
          )}
        </div>
        <div className={styles.articleContent}>
          {/* <a href='/' title={id} */}
          <h2 className={styles.title} data-id={slug}>
            {title}
          </h2>
          <Markdown>{text}</Markdown>
          {/* {Array.isArray(text) ? (text as string[]).map(t => <span>{t}</span>) : text} */}
        </div>
      </div>
    </div>
  );
};
