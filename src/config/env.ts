import { z } from 'zod';

const serverEnvSchema = z.object({
  ZST_API_KEY: z.string().min(1).optional(),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).optional(),
});

export const env = serverEnvSchema.parse({
  ZST_API_KEY: process.env.ZST_API_KEY,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
});

export const zstConfig = {
  baseUrl: 'https://api.zstlab.cyou',
  apiKey: env.ZST_API_KEY,
} as const;
