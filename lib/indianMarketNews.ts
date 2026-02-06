import Parser from "rss-parser";

const parser = new Parser();

const FEEDS = [
  "https://economictimes.indiatimes.com/rssfeeds/1977021501.cms",
  "https://www.livemint.com/rss/markets",
];

export const getIndianMarketNews = async () => {
  const results = await Promise.allSettled(
    FEEDS.map((url) => parser.parseURL(url))
  );

  const items = results
    .filter((r): r is PromiseFulfilledResult<any> => r.status === "fulfilled")
    .flatMap((r) => r.value.items || []);

  const normalized = items.map((item: any) => ({
    title: item.title ?? "",
    link: item.link ?? "",
    pubDate: item.pubDate ?? item.isoDate ?? null,
    isoDate: item.isoDate ?? null,
    author: item.author ?? null,
    creator: item.creator ?? null,
    source: item.source ?? null,
    contentSnippet: item.contentSnippet ?? "",
  }));

  const unique = Array.from(
    new Map(normalized.map((item) => [item.title, item])).values()
  );

  unique.sort(
    (a, b) =>
      new Date(b.pubDate || 0).getTime() -
      new Date(a.pubDate || 0).getTime()
  );

  return unique;
};

export const getNewsSource = (item: any) =>
  item.creator?.[0] ||
  item.author ||
  item.source ||
  (item.link ? new URL(item.link).hostname.replace("www.", "") : "News");

export const timeAgo = (dateString: string) => {
  if (!dateString) return "N/A";

  const now = new Date();
  const past = new Date(dateString);
  const diff = now.getTime() - past.getTime();

  const min = Math.floor(diff / (1000 * 60));
  const hrs = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (min < 60) return `${min} min ago`;
  if (hrs < 24) return `${hrs} hrs ago`;
  return `${days} days ago`;
};