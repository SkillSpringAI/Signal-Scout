import { createServerApp } from './app.js'
import { loadConfig } from './config.js'
import { GeminiAnalysisModel } from './model.js'
import { SafeHttpRetriever } from './retrieval.js'
import { ScanRunner } from './runner.js'
import { InMemoryScanStore } from './store.js'
import { FirestoreScanStore } from './store.js'
import path from 'node:path'

const config = loadConfig()
if (!config.GEMINI_API_KEY) throw new Error('GEMINI_API_KEY is required for live server mode.')
const store = config.SCAN_STORE === 'firestore' ? await FirestoreScanStore.create(config.FIRESTORE_COLLECTION) : new InMemoryScanStore()
const retriever = new SafeHttpRetriever({ timeoutMs: config.RETRIEVAL_TIMEOUT_MS, maxBytes: config.RETRIEVAL_MAX_BYTES })
const model = new GeminiAnalysisModel(config.GEMINI_API_KEY, config.GEMINI_MODEL)
const runner = new ScanRunner(store, retriever, model, { modelMaxAttempts: config.MODEL_MAX_ATTEMPTS, modelRetryBaseMs: config.MODEL_RETRY_BASE_MS })
createServerApp({ runner, store, staticDir: path.resolve('dist') }).listen(config.PORT, '0.0.0.0', () => console.log(`Signal Scout API listening on ${config.PORT} with ${config.SCAN_STORE} storage`))
