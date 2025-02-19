"use client";

import { Button } from "@/components/Generic/Buttons/Default/Default-Button";
import { useRouter } from "next/navigation";

import styles from "../article-default.module.scss";

export const Back = () => {
  const router = useRouter();
  return (
    <Button title='назад' onClick={router.back} externalClassnames={styles.backBtn}>
      &#91;к статьям&#93;
    </Button>
  );
};
