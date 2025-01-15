import classnames from "classnames";

type PopupProps = {
  // parentRef: React.Ref<HTMLElement>;
  // parentNode: Node
  children: React.ReactElement;
  timeout?: number;
  externalClassNames?: string | string[];
};
export const Popup = ({ children, externalClassNames, timeout }: PopupProps) => {
  return <div className={classnames("box", externalClassNames)}>{children}</div>;
};
Popup.displayName = "Popup";
