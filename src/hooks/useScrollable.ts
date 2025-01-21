import { useEffect } from "react";

export const useScrollable = (nodeRef: React.RefObject<HTMLElement>) => {
  const scrollWithoutShift = (e: WheelEvent) => {
    if (e.deltaY == 0) return;
    e.preventDefault();
    nodeRef.current.scrollTo({
      left: nodeRef.current.scrollLeft + e.deltaY,
      behavior: "smooth"
    });
    console.log(e);
  };

  useEffect(() => {
    if (nodeRef?.current !== null) {
      nodeRef.current.addEventListener("wheel", scrollWithoutShift, true);
    }

    return () => {
      nodeRef?.current?.removeEventListener("wheel", scrollWithoutShift, true);
    };
  }, [nodeRef]);
};
