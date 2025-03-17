import { getArticles } from "@/serverfunctions/getDoc";
import { ArticleListElementProps } from "@/types/articles";
import { ArticleFields, articlesSearchConsts } from "@/types/consts";
import { useState, useTransition } from "react";

type ArticlesState = {
  articles: ArticleListElementProps[] | null | undefined;
  lastRequestResult: null | number;
  total: number;
};

export type ArticleQuery = {
  [ArticleFields.page]: number;
  [ArticleFields.category]: string;
  [ArticleFields.limit]: number | undefined;
  [ArticleFields.tag]: string;
  [ArticleFields.text]: string;
};

export interface SearchParams {
  [key: string]: string;
}

export const getUrlSearchParams = (fd: FormData | undefined, extraProps?: { [key: string]: string | number | undefined }): URLSearchParams => {
  const params = new URLSearchParams({
    ...Object.fromEntries(
      Array.from(fd ?? []).filter(function ([_, v]) {
        return v;
      })
    ),
    ...(extraProps as {})
  });
  let keysToDel: string[] = [];
  params.forEach((v, k) => (v === null || v === undefined || v.trim() === "") && keysToDel.push(k));
  keysToDel.forEach(k => params.delete(k));
  return params;
};

export const useArticlesSearch = (
  onResults?: (data: any[]) => void,
  predefinedState?: Partial<ArticlesState>,
  prefedinedControlsState?: { searchParams?: SearchParams; page?: number }
) => {
  const [loading, setTransition] = useTransition();

  const [articleQuery, setArticleQuery] = useState<ArticleQuery>({
    page: prefedinedControlsState?.page ?? 0,
    limit: !isNaN(Number(prefedinedControlsState?.searchParams?.[ArticleFields.limit]))
      ? Number(prefedinedControlsState?.searchParams?.[ArticleFields.limit])
      : articlesSearchConsts.articlesPerPage,
    article_tag: prefedinedControlsState?.searchParams?.[ArticleFields.tag] ?? "",
    "article-category": prefedinedControlsState?.searchParams?.[ArticleFields.category] ?? "",
    "article-text": prefedinedControlsState?.searchParams?.[ArticleFields.text] ?? ""
  });

  const [articlesData, setArticlesData] = useState<ArticlesState>({
    articles: undefined,
    total: 0,
    lastRequestResult: null,
    ...predefinedState
  });

  const fetchArticles = async (formData?: FormData, urlProps?: Partial<{ [key in ArticleFields]: string | number }>) => {
    setTransition(async () => {
      if (!formData && !urlProps) throw new Error("Нет ни formdata, ни urlprops для запроса");
      try {
        const response = await fetch(`/api/articles?${getUrlSearchParams(formData, urlProps)}`); // backend route
        if (response.status === 200) {
          const data = (await response.json()) as ReturnType<typeof getArticles>;
          if (data.articles === undefined || data.total === undefined) throw new Error("no fields present");
          else {
            setArticlesData(prev => ({
              ...prev,
              articles:
                Number(urlProps?.page) > 0
                  ? Array.from(new Map([...(prev.articles ?? []), ...data.articles].map(article => [article.slug, article])).values())
                  : data.articles,
              lastRequestResult: Number(urlProps?.page) == 0 ? null : data.articles.length,
              total: data.total
            }));
            if (Number(data.articles.length) > 0) {
              setArticleQuery(prev => {
                return { ...prev, page: Number(urlProps?.["page"]) ?? prev["page"] };
              });
              if (onResults) onResults(data.articles);
            }
          }
        } else throw new Error("no data");
      } catch (error) {
        console.log("err!! UwU, err: \n" + error);
        // toast потом
        setArticlesData({ articles: [], total: 0, lastRequestResult: null });
      }
    });
  };

  return { fetchArticles, loading, setArticlesData, articlesData, articleQuery, setArticleQuery };
};
