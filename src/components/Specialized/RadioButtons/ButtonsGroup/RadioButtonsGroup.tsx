import classnames from "classnames";
import { BoxesScrollbar } from "@/components/Specialized/BoxesScrollbar";
import styles from "../radio-buttons.module.scss";
import { useRef } from "react";
import { RadioButton } from "../Button/RadioButton";

type RadioButtonsGroupProps = {
  options: React.ReactElement[];
  name: string;
  externalClassnames?: string | string[];
};

/**
 * Radio buttons X boxes scrollbar wrapper. Buttons are inputs[type="radio"], but borrows button styles
 *
 * @example
 *
 * ```tsx
 * const ref = createRef<HTMLDivElement>();
 *
 * ref.current = document.createElement('div'); // Error
 * ```
 *
 * @returns {React.JSX} React element
 */
export const RadioButtonsGroup = ({ options, name, externalClassnames }: RadioButtonsGroupProps) => {
  const optionsRender = useRef(options !== undefined ? options.map(option => <RadioButton name={name}>{option}</RadioButton>) : []);

  // TODO на сегодня: уйти от boxes scrollbar, выделить fade как кормпонент или scrollable, ибо обёртка детей в .box мешает
  // потом radiobuttongroup засунуть в articlesglobalsearch вместо boxesscrollbar
  // а ещё после применения .button у меня перестал кликаться весь компонент  как инпут (видимо его лейбл не покрывает всю кнопку)
  return <BoxesScrollbar list={optionsRender.current} externalClassnames={classnames(styles.group, externalClassnames)} />;
};
