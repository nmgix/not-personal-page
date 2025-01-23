import { Modal } from "@/components/Generic/Modal";
import { ImageElement } from "@/components/Specialized/ImageList";
import { useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import classnames from "classnames";
import styles from "./image-gallery.module.scss";
import { Image } from "@/components/Generic/Image";
import { useScrollable } from "@/hooks/useScrollable";
// import { Key } from "ts-key-enum";

type ImageGalleryProps = {
  images: ImageElement[];
  size: { width: number; height: number };
} & { ref: React.Ref<GalleryRef> };

export type GalleryRef = {
  setModalOpen: (open: boolean) => void;
  openId: (id: string) => void;
  openIndex: (idx: number) => void;
};

// TODO: check if mobile, then make images size smaller

export const ImageGallery = ({ images, ref, size }: ImageGalleryProps) => {
  //   modal controls START

  const [modalOpen, setModalOpen] = useState(false);
  const onClose = () => setModalOpen(false);

  // gallery control START
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const imagesIndexes = useMemo(() => {
    const mappedIds: { [id: string]: number } = {};
    images.map((img, idx) => (mappedIds[img.id] = idx));
    return mappedIds;
  }, []);
  const openId = (id: string) => {
    setCurrentImageIdx(imagesIndexes[id]);
    setModalOpen(true);
  };
  const openIndex = (idx: number) => {
    setCurrentImageIdx(idx);
    setModalOpen(true);
  };
  useImperativeHandle(ref, () => ({
    setModalOpen,
    openId,
    openIndex
  }));
  // gallery control END
  //   modal controls END

  // controls for images gallery START
  useHotkeys(["a", "left"], () => {
    if (modalOpen === true) setCurrentImage(curr => (curr - 1) % images.length);
  });
  useHotkeys(["d", "right", "tab"], () => {
    if (modalOpen === true) setCurrentImage(curr => (curr + 1) % images.length);
  });

  // controls for images gallery END

  const temporarySizes = { width: 500, height: 250 };
  const imagesListRef = useRef<HTMLDivElement>(null);
  useScrollable(imagesListRef as React.RefObject<HTMLElement>);
  useEffect(() => {
    if (imagesListRef.current) {
      console.log(currentImageIdx);
      const currentNode = imagesListRef.current.childNodes[currentImageIdx] as HTMLElement;
      let left = currentImageIdx > 0 ? currentNode.offsetLeft : 0 + currentImageIdx - 1 == images.length ? 0 : currentNode.clientWidth / 2;
      console.log(currentNode, currentNode.getBoundingClientRect());

      imagesListRef.current.scrollTo({ left, behavior: "smooth" });
      // currentNode.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    }
  }, [currentImageIdx]);
  const onScroll = () => {
    setCurrentImageIdx(0);
  };

  return (
    <Modal ariaLabel={`image gallery (${images.length} images)`} onClose={onClose} show={modalOpen} externalClassnames={classnames(styles.modal)}>
      <div onWheel={onScroll} ref={imagesListRef} className={classnames("box", styles.imageGallery)}>
        {images.map(img => (
          <Image key={img.id} src={img.src} alt={img.alt} showAlt size={temporarySizes} externalClassnames={styles.imageInstance} />
        ))}
      </div>
    </Modal>
  );
};
