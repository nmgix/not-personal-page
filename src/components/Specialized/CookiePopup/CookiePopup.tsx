import { DefaultButton } from "@/components/Generic/Buttons";
import "./cookie-popup.scss";
import { useRef, useState } from "react";

const acceptButtonTexts = ["ок", "ладно", "попробуй"];

export const CookiePopup = () => {
  const popupRef = useRef<HTMLDivElement>(null);

  const [cookieAccepted, setCookieAccepted] = useState(false); // for styles to append
  const onCookieAccept = () => {
    // add in localStorage or idk that cookies are accepted
    setCookieAccepted(true);
    console.log("SELFDESTRUCTION??");

    const button = popupRef.current?.querySelector(".button") as HTMLButtonElement | null;
    if (button) button.tabIndex = -1;
  };

  return (
    <div ref={popupRef} className={`box cookie-popup ${cookieAccepted ? "cookie-accepted" : ""}`}>
      <div className='content-wrapper'>
        <h3 className='title'>про куки</h3>
        <span className='threat'>мы украдём все ваши куки, съедим и тарелку не вернём</span>
      </div>
      <DefaultButton onClick={onCookieAccept} disabled={cookieAccepted}>
        <span>{acceptButtonTexts[Math.floor(Math.random() * acceptButtonTexts.length)]}</span>
      </DefaultButton>
    </div>
  );
};
