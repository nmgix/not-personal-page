"use client";

import styles from "../articles-page.module.scss";
import { Input } from "@/components/Generic/Input";
import { DefaultButton } from "@/components/Generic/Buttons";
import { useArticlesSearch } from "@/hooks/useArticlesSearch";
import { useEffect, useRef } from "react";
import { RadioButtonsGroup, RadioButtonsGroupProps } from "@/components/Specialized/RadioButtons";
import { Icon } from "@/components/Generic/Icon";
import { ArticleList } from "@/widgets/ArticleList";
import { ArticleFields, inputPlacholderWords } from "@/types/consts";
// import { mockArticlesFound, mockTags } from "@/types/mocks";
import { ExternalClassnames } from "@/types/components";

// type Tag = {
//   title: string;
//   type: string;
// };

type ArticlesSearchProps = { tags: ArticleTag[] } & Pick<ReturnType<typeof useArticlesSearch>, "setArticlesData" | "setFormData" | "fetchArticles">;
const ArticlesSearch = ({ tags, setArticlesData, setFormData, fetchArticles }: ArticlesSearchProps) => {
  const categoriesTagsRef = useRef<RadioButtonsGroupProps["options"]>(
    (tags ?? []).map(c => ({
      // react component в obj сомнительно но окэй
      component: <span>{c.tag}</span>,
      value: c.tag
    }))
  );

  const placeholders = useRef(inputPlacholderWords.map(w => `например, ${w}`));

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormData(new FormData(e.currentTarget));
    fetchArticles();
  };

  return (
    <form className={styles.controls} onSubmit={onFormSubmit}>
      <RadioButtonsGroup
        onSelect={() => setArticlesData({ articles: null, totalPages: 0 })}
        name={ArticleFields.tag}
        options={categoriesTagsRef.current}
        externalClassnames={styles.controlsTags}
      />
      <Input externalClassnames={styles.controlsInput} name={ArticleFields.text} ref={null} placeholder={placeholders.current} />
      <DefaultButton externalClassnames={styles.controlsFilter} title='filter by tags' onClick={undefined}>
        <Icon icon='filter' />
      </DefaultButton>
    </form>
  );
};

import classnames from "classnames";
import { ArticleTag } from "@/types/articles";

type ArticlesHandleProps = { tags: ArticleTag[] } & ExternalClassnames;
export const ArticlesHandle = ({ tags, externalClassnames }: ArticlesHandleProps) => {
  const articlesSearchHook = useArticlesSearch();
  useEffect(() => {
    articlesSearchHook.fetchArticles();
  }, []);

  return (
    <div className={classnames(styles.handle, externalClassnames)}>
      <ArticlesSearch {...articlesSearchHook} tags={tags} />
      <ArticleList list={articlesSearchHook.articlesData.articles} externalClassnames={styles.articlesFound} />
    </div>
  );
};
