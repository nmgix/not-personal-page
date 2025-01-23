import { ClientDate } from "./components/ClientDate";
import styles from "./header.module.scss";

export const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.devTitle}>{process.env.NEXT_PUBLIC_NAME}</h1>
      <ClientDate />
    </header>
  );
};
Header.displayName = "Header";
