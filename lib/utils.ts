import { clsx, type ClassValue } from "clsx";
import { format, subDays } from "date-fns";
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
  selectedHeader: { name: string; index: number; data: string[] }[],
  accountId: string
): {
  description: string;
  amount: string;
  payee: string;
  date: string;
  accountId: string;
}[] => {
  if (!selectedHeader.length) return [];

  // Map selected header names to their column index
  const headerIndexMap: { [key: string]: number } = {};
  selectedHeader.forEach((header) => {
    headerIndexMap[header.name] = header.index;
  });

  // Build row objects from tableBody using selected indices
  return (
    // Find the max number of rows in tableBody
    selectedHeader[0]?.data.map((_, rowIdx) => {
      return {
        description:
          selectedHeader.find((h) => h.name === "Description")?.data[rowIdx] ??
          "",
        payee:
          selectedHeader.find((h) => h.name === "Payee")?.data[rowIdx] ?? "",
        amount:
          selectedHeader.find((h) => h.name === "Amount")?.data[rowIdx] ?? "",
        date: selectedHeader.find((h) => h.name === "Date")?.data[rowIdx] ?? "",
        accountId: accountId ?? "",
      };
    }) ?? []
  );
};

export const isValidDateAndFormat = (dateStr: string): boolean => {
  const extracted = dateStr.match(/\d{4}-\d{2}-\d{2}/)?.[0];
  if (!extracted) return false;

  const matchesFormat = /^\d{4}-\d{2}-\d{2}$/.test(extracted);
  if (!matchesFormat) return false;

  const parsed = new Date(extracted);
  const isReal = !isNaN(parsed.getTime());

  const [year, month, day] = extracted.split("-").map(Number);
  return (
    parsed.getUTCFullYear() === year &&
    parsed.getUTCMonth() + 1 === month &&
    parsed.getUTCDate() === day &&
    isReal
  );
};

export const formatDates = ({
  from,
  to,
}: {
  from?: string | Date;
  to?: string | Date;
}) => {
  const dateFormat = "LLL dd, y";
  if (!from)
    return `${format(subDays(new Date(), 30), dateFormat)} - ${format(
      new Date(),
      dateFormat
    )}`;

  if (to) return `${format(from, dateFormat)} - ${format(to, dateFormat)}`;

  return format(from, dateFormat);
};
