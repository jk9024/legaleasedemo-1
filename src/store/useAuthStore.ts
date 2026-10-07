import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface UserState {
  id: string
  name: string
  email: string
  role: 'CLIENT' | 'LAWYER' | 'STUDENT' | 'ADMIN'
  phone?: string | null
  city?: string | null
  state?: string | null
  image?: string | null
  plan?: string
}

interface AuthStore {
  user: UserState | null
  isAuthenticated: boolean
  setUser: (user: UserState | null) => void
  clearUser: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: Boolean(user) }),
      clearUser: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'legalease-auth-storage',
    }
  )
)
