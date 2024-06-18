import { useState, useEffect, useCallback } from "react";

type VisibilityChangeHandler = (isVisible: boolean) => void;

export function useDocumentVisibility() {
  const [visible, setVisible] = useState(
    document.visibilityState === "visible"
  );

  const [count, setCount] = useState(0);

  const [handlers, setHandlers] = useState<VisibilityChangeHandler[]>([]);

  const handleVisibilityChange = useCallback(() => {
    const isVisible = document.visibilityState === "visible";
    console.log(isVisible);

    setVisible(isVisible);

    if (!isVisible) {
      setCount((prevCount) => prevCount + 1);
    }

    handlers.forEach((handler) => handler(isVisible));
  }, [handlers]);

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [handleVisibilityChange]);

  const onVisibilityChange = useCallback((handler: VisibilityChangeHandler) => {
    setHandlers((prevHandlers) => [...prevHandlers, handler]);

    return () => {
      setHandlers((prevHandlers) => prevHandlers.filter((h) => h !== handler));
    };
  }, []);

  return { visible, count, onVisibilityChange };
}
