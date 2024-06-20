import React from "react";
import { ReactNode } from "react";

interface MediaProps {
  orientation: string;
  minResolution: `${number}dppx`;
  maxResolution: `${number}dppx`;
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
  children: ReactNode | ((matches: boolean) => ReactNode);
}

// Вспомогательная функция для создания условий медиа-запроса
const createMediaQueryCondition = (
  type: string,
  value: string | number | undefined,
  unit: string = ""
) => {
  if (value === undefined) return null;
  if (typeof value === "number") {
    return `(${type}: ${value}${unit})`;
  }
  return `(${type}: ${value})`;
};

export const MediaQuery: React.FC<Partial<MediaProps>> = ({
  orientation,
  minResolution,
  maxResolution,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
  children,
}) => {
  const mediaQueryConditions = [
    createMediaQueryCondition("orientation", orientation),
    createMediaQueryCondition("min-resolution", minResolution, "dppx"),
    createMediaQueryCondition("max-resolution", maxResolution, "dppx"),
    createMediaQueryCondition("min-width", minWidth, "px"),
    createMediaQueryCondition("max-width", maxWidth, "px"),
    createMediaQueryCondition("min-height", minHeight, "px"),
    createMediaQueryCondition("max-height", maxHeight, "px"),
  ].filter(Boolean);

  const mediaQueryString = mediaQueryConditions.join(" and ");

  const matches = window?.matchMedia(mediaQueryString).matches;

  if (typeof children === "function") {
    return children(matches);
  }
  return matches ? children : null;
};
