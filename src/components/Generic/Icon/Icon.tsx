// https://github.com/nmgix/testovoe-gym/blob/main/src/shared/ui/icon/icon.tsx

import { memo } from "react";
import classnames from "classnames";
import styles from "./icon.module.scss";

export enum AvailableIcons {
  "arrow-link",
  "blog",
  "drag-left",
  "filter",
  "thought",
  "video"
}

interface IIconProps {
  icon: keyof typeof AvailableIcons;
  color?: string;
  externalClassnames?: string | string[];
}

export const Icon: React.FC<IIconProps> = ({ icon, color, externalClassnames }) => {
  return (
    <svg className={classnames(styles.icon, externalClassnames)} style={{ color }}>
      {/* <title>??? */}
      <use xlinkHref={`/icons.svg#${icon}`}></use>
    </svg>
  );
};
Icon.displayName = "Icon";

export const IconMemo = memo(Icon, (prev, next) => prev.icon === next.icon && prev.color === next.color);
IconMemo.displayName = "IconMemo";
