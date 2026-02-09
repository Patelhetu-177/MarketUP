import Link from "next/link";
import { getWatchlist } from "@/lib/actions/watchlist.actions";
import { WatchlistItem } from "@/components/watchlist/WatchlistItem";

export const dynamic = 'force-dynamic';

export default async function WatchlistPage() {
  const watchlist = await getWatchlist();

  return (
    <div className="container py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          My Watchlist
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Track your favorite stocks and get real-time updates
        </p>
      </div>

      {watchlist.length === 0 ? (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
            No stocks in watchlist
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Get started by adding stocks to your watchlist.
          </p>
          <div className="mt-6">
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Browse Stocks
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {watchlist.map((item) => (
            <WatchlistItem key={item.symbol} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}