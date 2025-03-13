import classnames from "classnames";
import styles from "./video-preview.module.scss";
import { Image } from "@/components/Generic/Image";
import Link from "next/link";
import { Icon } from "@/components/Generic/Icon";
import { ExternalClassnames } from "@/types/components";
import { ArticleVideoPreview, GlobalRoutes } from "@/types/articles";

const descriptionLimit = 51;

// function formatTime(seconds: number) {
//   const minutes = Math.floor(seconds / 60);
//   const remainingSeconds = seconds % 60;

//   // Добавляем ведущий ноль, если секунды меньше 10
//   const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

//   return `${minutes}:${formattedSeconds}`;
// }

type VideoPreviewProps = ArticleVideoPreview & ExternalClassnames;

export const VideoPreview = ({ meta, slug, externalClassnames }: VideoPreviewProps) => {
  return (
    <Link prefetch={false} href={`${GlobalRoutes.article}${slug}`} className={classnames("box", styles.videoPreview, externalClassnames)}>
      {typeof meta.imagePlaceholderSrc === "string" && (
        <Image src={meta.imagePlaceholderSrc} alt={`thumbnail of "${meta.title}"`} fill externalClassnames={styles.thumbnail} />
      )}
      <div className={styles.previewDescription}>
        {typeof meta.videoSrc === "string" && meta.videoSrc.length > 0 && (
          // вот тут будет 'use client' компонент который бузет в буфер загружать видео и получать его длину выводя отдельно
          <video className={styles.video} src={meta.videoSrc} autoPlay loop muted preload='metadata' />
        )}
        <div className={styles.top}>
          <h4 className={styles.title}>{meta.title}</h4>
          <p className={styles.shortDescription}>
            {meta.textPreview && meta.textPreview.length > descriptionLimit ? `${meta.textPreview.slice(0, descriptionLimit)}...` : meta.textPreview}
          </p>
        </div>
        <div className={styles.bottom}>
          {/* <span className={styles.videoLength}>{formatTime(videoLength)}</span> */}
          {meta.relatedTagsIcons !== undefined && (
            <div className={styles.tags}>
              {meta.relatedTagsIcons.map(t => (
                <Icon icon={t} key={t} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
