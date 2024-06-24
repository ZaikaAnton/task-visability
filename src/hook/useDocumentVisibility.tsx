import { useState, useEffect, useCallback, useRef } from "react";

// Тип для обработчика изменения видимости документа
type VisibilityChangeHandler = (isVisible: boolean) => void;

export function useDocumentVisibility() {
  // Проверка на SSR: если document недоступен, установка начального состояния в false
  const isSSR = typeof document === "undefined";

  // Используем ленивую инициализацию для состояния visible
  const [visible, setVisible] = useState(() => {
    return isSSR || document.visibilityState === "visible";
  });

  const [count, setCount] = useState(0);
  const handlersRef = useRef<VisibilityChangeHandler[]>([]);

  // useEffect для добавления/удаления обработчика событий изменения видимости документа
  useEffect(() => {
    // Функция для обработки изменений видимости документа
    const handleVisibilityChange = () => {
      const isVisible = document.visibilityState === "visible";

      setVisible(isVisible);

      if (!isVisible) {
        setCount((prevCount) => prevCount + 1);
      }

      handlersRef.current.forEach((handler) => handler(isVisible));
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Функция для добавления обработчиков изменения видимости
  const onVisibilityChange = useCallback((handler: VisibilityChangeHandler) => {
    handlersRef.current.push(handler);

    return () => {
      handlersRef.current = handlersRef.current.filter((h) => h !== handler);
    };
  }, []);

  return { visible, count, onVisibilityChange };
}
