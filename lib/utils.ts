import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function today() {
  return new Date().toISOString().slice(0, 10);
}

export function daysAgo(days: number) {
  const today = new Date();
  return new Date(today.setDate(today.getDate() - days));
}

export function copyToClipboard(text: string) {
  if (!navigator.clipboard) return;
  navigator.clipboard.writeText(text);
}

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function stripMarkdown(markdown: string) {
  const text = markdown
    .replace(/#+\s/g, "") // headings
    .replace(/[-*]\s/g, "") // list items
    .replace(/\[.*?\]\((.*?)\)/g, (_, url) => url) // inline links
    .replace(/`(.+?)`/g, "$1") // codeblocks
    .replace(/\*\*(.+?)\*\*|__(.+?)__/g, "$1$2") // bold
    .replace(/\*(.+?)\*|_(.+?)_/g, "$1$2") // italic
    .replace(/~~(.+?)~~/g, "$1") // strikethrough
    .replace(/>\s?(.+)/g, "$1"); // blockquotes

  return text;
}
