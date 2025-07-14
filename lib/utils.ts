import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toMiliUnits = (amount: number) => amount * 1000;

export const fromMiliUnits = (amount: number) => amount / 1000;

export const formatToLocaleDate = (date: Date | undefined) => {
  if (!date) return "";

  return date.toLocaleDateString("default", {
    weekday: "long",
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

export const formatToYMD = (dateStr: string) => {
  const date = new Date(dateStr);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const transformDataColumnsToRows = (
  columns: { name: string; data: string[] }[],
  accountId: string
): Record<string, string>[] => {
  const rowCount = columns[0]?.data.length ?? 0;

  return Array.from({ length: rowCount }, (_, index) => {
    const row: Record<string, string> = { accountId };

    for (const column of columns) {
      const key = column.name.toLowerCase();
      row[key] = column.data[index] ?? "";
    }

    return row;
  });
};
