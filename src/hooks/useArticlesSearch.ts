import { ArticleListElementProps } from "@/types/articles";
import { useCallback, useRef, useState, useTransition } from "react";

type ArticlesState = {
  articles: ArticleListElementProps[] | null | undefined;
  totalPages: number;
};

export interface SearchParams {
  [key: string]: string;
}

export const useArticlesSearch = (
  onResults?: (data: any[]) => void,
  predefinedState?: Partial<ArticlesState>,
  prefedinedControlsState?: { searchParams?: SearchParams; page?: number }
) => {
  // console.log({ prefedinedControlsState });
  // const [searchParams, setSearchParams] = useState<SearchParams>({});
  // const searchParams = useRef<SearchParams>(prefedinedControlsState?.searchParams ?? {});
  const [loading, setTransition] = useTransition();
  const [page, setPage] = useState(prefedinedControlsState?.page ?? 1);

  const [articlesData, setArticlesData] = useState<ArticlesState>({
    articles: undefined,
    totalPages: 0,
    ...predefinedState
  });

  const fetchArticles = async (urlSearchParams: URLSearchParams) => {
    setTransition(async () => {
      try {
        const response = await fetch(`/api/articles?${urlSearchParams}`); // backend route
        // const response = await searchByTags(params)
        if (response.status === 200) {
          const data = (await response.json()) as { articles: ArticleListElementProps[] };
          // console.log(data);
          // что за totalPages??? || data.totalPages === undefined
          if (data.articles === undefined) throw new Error("no fields present");
          else {
            // тут получить статьи или на беке, хз
            // data.totalPages ?? 1
            setArticlesData(prev => ({ ...prev, articles: data.articles, totalPages: 1 }));
            if (onResults) onResults(data.articles);
          }
        } else throw new Error("no data");
      } catch (error) {
        console.log("err!! UwU, err: \n" + error);
        // toast потом
        setArticlesData({ articles: [], totalPages: 0 });
      }
    });
  };

  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= articlesData.totalPages) setPage(newPage);
  };

  return { fetchArticles, loading, setArticlesData, page, articlesData, goToPage };
};
