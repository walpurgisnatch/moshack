import { NextResponse } from 'next/server';
import { getCollection } from '@/db/mongodb';
export async function GET() {
  try {
    const usersCollection = await getCollection('users');
    const users = await usersCollection.find().toArray();

    return NextResponse.json({
      data: users
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 500 }
    );
  }
}
