import ArticlePage from "@/app/article/[category]/[name]/page";
import { ComponentProps } from "react";
import { ArticleModal } from "./components/ArticleModal";

export default async function ArticlePageModal(props: ComponentProps<typeof ArticlePage>) {
  return (
    <div>
      <ArticleModal>
        <ArticlePage {...props} />
      </ArticleModal>
    </div>
  );
}
