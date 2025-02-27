"use client";

import { Modal } from "@/components/Generic/Modal";
import { GlobalRoutes } from "@/types/articles";
import { useRouter } from "next/navigation";

export const ArticleModal = ({ children }: { children: React.ReactElement }) => {
  const router = useRouter();
  return (
    <Modal ariaLabel='article page modal' onClose={() => router.push(GlobalRoutes.articles)} show hideCloseBtn outsideToClose routerBackOnClose>
      {children}
    </Modal>
  );
};
