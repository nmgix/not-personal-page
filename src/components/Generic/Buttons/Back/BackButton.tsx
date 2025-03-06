"use client";

import styles from "./back-btn.module.scss";
import { GlobalRoutes } from "@/types/articles";
import Link from "next/link";
import classnames from "classnames";
import { ExternalClassnames } from "@/types/components";

type BackButtonProps = ExternalClassnames;

export const BackButton = (props: BackButtonProps) => {
  return (
    <Link className={classnames("button", styles.backBtn, props.externalClassnames)} href={GlobalRoutes.articles}>
      &#91;к статьям&#93;
    </Link>
  );
};
