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

export const BoxesScrollbar = ({ list, externalClassnames, noWrapper }: BoxesScrollbarProps) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const { updateScrollFn } = useFade(boxRef as React.RefObject<HTMLElement>, true, {
    sideOne: "fadeLeft",
    sideTwo: "fadeRight",
    bothSides: "fadeLeftRight"
  });

  useScrollable(boxRef as React.RefObject<HTMLElement>);

  return (
    <div
      ref={boxRef}
      onScroll={updateScrollFn}
      className={classnames(
        styles.boxesScrollbar,
        // fadeBoth ? styles.fadeBoth : fadeState.sideOne ? styles.fadeLeft : fadeState.sideTwo ? styles.fadeRight : null,
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
