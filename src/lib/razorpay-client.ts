/**
 * Client-side Razorpay helper to guarantee SDK checkout script is loaded
 * before attempting to open the checkout modal.
 */
export function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve(false)
    // Check if window.Razorpay already exists
    if ((window as unknown as { Razorpay?: unknown }).Razorpay) return resolve(true)

    // Check if script element already exists in DOM
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    )
    if (existing) {
      existing.addEventListener('load', () => resolve(true))
      existing.addEventListener('error', () => resolve(false))
      return
    }

    // Dynamically inject script tag
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.onload = () => resolve(true)
    script.onerror = () => {
      console.warn('[Razorpay] Failed to load checkout script from CDN')
      resolve(false)
    }
    document.body.appendChild(script)
  })
}
