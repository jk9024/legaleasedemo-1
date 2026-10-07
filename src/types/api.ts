/**
 * Standard API request and response envelopes for LegalEase.
 */

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

export interface RazorpayOrderResponse {
  orderId: string
  amount: number
  currency: string
  keyId: string
  bookingId: string
}
