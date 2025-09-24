'use server';

import User from '@/models/User';
import { IFormData } from '@/shared/types';
import { saltAndHashPassword } from '@/shared/utils/password';

export async function registerUser(formData: IFormData) {
  const { username, email, password } = formData;

  const existingUser = await User.findOne({
    email
  });
  if (existingUser) {
    throw new Error(
      'Пользователь с такой почтой уже существует'
    );
  }
  const saltedPassword =
    await saltAndHashPassword(password);

  const result = await User.insertOne({
    username,
    email,
    password: saltedPassword
  });

  return {
    username,
    email,
    password: saltedPassword,
    _id: result._id.toString()
  };
}
