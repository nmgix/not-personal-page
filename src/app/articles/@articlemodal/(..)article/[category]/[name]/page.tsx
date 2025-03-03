import ArticlePage from "@/app/article/[category]/[name]/page";
import { ComponentProps } from "react";
import { ArticleModal } from "./components/ArticleModal";

export default async function ArticlePageModal(props: ComponentProps<typeof ArticlePage>) {
  return (
    (<div>
      <ArticleModal>
        <ArticlePage /* @next-codemod-error 'props' is used with spread syntax (...). Any asynchronous properties of 'props' must be awaited when accessed. */
        {...props} />
      </ArticleModal>
    </div>)
  );
}
