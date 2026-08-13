import { z } from 'zod'

export const scanRequestSchema = z.object({
  hackathonUrl: z.string().url(),
  builderContext: z.string().trim().min(10).max(4_000),
  projectUrls: z.array(z.string().url()).max(5).default([]),
})

export type ScanRequest = z.infer<typeof scanRequestSchema>

export const sourceRecordSchema = z.object({
  url: z.string().url(),
  title: z.string().min(1).max(300),
  collectedAt: z.string().datetime(),
  contentType: z.string().max(100),
  byteLength: z.number().int().nonnegative(),
  excerpt: z.string().max(20_000),
})

export const fieldAnalysisSchema = z.object({
  eventName: z.string().min(1).max(200),
  summary: z.string().min(1).max(2_000),
  requirements: z.array(z.string().min(1).max(500)).max(30),
  judgingCriteria: z.array(z.string().min(1).max(500)).max(15),
  strategicGaps: z.array(z.object({
    title: z.string().min(1).max(200),
    rationale: z.string().min(1).max(1_000),
    sourceUrls: z.array(z.string().url()).min(1).max(10),
    confidence: z.enum(['low', 'medium', 'high']),
  })).max(10),
  learningShortlist: z.array(z.string().min(1).max(500)).max(10),
  buildPlan: z.array(z.string().min(1).max(500)).max(12),
  uncertainties: z.array(z.string().min(1).max(500)).max(15),
})

export type FieldAnalysis = z.infer<typeof fieldAnalysisSchema>
export type SourceRecord = z.infer<typeof sourceRecordSchema>

export const scanStatuses = ['queued', 'retrieving', 'extracting', 'validating', 'synthesizing', 'completed', 'partial', 'failed', 'cancelled', 'needs_input'] as const
export type ScanStatus = typeof scanStatuses[number]

export interface ScanEvent {
  id: string
  at: string
  stage: ScanStatus
  message: string
  kind: 'activity' | 'warning' | 'error'
}

export interface ScanJob {
  id: string
  request: ScanRequest
  status: ScanStatus
  createdAt: string
  updatedAt: string
  events: ScanEvent[]
  sources: SourceRecord[]
  analysis?: FieldAnalysis
  error?: { code: string; message: string }
}
