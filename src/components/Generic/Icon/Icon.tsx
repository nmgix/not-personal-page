// https://github.com/nmgix/testovoe-gym/blob/main/src/shared/ui/icon/icon.tsx

import { memo } from "react";
import "./icon.scss";

enum AvailableIcons {
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
  classNames?: string | string[];
}

export const Icon: React.FC<IIconProps> = ({ icon, color, classNames }) => {
  return (
    <svg className={`icon ${classNames ?? ""}`} style={{ color }}>
      {/* <title>??? */}
      <use xlinkHref={`/icons.svg#${icon}`}></use>
    </svg>
  );
};
Icon.displayName = "Icon";

export const IconMemo = memo(Icon, (prev, next) => prev.icon === next.icon && prev.color === next.color);
IconMemo.displayName = "IconMemo";
