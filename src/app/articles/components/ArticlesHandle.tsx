"use client";

import styles from "../articles-page.module.scss";
import { Input } from "@/components/Generic/Input";
import { DefaultButton } from "@/components/Generic/Buttons";
import { ArticleQuery, getUrlSearchParams, SearchParams, useArticlesSearch } from "@/hooks/useArticlesSearch";
import { RefObject, useEffect, useRef, useState } from "react";
import { RadioButtonsGroup, RadioButtonsGroupProps } from "@/components/Specialized/RadioButtons";
import { Icon } from "@/components/Generic/Icon";
import { ArticleList } from "@/widgets/ArticleList";
import { ArticleFields, articlesSearchConsts, GlobalRoutes, inputPlacholderWords } from "@/types/consts";
import { ExternalClassnames } from "@/types/components";
import { ArticleListElementProps, ArticleTag } from "@/types/articles";

type ArticlesSearchProps = {
  formRef: RefObject<HTMLFormElement | null>;
  tags: ArticleTag[];
} & Pick<ReturnType<typeof useArticlesSearch>, "fetchArticles" | "articlesData" | "loading" | "articleQuery" | "setArticleQuery">;
const ArticlesSearch = ({ loading, formRef, tags, fetchArticles, articleQuery, articlesData, setArticleQuery }: ArticlesSearchProps) => {
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
    const newUrl = `${GlobalRoutes.articles}?${getUrlSearchParams(undefined, {
      ...articleQuery,
      page: 0 + 1 /* +1 убирается при сохранении в стейт, это для юзера +1 в url */
    })}`; // frontend route
    window.history.replaceState({ ...window.history.state, as: newUrl, new: newUrl }, "", newUrl);
    // const fd = new FormData(e.currentTarget);
    // const fdFields = fd.entries().map(([key, fdVal]) => ({ [key]: fdVal }));
    setArticleQuery(prev => ({ ...prev, page: 0 }));
    fetchArticles(undefined, { ...articleQuery, page: 0 });
  };

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
        name={ArticleFields.tag}
        disabled={searchUnavailable}
        onSelect={id => setArticleQuery(prev => ({ ...prev, article_tag: id ?? "" }))}
        options={categoriesTagsRef.current}
        externalClassnames={styles.controlsTags}
        predefinedSelectedId={articleQuery[ArticleFields.tag] ? String(articleQuery[ArticleFields.tag]) : undefined}
      />
      <Input
        value={articleQuery[ArticleFields.text] ? String(articleQuery[ArticleFields.text]) : undefined}
        externalClassnames={styles.controlsInput}
        name={ArticleFields.text}
        onTextInputDebounce={text => setArticleQuery(prev => ({ ...prev, "article-text": text }))}
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
import { BottomCleverBar } from "@/widgets/BottomCleverBar";
import { BarTypes } from "@/widgets/BottomCleverBar/serverutils";
import { ClientArticlesAmountBar } from "./bar/clientSecondBar";

const transformQuery = (query: Partial<QueryParams> | undefined) => {
  return {
    page: !isNaN(Number(query?.page)) ? Number(query?.page) - 1 : undefined,
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
  preset?: {
    articles?: ArticleListElementProps[];
    total?: number;
  };
  query?: Partial<QueryParams>;
} & ExternalClassnames;
export const ArticlesHandle = ({ preset, tags, externalClassnames, query }: ArticlesHandleProps) => {
  const articlesSearchHook = useArticlesSearch(undefined, preset, transformQuery(query));
  const formRef = useRef<HTMLFormElement>(null);
  const initialQuery = useRef(query);

  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current === true) {
      firstRender.current = false;
      return;
    }
    if (query !== initialQuery.current) {
      let currentQuery = transformQuery(query);
      articlesSearchHook.setArticleQuery(prev => ({ ...prev, ...currentQuery.searchParams, page: currentQuery.page ?? prev.page }));
      initialQuery.current = query;
    }
  }, [query]);

  return (
    <div className={classnames(styles.handle, externalClassnames)}>
      <ArticlesSearch formRef={formRef} {...articlesSearchHook} tags={tags} />
      <ArticleList
        onBottomReach={() =>
          ((!firstRender.current && articlesSearchHook.articlesData.lastRequestResult === null) ||
            articlesSearchHook.articlesData.lastRequestResult! > 0) &&
          articlesSearchHook.articlesData.articles &&
          articlesSearchHook.articlesData.total - articlesSearchHook.articlesData.articles.length > 0 &&
          articlesSearchHook.fetchArticles(undefined, {
            ...articlesSearchHook.articleQuery,
            page: (articlesSearchHook.articleQuery.page ?? 0) + 1
          })
        }
        list={articlesSearchHook.articlesData.articles}
        externalClassnames={styles.articlesFound}
      />
      <BottomCleverBar
        style={{ bottom: -2 }}
        currentBars={[
          null,
          articlesSearchHook.articlesData.total ? (
            <ClientArticlesAmountBar
              articlesAmount={articlesSearchHook.articlesData.total}
              articlesLoaded={articlesSearchHook.articlesData.articles?.length}
            />
          ) : null
        ]}
        hideInTop={false}
      />
    </div>
  );
};
