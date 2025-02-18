import Link from "next/link";
import { ClientDate } from "./components/ClientDate";
import styles from "./header.module.scss";

export const Header = ({ homeHref = "/" }: { homeHref: string }) => {
  return (
    <header className={styles.header}>
      <Link href={homeHref}>
        <h1 className={styles.devTitle}>{process.env.NEXT_PUBLIC_NAME}</h1>
      </Link>
      <ClientDate />
    </header>
  );
};
Header.displayName = "Header";
