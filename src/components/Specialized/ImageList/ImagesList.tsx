import { Button } from "@/components/Generic/Buttons/Default/Default-Button";
import { Image } from "@/components/Generic/Image";
import { useRef } from "react";
import classnames from "classnames";

import styles from "./images-list.module.scss";

export type ImageElement = { id: string; src: string; alt: string };

type ImageListProps = {
  images: ImageElement[];
  size: { width: number; height: number };
  galleryButton: boolean;
  imageThreshold?: number;
  externalClassnames?: string | string[];
};

export const ImageList = ({ images, size, galleryButton = false, imageThreshold = 3, externalClassnames }: ImageListProps) => {
  const _temporaryImagesList = useRef(
    images !== undefined && images.length > 0
      ? images.slice(0, imageThreshold).map((img, idx) =>
          galleryButton === true ? (
            <Button title='open image' onClick={() => console.log("open gallery, somehow, img idx: " + idx)} externalClassnames={styles.imageButton}>
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
    <div className={classnames(styles.imageListWrapper, externalClassnames)}>
      <div className={styles.imageList}>
        {React.Children.map(_temporaryImagesList.current, (child, idx) => React.cloneElement(child, { key: idx }))}
      </div>
      {imagesLeft.current &&
        (galleryButton === false ? (
          <span className={styles.imagesAmount}>+{imagesLeft.current}</span>
        ) : (
          <Button
            title='open gallery'
            onClick={() => console.log("open gallery, somehow, open at " + imageThreshold)}
            externalClassnames={styles.imagesAmount}>
            <>+{imagesLeft.current}</>
          </Button>
        ))}
    </div>
  );
};
ImageList.displayName = "ImageList";
