import { ExternalClassnames } from "@/types/components";
import { ButtonHTMLAttributes } from "react";

export type ButtonProps = {
  children: React.ReactElement | React.ReactElement[] | string;
  onClick?: () => any; // optional потому что при type submit onClick не нужен
  title: string;
  onHold?: () => any;
  onDrag?: () => any; // под вопросом
  disabled?: boolean;
  focus?: true;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
} & ExternalClassnames;

export type ButtonPropsVariants =
  | (Omit<ButtonProps, "onClick"> & { type: "submit" })
  | (ButtonProps & { type?: Exclude<ButtonHTMLAttributes<HTMLButtonElement>["type"], "submit"> });
