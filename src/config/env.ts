import { z } from 'zod';

const serverEnvSchema = z.object({
  ZST_API_KEY: z.string().min(1).optional(),
});

export const env = serverEnvSchema.parse({
  ZST_API_KEY: process.env.ZST_API_KEY,
});

export const zstConfig = {
  baseUrl: 'https://api.zstlab.cyou',
  apiKey: env.ZST_API_KEY,
} as const;
