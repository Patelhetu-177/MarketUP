'use server';

import {auth} from '@/lib/better-auth/auth';
import { connectToDatabase } from '@/database/mongoose';
import { Watchlist } from '@/database/models/watchlist.model';

export interface WatchlistItem {
  symbol: string;
  name: string;
  exchange: string;
  type: string;
}

import { headers } from 'next/headers';

async function getCurrentUserEmail(): Promise<string | null> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    return session?.user?.email || null;
  } catch (error) {
    console.error('Error getting user session:', error);
    return null;
  }
}

export async function getWatchlist(providedEmail?: string): Promise<WatchlistItem[]> {
  try {
    const email = providedEmail || await getCurrentUserEmail();
    if (!email) return [];

    await connectToDatabase();
    const items = await Watchlist.find({ userId: email }).lean();
    
    return items.map(item => ({
      symbol: item.symbol,
      name: item.name,
      exchange: item.exchange,
      type: item.type
    }));
  } catch (error) {
    console.error('Error getting watchlist:', error);
    return [];
  }
}

export async function addToWatchlist(item: WatchlistItem): Promise<boolean> {
  try {
    const email = await getCurrentUserEmail();
    if (!email) return false;

    await connectToDatabase();
    
    await Watchlist.findOneAndUpdate(
      { userId: email, symbol: item.symbol },
      {
        $set: {
          userId: email,
          symbol: item.symbol,
          name: item.name,
          exchange: item.exchange,
          type: item.type,
          addedAt: new Date()
        }
      },
      { upsert: true, new: true }
    );

    return true;
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    return false;
  }
}

export async function removeFromWatchlist(symbol: string): Promise<boolean> {
  try {
    const email = await getCurrentUserEmail();
    if (!email) return false;

    await connectToDatabase();
    await Watchlist.deleteOne({ userId: email, symbol });
    return true;
  } catch (error) {
    console.error('Error removing from watchlist:', error);
    return false;
  }
}

export async function isInWatchlist(symbol: string): Promise<boolean> {
  try {
    const email = await getCurrentUserEmail();
    if (!email) return false;

    await connectToDatabase();
    const count = await Watchlist.countDocuments({ 
      userId: email, 
      symbol 
    });
    
    return count > 0;
  } catch (error) {
    console.error('Error checking watchlist status:', error);
    return false;
  }
}

export async function toggleWatchlist(item: WatchlistItem): Promise<boolean> {
  const inWatchlist = await isInWatchlist(item.symbol);
  
  if (inWatchlist) {
    return await removeFromWatchlist(item.symbol);
  } else {
    return await addToWatchlist(item);
  }
}

export async function getWatchlistSymbols(email?: string): Promise<string[]> {
  try {
    const watchlist = await getWatchlist(email);
    return watchlist.map(item => item.symbol);
  } catch (error) {
    console.error('Error getting watchlist symbols:', error);
    return [];
  }
}