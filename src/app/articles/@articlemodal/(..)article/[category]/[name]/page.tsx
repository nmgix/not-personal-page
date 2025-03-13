import ArticlePage from "@/app/article/[category]/[name]/page";
import { ComponentProps, Suspense } from "react";
import { ArticleModal } from "./components/ArticleModal";
import { Modal } from "@/components/Generic/Modal";
import Skeleton from "react-loading-skeleton";
import ArticleModalStyles from "./components/article-modal.module.scss";

export default async function ArticlePageModal(props: ComponentProps<typeof ArticlePage>) {
  return (
    <Suspense
      fallback={
        // оно вообще работает? лол
        <Modal ariaLabel='article modal' hideCloseBtn show externalClassnames={[ArticleModalStyles.modal, ArticleModalStyles.loader]}>
          <div>
            <Skeleton style={{ height: 24, backgroundColor: "#bfbfbf" }} />
            <Skeleton style={{ height: 16, backgroundColor: "#bfbfbf" }} />
          </div>
          <Skeleton count={14} style={{ height: 14, backgroundColor: "#bfbfbf" }} />
        </Modal>
      }>
      <div>
        <ArticleModal>
          <ArticlePage {...props} />
        </ArticleModal>
      </div>
    </Suspense>
  );
}
