import { RadioButtonsGroupProps } from "@/components/Specialized/RadioButtons";
import { useArticlesSearch } from "@/hooks/useArticlesSearch";
import { articleCategories } from "@/types/consts";
import { useRef, useState } from "react";
import styles from "../articles-global-search.module.scss";
import { Icon } from "@/components/Generic/Icon";

export const useCategory = (articleSearchHook: ReturnType<typeof useArticlesSearch>) => {
  // CATEGORIES CONTROLS & STATE START
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const onSelectCategory = (val: string | null) => {
    articleSearchHook.setArticlesData({ articles: null, total: 0, lastRequestResult: null });
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

  return { selectedCategory, setSelectedCategory, onSelectCategory, categoriesRef };
};
