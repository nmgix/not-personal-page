import classnames from "classnames";
import styles from "./default-button.module.scss";
import { ButtonProps } from "../types";

export const Button = ({ children, onClick, disabled, extraClassnames }: ButtonProps) => {
  return (
    <button className={classnames("button", styles.defaultButton, extraClassnames)} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
Button.displayName = "Button";
