import { useEffect, RefObject } from "react";

function useClickOutside<T extends HTMLElement>(ref: RefObject<T | null>, callback: () => void): void {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent): void {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    // document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      //   document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref, callback]);
}

export default useClickOutside;
