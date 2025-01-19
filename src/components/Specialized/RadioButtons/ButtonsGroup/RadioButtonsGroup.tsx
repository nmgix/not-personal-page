import classnames from "classnames";
import { BoxesScrollbar } from "@/components/Specialized/BoxesScrollbar";
import styles from "../radio-buttons.module.scss";
import { useRef } from "react";
import { RadioButton } from "../Button/RadioButton";

export type RadioButtonsGroupProps = {
  options: {
    component: React.ReactElement;
    value: string;
  }[];
  name: string;
  externalClassnames?: string | string[];
  onSelect: (id: string) => void;
};

/**
 * Radio buttons X boxes scrollbar wrapper. Buttons are inputs[type="radio"], but borrows button styles
 *
 * @example
 * ```tsx
 * const categoriesRef = useRef(_categories.map(c => (<>{c}</>)))
 *
 * <RadioButtonsGroup name='article-type' options={categoriesRef.current} externalClassnames={styles.categories} />
 * ```
 *
 * @returns {React.JSX} React element
 */
export const RadioButtonsGroup = ({ options, name, externalClassnames, onSelect }: RadioButtonsGroupProps) => {
  const optionsRender = useRef(
    options !== undefined
      ? options.map(option => (
          <RadioButton value={option.value} name={name} onSelect={onSelect}>
            {option.component}
          </RadioButton>
        ))
      : []
  );

  // TODO на сегодня: уйти от boxes scrollbar, выделить fade как кормпонент или scrollable, ибо обёртка детей в .box мешает
  // потом radiobuttongroup засунуть в articlesglobalsearch вместо boxesscrollbar
  // а ещё после применения .button у меня перестал кликаться весь компонент  как инпут (видимо его лейбл не покрывает всю кнопку)
  return <BoxesScrollbar noWrapper list={optionsRender.current} externalClassnames={classnames(styles.group, externalClassnames)} />;
};
