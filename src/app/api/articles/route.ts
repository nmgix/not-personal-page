import { getDocBySlugShorten } from "@/app/serverfunctions/getDoc";
import { splitQuery } from "@/app/serverfunctions/helpers";
import { getPopularTags, searchByTags } from "@/app/serverfunctions/tags";
import { ArticleListElementProps } from "@/types/articles";
import { NextApiRequest } from "next";

type QueryParams = {
  "article-text"?: string;
  page?: number;
};

// , { params }: { params?: string }
export async function GET(req: Request) {
  // console.log(req.query);
  const query: QueryParams = splitQuery(req.url);
  console.log(query);
  let searchTags = query["article-text"]?.split("+");
  console.log({ searchTags });
  if (!searchTags) {
    // return new Response("no tags", { status: 400, statusText: "not WW" });
    searchTags = getPopularTags(3).map(t => t.tag);
  }
  const foundArticlesSlugs = searchByTags(searchTags ?? []);
  console.log({ foundArticlesSlugs });
  const articles: ArticleListElementProps[] = [];
  if (foundArticlesSlugs.length > 0) {
    foundArticlesSlugs.forEach(slug => {
      const [category, fileRoute] = slug.split("/");
      const article = getDocBySlugShorten(category, fileRoute);
      if (article !== undefined) articles.push({ ...article.meta, slug });
    });
  }
  console.log({ articles });
  return new Response(JSON.stringify({ articles }), { status: 200, statusText: "wow, WW" });
}
