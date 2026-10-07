'use client'

import { useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'

/**
 * Socket.io client hook for real-time consultation coordination.
 * Connects to /api/socket and handles lifecycle events.
 */
export function useSocket(sessionId?: string) {
  const socketRef = useRef<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // Initialize socket connection
    const socket = io({
      path: '/api/socket',
      autoConnect: true,
      reconnectionAttempts: 5,
    })

    socketRef.current = socket

    socket.on('connect', () => {
      setIsConnected(true)
      if (sessionId) {
        socket.emit('join-session', sessionId)
      }
    })

    socket.on('disconnect', () => {
      setIsConnected(false)
    })

    return () => {
      if (sessionId) {
        socket.emit('leave-session', sessionId)
      }
      socket.disconnect()
    }
  }, [sessionId])

  return {
    socket: socketRef.current,
    isConnected,
  }
}
