import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface RawNewsArticle {
  id: number;
  headline: string;
  summary: string;
  url: string;
  datetime: number;
  source?: string;
  image?: string;
  category?: string;
  related?: string;
}

export interface MarketNewsArticle {
  id: string;
  headline: string;
  summary: string;
  url: string;
  datetime: number;
  source: string;
  image?: string;
  category: "company" | "market";
  related?: string;
}

export type Alert = {
  alertType: "upper" | "lower";
  threshold: number;
};

export function formatTimeAgo(timestamp: number) {
  const now = Date.now();
  const diffInMs = now - timestamp * 1000;
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

  if (diffInHours > 24) {
    const days = Math.floor(diffInHours / 24);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }
  if (diffInHours >= 1) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  }
  return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
}

export function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export function formatMarketCapValue(marketCapUsd: number): string {
  if (!Number.isFinite(marketCapUsd) || marketCapUsd <= 0) return "N/A";
  if (marketCapUsd >= 1e12) return `$${(marketCapUsd / 1e12).toFixed(2)}T`;
  if (marketCapUsd >= 1e9) return `$${(marketCapUsd / 1e9).toFixed(2)}B`;
  if (marketCapUsd >= 1e6) return `$${(marketCapUsd / 1e6).toFixed(2)}M`;
  return `$${marketCapUsd.toFixed(2)}`;
}

export function getDateRange(days: number) {
  const now = new Date();
  const istNow = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
  );

  const from = new Date(istNow);
  from.setDate(from.getDate() - days);

  return {
    to: istNow.toISOString().split("T")[0],
    from: from.toISOString().split("T")[0],
  };
}

export function getTodayDateRange() {
  const today = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
  )
    .toISOString()
    .split("T")[0];

  return { to: today, from: today };
}

export function calculateNewsDistribution(symbolsCount: number) {
  let itemsPerSymbol: number;
  let targetNewsCount = 6;

  if (symbolsCount < 3) {
    itemsPerSymbol = 3;
  } else if (symbolsCount === 3) {
    itemsPerSymbol = 2;
  } else {
    itemsPerSymbol = 1;
  }

  return { itemsPerSymbol, targetNewsCount };
}

export const validateArticle = (article: RawNewsArticle) =>
  article.headline && article.summary && article.url && article.datetime;

export const formatArticle = (
  article: RawNewsArticle,
  isCompanyNews: boolean,
  symbol?: string,
  index = 0,
): MarketNewsArticle => ({
  id: String(Date.now() + index),
  headline: article.headline.trim(),
  summary: article.summary.trim().slice(0, 220) + "...",
  url: article.url,
  datetime: article.datetime,
  source: article.source || "Indian Market",
  image: article.image || "",
  category: isCompanyNews ? "company" : "market",
  related: symbol,
});

export function getTodayString() {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
}

export function formatChangePercent(changePercent?: number) {
  if (changePercent === undefined) return "";
  const sign = changePercent > 0 ? "+" : "";
  return `${sign}${changePercent.toFixed(2)}%`;
}

export function getChangeColorClass(changePercent?: number) {
  if (changePercent === undefined) return "text-gray-400";
  return changePercent > 0 ? "text-green-500" : "text-red-500";
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(price);
}

export const formatDateToday = new Date().toLocaleDateString("en-IN", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "Asia/Kolkata",
});

export function getAlertText(alert: Alert) {
  const condition = alert.alertType === "upper" ? ">" : "<";
  return `Price ${condition} ${formatPrice(alert.threshold)}`;
}

export function getFormattedTodayDate() {
  return new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Kolkata",
  });
}
