import { useEffect, useState } from "react";
// import _ from "lodash";

export const useFade = (
  nodeRef: React.RefObject<HTMLElement>,
  fadeThresholdPX: number,
  horizontal: boolean,
  sidesStyles: { sideOne: string; sideTwo: string; bothSides: string }
) => {
  const [fadeState, setFadeState] = useState({ sideOne: false, sideTwo: false });
  const fadeBoth = fadeState.sideOne && fadeState.sideTwo; // хз будет пересчитываться или нет

  const updateScroll = (element: HTMLElement) => {
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
    console.log(appendedSyles);
    // хз будто так себе код ^
    element.classList.remove(...[sidesStyles.sideOne, sidesStyles.sideTwo, sidesStyles.bothSides]);
    if (appendedSyles !== null) element.classList.add(...appendedSyles);
  };

  useEffect(() => {
    if (nodeRef?.current !== null) {
      updateScroll(nodeRef.current); // called only once
    }
  }, [nodeRef]);

  // const _updateScroll = useThrottleFn(() => console.log(), 0.1, [])
  //   const _updateScroll = _.throttle(updateScroll, 2);

  // whole hook is called multiple times

  // хз как nodeRef'у применять стили fadaBoth/fadeLeft/fadeRight из BoxesScrollbar

  return { fadeState, setFadeState, updateScroll, fadeBoth };
};
