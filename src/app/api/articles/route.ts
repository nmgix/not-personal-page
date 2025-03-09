import { splitQuery } from "@/serverfunctions/helpers";
import { urldecode } from "@/helpers/url";
import { ArticleFields } from "@/types/consts";
import { getArticle } from "@/serverfunctions/getArticles";

type QueryParams = Partial<Record<ArticleFields, string>>;

export async function GET(req: Request) {
  const query: QueryParams = splitQuery(req.url);
  const foundArticles = getArticle(
    query["article_tag"],
    query["article-text"]
      ?.split("+")
      .filter(w => w.length > 0)
      .map(w => urldecode(w))
  );

  return new Response(JSON.stringify({ articles: foundArticles }), { status: 200 });
}
