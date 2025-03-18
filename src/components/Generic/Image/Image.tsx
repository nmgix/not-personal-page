// import ImageNext, { StaticImageData } from "next/image";
import classnames from "classnames";
import styles from "./image.module.scss";
import { ExternalClassnames } from "@/types/components";

type ImageProps = {
  src: string;
  alt: string;
  size: { width: number; height: number };
  // priority?: boolean;
  showAlt?: boolean;
  omImgLoadCB?: () => void;
  onImgErrorLoadCB?: () => {};
} & ExternalClassnames;

type UnionImageProps = (Omit<ImageProps, "size"> & { fill: true }) | ImageProps;

export const Image = ({ externalClassnames, showAlt, omImgLoadCB, onImgErrorLoadCB, ...props }: UnionImageProps) => {
  console.log(props.src);
  return (
    <div className={classnames(styles.imageWrapper, externalClassnames)}>
      {/* <ImageNext
        
        className={styles.image}
        draggable={false}
        {...props}
        width={(props as ImageProps)?.size?.width ?? undefined}
        height={(props as ImageProps)?.size?.height ?? undefined}
        onError={onImgErrorLoadCB}
        onLoad={omImgLoadCB}
      /> */}
      <img src={props.src} alt={props.alt} className={styles.image} draggable={false} onError={onImgErrorLoadCB} onLoad={omImgLoadCB} />
      <span className={classnames(styles.imageAlt, showAlt && "img-show")}>{props.alt}</span>
    </div>
  );
};
Image.displayName = "Image";
