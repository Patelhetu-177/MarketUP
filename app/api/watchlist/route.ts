import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/database/mongoose';
import { Watchlist } from '@/database/models/watchlist.model';
import { auth } from '@/lib/better-auth/auth';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const items = await Watchlist.find({ userId: session.user.email })
      .sort({ addedAt: -1 })
      .lean();

    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching watchlist:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { symbol, name, exchange, type } = await request.json();
    
    if (!symbol || !name) {
      return NextResponse.json(
        { message: 'Symbol and name are required' },
        { status: 400 }
      );
    }

    await connectToDatabase();
    
    // Check if already in watchlist
    const existing = await Watchlist.findOne({
      userId: session.user.email,
      symbol: symbol.toUpperCase()
    });

    if (existing) {
      return NextResponse.json(
        { message: 'Already in watchlist' },
        { status: 400 }
      );
    }

    const item = new Watchlist({
      userId: session.user.email,
      symbol: symbol.toUpperCase(),
      name: name,
      exchange: exchange || '',
      type: type || '',
      addedAt: new Date()
    });

    await item.save();
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol');
    
    if (!symbol) {
      return NextResponse.json(
        { message: 'Symbol is required' },
        { status: 400 }
      );
    }

    await connectToDatabase();
    const result = await Watchlist.findOneAndDelete({
      userId: session.user.email,
      symbol: symbol.toUpperCase()
    });

    if (!result) {
      return NextResponse.json(
        { message: 'Not found in watchlist' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error removing from watchlist:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
