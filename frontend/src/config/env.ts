import { z } from 'zod';

const envSchema = z.object({
  VITE_API_BASE_URL: z.string().url().default('http://localhost:8080'),
  VITE_WS_URL: z.string().url().default('ws://localhost:8080/ws'),
  VITE_APP_ENV: z.enum(['development', 'staging', 'production']).default('development'),
  VITE_APP_MODE: z.enum(['DEMO', 'PRODUCTION']).default('DEMO'),
});

const parsed = envSchema.safeParse(import.meta.env);
if (!parsed.success) {
  console.error('Environment variables validation error:', parsed.error);
}

export const env = parsed.success ? parsed.data : envSchema.parse({});
