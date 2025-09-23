'use server';

import { getCollection } from '@/db/mongodb';
import { IFormData } from '@/types/form-data';
import { saltAndHashPassword } from '@/utils/password';

export async function registerUser(formData: IFormData) {
  const { username, email, password } = formData;

  const usersCollection = await getCollection('users');

  const existingUser = await usersCollection.findOne({
    email
  });
  if (existingUser) {
    throw new Error(
      'Пользователь с такой почтой уже существует'
    );
  }
  const saltedPassword =
    await saltAndHashPassword(password);

  const result = await usersCollection.insertOne({
    username,
    email,
    password: saltedPassword
  });

  return {
    username,
    email,
    password: saltedPassword,
    _id: result.insertedId.toString()
  };
}
