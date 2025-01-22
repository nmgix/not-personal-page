import { Modal } from "@/components/Generic/Modal";
import { ImageElement } from "@/components/Specialized/ImageList";
import { useImperativeHandle, useMemo, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import classnames from "classnames";
import styles from "./image-gallery.module.scss";
import { Image } from "@/components/Generic/Image";
import { useFade } from "@/hooks/useFade";
import { useScrollable } from "@/hooks/useScrollable";

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
  const [currentImage, setCurrentImage] = useState(0);
  const imagesIndexes = useMemo(() => {
    const mappedIds: { [id: string]: number } = {};
    images.map((img, idx) => (mappedIds[img.id] = idx));
    return mappedIds;
  }, []);
  const openId = (id: string) => {
    setCurrentImage(imagesIndexes[id]);
    setModalOpen(true);
  };
  const openIndex = (idx: number) => {
    setCurrentImage(idx);
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
  //   const { updateScrollFn } = useFade(imagesListRef as React.RefObject<HTMLElement>, true, {
  //     sideOne: "fadeLeft",
  //     sideTwo: "fadeRight",
  //     bothSides: "fadeLeftRight"
  //   }); // эффект fade'а прикольный, но не подходит
  // onScroll={updateScrollFn} ref={imagesListRef}
  // e.preventDefault();
  // nodeRef.current.scrollTo({
  //   left: nodeRef.current.scrollLeft + e.deltaY,
  //   behavior: "smooth"
  // });

  useScrollable(imagesListRef as React.RefObject<HTMLElement>);

  return (
    <Modal ariaLabel={`image gallery (${images.length} images)`} onClose={onClose} show={modalOpen} externalClassnames={classnames(styles.modal)}>
      <div ref={imagesListRef} className={classnames("box", styles.imageGallery)}>
        {images.map(img => (
          <Image key={img.id} src={img.src} alt={img.alt} showAlt size={temporarySizes} externalClassnames={styles.imageInstance} />
        ))}
      </div>
    </Modal>
  );
};
