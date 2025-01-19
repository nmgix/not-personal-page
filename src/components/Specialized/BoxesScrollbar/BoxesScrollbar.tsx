import classnames from "classnames";
import styles from "./boxes-scrollbar.module.scss";
import { Fragment, useRef, useState } from "react";

type BoxesScrollbarProps = {
  list: React.ReactElement[];
  externalClassnames?: string | string[];
  noWrapper?: true;
};

const fadeThresholdPX = 10;

export const BoxesScrollbar = ({ list, externalClassnames, noWrapper }: BoxesScrollbarProps) => {
  const boxRef = useRef<HTMLDivElement>(null);

  const [fadeState, setFadeState] = useState({ left: false, right: false });
  const fadeBoth = fadeState.left && fadeState.right;

  const updateScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const element = e.target as HTMLDivElement;

    let left = false,
      right = false;
    if (element.scrollWidth > element.clientWidth) {
      if (element.scrollLeft > fadeThresholdPX) left = true;
      if (element.scrollWidth - element.scrollLeft - element.clientWidth > fadeThresholdPX) right = true;
    } else {
      left = false;
      right = false;
    }
    setFadeState({ left, right });
  };

  // const scrollWithoutShift = (e: React.WheelEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  //   if (!boxRef.current) return;
  //   boxRef.current.scrollLeft = e.deltaY;
  // };

  return (
    <div
      ref={boxRef}
      onScroll={updateScroll}
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
