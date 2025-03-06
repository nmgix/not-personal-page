import { VideoPreview } from "@/components/Specialized/VideoPreview";
import classnames from "classnames";
import styles from "./videos-preview.module.scss";
import { ExternalClassnames } from "@/types/components";
import { ArticleVideoPreview } from "@/types/articles";

type VideosPreviewProps = {
  videos: ArticleVideoPreview[];
} & ExternalClassnames;

export const VideosPreview = ({ videos, externalClassnames }: VideosPreviewProps) => {
  return (
    <div className={classnames(styles.videosPreview, externalClassnames)}>
      {/* что-то намутить чтобы не рендерились компоненты вне viewport, в articlelist то-же самое сделать */}
      <div className={styles.grid}>
        {videos.map(v => (
          <VideoPreview key={v.slug} {...v} />
        ))}
      </div>
    </div>
  );
};
