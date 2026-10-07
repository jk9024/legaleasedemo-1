import { create } from 'zustand'

export interface SessionChatMessage {
  id: string
  senderId: string
  senderName: string
  text: string
  time: string
}

export interface SessionState {
  bookingId: string | null
  meetLink: string | null
  elapsedSeconds: number
  isRunning: boolean
  isExtensionModalOpen: boolean
  extensionCount: number
  messages: SessionChatMessage[]
  
  setBookingId: (id: string) => void
  setMeetLink: (link: string) => void
  setElapsedSeconds: (seconds: number) => void
  incrementSeconds: () => void
  setIsRunning: (running: boolean) => void
  setExtensionModalOpen: (open: boolean) => void
  incrementExtensionCount: () => void
  addMessage: (message: SessionChatMessage) => void
  resetSession: () => void
}

export const useSessionStore = create<SessionState>((set) => ({
  bookingId: null,
  meetLink: null,
  elapsedSeconds: 0,
  isRunning: false,
  isExtensionModalOpen: false,
  extensionCount: 0,
  messages: [],

  setBookingId: (bookingId) => set({ bookingId }),
  setMeetLink: (meetLink) => set({ meetLink }),
  setElapsedSeconds: (elapsedSeconds) => set({ elapsedSeconds }),
  incrementSeconds: () => set((state) => ({ elapsedSeconds: state.elapsedSeconds + 1 })),
  setIsRunning: (isRunning) => set({ isRunning }),
  setExtensionModalOpen: (isExtensionModalOpen) => set({ isExtensionModalOpen }),
  incrementExtensionCount: () => set((state) => ({ extensionCount: state.extensionCount + 1 })),
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  resetSession: () =>
    set({
      bookingId: null,
      meetLink: null,
      elapsedSeconds: 0,
      isRunning: false,
      isExtensionModalOpen: false,
      extensionCount: 0,
      messages: [],
    }),
}))
