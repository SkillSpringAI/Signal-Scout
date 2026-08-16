import { createServerApp } from './app.js'
import { loadConfig } from './config.js'
import { GeminiAnalysisModel } from './model.js'
import { SafeHttpRetriever } from './retrieval.js'
import { ScanRunner } from './runner.js'
import { InMemoryScanStore } from './store.js'
import { FirestoreScanStore } from './store.js'
import path from 'node:path'
import { FirestoreDailyUsageStore, InMemoryDailyUsageStore, PublicDemoUsageGuard } from './usageGuard.js'

const config = loadConfig()
if (!config.GEMINI_API_KEY) throw new Error('GEMINI_API_KEY is required for live server mode.')
const store = config.SCAN_STORE === 'firestore' ? await FirestoreScanStore.create(config.FIRESTORE_COLLECTION) : new InMemoryScanStore()
const retriever = new SafeHttpRetriever({ timeoutMs: config.RETRIEVAL_TIMEOUT_MS, maxBytes: config.RETRIEVAL_MAX_BYTES, allowedEventHosts: config.ALLOWED_EVENT_HOSTS, allowedProjectHosts: config.ALLOWED_PROJECT_HOSTS })
const model = new GeminiAnalysisModel(config.GEMINI_API_KEY, config.GEMINI_MODEL)
const runner = new ScanRunner(store, retriever, model, { modelMaxAttempts: config.MODEL_MAX_ATTEMPTS, modelRetryBaseMs: config.MODEL_RETRY_BASE_MS })
const usageStore = config.SCAN_STORE === 'firestore' ? await FirestoreDailyUsageStore.create(config.DEMO_USAGE_COLLECTION) : new InMemoryDailyUsageStore()
const usageGuard = new PublicDemoUsageGuard(usageStore, { dailyLimit: config.DEMO_DAILY_ACTION_LIMIT, burstLimit: config.DEMO_BURST_ACTION_LIMIT, burstWindowMs: config.DEMO_BURST_WINDOW_MS })
createServerApp({ runner, store, usageGuard, staticDir: path.resolve('dist') }).listen(config.PORT, '0.0.0.0', () => console.log(`Signal Scout API listening on ${config.PORT} with ${config.SCAN_STORE} storage`))
