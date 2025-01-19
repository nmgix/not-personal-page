import classnames from "classnames";
import styles from "../radio-buttons.module.scss";
import { memo, useCallback, useId } from "react";

type RadioButtonProps = {
  children: React.ReactElement | React.ReactElement[];
  name: string;
  externalClassnames?: string | string[];
  onSelect: (id: string) => void;
  value: string;
  checked: boolean;
};

export const RadioButton = memo(
  ({ children, name, checked, externalClassnames, value, onSelect }: RadioButtonProps) => {
    const componentId = useId();
    const _onSelect = useCallback(() => onSelect(value), [value, checked]);

    return (
      <div className={classnames(styles.button, externalClassnames)}>
        <input name={name} type='radio' id={componentId} value={value} onClick={_onSelect} readOnly checked={checked} />
        {/* // а ещё после применения .button у меня перестал кликаться весь компонент  как инпут (видимо его лейбл не покрывает всю кнопку) */}
        <label className={classnames("button", styles.buttonLabel)} htmlFor={componentId}>
          {children}
        </label>
      </div>
    );
  },
  (prev, next) => prev.checked === next.checked
);
RadioButton.displayName = "RadioButton";
