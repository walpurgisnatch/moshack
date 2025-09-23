'use server';

import { signOut } from '@/auth/auth';

export async function signOutFunc() {
  try {
    const result = signOut({ redirect: false });

    return result;
  } catch (err) {
    console.log('Какая-то ошибка', err);
    throw err;
  }
}
