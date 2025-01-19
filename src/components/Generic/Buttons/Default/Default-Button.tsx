import classnames from "classnames";
import styles from "./default-button.module.scss";
import { ButtonProps } from "../types";

export const Button = ({ children, onClick, disabled, externalClassnames, focus, type }: ButtonProps) => {
  return (
    <button
      type={type}
      autoFocus={focus}
      className={classnames("button", styles.defaultButton, externalClassnames)}
      onClick={onClick}
      disabled={disabled}>
      {children}
    </button>
  );
};
Button.displayName = "Button";
