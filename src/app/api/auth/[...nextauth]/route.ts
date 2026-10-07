import { handlers } from '@/lib/auth'

/**
 * NextAuth v5 App Router route handler.
 * Handles OAuth callbacks, credentials signIn/signOut, and session endpoints.
 */
export const { GET, POST } = handlers
