import { z } from 'zod'

/**
 * Zod validation schemas for all LegalEase API routes and forms.
 * Enforces AGENTS.md Rule 4: "Every API route: try/catch + Zod validation".
 */

// Indian phone number regex (starts with 6, 7, 8, 9 with optional +91 prefix)
const indianPhoneRegex = /^(?:\+91|91)?[6-9]\d{9}$/

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  phone: z.string().regex(indianPhoneRegex, 'Please enter a valid 10-digit Indian phone number'),
  role: z.enum(['CLIENT', 'LAWYER', 'STUDENT']).default('CLIENT'),
  city: z.string().default('Hyderabad'),
  state: z.string().default('Telangana')
})

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
})

export const bookingCreateSchema = z.object({
  lawyerId: z.string().uuid('Invalid lawyer ID'),
  consultationType: z.enum(['VIDEO', 'PHONE', 'INPERSON']),
  pricingModel: z.enum(['PER_HOUR', 'PER_MINUTE']).default('PER_HOUR'),
  scheduledAt: z.string().datetime('Valid consultation date and time is required'),
  durationMinutes: z.number().int().min(15).max(180).default(60),
  clientName: z.string().min(2),
  clientEmail: z.string().email(),
  clientPhone: z.string().regex(indianPhoneRegex, 'Valid 10-digit phone number is required'),
  issueCategory: z.string().min(2),
  issueDescription: z.string().min(10, 'Please describe your legal issue with at least 10 characters'),
  documentUrls: z.array(z.string().url()).optional().default([])
})

export const paymentVerifySchema = z.object({
  bookingId: z.string().uuid('Invalid booking ID'),
  razorpayOrderId: z.string(),
  razorpayPaymentId: z.string(),
  razorpaySignature: z.string()
})

export const sessionExtensionSchema = z.object({
  bookingId: z.string().uuid(),
  minutes: z.number().int().min(5).max(60),
  razorpayPaymentId: z.string().optional()
})

export const caseStageUpdateSchema = z.object({
  caseId: z.string().uuid(),
  stageId: z.number().int().min(0).max(6),
  title: z.string().min(3),
  description: z.string().min(5),
  documentUrls: z.array(z.string().url()).optional()
})

export const aiSearchSchema = z.object({
  query: z.string().min(3, 'Search query must be at least 3 characters'),
  city: z.string().optional(),
  language: z.string().optional(),
  maxBudget: z.number().positive().optional()
})

export const aiChatSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty'),
  conversationId: z.string().optional(),
  language: z.string().default('English')
})

export const reviewSchema = z.object({
  bookingId: z.string().uuid(),
  lawyerId: z.string().uuid(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(5, 'Review comment must be at least 5 characters'),
  communicationRating: z.number().int().min(1).max(5).optional(),
  knowledgeRating: z.number().int().min(1).max(5).optional()
})

export const forumQuestionSchema = z.object({
  title: z.string().min(5, 'Question title must be at least 5 characters'),
  category: z.string().min(2),
  content: z.string().min(20, 'Please provide details about your question'),
  city: z.string().default('Hyderabad')
})
