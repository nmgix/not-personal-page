import { ArticleListElementProps } from "@/types/articles";
import { useCallback, useRef, useState } from "react";

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
  const searchParams = useRef<SearchParams>(prefedinedControlsState?.searchParams ?? {});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(prefedinedControlsState?.page ?? 1);

  const [articlesData, setArticlesData] = useState<ArticlesState>({
    articles: undefined,
    totalPages: 0,
    ...predefinedState
  });

  const setSearchParam = (name: string, value: string) => {
    searchParams.current = { ...searchParams.current, [name]: value };
  };
  const setFormData = (fd: FormData) => {
    searchParams.current = { ...searchParams.current, ...(Object.fromEntries(fd) as SearchParams) };
  };

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ ...searchParams.current, page: String(page) });
      const response = await fetch(`/api/articles?${params}`);
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
      } else {
        throw new Error("no data");
      }
    } catch (error) {
      console.log("err!! UwU, err: \n" + error);
      // toast потом
      setArticlesData({ articles: [], totalPages: 0 });
    }
    setLoading(false);
  }, [searchParams, page, onResults]);

  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= articlesData.totalPages) {
      setPage(newPage);
    }
  };

  return { searchParams, setSearchParam, setFormData, fetchArticles, loading, setArticlesData, page, articlesData, goToPage };
};
