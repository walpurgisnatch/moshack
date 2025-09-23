'use server';

import bcrypt from 'bcryptjs';

export async function saltAndHashPassword(
  password: string
): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}
