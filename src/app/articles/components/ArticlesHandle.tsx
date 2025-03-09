"use client";

import styles from "../articles-page.module.scss";
import { Input } from "@/components/Generic/Input";
import { DefaultButton } from "@/components/Generic/Buttons";
import { SearchParams, useArticlesSearch } from "@/hooks/useArticlesSearch";
import { Ref, Suspense, useEffect, useRef, useTransition } from "react";
import { RadioButtonsGroup, RadioButtonsGroupProps } from "@/components/Specialized/RadioButtons";
import { Icon } from "@/components/Generic/Icon";
import { ArticleList } from "@/widgets/ArticleList";
import { ArticleFields, inputPlacholderWords } from "@/types/consts";
import { ExternalClassnames } from "@/types/components";

type ArticlesSearchProps = { formRef: Ref<any>; tags: ArticleTag[]; prefedinedControlsState?: { searchParams?: SearchParams; page?: number } } & Pick<
  ReturnType<typeof useArticlesSearch>,
  "fetchArticles" | "articlesData" | "loading" | "page"
>;
const ArticlesSearch = ({ page, loading, formRef, tags, prefedinedControlsState, fetchArticles, articlesData }: ArticlesSearchProps) => {
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
    const urlParams = new URLSearchParams({
      ...Object.fromEntries(
        Array.from(new FormData(e.currentTarget)).filter(function ([k, v]) {
          return v;
        })
      ),
      page: String(page)
    });
    const newUrl = `${GlobalRoutes.articles}?${urlParams}`; // frontend route
    console.log(newUrl);
    window.history.replaceState({ ...window.history.state, as: newUrl, new: newUrl }, "", newUrl);
    fetchArticles(urlParams);
  };

  const predefinedExists = prefedinedControlsState !== undefined && prefedinedControlsState["searchParams"] !== undefined;

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
        predefinedSelectedId={predefinedExists ? prefedinedControlsState["searchParams"]![ArticleFields.tag] : undefined}
      />
      <Input
        value={predefinedExists ? prefedinedControlsState["searchParams"]![ArticleFields.text] : undefined}
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
import { ArticleTag, GlobalRoutes } from "@/types/articles";
import { QueryParams } from "../page";

type ArticlesHandleProps = { tags: ArticleTag[]; presetState?: Partial<QueryParams> } & ExternalClassnames;
export const ArticlesHandle = ({ tags, externalClassnames, presetState }: ArticlesHandleProps) => {
  // console.log({ presetState });

  const _presetState = {
    page: presetState?.page !== undefined ? Number(presetState?.page) : undefined,
    searchParams:
      presetState !== undefined &&
      (presetState[ArticleFields.tag as keyof Partial<QueryParams>] !== undefined ||
        presetState[ArticleFields.text as keyof Partial<QueryParams>]) !== undefined
        ? {
            [ArticleFields.tag]: presetState[ArticleFields.tag as keyof Partial<QueryParams>] ?? "",
            [ArticleFields.text]: presetState[ArticleFields.text as keyof Partial<QueryParams>] ?? ""
          }
        : undefined
  };
  const articlesSearchHook = useArticlesSearch(undefined, undefined, _presetState);
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    articlesSearchHook.fetchArticles(new FormData(formRef.current ?? undefined));
  }, []);

  return (
    <div className={classnames(styles.handle, externalClassnames)}>
      <ArticlesSearch formRef={formRef} {...articlesSearchHook} tags={tags} prefedinedControlsState={_presetState} />
      <ArticleList list={articlesSearchHook.articlesData.articles} externalClassnames={styles.articlesFound} />
    </div>
  );
};
