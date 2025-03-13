"use client";

import classnames from "classnames";
import styles from "./boxes-scrollbar.module.scss";
import { Fragment, useEffect, useRef, useState } from "react";
import { useFade } from "@/hooks/useFade";
import { useScrollable } from "@/hooks/useScrollable";
import { ExternalClassnames } from "@/types/components";

type BoxesScrollbarProps = {
  list: React.ReactElement[];
  noWrapper?: true;
  disabled?: boolean;
} & { ref?: React.Ref<HTMLDivElement> } & ExternalClassnames;

export const BoxesScrollbar = ({ list, externalClassnames, noWrapper, disabled, ref }: BoxesScrollbarProps) => {
  // const { updateScrollFn, fadeBoth, fadeState } = useFade(boxRef as React.RefObject<HTMLElement>, true, {
  //   sideOne: "fadeLeft",
  //   sideTwo: "fadeRight",
  //   bothSides: "fadeLeftRight"
  // });
  // const [scrollLeft, setScrollLeft] = useState(0);
  // useEffect(() => {
  //   const handleScroll = () => {
  //     setScrollLeft(boxRef.current!.scrollLeft);
  //   };

  //   const el = boxRef.current!;
  //   el.addEventListener("scroll", handleScroll);
  //   return () => el.removeEventListener("scroll", handleScroll);
  // }, []);

  // const [scrollLeft, setScrollLeft] = useState(0);

  if (!list || list.length == 0) return null;

  let scrollAmount = 0;
  let isScrolling = false;
  const scrollSomething = (e: WheelEvent) => {
    e.preventDefault();
    scrollAmount += e.deltaY * 1; // Ускоряем немного, чтобы было похоже на Shift + Scroll
    // setScrollLeft(boxRef.current!.scrollLeft);

    const smoothScroll = (element: HTMLElement) => {
      if (Math.abs(scrollAmount) < 1) {
        isScrolling = false;
        return;
      }

      element.scrollLeft += scrollAmount * 0.1; // Делаем плавное замедление
      scrollAmount *= 0.9; // Постепенно уменьшаем скорость (трение)

      requestAnimationFrame(() => smoothScroll(element));
    };

    if (!isScrolling) {
      isScrolling = true;
      smoothScroll(e.currentTarget as HTMLElement);
    }
  };

  return (
    <div
      ref={ref}
      // onScroll={updateScrollFn}
      // onScroll={e => {
      //   let scroll = e.currentTarget.scrollLeft;
      //   let fadeStart = Math.min(scroll, 50) + "px"; // Отключает левую маску при скролле вправо
      //   let fadeEnd = Math.max(50 - scroll, 0) + "px"; // Меняет плавность затемнения

      //   e.currentTarget.style.setProperty("--dynamicFadeStart", fadeStart);
      //   e.currentTarget.style.setProperty("--dynamicFadeEnd", fadeEnd);
      // }}
      tabIndex={disabled ? -1 : undefined}
      onMouseEnter={e => e.currentTarget.addEventListener("wheel", scrollSomething)}
      onMouseLeave={e => e.currentTarget.removeEventListener("wheel", scrollSomething)}
      className={classnames(
        styles.boxesScrollbar,
        // styles.dynamicFade,
        // fadeBoth ? styles.fadeBoth : fadeState.sideOne ? styles.fadeLeft : fadeState.sideTwo ? styles.fadeRight : null,
        externalClassnames
      )}
      // style={{
      //   // @ts-ignore
      //   "--dynamicFadeStart": `${Math.min(scrollLeft, 50)}px`,
      //   "--dynamicFadeEnd": `${Math.max(50 - scrollLeft, 0)}px`
      // }}
    >
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
