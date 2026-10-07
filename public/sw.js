// LegalEase Service Worker v1.0.0
// Production PWA caching with offline fallback for Indian legal marketplace

const CACHE_NAME = 'legalease-cache-v1'
const OFFLINE_URL = '/offline.html'

// Core assets to pre-cache immediately upon install
const PRECACHE_ASSETS = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
]

// Install event: Precache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(PRECACHE_ASSETS)
      })
      .then(() => self.skipWaiting())
  )
})

// Activate event: Clean up legacy caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((name) => {
            if (name !== CACHE_NAME && name.startsWith('legalease-cache-')) {
              return caches.delete(name)
            }
          })
        )
      })
      .then(() => self.clients.claim())
  )
})

// Fetch event: Network-first for pages with offline fallback; Cache-first for static assets
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // 1. Never cache non-GET requests or browser extensions
  if (request.method !== 'GET' || !url.protocol.startsWith('http')) {
    return
  }

  // 2. Bypass cache for API calls, NextAuth routes, or third-party gateways (Razorpay, Google Meet)
  if (
    url.pathname.startsWith('/api/') ||
    url.hostname.includes('razorpay.com') ||
    url.hostname.includes('meet.google.com') ||
    url.hostname.includes('googleapis.com')
  ) {
    return
  }

  // 3. For navigation requests (HTML pages): Network-First, then Cache, then offline.html
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // If good response, optionally store a copy of the page
          if (response && response.status === 200) {
            const responseToCache = response.clone()
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache)
            })
          }
          return response
        })
        .catch(async () => {
          // If network fails, try cache first
          const cachedResponse = await caches.match(request)
          if (cachedResponse) {
            return cachedResponse
          }
          // Fall back to offline page
          const offlinePage = await caches.match(OFFLINE_URL)
          return offlinePage || new Response('Offline - LegalEase', { status: 503, statusText: 'Service Unavailable' })
        })
    )
    return
  }

  // 4. For static assets (images, fonts, stylesheets, scripts): Cache-First / Stale-While-Revalidate
  if (
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'image' ||
    request.destination === 'font'
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          // Fetch background update
          fetch(request)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.status === 200) {
                caches.open(CACHE_NAME).then((cache) => cache.put(request, networkResponse))
              }
            })
            .catch(() => {})
          return cachedResponse
        }

        return fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone()
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache)
            })
          }
          return networkResponse
        })
      })
    )
  }
})

// Listen for messages from client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})
