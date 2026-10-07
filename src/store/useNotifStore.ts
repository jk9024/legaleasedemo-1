import { create } from 'zustand'

export interface AppNotification {
  id: string
  title: string
  message: string
  type: 'BOOKING' | 'CASE' | 'PAYMENT' | 'SYSTEM'
  isRead: boolean
  createdAt: string
  linkUrl?: string
}

interface NotifStore {
  notifications: AppNotification[]
  unreadCount: number
  setNotifications: (notifs: AppNotification[]) => void
  addNotification: (notif: AppNotification) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
}

export const useNotifStore = create<NotifStore>((set) => ({
  notifications: [],
  unreadCount: 0,
  setNotifications: (notifications) =>
    set({
      notifications,
      unreadCount: notifications.filter((n) => !n.isRead).length,
    }),
  addNotification: (notif) =>
    set((state) => ({
      notifications: [notif, ...state.notifications],
      unreadCount: state.unreadCount + (notif.isRead ? 0 : 1),
    })),
  markAsRead: (id) =>
    set((state) => {
      const updated = state.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      )
      return {
        notifications: updated,
        unreadCount: updated.filter((n) => !n.isRead).length,
      }
    }),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
      unreadCount: 0,
    })),
}))
