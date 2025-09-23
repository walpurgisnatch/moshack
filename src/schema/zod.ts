import * as z from 'zod';

export const signInSchema = z.object({
  email: z.email().min(1, { error: 'Email is required' }),

  password: z
    .string()
    .min(1, { error: 'Password is required' })
    .min(6, {
      error: 'Password must be at least 6 characters'
    })
    .max(32, {
      error: 'Password must be at most 32 characters'
    })
});
