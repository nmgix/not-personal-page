"use client";

import { Button } from "@/components/Generic/Buttons/Default/DefaultButton";
import { useRouter } from "next/navigation";

import styles from "./back-btn.module.scss";
import { GlobalRoutes } from "@/types/articles";
import { useCallback } from "react";

export const BackButton = () => {
  const router = useRouter();
  const _onClick = useCallback(() => {
    // if (props?.onClick) props?.onClick();
    router.push(GlobalRoutes.articles);
  }, []);
  return (
    <Button title='назад' onClick={_onClick} externalClassnames={styles.backBtn}>
      &#91;к статьям&#93;
    </Button>
  );
};
