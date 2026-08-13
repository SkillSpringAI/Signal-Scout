import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().int().min(1).max(65_535).default(8080),
  GEMINI_API_KEY: z.string().min(1).optional(),
  GEMINI_MODEL: z.string().min(1).default('gemini-3.5-flash'),
  RETRIEVAL_TIMEOUT_MS: z.coerce.number().int().min(1_000).max(30_000).default(10_000),
  RETRIEVAL_MAX_BYTES: z.coerce.number().int().min(10_000).max(2_000_000).default(500_000),
  SCAN_STORE: z.enum(['memory', 'firestore']).default('memory'),
  FIRESTORE_COLLECTION: z.string().regex(/^[A-Za-z0-9_-]+$/).default('signalScoutScans'),
})

export type ServerConfig = z.infer<typeof envSchema>
export const loadConfig = (env: NodeJS.ProcessEnv = process.env): ServerConfig => envSchema.parse(env)
