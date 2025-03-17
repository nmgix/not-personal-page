import { splitQuery } from "@/serverfunctions/helpers";
import { urldecode } from "@/helpers/url";
import { ArticleFields, articlesSearchConsts } from "@/types/consts";
import { getArticles } from "@/serverfunctions/getDoc";

type QueryParams = Partial<Record<ArticleFields, string>>;

export async function GET(req: Request) {
  const query: QueryParams = splitQuery(req.url);
  const start = (Number(query[ArticleFields.page]) ?? 0) * articlesSearchConsts.articlesPerPage;
  const limit = !isNaN(Number(query[ArticleFields.limit])) ? Number(query[ArticleFields.limit]) : articlesSearchConsts.articlesPerPage;

  const foundArticles = getArticles(
    {
      category: query[ArticleFields.category],
      tag: query[ArticleFields.tag],
      text: query[ArticleFields.text]
        ?.split("+")
        .filter(w => w.length > 0)
        .map(w => urldecode(w))
    },
    { start, limit }
  );

  return new Response(JSON.stringify({ articles: foundArticles.articles, total: foundArticles.total }), { status: 200 });
}
