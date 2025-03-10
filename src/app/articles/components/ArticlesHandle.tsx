"use client";

import styles from "../articles-page.module.scss";
import { Input } from "@/components/Generic/Input";
import { DefaultButton } from "@/components/Generic/Buttons";
import { getUrlSearchParams, SearchParams, useArticlesSearch } from "@/hooks/useArticlesSearch";
import { Ref, useEffect, useRef } from "react";
import { RadioButtonsGroup, RadioButtonsGroupProps } from "@/components/Specialized/RadioButtons";
import { Icon } from "@/components/Generic/Icon";
import { ArticleList } from "@/widgets/ArticleList";
import { ArticleFields, inputPlacholderWords } from "@/types/consts";
import { ExternalClassnames } from "@/types/components";

type ArticlesSearchProps = { formRef: Ref<any>; tags: ArticleTag[]; presetQuery?: { searchParams?: SearchParams; page?: number } } & Pick<
  ReturnType<typeof useArticlesSearch>,
  "fetchArticles" | "articlesData" | "loading" | "page"
>;
const ArticlesSearch = ({ page, loading, formRef, tags, presetQuery, fetchArticles, articlesData }: ArticlesSearchProps) => {
  const categoriesTagsRef = useRef<RadioButtonsGroupProps["options"]>(
    (tags ?? []).map(c => ({
      // react component в obj сомнительно но окэй
      component: <span key={c.tag}>{c.tag}</span>,
      value: c.tag
    }))
  );

  const placeholders = useRef(inputPlacholderWords.map(w => `например, ${w}`));

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const urlParams = getUrlSearchParams(new FormData(e.currentTarget), { page: String(page) });
    const newUrl = `${GlobalRoutes.articles}?${urlParams}`; // frontend route
    window.history.replaceState({ ...window.history.state, as: newUrl, new: newUrl }, "", newUrl);
    fetchArticles(urlParams);
  };

  const predefinedExists = presetQuery !== undefined && presetQuery["searchParams"] !== undefined;

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
        predefinedSelectedId={predefinedExists ? presetQuery["searchParams"]![ArticleFields.tag] : undefined}
      />
      <Input
        value={predefinedExists ? presetQuery["searchParams"]![ArticleFields.text] : undefined}
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
import { ArticleListElementProps, ArticleTag, GlobalRoutes } from "@/types/articles";
import { QueryParams } from "../page";

type ArticlesHandleProps = {
  tags: ArticleTag[];
  presetArticles?: ArticleListElementProps[];
  presetQuery?: Partial<QueryParams>;
} & ExternalClassnames;
export const ArticlesHandle = ({ presetArticles, tags, externalClassnames, presetQuery }: ArticlesHandleProps) => {
  // console.log({ presetState });

  const _presetQuery = {
    page: presetQuery?.page !== undefined ? Number(presetQuery?.page) : undefined,
    searchParams:
      presetQuery !== undefined &&
      (presetQuery[ArticleFields.tag as keyof Partial<QueryParams>] !== undefined ||
        presetQuery[ArticleFields.text as keyof Partial<QueryParams>]) !== undefined
        ? {
            [ArticleFields.tag]: presetQuery[ArticleFields.tag as keyof Partial<QueryParams>] ?? "",
            [ArticleFields.text]: presetQuery[ArticleFields.text as keyof Partial<QueryParams>] ?? ""
          }
        : undefined
  };
  const articlesSearchHook = useArticlesSearch(
    undefined,
    presetArticles && presetArticles.length > 0 ? { articles: presetArticles, totalPages: 1 } : undefined,
    _presetQuery
  );
  const formRef = useRef<HTMLFormElement>(null);

  // useEffect(() => {
  //   articlesSearchHook.fetchArticles(getUrlSearchParams(new FormData(formRef.current ?? undefined), { page: String(articlesSearchHook.page) }));
  // }, []); // вот этот реквест заменить на serverside респонзс с найденными статьями

  return (
    <div className={classnames(styles.handle, externalClassnames)}>
      <ArticlesSearch formRef={formRef} {...articlesSearchHook} tags={tags} presetQuery={_presetQuery} />
      <ArticleList list={articlesSearchHook.articlesData.articles} externalClassnames={styles.articlesFound} />
    </div>
  );
};
