import Link from "next/link";
import styles from "./header.module.scss";
import dynamic from "next/dynamic";
// import { ClientDate } from "./components/ClientDate";
const ClientDate = dynamic(() => import("./components/ClientDate").then(c => c.ClientDate));

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
