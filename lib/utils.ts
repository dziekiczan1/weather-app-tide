import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const getWeatherIconUrl = (
  iconCode: string,
  size: "1x" | "2x" | "4x" = "2x",
) => {
  return `https://openweathermap.org/img/wn/${iconCode}@${size}.png`;
};
