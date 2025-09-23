'use server';

import { signIn } from '@/auth/auth';

export async function signInWithCredentials(
  email: string,
  password: string
) {
  try {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false
    });

    return result;
  } catch (err) {
    console.error('Ошибка авторизации', err);
    throw err;
  }
}
