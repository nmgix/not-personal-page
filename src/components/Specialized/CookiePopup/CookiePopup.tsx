import { DefaultButton } from "@/components/Generic/Buttons";
import "./cookie-popup.scss";

const acceptButtonTexts = ["ок", "ладно", "попробуй"];

export const CookiePopup = () => {
  const onCookieAccept = () => {
    // opacity 0.3?
    // add in localStorage or idk that cookies are accepted
    console.log("SELFDESTRUCTION??");
  };

  return (
    <div className='box cookie-popup'>
      <div className='content-wrapper'>
        <h3 className='title'>про куки</h3>
        <span className='threat'>мы украдём все ваши куки, съедим и тарелку не вернём</span>
      </div>
      <DefaultButton onClick={onCookieAccept}>
        <span>{acceptButtonTexts[Math.floor(Math.random() * acceptButtonTexts.length)]}</span>
      </DefaultButton>
    </div>
  );
};
