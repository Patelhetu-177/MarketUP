import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combine multiple class values into a single, normalized class string.
 *
 * @param inputs - One or more class values (strings, arrays, or conditional class entries) to be combined
 * @returns The resulting class string with duplicate and conflicting Tailwind utility classes resolved
 */
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

/**
 * Convert a Unix timestamp (seconds) into a human-readable relative time string.
 *
 * @param timestamp - Unix timestamp in seconds.
 * @returns A string describing how long ago the timestamp occurred (e.g., "2 days ago", "3 hours ago", "15 minutes ago").
 */
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

/**
 * Delays execution for the specified duration.
 *
 * @param ms - Delay duration in milliseconds
 * @returns No value
 */
export function delay(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

/**
 * Format a market capitalization value (USD) into a compact, human-readable string.
 *
 * @param marketCapUsd - Market capitalization in US dollars.
 * @returns `"N/A"` if the input is not a finite number or is less than or equal to zero; otherwise a dollar-formatted string using `T` for trillions, `B` for billions, `M` for millions, or plain dollars, each with two decimal places (for example `$1.23B`).
 */
export function formatMarketCapValue(marketCapUsd: number): string {
  if (!Number.isFinite(marketCapUsd) || marketCapUsd <= 0) return "N/A";
  if (marketCapUsd >= 1e12) return `$${(marketCapUsd / 1e12).toFixed(2)}T`;
  if (marketCapUsd >= 1e9) return `$${(marketCapUsd / 1e9).toFixed(2)}B`;
  if (marketCapUsd >= 1e6) return `$${(marketCapUsd / 1e6).toFixed(2)}M`;
  return `$${marketCapUsd.toFixed(2)}`;
}

/**
 * Compute a date range ending today using the Asia/Kolkata timezone.
 *
 * @param days - Number of days before today to use as the start of the range (0 yields today's date)
 * @returns An object with `to` and `from` as ISO date strings (`YYYY-MM-DD`) in the Asia/Kolkata timezone; `to` is today and `from` is `days` before today
 */
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

/**
 * Get today's date range in the Asia/Kolkata timezone as YYYY-MM-DD strings.
 *
 * @returns An object with `to` and `from` both set to today's date in `YYYY-MM-DD` format
 */
export function getTodayDateRange() {
  const today = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
  )
    .toISOString()
    .split("T")[0];

  return { to: today, from: today };
}

/**
 * Determine the number of news items to allocate per symbol and the overall target news count.
 *
 * @param symbolsCount - The number of distinct symbols to distribute news for
 * @returns An object with `itemsPerSymbol` (number of items assigned to each symbol) and `targetNewsCount` (overall target, always 6)
 */
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

/**
 * Get today's date string formatted for the en-CA locale using the Asia/Kolkata timezone.
 *
 * @returns Today's date as a `YYYY-MM-DD` string localized to en-CA with the Asia/Kolkata timezone.
 */
export function getTodayString() {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
}

/**
 * Format a change percentage as a signed string with two decimal places and a percent sign.
 *
 * @param changePercent - The numeric change percentage; if omitted, an empty string is returned
 * @returns An empty string when `changePercent` is undefined, otherwise a string like `+1.23%` or `-0.50%`
 */
export function formatChangePercent(changePercent?: number) {
  if (changePercent === undefined) return "";
  const sign = changePercent > 0 ? "+" : "";
  return `${sign}${changePercent.toFixed(2)}%`;
}

/**
 * Selects a Tailwind CSS text color class based on a numeric change percentage.
 *
 * @param changePercent - The percentage change to evaluate; may be undefined when no data is available.
 * @returns `"text-gray-400"` if `changePercent` is `undefined`, `"text-green-500"` if `changePercent` is greater than 0, `"text-red-500"` if `changePercent` is less than or equal to 0.
 */
export function getChangeColorClass(changePercent?: number) {
  if (changePercent === undefined) return "text-gray-400";
  return changePercent > 0 ? "text-green-500" : "text-red-500";
}

/**
 * Formats a numeric amount as Indian Rupee currency using the en-IN locale.
 *
 * @param price - Amount in Indian Rupees
 * @returns The formatted currency string (for example, "₹1,234.00")
 */
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

/**
 * Builds a human-readable description of a price alert.
 *
 * @param alert - Alert configuration containing `alertType` ("upper" | "lower") and `threshold`
 * @returns A string describing the condition, e.g. "Price > ₹1,234.56" or "Price < ₹1,234.56"
 */
export function getAlertText(alert: Alert) {
  const condition = alert.alertType === "upper" ? ">" : "<";
  return `Price ${condition} ${formatPrice(alert.threshold)}`;
}

/**
 * Formats today's date with weekday, year, month, and day for the en-IN locale using the Asia/Kolkata timezone.
 *
 * @returns A localized date string representing today's date (e.g., "Monday, 1 January 2024") in the en-IN locale and Asia/Kolkata timezone.
 */
export function getFormattedTodayDate() {
  return new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Kolkata",
  });
}