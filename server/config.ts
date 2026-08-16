import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().int().min(1).max(65_535).default(8080),
  GEMINI_API_KEY: z.string().min(1).optional(),
  GEMINI_MODEL: z.string().min(1).default('gemini-3.5-flash'),
  RETRIEVAL_TIMEOUT_MS: z.coerce.number().int().min(1_000).max(30_000).default(10_000),
  RETRIEVAL_MAX_BYTES: z.coerce.number().int().min(10_000).max(2_000_000).default(500_000),
  SCAN_STORE: z.enum(['memory', 'firestore']).default('memory'),
  FIRESTORE_COLLECTION: z.string().regex(/^[A-Za-z0-9_-]+$/).default('signalScoutScans'),
  DEMO_USAGE_COLLECTION: z.string().regex(/^[A-Za-z0-9_-]+$/).default('signalScoutDemoUsage'),
  DEMO_DAILY_ACTION_LIMIT: z.coerce.number().int().min(1).max(10_000).default(50),
  DEMO_BURST_ACTION_LIMIT: z.coerce.number().int().min(1).max(100).default(3),
  DEMO_BURST_WINDOW_MS: z.coerce.number().int().min(1_000).max(3_600_000).default(600_000),
  ALLOWED_EVENT_HOSTS: z.string().default('devpost.com').transform(splitHosts),
  ALLOWED_PROJECT_HOSTS: z.string().default('github.com,www.github.com').transform(splitHosts),
  MODEL_MAX_ATTEMPTS: z.coerce.number().int().min(1).max(3).default(2),
  MODEL_RETRY_BASE_MS: z.coerce.number().int().min(100).max(5_000).default(500),
})

function splitHosts(value: string) {
  const hosts = value.split(',').map((host) => host.trim().toLowerCase().replace(/^\./, '')).filter(Boolean)
  if (hosts.length === 0) throw new Error('At least one allowed host is required.')
  return [...new Set(hosts)]
}

export type ServerConfig = z.infer<typeof envSchema>
export const loadConfig = (env: NodeJS.ProcessEnv = process.env): ServerConfig => envSchema.parse(env)
