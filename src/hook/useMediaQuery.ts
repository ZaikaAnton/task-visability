import { useState, useEffect } from "react";
// 1) Переименовал const [matches, setMatches] = useState<boolean>(false); 2)const [matches, setMatches] = useState<boolean>(false); - убрал явное определение типа
// тип должен быть объектом со свойством query, где ключ будет строкой
interface ParamQuery {
  query: string;
}

export function useMediaQuery({ query }: ParamQuery): boolean {
  // Создаем стейт, в котором будет хранится инфа о состояние окна
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    // window.matchMedia(obj.query) - это мы типо получаем MediaQueryList(это объект) - и в его свойство media закидываем значение строки query
    const mediaQueryList = window.matchMedia(query);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // У объекта MediaQueryList - помимо свойства media, которое содержит значение, есть свойство matches, которое содержит булево.
    // Этим действием мы закидываем ответ от MediaQueryList (ну значение его свойства) в нашу переменную, которая содержит стейт
    setMatches(mediaQueryList.matches);

    // Добавляем обработчик события "change" к mediaQuery, который обновляет состояние matches
    mediaQueryList.addEventListener("change", handleChange);
    //
    return () => {
      mediaQueryList.removeEventListener("change", (event) => event.matches);
    };
  }, [query]);

  return matches;
}
