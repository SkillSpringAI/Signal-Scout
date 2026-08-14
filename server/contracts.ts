import { z } from 'zod'

export const scanRequestSchema = z.object({
  hackathonUrl: z.string().url(),
  builderContext: z.string().trim().min(10).max(4_000),
  projectUrls: z.array(z.string().url()).max(5).default([]),
})

export type ScanRequest = z.infer<typeof scanRequestSchema>

export const sourceRecordSchema = z.object({
  url: z.string().url(),
  evidenceRole: z.enum(['event', 'project']).optional(),
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

export const feedbackRequestSchema = z.object({ feedback: z.string().trim().min(10).max(2_000) })
export const collaborationResponseSchema = z.object({
  adaptedRecommendation: z.object({
    title: z.string().min(1).max(200),
    explanation: z.string().min(1).max(1_200),
    changedBecause: z.string().min(1).max(800),
    sourceUrls: z.array(z.string().url()).min(1).max(6),
    confidence: z.enum(['low', 'medium', 'high']),
  }),
  nextClarifyingQuestion: z.string().min(1).max(500),
})
export const feedbackEntrySchema = collaborationResponseSchema.extend({ id: z.string().uuid(), receivedAt: z.string().datetime(), feedback: feedbackRequestSchema.shape.feedback })
export type FeedbackRequest = z.infer<typeof feedbackRequestSchema>
export type CollaborationResponse = z.infer<typeof collaborationResponseSchema>

export const scanStatuses = ['queued', 'retrieving', 'extracting', 'validating', 'synthesizing', 'completed', 'partial', 'failed', 'cancelled', 'needs_input'] as const
export type ScanStatus = typeof scanStatuses[number]

export const scanEventSchema = z.object({
  id: z.string().uuid(),
  at: z.string().datetime(),
  stage: z.enum(scanStatuses),
  message: z.string().min(1).max(2_000),
  kind: z.enum(['activity', 'warning', 'error']),
})

export const scanJobSchema = z.object({
  id: z.string().uuid(),
  request: scanRequestSchema,
  status: z.enum(scanStatuses),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  events: z.array(scanEventSchema).max(500),
  sources: z.array(sourceRecordSchema).max(6),
  analysis: fieldAnalysisSchema.optional(),
  error: z.object({ code: z.string().min(1).max(100), message: z.string().min(1).max(4_000) }).optional(),
  feedback: z.array(feedbackEntrySchema).max(20).optional(),
})

export type ScanEvent = z.infer<typeof scanEventSchema>
export type ScanJob = z.infer<typeof scanJobSchema>
