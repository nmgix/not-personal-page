import ImageNext from "next/image";
import classnames from "classnames";
import styles from "./image.module.scss";

type ImageProps = {
  src: string;
  alt: string;
  size: { width: number; height: number };
  showAlt?: boolean;
  externalClassnames?: string | string[];
};
export const Image = ({ src, alt, size, showAlt, externalClassnames }: ImageProps) => {
  return (
    <div className={classnames(styles.imageWrapper, externalClassnames)}>
      <ImageNext className={styles.image} src={src} alt={alt} width={size.width} height={size.height} draggable={false} />
      {showAlt === true && <span className={styles.imageAlt}>{alt}</span>}
    </div>
  );
};
Image.displayName = "Image";
