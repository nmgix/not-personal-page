import { ButtonHTMLAttributes } from "react";

export type ButtonProps = {
  children: React.ReactElement | React.ReactElement[];
  onClick: () => any; // optional потому что при type submit onClick не нужен
  onHold?: () => any;
  onDrag?: () => any; // под вопросом
  disabled?: boolean;
  externalClassnames?: string | string[];
  focus?: true;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
};

export type ButtonPropsVariants =
  | (Omit<ButtonProps, "onClick"> & { type: "submit" })
  | (ButtonProps & { type?: Exclude<ButtonHTMLAttributes<HTMLButtonElement>["type"], "submit"> });
