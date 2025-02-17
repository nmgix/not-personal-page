import classnames from "classnames";
import styles from "./video-preview.module.scss";
import { Image } from "@/components/Generic/Image";
import Link from "next/link";
import { AvailableIcons, Icon } from "@/components/Generic/Icon";
import { ExternalClassnames } from "@/types/components";

export type VideoPreviewProps = {
  id: string;
  shortenedVideoSrc: string;
  videoLength: number;
  title: string;
  shortenedDescription: string;
  thumbnailSrc: string;
  href: string;
  relatedTags?: (keyof typeof AvailableIcons)[];
} & ExternalClassnames;

const descriptionLimit = 51;

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // Добавляем ведущий ноль, если секунды меньше 10
  const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

  return `${minutes}:${formattedSeconds}`;
}

export const VideoPreview = ({
  shortenedDescription,
  shortenedVideoSrc,
  title,
  videoLength,
  relatedTags,
  thumbnailSrc,
  href,
  externalClassnames
}: VideoPreviewProps) => {
  return (
    <Link href={href} className={classnames("box", styles.videoPreview, externalClassnames)}>
      <Image src={thumbnailSrc} alt={`thumbnail of "${title}"`} fill externalClassnames={styles.thumbnail} />
      <div className={styles.previewDescription}>
        {typeof shortenedVideoSrc === "string" && shortenedVideoSrc.length > 0 && (
          <video className={styles.video} src={shortenedVideoSrc} autoPlay loop muted preload='metadata' />
        )}
        <div className={styles.top}>
          <h4 className={styles.title}>{title}</h4>
          <p className={styles.shortDescription}>
            {shortenedDescription.length > descriptionLimit ? `${shortenedDescription.slice(0, descriptionLimit)}...` : shortenedDescription}
          </p>
        </div>
        <div className={styles.bottom}>
          <span className={styles.videoLength}>{formatTime(videoLength)}</span>
          {relatedTags !== undefined && (
            <div className={styles.tags}>
              {relatedTags.map(t => (
                <Icon icon={t} key={t} />
              ))}
            </div>
          )}
        </div>
        {/* видео не играет :( */}
      </div>
    </Link>
  );
};
