import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { ZodError } from 'zod';
import bcrypt from 'bcryptjs';

import { signInSchema } from '@/schema/zod';
import User from '@/models/User';
import { CredentialsSignin } from 'next-auth';

export const { handlers, signIn, signOut, auth } = NextAuth(
  {
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
            if (!user)
              throw new CredentialsSignin(
                'Пользователья с таким email не существует'
              );

            const isValid = await bcrypt.compare(
              password,
              user.password
            );
            if (!isValid)
              throw new CredentialsSignin(
                'Неверный пароль'
              );

            return {
              id: user._id.toString(),
              name: user.username,
              email: user.email,
              role: user.role,
              level: user.level,
              coins: user.coins,
              experience: user.experience,
              skills: user.skills.map((s) => ({
                skill: s.skill.toString(),
                experience: s.experience
              }))
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
          token.user = user;
        }
        return token;
      },
      async session({ session, token }) {
        session.user = token.user;

        return session;
      }
    }
  }
);
