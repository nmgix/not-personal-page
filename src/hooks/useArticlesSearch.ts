import { ArticleListElementProps } from "@/types/articles";
import { useCallback, useEffect, useState } from "react";

interface SearchParams {
  [key: string]: string;
}

export const useArticlesSearch = (onResults?: (data: any[]) => void) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [articlesData, setArticlesData] = useState<{ articles: ArticleListElementProps[] | null; totalPages: number }>({
    articles: null,
    totalPages: 0
  });

  const setSearchParam = (name: string, value: string) => {
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };
  const setFormData = (fd: FormData) => {
    setSearchParams(prev => ({ ...prev, ...(Object.fromEntries(fd) as SearchParams) }));
  };

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ ...searchParams, page: String(page) });
      const response = await fetch(`/api/articles?${params}`);
      if (response.status === 200) {
        const data = await response.json();
        if (data.articles === undefined || data.totalPages === undefined) throw new Error("no fields present");
        else {
          setArticlesData(prev => ({ ...prev, articles: data.articles, totalPages: data.totalPages }));
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
