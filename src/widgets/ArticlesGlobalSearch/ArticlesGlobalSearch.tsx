"use client";

import classnames from "classnames";
import dynamic from "next/dynamic";
import styles from "./articles-global-search.module.scss";
import { Icon } from "@/components/Generic/Icon";
import { Button } from "@/components/Generic/Buttons/Default/DefaultButton";
import { Input } from "@/components/Generic/Input";
import { Image } from "@/components/Generic/Image";
import { RadioButtonsGroup } from "@/components/Specialized/RadioButtons";
import { ResultListRenderer } from "./components/ResultListRenderer";
import { getUrlSearchParams, useArticlesSearch } from "@/hooks/useArticlesSearch";
import { ArticleFields, inputPlacholderWords } from "@/types/consts";
import { useModal } from "./hooks/useModal";
import { useInput } from "./hooks/useInput";
import { useCategory } from "./hooks/useCategory";
import useClickOutside from "./hooks/useClickOutside";
import { useRef } from "react";

const Modal = dynamic(() => import("../../components/Generic/Modal").then(m => m.Modal), { ssr: false });

export type ArticlesGlobalSearchRef = {
  setModalState: (open: boolean) => void;
};

export const ArticlesGlobalSearch = ({ ref }: { ref?: React.Ref<ArticlesGlobalSearchRef> }) => {
  const { onClose, modalOpen, setModalOpen } = useModal(ref);
  const articleSearchHook = useArticlesSearch();
  const { input, onInput, placeholders } = useInput(inputPlacholderWords, articleSearchHook.setArticlesData);
  const { categoriesRef, selectedCategory, onSelectCategory } = useCategory(articleSearchHook);
  const searchRef = useRef<HTMLDivElement>(null);
  useClickOutside<HTMLDivElement>(searchRef, () => setModalOpen(false));

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    articleSearchHook.fetchArticles(undefined, { "article-category": selectedCategory ?? undefined, "article-text": input, page: 0 });
    // fetchArticles(new FormData(e.currentTarget), { page: articleQuery.page + 1 });
  };

  // render//misc
  const nothingSelected = input.length == 0 && (selectedCategory == null || selectedCategory == "");
  const articlesFound = !!articleSearchHook.articlesData.articles && articleSearchHook.articlesData.articles.length > 0;
  const noArticlesFound =
    articleSearchHook.articlesData.articles !== null &&
    articleSearchHook.articlesData.articles?.length == 0 &&
    (input.length > 0 || (selectedCategory != null && (selectedCategory as string).length > 0));
  // render//misc

  return (
    <Modal ariaLabel='articles global search' onClose={onClose} show={modalOpen} externalClassnames={styles.modal} hideCloseBtn>
      <div ref={searchRef} className={classnames("box", styles.articlesGlobalSearch)}>
        <div className={styles.titleWrapper}>
          <h4 className={styles.title}>articles search</h4>
          <span className={styles.subtitle}>{articleSearchHook.articlesData.articles?.length ?? 0} articles currently</span>
        </div>
        <form
          className={styles.top}
          onSubmit={onFormSubmit}
          style={{
            opacity: articleSearchHook.loading ? "0.2" : 1,
            pointerEvents: articleSearchHook.loading ? "none" : "auto",
            userSelect: articleSearchHook.loading ? "none" : "auto"
          }}>
          <RadioButtonsGroup
            onSelect={onSelectCategory}
            name={ArticleFields.category}
            options={categoriesRef.current}
            externalClassnames={styles.categories}
          />
          <div className={styles.searchWrapper}>
            <Input
              name={ArticleFields.text}
              value={input}
              placeholder={placeholders.current}
              onLetterEntered={onInput}
              // onTextInputDebounce={onInputEnd}
              externalClassnames={styles.searchInput}
              focus
            />
            <Button title='search for articles' type='submit' externalClassnames={styles.searchBtn}>
              <Icon icon='filter' />
            </Button>
          </div>
        </form>
        <div className={styles.searchResult}>
          {nothingSelected && !articlesFound && (
            <div className={styles.girlBored}>
              <Image
                src='/assets/girl.png'
                externalClassnames={styles.girlImage}
                showAlt={false}
                size={{ width: 93, height: 140 }}
                alt='girl bored'
              />
            </div>
          )}
          {noArticlesFound && (
            <div className={styles.nothingFound}>
              <h4 className={styles.title}>nothing found</h4>
              <span className={styles.subtitle}>u dont know where to search c;</span>
            </div>
          )}
          {articlesFound && (
            <ResultListRenderer
              list={articleSearchHook.articlesData.articles ?? []}
              searchedPhrase={input}
              total={articleSearchHook.articlesData.total}
              onBottomReach={() =>
                articleSearchHook.fetchArticles(undefined, {
                  "article-category": selectedCategory ?? undefined,
                  "article-text": input,
                  page: articleSearchHook.articleQuery.page + 1
                })
              }
            />
          )}
        </div>
      </div>
    </Modal>
  );
};
ArticlesGlobalSearch.displayName = "ArticlesGlobalSearch";
