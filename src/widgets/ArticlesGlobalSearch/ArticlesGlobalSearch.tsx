import { useImperativeHandle, useMemo, useRef, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import classnames from "classnames";
import { Modal } from "@/components/Generic/Modal";
import styles from "./articles-global-search.module.scss";
import { BoxesScrollbar } from "@/components/Specialized/BoxesScrollbar";
import { AvailableIcons, Icon } from "@/components/Generic/Icon";
import { Button } from "@/components/Generic/Buttons/Default/Default-Button";
import { Input, InputRef } from "@/components/Generic/Input";
import { Image } from "@/components/Generic/Image";

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
  // for fun
  const categoriesFuncsMemo = useMemo(() => {
    const funcs: { [title: string]: () => void } = {};
    _categories.forEach(c => (funcs[c.title] = () => setSelectedCategory(c.type)));
    return funcs;
  }, [_categories.length]);
  // не useRef мне нужен, что-то типо memo, если хочу ререндер при select категории (аппенд класса .active .box'у)
  const categoriesRef = useRef(
    _categories.map(c => (
      <Button onClick={categoriesFuncsMemo[c.title]} externalClassnames={styles.category}>
        <Icon icon={c.icon} externalClassnames={styles.categoryIcon} />
        <span>{c.title}</span>
      </Button>
    ))
  );
  // for fun

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
          <BoxesScrollbar list={categoriesRef.current} externalClassnames={styles.categories} />
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
