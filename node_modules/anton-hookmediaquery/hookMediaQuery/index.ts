import { useState, useEffect } from "react";

// тип должен быть объектом со свойством query, где ключ будет строкой
interface ParamQuery {
  query: string;
}

export function useMediaQuery(obj: ParamQuery): boolean {
  // Создаем стейт, в котором будет хранится инфа о состояние окна
  const [state, setState] = useState<boolean>(false);

  useEffect(() => {
    // window.matchMedia(obj.query) - это мы типо получаем MediaQueryList(это объект) - и в его свойство media закидываем значение строки query
    const mediaQueryList = window.matchMedia(obj.query);

    // У объекта MediaQueryList - помимо свойства media, которое содержит значение, есть свойство matches, которое содержит булево.
    // Этим действием мы закидываем ответ от MediaQueryList (ну значение его свойства) в нашу переменную, которая содержит стейт
    setState(mediaQueryList.matches);

    // Добавляем обработчик события "change" к mediaQuery, который обновляет состояние matches
    mediaQueryList.addEventListener("change", (event) =>
      setState(event.matches)
    );
    //
    mediaQueryList.removeEventListener("change", (event) => event.matches);
  });

  return state;
}
