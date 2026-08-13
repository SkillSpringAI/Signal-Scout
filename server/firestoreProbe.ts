import { randomUUID } from 'node:crypto'
import { scanJobSchema, type ScanJob } from './contracts.js'
import { loadConfig } from './config.js'
import { FirestoreScanStore } from './store.js'

const config = loadConfig()
const store = await FirestoreScanStore.create(config.FIRESTORE_COLLECTION)
const timestamp = new Date().toISOString()
const id = randomUUID()
const probe: ScanJob = {
  id,
  request: {
    hackathonUrl: 'https://allthingsagentichackathon.devpost.com/',
    builderContext: 'INTEGRATION TEST ONLY — Firestore persistence boundary verification.',
    projectUrls: [],
  },
  status: 'queued',
  createdAt: timestamp,
  updatedAt: timestamp,
  events: [],
  sources: [],
}

let created = false
try {
  await store.create(probe)
  created = true
  const firstRead = scanJobSchema.parse(await store.get(id))
  const updateTime = new Date().toISOString()
  const updated = scanJobSchema.parse({
    ...firstRead,
    status: 'needs_input',
    updatedAt: updateTime,
    events: [{ id: randomUUID(), at: updateTime, stage: 'needs_input', kind: 'activity', message: 'INTEGRATION TEST ONLY — verified read and update.' }],
  })
  await store.save(updated)
  const secondRead = scanJobSchema.parse(await store.get(id))
  if (secondRead.status !== 'needs_input' || secondRead.events.length !== 1) throw new Error('Firestore update did not round-trip correctly.')
  await store.delete(id)
  created = false
  if (await store.get(id)) throw new Error('Firestore probe cleanup did not remove its test record.')
  process.stdout.write(JSON.stringify({ ok: true, collection: config.FIRESTORE_COLLECTION, created: true, read: true, updated: true, validated: true, deleted: true, probeId: id }))
} finally {
  if (created) await store.delete(id)
}
