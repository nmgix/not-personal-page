"use client";

import { Button } from "@/components/Generic/Buttons/Default/DefaultButton";
import { useRouter } from "next/navigation";

import styles from "./back-btn.module.scss";

export const BackButton = () => {
  const router = useRouter();
  return (
    <Button title='назад' onClick={router.back} externalClassnames={styles.backBtn}>
      &#91;к статьям&#93;
    </Button>
  );
};
