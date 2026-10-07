import { create } from 'zustand'

export interface BookingState {
  step: number
  lawyerId: string | null
  lawyerName: string | null
  lawyerHourlyFee: number
  lawyerPerMinFee: number
  consultationType: 'VIDEO' | 'PHONE' | 'INPERSON'
  pricingModel: 'PER_HOUR' | 'PER_MINUTE'
  selectedDate: string | null
  selectedTimeSlot: string | null
  issueCategory: string
  issueDescription: string
  clientName: string
  clientEmail: string
  clientPhone: string
  documentUrls: string[]
  discountAmount: number
  platformFee: number
  totalAmount: number
  
  // Actions
  setStep: (step: number) => void
  setLawyer: (id: string, name: string, hourlyFee: number, perMinFee: number) => void
  setConsultType: (type: 'VIDEO' | 'PHONE' | 'INPERSON', model: 'PER_HOUR' | 'PER_MINUTE') => void
  setSlot: (date: string, time: string) => void
  setDetails: (details: {
    category: string
    description: string
    name: string
    email: string
    phone: string
    documents?: string[]
  }) => void
  setPricingBreakdown: (pricing: { discount: number; platformFee: number; total: number }) => void
  resetBooking: () => void
}

const initialState = {
  step: 1,
  lawyerId: null,
  lawyerName: null,
  lawyerHourlyFee: 599,
  lawyerPerMinFee: 12,
  consultationType: 'VIDEO' as const,
  pricingModel: 'PER_HOUR' as const,
  selectedDate: null,
  selectedTimeSlot: null,
  issueCategory: 'Property Law',
  issueDescription: '',
  clientName: '',
  clientEmail: '',
  clientPhone: '',
  documentUrls: [],
  discountAmount: 0,
  platformFee: 0,
  totalAmount: 0,
}

export const useBookingStore = create<BookingState>((set) => ({
  ...initialState,
  setStep: (step) => set({ step }),
  setLawyer: (lawyerId, lawyerName, lawyerHourlyFee, lawyerPerMinFee) =>
    set({ lawyerId, lawyerName, lawyerHourlyFee, lawyerPerMinFee }),
  setConsultType: (consultationType, pricingModel) =>
    set({ consultationType, pricingModel }),
  setSlot: (selectedDate, selectedTimeSlot) =>
    set({ selectedDate, selectedTimeSlot }),
  setDetails: (details) =>
    set({
      issueCategory: details.category,
      issueDescription: details.description,
      clientName: details.name,
      clientEmail: details.email,
      clientPhone: details.phone,
      documentUrls: details.documents || [],
    }),
  setPricingBreakdown: ({ discount, platformFee, total }) =>
    set({ discountAmount: discount, platformFee, totalAmount: total }),
  resetBooking: () => set(initialState),
}))
