"use client";

import { Modal } from "@/components/Generic/Modal";
import { GlobalRoutes } from "@/types/articles";
import { useRouter } from "next/navigation";

import styles from "./article-modal.module.scss";

export const ArticleModal = ({ children }: { children: React.ReactElement }) => {
  const router = useRouter();
  return (
    <Modal
      ariaLabel='article page modal'
      externalClassnames={styles.modal}
      onClose={() => router.push(GlobalRoutes.articles)}
      show
      hideCloseBtn
      outsideToClose
      routerBackOnClose>
      {children}
    </Modal>
  );
};
