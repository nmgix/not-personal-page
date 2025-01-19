import classnames from "classnames";
import styles from "../radio-buttons.module.scss";
import { useId, useRef } from "react";

type RadioButtonProps = {
  children: React.ReactElement | React.ReactElement[];
  name: string;
  externalClassnames?: string | string[];
};

export const RadioButton = ({ children, name, externalClassnames }: RadioButtonProps) => {
  const componentId = useId();
  const prevChecked = useRef(false);

  return (
    <div className={classnames(styles.button, externalClassnames)}>
      <input
        name={name}
        type='radio'
        id={componentId}
        onClick={e => {
          if (prevChecked.current === true && e.currentTarget.checked === true) {
            e.currentTarget.checked = false;
            prevChecked.current = false;
          } else {
            prevChecked.current = e.currentTarget.checked;
          }
        }}
      />
      {/* // а ещё после применения .button у меня перестал кликаться весь компонент  как инпут (видимо его лейбл не покрывает всю кнопку) */}
      <label className={classnames("button", styles.buttonLabel)} htmlFor={componentId}>
        {children}
      </label>
    </div>
  );
};
