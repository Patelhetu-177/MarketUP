"use server";

import Parser from "rss-parser";
import { getDateRange, formatArticle, validateArticle } from "@/lib/utils";
import { POPULAR_INDIAN_STOCK_SYMBOLS } from "@/lib/constants";

const parser = new Parser();

const RSS_FEEDS = [
  "https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms",
  "https://www.moneycontrol.com/rss/marketreports.xml",
  "https://www.business-standard.com/rss/markets-106.rss",
  "https://www.livemint.com/rss/markets",
];
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

/**
 * Fetches and return up to six recent Indian market news articles, prioritizing symbol-specific stories when available.
 *
 * @param symbols - Optional list of stock symbols to prioritize. Accepted values are case-insensitive and may include leading `NSE:` or `BSE:` prefixes which will be ignored.
 * @returns An array of up to six MarketNewsArticle objects sorted by recency. When articles matching the provided (or default) symbols exist, symbol-specific articles are returned; otherwise general market articles are returned. If no articles are available or an error occurs, a single fallback market-focused article is returned.
 */
export async function getNews(
  symbols?: string[],
): Promise<MarketNewsArticle[]> {
  try {
    const { from } = getDateRange(3);
    const fromTime = new Date(from).getTime();

    const cleanSymbols = (
      symbols?.length ? symbols : POPULAR_INDIAN_STOCK_SYMBOLS
    ).map((s) => s.replace(/^NSE:|^BSE:/, "").toUpperCase());

    const feeds = await Promise.allSettled(
      RSS_FEEDS.map((url) => parser.parseURL(url)),
    );

    const items = feeds
      .filter((f): f is PromiseFulfilledResult<any> => f.status === "fulfilled")
      .flatMap((f) => f.value.items || []);

    const symbolNews: MarketNewsArticle[] = [];
    const marketNews: MarketNewsArticle[] = [];

    let index = 0;

    for (const item of items) {
      if (!item?.title || !item?.link) continue;

      const publishedAt = new Date(
        item.pubDate || item.isoDate || Date.now(),
      ).getTime();

      if (publishedAt < fromTime) continue;

      const title = item.title.toString();
      const upperTitle = title.toUpperCase();

      const matchedSymbol = cleanSymbols.find((sym) =>
        upperTitle.includes(sym),
      );

      const rawArticle: RawNewsArticle = {
        id: publishedAt + index,
        headline: title,
        summary: (item.contentSnippet || item.content || title).slice(0, 300),
      let source = "Indian Market";
      try {
        source = new URL(item.link).hostname.replace("www.", "");
      } catch {
        // Keep default source if URL parsing fails
      }

      const rawArticle: RawNewsArticle = {
        id: publishedAt + index,
        headline: title,
        summary: (item.contentSnippet || item.content || title).slice(0, 300),
        url: item.link.toString(),
        datetime: Math.floor(publishedAt / 1000),
        source,
        image: "",
        related: matchedSymbol ? `BSE:${matchedSymbol}` : "",
      };
        related: matchedSymbol ? `BSE:${matchedSymbol}` : "",
      };

      if (!validateArticle(rawArticle)) continue;

      const formatted = formatArticle(
        rawArticle,
        Boolean(matchedSymbol),
        matchedSymbol ? `BSE:${matchedSymbol}` : undefined,
        index++,
      );

      if (matchedSymbol) {
        symbolNews.push(formatted);
      } else {
        marketNews.push(formatted);
      }
    }

    const unique = (arr: MarketNewsArticle[]) =>
      Array.from(new Map(arr.map((a) => [a.headline, a])).values()).sort(
        (a, b) => b.datetime - a.datetime,
      );

    const finalArticles =
      symbolNews.length > 0
        ? unique(symbolNews).slice(0, 6)
        : unique(marketNews).slice(0, 6);

    if (finalArticles.length === 0) {
      return [
        {
          id: "fallback-india",
          headline:
            "Indian stock market traded cautiously amid mixed global cues",
          summary:
            "Nifty and Sensex moved in a narrow range as investors tracked RBI policy signals and inflation data.",
          source: "MarketUP",
          url: "https://www.nseindia.com",
          datetime: Math.floor(Date.now() / 1000),
          image: "",
          category: "market",
          related: "",
        },
      ];
    }

    return finalArticles;
  } catch (err) {
    console.error("Indian getNews error:", err);
    return [
      {
        id: "fallback-error",
        headline: "Indian markets remain in focus for investors",
        summary:
          "Investors are tracking earnings, RBI commentary, and global trends for near-term direction.",
        source: "MarketUP",
        url: "https://www.bseindia.com",
        datetime: Math.floor(Date.now() / 1000),
        image: "",
        category: "market",
        related: "",
      },
    ];
  }
}

// export const searchStocks = cache(
//   async (query?: string): Promise<StockWithWatchlistStatus[]> => {
//     try {
//       const trimmed = query?.trim().toUpperCase() ?? '';

//       return POPULAR_INDIAN_STOCK_SYMBOLS
//         .filter((s) =>
//           trimmed ? s.includes(trimmed) : true
//         )
//         .slice(0, 15)
//         .map((s) => {
//           const symbol = s.replace(/^NSE:/, '');
//           return {
//             symbol: `BSE:${symbol}`,
//             name: symbol,
//             exchange: 'BSE',
//             type: 'Equity',
//             isInWatchlist: false,
//           };
//         });
//     } catch (err) {
//       console.error('Indian BSE searchStocks error:', err);
//       return [];
//     }
//   }
// );