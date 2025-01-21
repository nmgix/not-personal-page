import classnames from "classnames";
import styles from "./default-button.module.scss";
import { ButtonPropsVariants } from "../types";

export const Button = (props: ButtonPropsVariants) => {
  return (
    <button
      title={props.title}
      type={props.type}
      autoFocus={props.focus}
      className={classnames("button", styles.defaultButton, props.externalClassnames)}
      onClick={props.type !== "submit" ? props.onClick : undefined}
      disabled={props.disabled}>
      {props.children}
    </button>
  );
};
Button.displayName = "Button";
