import { ArticleListElementProps } from "@/types/articles";
import { getPopularTags, searchByTags } from "./tags";
import { findInDoc, getDocBySlugShorten } from "./getDoc";

export const getArticle = (articleTag?: string, articleText?: string[]) => {
  let searchTags: string[] = [];
  if (articleTag) searchTags.push(articleTag);

  // console.log({ searchTags });
  if (!articleTag) {
    // return new Response("no tags", { status: 400, statusText: "not WW" });
    searchTags = getPopularTags(3).map(t => t.tag);
  }
  const foundArticlesSlugs = searchByTags(searchTags ?? []);
  // console.log({ foundArticlesSlugs });
  const articles: ArticleListElementProps[] = [];
  if (foundArticlesSlugs.length > 0) {
    if (articleText && articleText.length > 0) {
      foundArticlesSlugs.forEach(slug => {
        const [category, fileRoute] = slug.split("/");
        const article = findInDoc(category, fileRoute, articleText, false);
        if (article) articles.push({ ...article.meta, slug });
      });
    } else {
      foundArticlesSlugs.forEach(slug => {
        const [category, fileRoute] = slug.split("/");
        const article = getDocBySlugShorten(category, fileRoute);
        if (article !== undefined) articles.push({ ...article.meta, slug });
      });
    }
  }
  return articles;
};
