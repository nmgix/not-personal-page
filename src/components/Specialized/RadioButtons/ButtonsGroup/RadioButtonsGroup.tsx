import classnames from "classnames";
import { BoxesScrollbar } from "@/components/Specialized/BoxesScrollbar";
import styles from "../radio-buttons.module.scss";
import { useCallback, useImperativeHandle, useState } from "react";
import { RadioButton } from "../Button/RadioButton";
import { ExternalClassnames } from "@/types/components";

export type RadioButtonsGroupProps = {
  options: {
    component: React.ReactElement;
    value: string;
  }[];
  name: string;
  onSelect?: (id: string | null) => void;
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
export const RadioButtonsGroup = ({ options, name, externalClassnames, onSelect, ref }: RadioButtonsGroupProps) => {
  const [selectedOption, setSelectedOption] = useState("");
  const _onSelect = useCallback(
    (id: string) => {
      // ещё не пофиксил
      // console.log({ id, selectedOption, equal: id == selectedOption });
      if (id == selectedOption) {
        setSelectedOption("");
        if (onSelect) onSelect(null);
        return;
      } else {
        setSelectedOption(id);
        if (onSelect) onSelect(id);
      }
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
      list={options.map((option, i) => (
        <RadioButton idx={i} checked={option.value === selectedOption} value={option.value} name={name} onSelect={_onSelect}>
          {option.component}
        </RadioButton>
      ))}
      externalClassnames={classnames(styles.group, externalClassnames)}
    />
  );
};
RadioButtonsGroup.displayName = "RadioButtonsGroup";
