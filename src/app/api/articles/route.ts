import { findInDoc, getDocBySlug, getDocBySlugShorten } from "@/app/serverfunctions/getDoc";
import { splitQuery } from "@/app/serverfunctions/helpers";
import { getPopularTags, searchByTags } from "@/app/serverfunctions/tags";
import { urldecode } from "@/helpers/url";
import { ArticleListElementProps } from "@/types/articles";
import { ArticleFields } from "@/types/consts";

type QueryParams = Partial<Record<ArticleFields, string>>;

// , { params }: { params?: string }
export async function GET(req: Request) {
  // console.log(req.query);
  const query: QueryParams = splitQuery(req.url);
  // console.log(query);
  let searchTags: string[] = [];
  let articleTag = query["article_tag"];
  if (articleTag) searchTags.push(articleTag);
  let articleText = query["article-text"]
    ?.split("+")
    .filter(w => w.length > 0)
    .map(w => urldecode(w));
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
  return new Response(JSON.stringify({ articles }), { status: 200, statusText: "wow, WW" });
}
