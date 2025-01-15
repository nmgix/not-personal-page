import { Popup } from "@/components/Generic/Popup";
import { CookiePrompt } from "@/components/Specialized/CookiePrompt";
import styles from "./cookie-popup.module.scss";

export const CookiePopup = () => {
  return <Popup children={<CookiePrompt />} externalClassNames={styles.cookiePopup} />;
};
