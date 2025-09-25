import { NextResponse } from 'next/server';

import User from '@/models/User';

export async function GET() {
  try {
    const stats = await User.find();

    return NextResponse.json(stats);
  } catch (err) {
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 400 }
    );
  }
}
