import { NextResponse } from 'next/server';
import clientPromise from '@/db/mongodb';

export async function GET() {
  try {
    const cline = await clientPromise;
    const db = cline.db('users');

    const usersCollection = db.collection('users');
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
