import { z } from 'zod';

const Role = z.enum(['ADMIN', 'USER']);

export const RegisterUser = z.object({
  username: z.string(),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8),
  role: Role.optional()
});

export const LoginUser = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string()
});

export type RegisterUser = z.infer<typeof RegisterUser>;
export type LoginUser = z.infer<typeof LoginUser>;
export type Role = z.infer<typeof Role>;
