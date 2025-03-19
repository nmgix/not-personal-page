"use client";

import { useMinuteTimer } from "@/hooks/useMinuteTimer";
import styles from "../header.module.scss";
import { useEffect, useState } from "react";

export const ClientDate = () => {
  const codingSinceDate = Math.floor((process.env.NEXT_PUBLIC_CODING_SINCE as unknown as number) / 315360000000);

  const [date, setDate] = useState(new Date());
  useMinuteTimer(setDate);
  // TODO: хз, ваарнинг не убирается никак, потом решу
  const localDate = date.toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: process.env.NEXT_PUBLIC_TIMEZONE
  });
  useEffect(() => {}, [date]);

  return (
    <span className={styles.timeInfo} suppressHydrationWarning>
      {localDate} local. {codingSinceDate}y in dev
    </span>
  );
};
