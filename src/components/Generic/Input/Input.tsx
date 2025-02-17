import { useEffect, useImperativeHandle, useRef, useState } from "react";
import useDebounced from "@/hooks/useDebounce";
import styles from "./input.module.scss";
import classnames from "classnames";
import { ExternalClassnames } from "@/types/components";

type InputProps = {
  name: string;
  placeholder?: string | string[];
  label?: string;
  value?: string;
  onLetterEntered?: (entered: string) => void;
  onEnterPress?: (entered: string) => void;
  onTextInputDebounce?: (entered: string) => void;
  focus?: true;
} & ExternalClassnames;

export type InputRef = {
  value: string;
} | null;

export const Input = (props: InputProps & { ref: React.Ref<InputRef> }) => {
  const _placeholder = useRef(
    Array.isArray(props.placeholder) ? props.placeholder[Math.floor(Math.random() * props.placeholder.length)] : props.placeholder
  );
  const [_value, setValue] = useState(props.value ?? "");
  useEffect(() => {
    setValue(props.value ?? "");
  }, [props.value]);
  const debouncedValue = useDebounced(props.onTextInputDebounce, 300, true);

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
    if (props.onLetterEntered !== undefined) props.onLetterEntered(e.target.value);
    debouncedValue(e.target.value);
  };

  const listenEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      props.onEnterPress!(_value);
    }
    return e;
  };

  useImperativeHandle(props.ref, () => ({
    value: _value
  }));

  return (
    <div className={classnames(styles.inputWrapper, props.externalClassnames)}>
      <div className={classnames("box", styles.inputBox)}>
        <input
          className={styles.input}
          onChange={onValueChange}
          value={props.value}
          onKeyDown={props.onEnterPress ? listenEnter : undefined}
          name={props.name}
          type='text'
          placeholder={_placeholder.current}
          autoFocus={props.focus}
        />
      </div>
      {props.label !== undefined && (
        <label htmlFor={props.name} className={styles.inputLabel}>
          {props.label}
        </label>
      )}
    </div>
  );
};
Input.displayName = "displayName";
