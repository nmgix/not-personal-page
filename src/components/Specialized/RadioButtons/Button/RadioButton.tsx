import classnames from "classnames";
import styles from "../radio-buttons.module.scss";
import { useId, useRef } from "react";

type RadioButtonProps = {
  children: React.ReactElement | React.ReactElement[];
  name: string;
  externalClassnames?: string | string[];
  onSelect: (id: string) => void;
  value: string;
};

export const RadioButton = ({ children, name, externalClassnames, value, onSelect }: RadioButtonProps) => {
  const componentId = useId();
  const prevChecked = useRef(false);
  // prevChecked остаётся в старом положении (true) после того как станоится unchecked, а проверить никак

  return (
    <div className={classnames(styles.button, externalClassnames)}>
      <input
        name={name}
        type='radio'
        id={componentId}
        value={value}
        onChange={e => console.log(e)}
        onClick={e => {
          // console.log(e);
          // из-за type radio (name общий) все инпуты обрабатывают e.onClick? типо у них e.currentTarget разный но каждая кнопка видит что prevChecked был true а текущий checked тоже true потому что это уже другая кнопка?
          if (prevChecked.current === true && e.currentTarget.checked === true) {
            // if (!prevNode.current?.isEqualNode(e.currentTarget)) return console.log("not equal node");
            // console.log(1);
            e.currentTarget.checked = false;
            prevChecked.current = false;
          } else {
            // console.log(2);
            if (onSelect !== undefined && value === undefined) throw Error("value not set");
            if (onSelect !== undefined && value !== undefined) onSelect(value);
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
