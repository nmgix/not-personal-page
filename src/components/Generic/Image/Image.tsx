import ImageNext from "next/image";
import styles from "./image.module.scss";

type ImageProps = {
  src: string;
  alt: string;
  size: { width: number; height: number };
  showAlt?: boolean;
};
export const Image = ({ src, alt, size, showAlt }: ImageProps) => {
  return (
    <div className={styles.imageWrapper}>
      <ImageNext className={styles.image} src={src} alt={alt} width={size.width} height={size.height} draggable={false} />
      {showAlt === true && <span className={styles.imageAlt}>{alt}</span>}
    </div>
  );
};
