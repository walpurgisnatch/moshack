'use server';

import { signIn } from '@/auth/auth';

export async function signInWithCredentials(
  email: string,
  password: string
) {
  const result = await signIn('credentials', {
    email,
    password,
    redirect: false
  });

  return result;
}
