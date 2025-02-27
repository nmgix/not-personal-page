"use client";

import { useImperativeHandle, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import classnames from "classnames";
import styles from "./articles-global-search.module.scss";
import { AvailableIcons, Icon } from "@/components/Generic/Icon";
import { Button } from "@/components/Generic/Buttons/Default/DefaultButton";
import { Input, InputRef } from "@/components/Generic/Input";
import { Image } from "@/components/Generic/Image";
import { RadioButtonsGroup, RadioButtonsGroupProps } from "@/components/Specialized/RadioButtons";
import { ResultListRenderer } from "./components/ResultListRenderer";
import { ArticleListElementProps } from "@/types/articles";
import { mockArticlesAmount, mockArticlesFound } from "@/types/mocks";
import { useArticlesSearch } from "@/hooks/useArticlesSearch";
import dynamic from "next/dynamic";
import { articleCategories, ArticleFields, inputPlacholderWords } from "@/types/consts";

const Modal = dynamic(() => import("../../components/Generic/Modal").then(m => m.Modal), { ssr: false });

export type ArticlesGlobalSearchRef = {
  setModalState: (open: boolean) => void;
};

export const ArticlesGlobalSearch = ({ ref }: { ref?: React.Ref<ArticlesGlobalSearchRef> }) => {
  // MODAL CONTROLS & STATE START
  const [modalOpen, setModalOpen] = useState(false);
  const onClose = () => setModalOpen(false);
  useHotkeys("ctrl+k", () => setModalOpen(true), { enabled: true, preventDefault: true }, []);
  // на случай неободимости открыть окно, например, в туториале
  useImperativeHandle(ref, () => ({
    setModalState: setModalOpen
  }));
  // MODAL CONTROLS & STATE END

  // ARTICLES LIST START START
  const { articlesData, setArticlesData, setFormData, fetchArticles } = useArticlesSearch();
  // ARTICLES LIST START END

  // SEARCH INPUT CONTROL START

  const placeholders = useRef(inputPlacholderWords.map(w => `например, ${w}`));
  const [input, setInput] = useState("");
  const onInput = (searchWord: string) => {
    setArticlesData({ articles: null, totalPages: 0 });
    setInput(searchWord);
  };
  // const onInputEnd = (searchWord: string) => {
  //   console.log(searchWord);
  // };

  // SEARCH INPUT CONTROL END

  // CATEGORIES CONTROLS & STATE START

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const _onSelectCategory = (val: string | null) => {
    setArticlesData({ articles: null, totalPages: 0 });
    setSelectedCategory(val);
  };
  // не useRef мне нужен, что-то типо memo, если хочу ререндер при select категории (аппенд класса .active .box'у)
  // а мб useRef достаточно, я же не буду в memo оборачивать вот эти компоненты, и так пойдёт, наверное
  const categoriesRef = useRef<RadioButtonsGroupProps["options"]>(
    articleCategories.map(c => ({
      // react component в obj сомнительно но окэй
      component: (
        <div className={styles.category}>
          <Icon icon={c.icon} />
          <span>{c.title}</span>
        </div>
      ),
      value: c.type
    }))
  );

  // CATEGORIES CONTROLS & STATE END

  // MAKING SEARCH START

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("form submit?");
    e.preventDefault();
    setFormData(new FormData(e.currentTarget));
    fetchArticles();
  };

  // MAKING SEARCH END

  // render//misc
  const nothingSelected = input.length == 0 && (selectedCategory == null || selectedCategory == "");
  const articlesFound = !!articlesData.articles && articlesData.articles.length > 0 && input.length > 0;
  const noArticlesFound =
    articlesData.articles !== null &&
    articlesData.articles?.length == 0 &&
    (input.length > 0 || (selectedCategory != null && (selectedCategory as string).length > 0));
  // render//misc

  return (
    <Modal ariaLabel='articles global search' onClose={onClose} show={modalOpen} externalClassnames={styles.modal} hideCloseBtn>
      <div className={classnames("box", styles.articlesGlobalSearch)}>
        <form className={styles.top} onSubmit={onFormSubmit}>
          <div className={styles.titleWrapper}>
            <h4 className={styles.title}>articles search</h4>
            <span className={styles.subtitle}>{mockArticlesAmount} articles currently</span>
          </div>
          <RadioButtonsGroup
            onSelect={_onSelectCategory}
            name={ArticleFields.tag}
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
          {nothingSelected && (
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
          {articlesFound && <ResultListRenderer list={articlesData.articles ?? []} searchedPhrase={input} />}
        </div>
      </div>
    </Modal>
  );
};
ArticlesGlobalSearch.displayName = "ArticlesGlobalSearch";
