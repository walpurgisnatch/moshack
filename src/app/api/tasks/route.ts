import { NextResponse } from 'next/server';

import Task from '@/models/Task';

export async function GET() {
  try {
    const tasks = await Task.find();

    return NextResponse.json(tasks);
  } catch (err) {
    return NextResponse.json(
      { success: false, error: (err as Error).message },
      { status: 400 }
    );
  }
}
