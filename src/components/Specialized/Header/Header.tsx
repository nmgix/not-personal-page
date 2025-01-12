import { useRef } from "react";
import styles from "./header.module.scss";

export const Header = () => {
  const localDate = useRef(
    new Date().toLocaleTimeString(navigator.language, { hour: "2-digit", minute: "2-digit", timeZone: process.env.NEXT_PUBLIC_TIMEZONE })
  );
  const codingSinceDate = useRef(Math.floor((process.env.NEXT_PUBLIC_CODING_SINCE as unknown as number) / 315360000000));

  return (
    <header className={styles.header}>
      <h1 className={styles.devTitle}>{process.env.NEXT_PUBLIC_NAME}</h1>
      <span className={styles.timeInfo}>
        {localDate.current} local. {codingSinceDate.current}y in dev
      </span>
    </header>
  );
};
