import classnames from "classnames";
import styles from "./boxes-scrollbar.module.scss";
import { Fragment, useRef } from "react";
import { useFade } from "@/hooks/useFade";
import { useScrollable } from "@/hooks/useScrollable";

type BoxesScrollbarProps = {
  list: React.ReactElement[];
  externalClassnames?: string | string[];
  noWrapper?: true;
};

const fadeThresholdPX = 10;

export const BoxesScrollbar = ({ list, externalClassnames, noWrapper }: BoxesScrollbarProps) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const { fadeBoth, fadeState, updateScroll } = useFade(boxRef as React.RefObject<HTMLElement>, fadeThresholdPX);
  const _updateScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => updateScroll(e.target as HTMLElement);
  useScrollable(boxRef as React.RefObject<HTMLElement>);

  return (
    <div
      ref={boxRef}
      onScroll={_updateScroll}
      className={classnames(
        styles.boxesScrollbar,
        fadeBoth ? styles.fadeBoth : fadeState.left ? styles.fadeLeft : fadeState.right ? styles.fadeRight : null,
        externalClassnames
      )}>
      {list.map((listElement, idx) =>
        !noWrapper ? (
          <div key={idx} className={classnames("box")}>
            {listElement}
          </div>
        ) : (
          <Fragment key={idx}>{listElement}</Fragment>
        )
      )}
    </div>
  );
};
BoxesScrollbar.displayName = "BoxesScrollbar";
