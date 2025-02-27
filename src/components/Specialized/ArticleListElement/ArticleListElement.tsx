import Link from "next/link";
import styles from "./articles-list-element.module.scss";
import classnames from "classnames";
import { BoxesScrollbar } from "../BoxesScrollbar";
import { ImageList } from "@/components/Specialized/ImageList";
import { ArticleListElementProps, GlobalRoutes } from "@/types/articles";

export const ArticleListElement = ({ TTRmins, categoryImg, slug, tags, title, imagesSrc, previewImages, textPreview }: ArticleListElementProps) => {
  const formatedTTR = !isNaN(Number(TTRmins)) ? Math.floor(TTRmins > 60 ? TTRmins / 60 : TTRmins) : 0; // хз будет recalculate, наверное, но хуки ни-ни

  return (
    <Link href={`${GlobalRoutes.article}${slug ?? ""}`}>
      <article className={classnames("box", styles.articlesListElement)}>
        <h3 className={styles.title}>{title ?? slug ?? "Статья"}</h3>
        <div className={styles.info}>
          {/* хз как сделать propogation чтобы теги вместо всего link  при ховер срабатывали */}
          <BoxesScrollbar
            list={(tags ?? []).map(tag => (
              <div className='articleTag'>#{tag}</div>
            ))}
            externalClassnames={styles.tags}
          />
          <span className='TTR'>{formatedTTR}min</span>
        </div>
        <div className={styles.textWrapper}>
          {previewImages && (
            <ImageList
              galleryButton={false}
              size={{ width: 70, height: 70 }}
              images={imagesSrc ?? []}
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
