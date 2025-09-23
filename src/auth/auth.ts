import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/db/mongodb';
import bcrypt from 'bcryptjs';
import { getUserFromDb } from '@/utils/user';
import { signInSchema } from '@/schema/zod';
import { ZodError } from 'zod';

export const { handlers, signIn, signOut, auth } = NextAuth(
  {
    adapter: MongoDBAdapter(clientPromise),
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

            const user = await getUserFromDb(email);
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
