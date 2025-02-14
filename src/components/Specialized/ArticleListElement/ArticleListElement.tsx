import Link from "next/link";
import styles from "./articles-list-element.module.scss";
import classnames from "classnames";
import { BoxesScrollbar } from "../BoxesScrollbar";
import { useRef } from "react";
import { ImageElement, ImageList } from "@/components/Specialized/ImageList";
import { ArticleListElementProps } from "@/types/articles";

export const ArticleListElement = ({ TTRmins, id, imagesSrc, previewImages, href, tags, textPreview, title }: ArticleListElementProps) => {
  const tagsRef = useRef(tags.map(tag => <div className='articleTag'>#{tag}</div>));
  const formatedTTR = useRef(Math.floor(TTRmins > 60 ? TTRmins / 60 : TTRmins));
  const imagesList = useRef<ImageElement[]>(
    imagesSrc !== undefined && imagesSrc.length > 0
      ? imagesSrc.map((i, idx) => ({ src: i, alt: `${title} article img preview. img ${Number(idx + 1)}` }))
      : []
  );

  return (
    <Link href={href}>
      <article className={classnames("box", styles.articlesListElement)}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.info}>
          {/* хз как сделать propogation чтобы теги вместо всего link  при ховер срабатывали */}
          <BoxesScrollbar list={tagsRef.current} externalClassnames={styles.tags} />
          <span className='TTR'>{formatedTTR.current}min</span>
        </div>
        <div className={styles.textWrapper}>
          {previewImages && (
            <ImageList
              galleryButton={false}
              size={{ width: 70, height: 70 }}
              images={imagesList.current}
              imageThreshold={3}
              externalClassnames={styles.imagesList}
            />
          )}
          {textPreview && <p className={styles.textPreview}>{textPreview}</p>}
        </div>
      </article>
    </Link>
  );
};
ArticleListElement.displayName = "ArticleListElement";
