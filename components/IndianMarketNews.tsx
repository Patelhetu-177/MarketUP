"use client";

import { useState, useMemo } from "react";
import { getNewsSource, timeAgo } from "@/lib/indianMarketNews";
import { Newspaper, ChevronLeft, ChevronRight } from "lucide-react";

const PAGE_SIZE = 20;

const getLogoText = (source: string) =>
  source.split(".")[0]?.slice(0, 2).toUpperCase();

const IndianMarketNews = ({ initialNews }: { initialNews: any[] }) => {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(initialNews.length / PAGE_SIZE));

  const currentNews = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return initialNews.slice(start, start + PAGE_SIZE);
  }, [page, initialNews]);

  const latestTime = initialNews?.[0]?.pubDate;

  return (
    <div className="h-[600px] rounded-2xl bg-gradient-to-b from-[#101010] to-[#0a0a0a] border border-[#1f1f1f] shadow-xl flex flex-col overflow-hidden">
      <div className="px-5 py-4 border-b border-[#1f1f1f] sticky top-0 z-20 bg-[#0f0f0f]/80 backdrop-blur flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center">
          <Newspaper size={18} />
        </div>

        <h1 className="text-xl font-bold text-white tracking-wide">
          Top Stories
        </h1>

        {latestTime && (
          <span className="ml-auto text-[11px] px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold">
            Updated {timeAgo(latestTime)}
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {currentNews.map((item, idx) => {
          const source = getNewsSource(item);

          return (
            <a
              key={idx}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-xl p-4 bg-[#141414] transition-all duration-300 hover:bg-[#1c1c1c] hover:shadow-xl hover:-translate-y-[2px]"
            >
              <p className="text-sm font-semibold leading-snug text-white group-hover:text-blue-400 transition-colors">
                {item.title}
              </p>

              <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="h-6 w-6 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center text-[10px] font-bold">
                    {getLogoText(source)}
                  </div>
                  <span className="truncate font-medium text-gray-300">
                    {source}
                  </span>
                </div>

                <span className="px-2 py-0.5 rounded bg-[#1f1f1f] text-gray-300">
                  {item.pubDate ? timeAgo(item.pubDate) : "N/A"}
                </span>
              </div>
            </a>
          );
        })}
      </div>

      <div className="flex items-center justify-between px-5 py-3 border-t border-[#1f1f1f] bg-[#0f0f0f]">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg bg-[#1f1f1f] text-gray-300 disabled:opacity-40 hover:bg-[#262626]"
        >
          <ChevronLeft size={16} /> Prev
        </button>

        <span className="text-xs text-gray-400">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg bg-[#1f1f1f] text-gray-300 disabled:opacity-40 hover:bg-[#262626]"
        >
          Next <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default IndianMarketNews;