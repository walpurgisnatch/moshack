'use server';

import { getCollection } from '@/db/mongodb';
import type { IUserData } from '@/types/form-data';

export async function getUserFromDb(
  email: string
): Promise<IUserData | null> {
  const usersCollection = await getCollection('users');
  const user = await usersCollection.findOne<IUserData>({
    email
  });

  if (!user) return null;

  return {
    ...user
  };
}
