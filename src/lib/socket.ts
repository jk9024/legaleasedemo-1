import { Server as NetServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'
import { NextApiResponse } from 'next'

/**
 * Socket.IO configuration and event types for LegalEase.
 * Powers real-time consultation timers, extension approvals, and chat.
 */

export type NextApiResponseServerIO = NextApiResponse & {
  socket: any & {
    server: NetServer & {
      io: SocketIOServer
    }
  }
}

export interface SocketEvents {
  'join-session': (sessionId: string) => void
  'leave-session': (sessionId: string) => void
  'timer-tick': (data: { sessionId: string; elapsedSeconds: number; cost: number }) => void
  'extension-requested': (data: { bookingId: string; minutes: number; fee: number }) => void
  'extension-approved': (data: { bookingId: string; minutes: number }) => void
  'extension-declined': (data: { bookingId: string }) => void
  'chat-message': (data: { sessionId: string; senderId: string; senderName: string; text: string; time: string }) => void
  'notification': (data: { userId: string; title: string; message: string; type: string }) => void
}

/**
 * Initializes or retrieves the Socket.io server instance attached to Next.js HTTP server.
 * @param server - Node HTTP server instance
 */
export function initSocketServer(server: NetServer): SocketIOServer {
  const io = new SocketIOServer(server, {
    path: '/api/socket',
    addTrailingSlash: false,
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  })

  io.on('connection', (socket) => {
    // Join room for specific consultation session
    socket.on('join-session', (sessionId: string) => {
      socket.join(`session:${sessionId}`)
    })

    socket.on('leave-session', (sessionId: string) => {
      socket.leave(`session:${sessionId}`)
    })

    // Per-minute timer tick broadcast
    socket.on('timer-tick', (data) => {
      socket.to(`session:${data.sessionId}`).emit('timer-tick', data)
    })

    // Session extension workflow
    socket.on('extension-requested', (data) => {
      socket.to(`session:${data.bookingId}`).emit('extension-requested', data)
    })

    socket.on('extension-approved', (data) => {
      socket.to(`session:${data.bookingId}`).emit('extension-approved', data)
    })

    socket.on('extension-declined', (data) => {
      socket.to(`session:${data.bookingId}`).emit('extension-declined', data)
    })

    // Live chat message in consultation
    socket.on('chat-message', (data) => {
      io.to(`session:${data.sessionId}`).emit('chat-message', data)
    })

    // User notification room
    socket.on('join-user', (userId: string) => {
      socket.join(`user:${userId}`)
    })
  })

  return io
}
