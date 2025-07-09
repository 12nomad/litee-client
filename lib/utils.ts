import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toMiliUnits = (amount: number) => amount * 1000;

export const fromMiliUnits = (amount: number) => amount / 1000;

export const toDateOnly = (date: string) => date.slice(0, 10);

export const formatDate = (date: Date | undefined) => {
  if (!date) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export const isValidDate = (date: Date | undefined) => {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
};
