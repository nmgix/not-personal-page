import { useEffect, useState } from "react";

export const useFade = (nodeRef: React.RefObject<HTMLElement>, fadeThresholdPX: number) => {
  const [fadeState, setFadeState] = useState({ left: false, right: false });
  const fadeBoth = fadeState.left && fadeState.right; // хз будет пересчитываться или нет

  const updateScroll = (element: HTMLElement) => {
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
    if (left && right) {
      // append "both" to nodeRef classlist
    } else {
      //   append left or right
    }
  };

  useEffect(() => {
    if (nodeRef?.current !== null) {
      updateScroll(nodeRef.current);
    }
  }, [nodeRef]);

  // хз как nodeRef'у применять стили fadaBoth/fadeLeft/fadeRight из BoxesScrollbar

  return { fadeState, setFadeState, updateScroll, fadeBoth };
};
