import classnames from "classnames";
import styles from "./boxes-scrollbar.module.scss";
import { Fragment, useRef } from "react";
import { useFade } from "@/hooks/useFade";
import { useScrollable } from "@/hooks/useScrollable";
import { ExternalClassnames } from "@/types/components";

type BoxesScrollbarProps = {
  list: React.ReactElement[];
  noWrapper?: true;
} & ExternalClassnames;

export const BoxesScrollbar = ({ list, externalClassnames, noWrapper }: BoxesScrollbarProps) => {
  // const boxRef = useRef<HTMLDivElement>(null);
  // const { updateScrollFn } = useFade(boxRef as React.RefObject<HTMLElement>, true, {
  //   sideOne: "fadeLeft",
  //   sideTwo: "fadeRight",
  //   bothSides: "fadeLeftRight"
  // });

  // useScrollable(boxRef as React.RefObject<HTMLElement>);

  // пока убираю все связанные хуки ибо nextjs не даёт рендерить в ssr режиме
  if (!list || list.length == 0) return null;

  return (
    <div
      // ref={boxRef}
      // onScroll={updateScrollFn}
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
