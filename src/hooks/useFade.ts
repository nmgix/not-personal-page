import { useEffect, useLayoutEffect, useState } from "react";

// подумал что не смогу переписать всю функцию на leftSide/rightSide или topSide/bottomSide, так что ограничусь jsDoc

/**
 * @example horizontal == true =>  sides = left/right
 * @example horizontal == false => sides = top/bottom
 */
export const useFade = (
  nodeRef: React.RefObject<HTMLElement>,
  horizontal: boolean,
  sidesStyles: { sideOne: string; sideTwo: string; bothSides: string },
  fadeThresholdPX: number = 10
) => {
  const [fadeState, setFadeState] = useState({ sideOne: false, sideTwo: false });
  const fadeBoth = fadeState.sideOne && fadeState.sideTwo; // хз будет пересчитываться или нет

  const _updateScroll = (element: HTMLElement) => {
    let sideOne = false,
      sideTwo = false;
    if (horizontal) {
      if (element.scrollLeft > fadeThresholdPX) sideOne = true;
      if (element.scrollWidth - element.scrollLeft - element.clientWidth > fadeThresholdPX) sideTwo = true;
    } else {
      if (element.scrollTop > fadeThresholdPX) sideOne = true;
      if (element.scrollHeight - element.scrollTop - element.clientHeight > fadeThresholdPX) sideTwo = true;
    }
    setFadeState({ sideOne, sideTwo });
    // console.log({ sideOne, sideTwo });
    let appendedSyles = null;
    switch (true) {
      case sideOne === true && sideTwo === true: {
        appendedSyles = [sidesStyles.bothSides];
        break;
      }
      case sideOne === true: {
        appendedSyles = [sidesStyles.sideOne];
        break;
      }
      case sideTwo === true: {
        appendedSyles = [sidesStyles.sideTwo];
        break;
      }
    }
    // хз будто так себе код ^
    element.classList.remove(...[sidesStyles.sideOne, sidesStyles.sideTwo, sidesStyles.bothSides]);
    if (appendedSyles !== null) element.classList.add(...appendedSyles);
  };

  useLayoutEffect(() => {
    if (nodeRef?.current !== null) {
      _updateScroll(nodeRef.current); // called only once on init
    }
    console.log("lel not once");
  }, [nodeRef]);

  // whole hook is called multiple times

  const updateScrollFn = (e: React.UIEvent<HTMLElement, UIEvent>) => _updateScroll(e.target as HTMLElement);

  return { fadeState, setFadeState, updateScrollFn, fadeBoth };
};
