import { Button } from "@/components/Generic/Buttons/Default/Default-Button";
import { Image } from "@/components/Generic/Image";
import { useRef } from "react";
import classnames from "classnames";

import styles from "./images-list.module.scss";

type ImageListProps = {
  images: { src: string; alt: string }[];
  size: { width: number; height: number };
  galleryButton: boolean;
  imageThreshold?: number;
  extraClassnames?: string | string[];
};

export const ImageList = ({ images, size, galleryButton = false, imageThreshold = 3, extraClassnames }: ImageListProps) => {
  const _temporaryImagesList = useRef(
    images !== undefined && images.length > 0
      ? images.slice(0, imageThreshold).map((img, idx) =>
          galleryButton === true ? (
            <Button onClick={() => console.log("open gallery, somehow, img idx: " + idx)} extraClassnames={styles.imageButton}>
              <Image src={img.src} size={size} showAlt={false} alt={img.alt} />
            </Button>
          ) : (
            <Image src={img.src} size={size} showAlt={false} alt={img.alt} />
          )
        )
      : []
  );
  const imagesLeft = useRef(images.length > imageThreshold ? images.length - imageThreshold : undefined);

  return (
    <div className={classnames(styles.imageListWrapper, extraClassnames)}>
      <div className={styles.imageList}>{_temporaryImagesList.current}</div>
      {imagesLeft.current &&
        (galleryButton === false ? (
          <span className={styles.imagesAmount}>+{imagesLeft.current}</span>
        ) : (
          <Button onClick={() => console.log("open gallery, somehow, open at " + imageThreshold)} extraClassnames={styles.imagesAmount}>
            <>+{imagesLeft.current}</>
          </Button>
        ))}
    </div>
  );
};
