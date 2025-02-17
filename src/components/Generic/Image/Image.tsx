import ImageNext, { StaticImageData } from "next/image";
import classnames from "classnames";
import styles from "./image.module.scss";

type ImageProps = {
  src: string | StaticImageData;
  alt: string;
  size: { width: number; height: number };
  priority?: boolean;
  showAlt?: boolean;
  externalClassnames?: string | string[];
};

type UnionImageProps = (Omit<ImageProps, "size"> & { fill: true }) | ImageProps;

export const Image = ({ externalClassnames, showAlt, ...props }: UnionImageProps) => {
  return (
    <div className={classnames(styles.imageWrapper, externalClassnames)}>
      <ImageNext
        className={styles.image}
        draggable={false}
        {...props}
        width={(props as ImageProps)?.size?.width ?? undefined}
        height={(props as ImageProps)?.size?.height ?? undefined}
      />
      {showAlt === true && <span className={styles.imageAlt}>{props.alt}</span>}
    </div>
  );
};
Image.displayName = "Image";
