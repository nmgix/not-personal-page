import { ExternalClassnames } from "@/types/components";
import classnames from "classnames";

type PopupProps = {
  // parentRef: React.Ref<HTMLElement>;
  // parentNode: Node
  children: React.ReactElement | React.ReactNode[];
  timeout?: number;
} & ExternalClassnames;
export const Popup = ({ children, externalClassnames, timeout }: PopupProps) => {
  return <div className={classnames("box", externalClassnames)}>{children}</div>;
};
Popup.displayName = "Popup";
