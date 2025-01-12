import { useRef, useState } from "react";
import classnames from "classnames";
import { DefaultButton } from "@/components/Generic/Buttons";
import styles from "./cookie-prompt.module.scss";

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

  // `box cookies-prompt ${cookieAccepted ? "cookies-accepted" : ""}`
  return (
    <div ref={promptRef} className={classnames("box", styles.cookiesPrompt, cookieAccepted && styles.cookiesAccepted)}>
      <div className={styles.contentWrapper}>
        <h3 className={styles.title}>про куки</h3>
        <span className={styles.threat}>мы украдём все ваши куки, съедим и тарелку не вернём</span>
      </div>
      <DefaultButton onClick={onCookieAccept} disabled={cookieAccepted}>
        <span>{buttonText.current}</span>
      </DefaultButton>
    </div>
  );
};
