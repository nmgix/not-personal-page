import classnames from "classnames";
import { BoxesScrollbar } from "@/components/Specialized/BoxesScrollbar";
import styles from "../radio-buttons.module.scss";
import { memo, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { RadioButton } from "../Button/RadioButton";
import { ExternalClassnames } from "@/types/components";

export type RadioButtonsGroupProps = {
  options: {
    component: React.ReactElement;
    value: string;
  }[];
  name: string;
  onSelect?: (id: string | null) => void;
  predefinedSelectedId?: string;
  disabled?: boolean;
} & { ref?: React.Ref<{ selectedOption: string }> } & ExternalClassnames;

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
export const RadioButtonsGroup = ({ options, name, externalClassnames, onSelect, ref, predefinedSelectedId, disabled }: RadioButtonsGroupProps) => {
  const boxRef = useRef<HTMLDivElement>(null);

  const [selectedOption, setSelectedOption] = useState(predefinedSelectedId ?? "");
  useEffect(() => {
    setSelectedOption(predefinedSelectedId ?? "");

    if (!!boxRef.current) {
      const idx = options.findIndex(o => o.value === predefinedSelectedId);
      const child = boxRef.current.children[idx] as HTMLLabelElement;
      if (!child) return;
      child.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center" // Это важно для горизонтальной прокрутки! // gpt комм
      });
      // let timeout = setTimeout(() => {
      //   child.focus();
      //   clearTimeout(timeout);
      // }, 0.5);
    }
  }, [predefinedSelectedId]);

  const _onSelect = useCallback(
    (id: string) => {
      setSelectedOption(id == selectedOption ? "" : id);
      if (onSelect) onSelect(id == selectedOption ? null : id);
    },
    [selectedOption]
  );

  useImperativeHandle(ref, () => ({
    selectedOption
  }));

  // TODO на сегодня: уйти от boxes scrollbar, выделить fade как кормпонент или scrollable, ибо обёртка детей в .box мешает
  return (
    <BoxesScrollbar
      noWrapper
      disabled={disabled}
      ref={boxRef}
      list={options.map((option, i) => (
        <RadioButton disabled={disabled} idx={i} checked={option.value === selectedOption} value={option.value} name={name} onSelect={_onSelect}>
          {option.component}
        </RadioButton>
      ))}
      externalClassnames={classnames(styles.group, externalClassnames)}
    />
  );
};
RadioButtonsGroup.displayName = "RadioButtonsGroup";
