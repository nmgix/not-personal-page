import { VideoPreview, VideoPreviewProps } from "@/components/Specialized/VideoPreview";
import classnames from "classnames";
import styles from "./videos-preview.module.scss";
import { ExternalClassnames } from "@/types/components";

type VideosPreviewProps = {
  videos: VideoPreviewProps[];
} & ExternalClassnames;

export const VideosPreview = ({ videos, externalClassnames }: VideosPreviewProps) => {
  return (
    <div className={classnames(styles.videosPreview, externalClassnames)}>
      {/* что-то намутить чтобы не рендерились компоненты вне viewport, в articlelist то-же самое сделать */}
      <div className={styles.grid}>
        {videos.map(v => (
          <VideoPreview key={v.id} {...v} />
        ))}
      </div>
    </div>
  );
};
