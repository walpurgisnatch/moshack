import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { ZodError } from 'zod';
import bcrypt from 'bcryptjs';

import { MongoDBAdapter } from '@auth/mongodb-adapter';
import client from '@/shared/db/auth';
import { signInSchema } from '@/schema/zod';
import User from '@/models/User';

export const { handlers, signIn, signOut, auth } = NextAuth(
  {
    adapter: MongoDBAdapter(client),
    providers: [
      Credentials({
        credentials: {
          email: { label: 'Email', type: 'email' },
          password: { label: 'Password', type: 'password' }
        },
        authorize: async (credentials) => {
          try {
            if (
              !credentials?.email ||
              !credentials?.password
            ) {
              throw new Error('Почта и пароль обязательны');
            }

            const { email, password } =
              await signInSchema.parseAsync(credentials);

            const user = await User.findOne({ email });
            if (!user) return null;

            const isValid = await bcrypt.compare(
              password,
              user.password
            );
            if (!isValid) return null;

            return {
              email: user.email,
              name: user.username
            };
          } catch (e) {
            if (e instanceof ZodError) return null;
            return null;
          }
        }
      })
    ],
    session: {
      strategy: 'jwt',
      maxAge: 3600
    },
    secret: process.env.AUTH_SECRET,
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
        }
        return token;
      }
    }
  }
);
