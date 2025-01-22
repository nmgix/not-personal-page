import { useImperativeHandle, useMemo, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import classnames from "classnames";
import { Modal } from "@/components/Generic/Modal";
import styles from "./articles-global-search.module.scss";
import { AvailableIcons, Icon } from "@/components/Generic/Icon";
import { Button } from "@/components/Generic/Buttons/Default/Default-Button";
import { Input, InputRef } from "@/components/Generic/Input";
import { Image } from "@/components/Generic/Image";
import { RadioButtonsGroup, RadioButtonsGroupProps } from "@/components/Specialized/RadioButtons";
import { ResultListRenderer } from "./components/ResultListRenderer";
import { ArticleListElementProps } from "@/types/articles";
import { mockArticlesFound } from "@/types/mocks";

const _articlesAmount = 163;
const _categories: { type: string; title: string; icon: keyof typeof AvailableIcons }[] = [
  { type: "article", title: "статьи", icon: "tech-article" },
  { type: "projects", title: "проекты", icon: "video" },
  { type: "blog", title: "блог", icon: "blog" }
];
const _inputPlacholderWords = ["мультисемплинг", "геймдев", "разработка"];

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

  // CATEGORIES CONTROLS & STATE START

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // не useRef мне нужен, что-то типо memo, если хочу ререндер при select категории (аппенд класса .active .box'у)
  // а мб useRef достаточно, я же не буду в memo оборачивать вот эти компоненты, и так пойдёт, наверное
  const categoriesRef = useRef<RadioButtonsGroupProps["options"]>(
    _categories.map(c => ({
      // react component в obj сомнительно но окэй
      component: (
        <div className={styles.category}>
          <Icon icon={c.icon} />
          <span>{c.title}</span>
        </div>
      ),
      value: c.title
    }))
  );

  // CATEGORIES CONTROLS & STATE END

  // ARTICLES LIST START START

  const [foundArticles, setFoundArticles] = useState<ArticleListElementProps[] | null>(null);
  // empty array = nothing is found, null = not searched yet

  // ARTICLES LIST START END

  // SEARCH INPUT CONTROL START

  const inputRef = useRef<InputRef>(null);
  const placeholders = useRef(_inputPlacholderWords.map(w => `например, ${w}`));
  const [input, setInput] = useState("");
  const onInputEnd = (searchWord: string) => {
    console.log(searchWord);
  };
  const onInput = (searchWord: string) => {
    setFoundArticles(null);
    setInput(searchWord);
  };

  // SEARCH INPUT CONTROL END

  // MAKING SEARCH START

  const searchArticles = (formData: FormData) => {
    let _found: ArticleListElementProps[] = [];
    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }
    _found = mockArticlesFound;
    return _found;
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const foundArticles = searchArticles(new FormData(e.currentTarget));
    return setFoundArticles(foundArticles);
  };

  // MAKING SEARCH END

  // misc
  const nothingSelected = input.length == 0 && (selectedCategory == null || selectedCategory == "");
  const articlesFound = foundArticles !== null && foundArticles.length > 0 && input.length > 0;
  const noArticlesFound =
    foundArticles !== null &&
    foundArticles?.length == 0 &&
    (input.length > 0 || (selectedCategory != null && (selectedCategory as string).length > 0));
  // misc

  return (
    <Modal ariaLabel='articles global search' onClose={onClose} show={modalOpen} externalClassnames={styles.modal} hideCloseBtn>
      <div className={classnames("box", styles.articlesGlobalSearch)}>
        <form className={styles.top} onSubmit={onFormSubmit}>
          <div className={styles.titleWrapper}>
            <h4 className={styles.title}>articles search</h4>
            <span className={styles.subtitle}>{_articlesAmount} articles currently</span>
          </div>
          <RadioButtonsGroup
            onSelect={setSelectedCategory}
            name='article-type'
            options={categoriesRef.current}
            externalClassnames={styles.categories}
          />
          <div className={styles.searchWrapper}>
            <Input
              name='articles_search'
              value={input}
              ref={inputRef}
              placeholder={placeholders.current}
              onLetterEntered={onInput}
              onTextInputDebounce={onInputEnd}
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
          {articlesFound && <ResultListRenderer list={foundArticles} searchedPhrase={input} />}
        </div>
      </div>
    </Modal>
  );
};
