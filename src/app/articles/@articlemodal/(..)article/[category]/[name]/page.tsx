// "use client";

import ArticlePage from "@/app/article/[category]/[name]/page";
import { Modal } from "@/components/Generic/Modal";
import { ComponentProps } from "react";
// import { useRouter } from "next/navigation";

export default async function ArticlePageModal(props: ComponentProps<typeof ArticlePage>) {
  // const router = useRouter()
  // onClose = {() => {
  //   router.back()
  // }}
  return (
    <Modal outsideToClose ariaLabel='article page modal' onClose={undefined} show hideCloseBtn>
      <ArticlePage {...props} />
    </Modal>
  );
}
