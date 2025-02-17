import ImageNext, { StaticImageData } from "next/image";
import classnames from "classnames";
import styles from "./image.module.scss";
import { memo, useState } from "react";

type ImageProps = {
  src: string | StaticImageData;
  alt: string;
  size: { width: number; height: number };
  priority?: boolean;
  showAlt?: boolean;
  externalClassnames?: string | string[];
  omImgLoadCB?: () => void;
  onImgErrorLoadCB?: () => {};
};

type UnionImageProps = (Omit<ImageProps, "size"> & { fill: true }) | ImageProps;

export const Image = ({ externalClassnames, showAlt, omImgLoadCB, onImgErrorLoadCB, ...props }: UnionImageProps) => {
  // memo(
  const [error, setError] = useState(false);
  return (
    <div className={classnames(styles.imageWrapper, externalClassnames)}>
      <ImageNext
        className={styles.image}
        draggable={false}
        {...props}
        width={(props as ImageProps)?.size?.width ?? undefined}
        height={(props as ImageProps)?.size?.height ?? undefined}
        onError={() => {
          setError(true);
          if (onImgErrorLoadCB) onImgErrorLoadCB();
        }}
        onLoad={omImgLoadCB}
      />
      {(showAlt || error) === true && <span className={styles.imageAlt}>{props.alt}</span>}
    </div>
  );
};
//   (prev, next) => prev.src === next.src
// );
Image.displayName = "Image";
