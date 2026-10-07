/**
 * Core TypeScript models and interfaces for LegalEase.
 * Strict typing across all components and API layers.
 */

export type Role = 'CLIENT' | 'LAWYER' | 'STUDENT' | 'ADMIN'
export type ConsultationType = 'VIDEO' | 'PHONE' | 'INPERSON'
export type PricingModel = 'PER_HOUR' | 'PER_MINUTE'
export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'REFUNDED'
export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED'

export interface UserProfile {
  id: string
  name: string
  email: string
  role: Role
  phone?: string | null
  city?: string | null
  state?: string | null
  image?: string | null
  language: string
  isActive: boolean
  createdAt: string
}

export interface LawyerCardData {
  id: string
  userId: string
  name: string
  image?: string | null
  barCouncilId: string
  court: string
  specializations: string[]
  experienceYears: number
  hourlyFee: number
  perMinuteFee: number
  pricingModel: PricingModel
  minimumMinutes?: number
  city: string
  state: string
  languages: string[]
  rating: number
  reviewCount: number
  isVerified: boolean
  isEmergencyAvailable: boolean
  plan: 'FREE' | 'PRO' | 'ELITE'
  successRate: number
  bio: string
  education?: string
}

export interface StudentCardData {
  id: string
  userId: string
  name: string
  college: string
  yearOfStudy: number
  specializations: string[]
  hourlyFee: number
  perMinuteFee: number
  city: string
  languages: string[]
  rating: number
  isVerified: boolean
}

export interface CaseStageUpdate {
  stageId: number
  date: string
  title: string
  description: string
  documentUrls?: string[]
}

export interface CaseItem {
  id: string
  caseNumber: string
  title: string
  category: string
  currentStage: number
  predictedMinMonths: number
  predictedMaxMonths: number
  lawyerName: string
  lawyerId: string
  clientName: string
  clientId: string
  courtName?: string | null
  updates: CaseStageUpdate[]
  createdAt: string
  updatedAt: string
}

export interface BookingDetails {
  id: string
  bookingRef: string
  consultationType: ConsultationType
  pricingModel: PricingModel
  scheduledAt: string
  durationMinutes: number
  status: BookingStatus
  paymentStatus: PaymentStatus
  fee: number
  totalAmount: number
  meetLink?: string | null
  issueCategory: string
  issueDescription: string
  lawyer: LawyerCardData
  client: UserProfile
  extensionCount: number
  callSummary?: {
    issueDiscussed: string
    keyFacts: string[]
    adviceGiven: string
    legalSectionsReferenced: string[]
    nextStepsForClient: string[]
  } | null
}
