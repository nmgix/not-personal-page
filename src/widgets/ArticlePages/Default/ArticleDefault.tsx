import classnames from "classnames";
import { ArticleTag, TArticleDefault } from "@/types/articles";
import { ExternalClassnames } from "@/types/components";
import styles from "./article-default.module.scss";
import { dateTimeAgo, formatDate } from "@/helpers/date";
import Link from "next/link";
import { ImageList } from "@/components/Specialized/ImageList";
import { BackButton } from "@/components/Generic/Buttons";
import Markdown from "markdown-to-jsx";
import { ArticleFields } from "@/types/consts";
import { Image } from "@/components/Generic/Image";
import { createElement } from "react";
import { getBaseURL, getRelativeImgUrl } from "@/helpers/url";

const normalize = (value: number, min: number, max: number, newMin = 10, newMax = 70) => {
  if (value == min && value == max) return value;
  return ((value - min) / (max - min)) * (newMax - newMin) + newMin;
};

export type ArticleDefaultProps = {
  mappedTextLinks?: { href: string; title?: string }[];
  mappedTags?: ArticleTag[];
  slug: string;
  text: string;
} & Omit<TArticleDefault, "tags"> &
  ExternalClassnames;
export const ArticleDefault = async ({
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
  const localDate = formatDate(date);

  const minPopularity = Math.min(...(mappedTags ?? []).map(t => t.popularity));
  const maxPopularity = Math.max(...(mappedTags ?? []).map(t => t.popularity));
  const dateInvalid = localDate === "Invalid Date";

  const host = await getBaseURL();

  return (
    <div className={classnames("page", styles.articleDefault, externalClassnames)}>
      <BackButton externalClassnames={styles.backBtn} />
      <div>
        <div className={styles.rightPanel}>
          <span className={styles.articleDate}>
            {!dateInvalid ? localDate : ""} &#40;{!dateInvalid ? timeAgo : "Нет даты T_T"}&#41;
          </span>
          {mappedTags !== undefined && mappedTags?.length > 0 && (
            <div className={styles.tags}>
              {mappedTags.map(t => (
                <Link
                  prefetch={false}
                  key={t.tag}
                  href={`/articles?${ArticleFields["tag"]}=${t.tag}`}
                  style={{ opacity: normalize(t.popularity, minPopularity, maxPopularity) / 100 }}>
                  #{t.tag}
                </Link>
              ))}
            </div>
          )}
          {mappedTextLinks !== undefined && mappedTextLinks?.length > 0 && (
            <div className={styles.links}>
              {mappedTextLinks.map(l => (
                <a key={l.href} href={l.href} rel='noreferrer'>
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
            {title ?? slug}
          </h2>
          {/* overrides поле не помешает чтобы рендерить code блоки кастомным компонентом */}
          <Markdown
            options={{
              createElement(type, props, children) {
                if (type === "img")
                  // return createElement("img", {
                  //   ...props,
                  //   draggable: false,
                  //   style: { width: "100%" },
                  //   src: getRelativeImgUrl((props as { src: string })["src"], host.origin, {
                  //     category: slug.split("/")[0],
                  //     name: slug.split("/")[1]
                  //   })
                  // });
                  return (
                    <Image
                      fill
                      alt={(props as { alt: string })["alt"]}
                      src={getRelativeImgUrl((props as { src: string })["src"], host.origin, {
                        category: slug.split("/")[0],
                        name: slug.split("/")[1]
                      })}
                    />
                  );
                else return createElement(type, props, children);
              }
            }}>
            {text}
          </Markdown>
          {/* {Array.isArray(text) ? (text as string[]).map(t => <span>{t}</span>) : text} */}
        </div>
      </div>
    </div>
  );
};
