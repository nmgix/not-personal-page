import classnames from "classnames";
import { TArticleDefault } from "@/types/articles";
import { ExternalClassnames } from "@/types/components";
import styles from "./article-default.module.scss";
import { Back } from "./components/Back";
import { dateTimeAgo } from "@/helpers/dateTimeAgo";
import Link from "next/link";

export type ArticleDefaultProps = { mappedTextLinks?: { href: string; title?: string }[]; mappedTags?: { popularity: number; tag: string }[] } & Omit<
  TArticleDefault,
  "tags"
> &
  ExternalClassnames;
export const ArticleDefault = ({ title, id, mappedTags, text, mappedTextLinks, TTRmins, externalClassnames, date }: ArticleDefaultProps) => {
  const timeAgo = dateTimeAgo(date);
  const localDate = new Date(date)
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
    <div className={classnames(styles.articleDefault, externalClassnames)}>
      <Back />
      <div>
        <div className={styles.rightPanel}>
          <span className={styles.articleDate}>
            {localDate} &#40;{timeAgo}&#41;
          </span>
          {mappedTags !== undefined && mappedTags?.length > 0 && (
            <div className={styles.tags}>
              {mappedTags.map(t => (
                <Link href={`/articles?article_type=${t.tag}&article-text=&page=1`} style={{ opacity: (70 - t.popularity) / 100 }}>
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
        </div>
        <div className={styles.articleContent}>
          {/* <a href='/' title={id} */}
          <h2 className={styles.title} data-id={id}>
            {title}
          </h2>
          {Array.isArray(text) ? (text as string[]).map(t => <span>{t}</span>) : text}
        </div>
      </div>
    </div>
  );
};
