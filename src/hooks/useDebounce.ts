// https://habr.com/ru/companies/domclick/articles/510616/

import { useRef, useEffect } from "react";

export default function useDebounced(func: any, delay: number, cleanUp = false) {
  const timeoutRef = useRef<NodeJS.Timeout>(undefined);

  // Очистка таймера
  function clearTimer() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
  }

  // Очищаем таймер при анмаунте компонента, если cleanUp выставлен в true
  // и тем самым отменяем последний запланированный вызов
  useEffect(() => (cleanUp ? clearTimer : undefined), [cleanUp]);

  return (...args: any[]) => {
    clearTimer();
    timeoutRef.current = setTimeout(() => func(...args), delay);
  };
}
