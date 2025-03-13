import classnames from "classnames";
import styles from "../radio-buttons.module.scss";
import { memo, RefObject, useCallback, useId } from "react";
import { ExternalClassnames } from "@/types/components";

type RadioButtonProps = {
  children: React.ReactElement | React.ReactElement[];
  name: string;
  onSelect: (id: string) => void;
  value: string;
  checked: boolean;
  idx: number;
  disabled?: boolean;
} & ExternalClassnames;

export const RadioButton = ({ children, name, checked, externalClassnames, value, onSelect, idx, disabled }: RadioButtonProps) => {
  // memo(
  const componentId = useId();
  const _onSelect = useCallback(() => onSelect(value), [value, checked]);
  return (
    // styles.buttonLabel,
    <label tabIndex={disabled ? -1 : idx} className={classnames("button", styles.button, externalClassnames)} htmlFor={componentId}>
      <input
        className={classnames("visually-hidden")}
        name={name}
        type='radio'
        id={componentId}
        value={value}
        onClick={_onSelect}
        readOnly
        checked={checked}
        disabled={disabled}
      />
      {children}
    </label>
  );
};
//   (prev, next) => prev.checked === next.checked && Boolean(prev.disabled) === Boolean(next.disabled)
// );
RadioButton.displayName = "RadioButton";
