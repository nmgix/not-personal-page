import { useRef, useState } from "react";
import { DefaultButton } from "@/components/Generic/Buttons";
import "./cookie-prompt.scss";

const acceptButtonTexts = ["ок", "ладно", "попробуй"];

export const CookiePrompt = () => {
  const promptRef = useRef<HTMLDivElement>(null);
  const buttonText = useRef(acceptButtonTexts[Math.floor(Math.random() * acceptButtonTexts.length)]);

  const [cookieAccepted, setCookieAccepted] = useState(false); // for styles to append
  const onCookieAccept = () => {
    // add in localStorage or idk that cookies are accepted
    setCookieAccepted(true);
    console.log("SELFDESTRUCTION??");
    console.log("Какие куки лмао"); // для аналитики??

    const button = promptRef.current?.querySelector(".button") as HTMLButtonElement | null;
    if (button) button.tabIndex = -1;
  };

  return (
    <div ref={promptRef} className={`box cookies-prompt ${cookieAccepted ? "cookies-accepted" : ""}`}>
      <div className='content-wrapper'>
        <h3 className='title'>про куки</h3>
        <span className='threat'>мы украдём все ваши куки, съедим и тарелку не вернём</span>
      </div>
      <DefaultButton onClick={onCookieAccept} disabled={cookieAccepted}>
        <span>{buttonText.current}</span>
      </DefaultButton>
    </div>
  );
};
