import { useState, useEffect, useCallback } from "react";
// 3) setHandler - вызывает рендер хука, он не нужен (избавиться от рендера) 4)handleVisibilityChange - Занести под UseEffect

// Тип для обработчика изменения видимости документа
type VisibilityChangeHandler = (isVisible: boolean) => void;

export function useDocumentVisibility() {
  // Проверка на SSR: если document недоступен, установка начального состояния в false
  const isSSR = typeof document === "undefined";

  // Используем ленивую инициализацию для состояния visible
  const [visible, setVisible] = useState<boolean>(() => {
    return !isSSR && document.visibilityState === "visible";
  });

  const [count, setCount] = useState(0);
  const [handlers, setHandlers] = useState<VisibilityChangeHandler[]>([]);

  // Функция для обработки изменений видимости документа
  const handleVisibilityChange = useCallback(() => {
    if (isSSR) return; // Проверка на SSR

    const isVisible = document.visibilityState === "visible";
    console.log(isVisible);

    setVisible(isVisible);

    if (!isVisible) {
      setCount((prevCount) => prevCount + 1);
    }

    handlers.forEach((handler) => handler(isVisible));
  }, [handlers, isSSR]);

  // useEffect для добавления/удаления обработчика событий изменения видимости документа
  useEffect(() => {
    if (isSSR) return; // Проверка на SSR

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [handleVisibilityChange, isSSR]);

  // Функция для добавления обработчиков изменения видимости
  const onVisibilityChange = useCallback((handler: VisibilityChangeHandler) => {
    setHandlers((prevHandlers) => [...prevHandlers, handler]);

    return () => {
      setHandlers((prevHandlers) => prevHandlers.filter((h) => h !== handler));
    };
  }, []);

  return { visible, count, onVisibilityChange };
}
