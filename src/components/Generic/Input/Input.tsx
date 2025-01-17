import { useEffect, useImperativeHandle, useRef, useState } from "react";
import useDebounced from "@/helpers/useDebounce";
import styles from "./input.module.scss";
import classnames from "classnames";

type InputProps = {
  name: string;
  placeholder?: string | string[];
  label?: string;
  value?: string;
  onLetterEntered?: (entered: string) => void;
  onEnterPress?: (entered: string) => void;
  onTextInputDebounce?: (entered: string) => void;
  externalClassnames?: string | string[];
};

export type InputRef = {
  value: string;
} | null;

export const Input = ({
  onEnterPress,
  onLetterEntered,
  onTextInputDebounce,
  value,
  ref,
  placeholder,
  label,
  name,
  externalClassnames
}: InputProps & { ref: React.Ref<InputRef> }) => {
  const _placeholder = useRef(Array.isArray(placeholder) ? placeholder[Math.floor(Math.random() * placeholder.length)] : placeholder);
  const [_value, setValue] = useState(value ?? "");
  useEffect(() => {
    setValue(value ?? "");
  }, [value]);
  const debouncedValue = useDebounced(onTextInputDebounce, 300, true);

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    e.preventDefault();
    setValue(e.target.value);
    if (onLetterEntered !== undefined) onLetterEntered(e.target.value);
    debouncedValue(e.target.value);
  };

  const listenEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e);
    if (onEnterPress === undefined) return e;
    if (e.key == "Enter") {
      onEnterPress(_value);
    }
    return e;
  };

  useImperativeHandle(ref, () => ({
    value: _value
  }));

  return (
    <div className={styles.inputWrapper}>
      <div className={classnames("box", styles.inputBox)}>
        <input
          className={classnames(styles.input, externalClassnames)}
          onChange={onValueChange}
          value={value}
          onKeyDown={listenEnter}
          //   onKeyDown={listenEnter}
          name={name}
          type='text'
          placeholder={_placeholder.current}
        />
      </div>
      {label !== undefined && (
        <label htmlFor={name} className={styles.inputLabel}>
          {label}
        </label>
      )}
    </div>
  );
};
