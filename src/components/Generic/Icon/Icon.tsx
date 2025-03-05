// https://github.com/nmgix/testovoe-gym/blob/main/src/shared/ui/icon/icon.tsx

import { memo } from "react";
import classnames from "classnames";
import styles from "./icon.module.scss";
import { ExternalClassnames } from "@/types/components";

export enum AvailableIcons {
  "arrow-link",
  "tech-article",
  "drag-left",
  "filter",
  "blog",
  "video",
  "grid-blocks",
  "grid-rows",
  "code"
}

type IconProps = {
  icon: keyof typeof AvailableIcons;
  color?: string;
} & ExternalClassnames;

export const Icon: React.FC<IconProps> = ({ icon, color, externalClassnames }) => {
  if (!Object.keys(AvailableIcons).some(i => i === icon)) return null;
  return (
    <svg id={icon} className={classnames(styles.icon, externalClassnames)} style={{ color }}>
      {/* <title>??? */}
      <use xlinkHref={`/icons.svg#${icon}`}></use>
    </svg>
  );
};
Icon.displayName = "Icon";

export const IconMemo = memo(Icon, (prev, next) => prev.icon === next.icon && prev.color === next.color);
IconMemo.displayName = "IconMemo";
