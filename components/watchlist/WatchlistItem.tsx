'use client';

import Link from "next/link";
import { WatchlistButton } from "@/components/WatchlistButton";
import { normalizeSymbol } from "@/lib/constants";

interface WatchlistItemProps {
  item: {
    symbol: string;
    name: string;
    exchange: string;
    type: string;
  };
}

export function WatchlistItem({ item }: WatchlistItemProps) {
  return (
    <div className="relative group bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-200 dark:border-gray-700">
      <Link
        href={`/stocks/${normalizeSymbol(item.symbol)}`}
        className="block p-5 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
              {normalizeSymbol(item.symbol)}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {item.name} • {item.exchange}
            </p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 capitalize">
              {item.type}
            </p>
          </div>
          <div className="ml-4 flex-shrink-0">
            <div onClick={(e) => e.stopPropagation()}>
              <WatchlistButton
                symbol={item.symbol}
                name={item.name}
                exchange={item.exchange}
                type={item.type}
                variant="icon"
                className="absolute top-3 right-3"
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
