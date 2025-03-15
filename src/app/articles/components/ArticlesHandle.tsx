"use client";

import styles from "../articles-page.module.scss";
import { Input } from "@/components/Generic/Input";
import { DefaultButton } from "@/components/Generic/Buttons";
import { getUrlSearchParams, SearchParams, useArticlesSearch } from "@/hooks/useArticlesSearch";
import { RefObject, useEffect, useRef, useState } from "react";
import { RadioButtonsGroup, RadioButtonsGroupProps } from "@/components/Specialized/RadioButtons";
import { Icon } from "@/components/Generic/Icon";
import { ArticleList } from "@/widgets/ArticleList";
import { ArticleFields, GlobalRoutes, inputPlacholderWords } from "@/types/consts";
import { ExternalClassnames } from "@/types/components";
import { ArticleListElementProps, ArticleTag } from "@/types/articles";

type ArticlesSearchProps = {
  formRef: RefObject<HTMLFormElement | null>;
  tags: ArticleTag[];
  query?: { searchParams?: SearchParams; page?: number };
} & Pick<ReturnType<typeof useArticlesSearch>, "fetchArticles" | "articlesData" | "loading" | "page">;
const ArticlesSearch = ({ page, loading, formRef, tags, query, fetchArticles, articlesData }: ArticlesSearchProps) => {
  const placeholders = useRef(inputPlacholderWords.map(w => `например, ${w}`));
  const categoriesTagsRef = useRef<RadioButtonsGroupProps["options"]>(
    (tags ?? []).map(c => ({
      // react component в obj сомнительно но окэй
      component: <span key={c.tag}>{c.tag}</span>,
      value: c.tag
    }))
  );

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const urlParams = getUrlSearchParams(new FormData(e.currentTarget), { page: String(page) });
    const newUrl = `${GlobalRoutes.articles}?${urlParams}`; // frontend route
    window.history.replaceState({ ...window.history.state, as: newUrl, new: newUrl }, "", newUrl);
    fetchArticles(urlParams);
  };

  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current === true) {
      firstRender.current = false;
      return;
    } else {
      if (query !== undefined && query["searchParams"] !== undefined) {
        fetchArticles(new URLSearchParams({ ...query["searchParams"], page: String(page) }));
      }
    }
  }, [query]);

  const predefinedExists = query !== undefined && query["searchParams"] !== undefined;
  const searchUnavailable = loading === true || articlesData?.articles === undefined;

  return (
    <form
      ref={formRef}
      className={styles.controls}
      onSubmit={onFormSubmit}
      style={{
        opacity: searchUnavailable ? "0.2" : 1,
        pointerEvents: searchUnavailable ? "none" : "auto",
        userSelect: searchUnavailable ? "none" : "auto"
      }}>
      <RadioButtonsGroup
        // onSelect={() => setArticlesData({ articles: null, totalPages: 0 })}
        name={ArticleFields.tag}
        disabled={searchUnavailable}
        options={categoriesTagsRef.current}
        externalClassnames={styles.controlsTags}
        predefinedSelectedId={predefinedExists ? query["searchParams"]![ArticleFields.tag] : undefined}
      />
      <Input
        value={predefinedExists ? query["searchParams"]![ArticleFields.text] : undefined}
        externalClassnames={styles.controlsInput}
        name={ArticleFields.text}
        ref={null}
        placeholder={placeholders.current[0]}
        disabled={searchUnavailable}
      />
      <DefaultButton disabled={searchUnavailable} externalClassnames={styles.controlsFilter} title='filter by tags' onClick={undefined}>
        <Icon icon='filter' />
      </DefaultButton>
    </form>
  );
};

import classnames from "classnames";
import { QueryParams } from "../page";

const transformQuery = (query: Partial<QueryParams> | undefined) => {
  return {
    page: query?.page !== undefined ? Number(query?.page) : undefined,
    searchParams:
      query !== undefined &&
      (query[ArticleFields.tag as keyof Partial<QueryParams>] !== undefined || query[ArticleFields.text as keyof Partial<QueryParams>]) !== undefined
        ? {
            [ArticleFields.tag]: query[ArticleFields.tag as keyof Partial<QueryParams>] ?? "",
            [ArticleFields.text]: query[ArticleFields.text as keyof Partial<QueryParams>] ?? ""
          }
        : undefined
  };
};

type ArticlesHandleProps = {
  tags: ArticleTag[];
  presetArticles?: ArticleListElementProps[];
  query?: Partial<QueryParams>;
} & ExternalClassnames;
export const ArticlesHandle = ({ presetArticles, tags, externalClassnames, query }: ArticlesHandleProps) => {
  // console.log({ presetState });

  const [currentQuery, setCurrentQuery] = useState(transformQuery(query));
  const articlesSearchHook = useArticlesSearch(
    undefined,
    presetArticles && presetArticles.length > 0 ? { articles: presetArticles, totalPages: 1 } : undefined,
    currentQuery
  );
  const formRef = useRef<HTMLFormElement>(null);

  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current === true) {
      firstRender.current = false;
      return;
    }
    setCurrentQuery(transformQuery(query));
  }, [query]);

  return (
    <div className={classnames(styles.handle, externalClassnames)}>
      <ArticlesSearch formRef={formRef} {...articlesSearchHook} tags={tags} query={currentQuery} />
      <ArticleList list={articlesSearchHook.articlesData.articles} externalClassnames={styles.articlesFound} />
    </div>
  );
};
