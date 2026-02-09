"use client";

import { useEffect, useState, useTransition } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { isInWatchlist, toggleWatchlist } from "@/lib/actions/watchlist.actions";

interface WatchlistButtonProps {
  symbol: string;
  name: string;
  exchange: string;
  type: string;
  variant?: "button" | "icon";
  className?: string;
}

export function WatchlistButton({
  symbol,
  name,
  exchange,
  type,
  variant = "button",
  className = "",
}: WatchlistButtonProps) {
  const [inWatchlist, setInWatchlist] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const checkWatchlistStatus = async () => {
      const isInList = await isInWatchlist(symbol);
      setInWatchlist(isInList);
      setMounted(true);
    };

    checkWatchlistStatus();
  }, [symbol]);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    startTransition(async () => {
      const newState = await toggleWatchlist({ symbol, name, exchange, type });
      setInWatchlist(prev => newState);
    });
  };

  const label = variant === "icon" 
    ? inWatchlist ? "" : "" 
    : inWatchlist ? "Remove from Watchlist" : "Add to Watchlist";

  if (!mounted) return null;

  if (variant === "icon") {
    return (
      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button
              onClick={handleToggle}
              disabled={isPending}
              className={`ml-auto flex items-center justify-center text-5xl hover:scale-110 transition-all duration-200 ${className} ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
              aria-label={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
            >
              {inWatchlist ? (
                <span className="text-yellow-400 hover:text-yellow-500">★</span>
              ) : (
                <span className="text-gray-400 hover:text-yellow-500">☆</span>
              )}
            </button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content 
              className="z-50 rounded-md bg-gray-900 px-2 py-1 text-xs text-white shadow-lg"
              sideOffset={5}
            >
              {inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
              <Tooltip.Arrow className="fill-gray-900" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    );
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={`px-4 py-2 w-full rounded-md text-sm font-medium transition-colors ${
        inWatchlist 
          ? 'bg-red-50 text-red-600 hover:bg-red-100' 
          : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
      } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {isPending ? 'Processing...' : label}
    </button>
  );
}