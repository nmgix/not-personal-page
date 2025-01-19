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

const _articlesAmount = 163;
const _categories: { type: string; title: string; icon: keyof typeof AvailableIcons }[] = [
  { type: "article", title: "статьи", icon: "blog" },
  { type: "projects", title: "проекты", icon: "video" },
  { type: "blog", title: "блог", icon: "thought" }
];
const _inputPlacholderWords = ["мультисемплинг", "геймдев", "разработка"];

export type SearchRef = {
  setModalState: (open: boolean) => void;
};

export const ArticlesGlobalSearch = ({ ref }: { ref?: React.Ref<SearchRef> }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const onClose = () => {
    console.log("modal closed, this widget");
    setModalOpen(false);
  };
  useHotkeys("ctrl+k", () => setModalOpen(true), { enabled: true, preventDefault: true }, []);

  // на случай неободимости открыть окно, например, в туториале
  useImperativeHandle(ref, () => ({
    setModalState: setModalOpen
  }));

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

  const inputRef = useRef<InputRef>(null);
  const placeholders = useRef(_inputPlacholderWords.map(w => `например, ${w}`));
  const [input, setInput] = useState("");
  const onInputEnd = (searchWord: string) => {
    console.log(searchWord);
  };
  const onInput = (searchWord: string) => {
    setInput(searchWord);
  };

  const onSearch = () => {
    // console.log("search: " + inputRef.current?.value);
    // console.log("category: " + selectedCategory);
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    e.preventDefault();
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
  };

  const nothingSelected = input.length == 0 && selectedCategory == null;

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
            <Button type={"submit"} onClick={onSearch} externalClassnames={styles.searchBtn}>
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
        </div>
      </div>
    </Modal>
  );
};
