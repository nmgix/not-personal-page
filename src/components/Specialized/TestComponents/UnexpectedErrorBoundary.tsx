"use client";

import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { BoundaryRender } from "./Boundary";
import { useNetworkState } from "react-use";

const boundaryActivatePercent = 70;

export const UnexpectedErrorBoundary = () => {
  const state = useNetworkState();
  const [foundOut, setFoundOut] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const htmlRef = useRef<HTMLHtmlElement>(null);
  const windowHeight = useRef<number | null>(null); //ну кто захочет баловаться высотой, тогои проблемы,  всякие landscape и portrait ориентации я поддерживать не собираюсь
  useEffect(() => {
    htmlRef.current = document.querySelector("html");
  }, []);
  useEffect(() => {
    window.addEventListener("resize", () => (windowHeight.current = window.innerHeight));
    windowHeight.current = window.innerHeight;
  }, [htmlRef.current]);
  // альтернатива ещё что если трясёшь экран то мб отвалится вся страница с анимацией лмао
  const [mouseDown, setMouseDown] = useState(false);
  const timeoutBound = useRef<NodeJS.Timeout | null>(null);
  const buttonClientY = useRef<number | null>(null);

  const [activeBoundary, setActiveBoundary] = useState(false);
  useEffect(() => {
    // тут логический баг произошёл, я меняю foundOut (из-за него портал создаётся)
    // а надо activeBoundary, с true будет hideFromTop активный и кнопка для drag спрятана
    // но и-за того что я делаю проверку if (foundOut === false) и activeBoundary может быть активный
    // после того как кикнули Boundary, то activeBoundary == true, но foundOut == false, поэтому кнопки нет
    // и так даже лучше
    if (foundOut === false) {
      document.body.classList.remove("hideFromTop");
    } else {
      if (activeBoundary) {
        document.body.classList.add("hideFromTop");
        document.body.style.top = `0px`; // на всякий ибо если зажать кнопку при триггере, то top остается тот что был при drag
      } else {
        document.body.classList.remove("hideFromTop");
      }
    }
  }, [activeBoundary, foundOut]);

  const buttonDragStart = (clientY: number) => {
    setMouseDown(true);
    buttonClientY.current = clientY;
    setFoundOut(true);
  };
  const onButtonDragStart = (e: MouseEvent) => buttonDragStart(e.clientY);
  const onButtonTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => buttonDragStart(e.touches[0].clientY);

  const buttonDragHandler = (clientY: number) => {
    if (!buttonClientY.current || clientY < buttonClientY.current) {
      btnRef.current!.style.top = `${buttonClientY.current!}px`;
      document.body.style.top = `${buttonClientY.current!}px`;
      return;
    }

    if (Math.round((clientY / windowHeight.current!) * 100) > boundaryActivatePercent) {
      setActiveBoundary(true);
    }

    if (btnRef.current) {
      btnRef.current.style.background = "white";
      btnRef.current.style.top = `${clientY}px`;
    }
    document.body.style.top = `${clientY}px`;
    htmlRef.current!.style.overflowY = "hidden";
  };
  const onButtonDrag = (e: MouseEvent) => buttonDragHandler(e.clientY);
  const onButtonTouchMove = (e: React.TouchEvent<HTMLButtonElement>) => buttonDragHandler(e.touches[0].clientY);

  const onButtonDragEnd = () => {
    console.log("btn drag end");
    setMouseDown(false);
    // setFoundOut(false); выкл потому что если  НЕ fail drag'а фулл  до пасхалки,  то при  отпускании пасхалка уберётся
    if (btnRef.current) {
      btnRef.current.style.top = `0px`;
      btnRef.current.style.background = "#0f0f0f";
    }
    document.body.style.top = `0px`;
    buttonClientY.current = null;
  };

  useEffect(() => {
    const mouseMove = (inbound: boolean) => {
      if (inbound) {
        clearTimeout(timeoutBound.current!);
        timeoutBound.current = null;
      } else {
        timeoutBound.current = setTimeout(onButtonDragEnd, 300);
      }
    };
    const mouseIn = () => mouseMove(true);
    const mouseOut = () => mouseMove(false);

    if (activeBoundary) {
      window.removeEventListener("mousemove", onButtonDrag);
      btnRef.current?.removeEventListener("mouseenter", mouseIn);
      btnRef.current?.removeEventListener("mouseleave", mouseOut);
      timeoutBound.current = null;
      return;
    }

    if (mouseDown === true) {
      window.addEventListener("mousemove", onButtonDrag);
      btnRef.current?.addEventListener("mouseenter", mouseIn);
      btnRef.current?.addEventListener("mouseleave", mouseOut);
    } else {
      window.removeEventListener("mousemove", onButtonDrag);
      btnRef.current?.removeEventListener("mouseenter", mouseIn);
      btnRef.current?.removeEventListener("mouseleave", mouseOut);
      timeoutBound.current = null;
    }

    return () => {
      window.removeEventListener("mousemove", onButtonDrag);
      btnRef.current?.removeEventListener("mouseenter", mouseIn);
      btnRef.current?.removeEventListener("mouseleave", mouseOut);
    };
  }, [mouseDown, activeBoundary]);

  return (
    <>
      {foundOut &&
        createPortal(<BoundaryRender since={state.since} setFoundOut={setFoundOut} active={activeBoundary} />, document.querySelector("html")!)}
      {!activeBoundary && (
        <button
          // onMouseEnter={() => (htmlRef.current!.style.overflow = "hidden")}
          onMouseLeave={() => (htmlRef.current!.style.overflow = "auto")}
          onMouseDown={e => {
            onButtonDragStart(e as unknown as MouseEvent);
            htmlRef.current!.style.overflow = "hidden";
          }} // в react типе нет clientY, а в mouseEvent есть (отрабатывает mouseEvent)
          onMouseUp={onButtonDragEnd}
          onTouchStart={onButtonTouchStart}
          onTouchMove={onButtonTouchMove}
          onTouchEnd={onButtonDragEnd}
          onTouchCancel={onButtonDragEnd}
          draggable={false}
          ref={btnRef}
          className='not-so-secret-btn'
          tabIndex={-1}
        />
      )}
    </>
  );
};
