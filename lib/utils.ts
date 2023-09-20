import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function now() {
  return new Date();
}

export function daysAgo(days: number) {
  const today = now();
  return new Date(today.setDate(today.getDate() - days));
}

export function copyToClipboard(text: string) {
  if (!navigator.clipboard) return;

  navigator.clipboard.writeText(text);
}
