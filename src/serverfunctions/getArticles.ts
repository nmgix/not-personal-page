import { ArticleListElementProps } from "@/types/articles";
import { getPopularTags, searchByTags } from "./tags";
import { findInDoc, getDocBySlugShorten } from "./getDoc";

export const getArticles = (articleTag?: string, articleText?: string[], articleCategory?: string) => {
  let searchTags: string[] = [];
  if (articleTag) searchTags.push(articleTag);
  else searchTags = getPopularTags(3).map(t => t.tag);

  // articleCategory либо тут

  const foundArticlesSlugs = searchByTags(searchTags ?? []);
  // либо вот тут            ^ articleCategory втиснуть типо искать по тегам внутри категории

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
