"use server";

import Parser from "rss-parser";
import {
  getDateRange,
  formatArticle,
  validateArticle,
  RawNewsArticle,
  MarketNewsArticle,
} from "@/lib/utils";
import { POPULAR_INDIAN_STOCK_SYMBOLS } from "@/lib/constants";
import { cache } from "react";
const parser = new Parser();

const RSS_FEEDS = [
  "https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms",
  "https://www.moneycontrol.com/rss/marketreports.xml",
  "https://www.business-standard.com/rss/markets-106.rss",
  "https://www.livemint.com/rss/markets",
];

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

      const source = new URL(item.link.toString()).hostname.replace("www.", "");

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

export const searchStocks = cache(
  async (query?: string): Promise<StockWithWatchlistStatus[]> => {
    try {
      const trimmed =
        typeof query === "string" ? query.trim().toUpperCase() : "";

      let results: {
        symbol: string;
        description: string;
        displaySymbol: string;
        type: string;
        __exchange?: string;
      }[] = [];

      if (!trimmed) {
        const top = POPULAR_INDIAN_STOCK_SYMBOLS.slice(0, 10);

        results = top.map((sym) => {
          const clean = sym.replace(/^NSE:|^BSE:/, "").toUpperCase();
          return {
            symbol: clean,
            description: clean,
            displaySymbol: clean,
            type: "Equity",
            __exchange: "BSE",
          };
        });
      } else {
        results = POPULAR_INDIAN_STOCK_SYMBOLS.map((sym) => {
          const clean = sym.replace(/^NSE:|^BSE:/, "").toUpperCase();
          return {
            symbol: clean,
            description: clean,
            displaySymbol: clean,
            type: "Equity",
            __exchange: "BSE",
          };
        }).filter(
          (r) => r.symbol.includes(trimmed) || r.description.includes(trimmed),
        );
      }

      const mapped: StockWithWatchlistStatus[] = results
        .map((r) => {
          const upper = r.symbol.toUpperCase();
          const name = r.description || upper;
          const exchange = r.__exchange || "BSE";
          const type = r.type || "Equity";

          return {
            symbol: `BSE:${upper}`,
            name,
            exchange,
            type,
            isInWatchlist: false,
          };
        })
        .slice(0, 15);

      return mapped;
    } catch (err) {
      console.error("Indian BSE searchStocks error:", err);
      return [];
    }
  },
);
