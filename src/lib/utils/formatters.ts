/**
 * Indian-standard formatters for LegalEase.
 * Follows AGENTS.md Rule 12: "Indian formats: Rs. | DD/MM/YYYY | +91 phone | 1,00,000 numbers".
 */

/**
 * Formats a number into Indian currency style (e.g. ₹1,50,000 or Rs. 1,50,000).
 * @param amount - Numeric amount in INR
 * @param prefix - Currency symbol/prefix ('₹' or 'Rs. ')
 */
export function formatINR(amount: number, prefix: '₹' | 'Rs. ' = '₹'): string {
  if (isNaN(amount)) return `${prefix}0`
  const formatted = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0
  }).format(Math.round(amount))
  return `${prefix}${formatted}`
}

/**
 * Formats a date into Indian standard DD/MM/YYYY.
 * @param date - Date object or ISO string
 */
export function formatDateIndian(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  if (isNaN(d.getTime())) return ''
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}

/**
 * Formats a date into Indian standard with time (e.g. 24/10/2025, 03:30 PM IST).
 * @param date - Date object or ISO string
 */
export function formatDateTimeIndian(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  if (isNaN(d.getTime())) return ''
  const datePart = formatDateIndian(d)
  const timePart = d.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata'
  })
  return `${datePart}, ${timePart} IST`
}

/**
 * Formats 10-digit Indian mobile number with +91 country code.
 * E.g. "9876543210" -> "+91 98765 43210"
 * @param phone - Raw phone input
 */
export function formatPhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 10) {
    return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`
  }
  if (digits.length === 12 && digits.startsWith('91')) {
    const raw = digits.slice(2)
    return `+91 ${raw.slice(0, 5)} ${raw.slice(5)}`
  }
  return phone
}

/**
 * Formats elapsed seconds into human readable duration (e.g. "47 min 23 sec").
 * @param seconds - Total elapsed duration in seconds
 */
export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  if (mins === 0) return `${secs} sec`
  if (secs === 0) return `${mins} min`
  return `${mins} min ${secs} sec`
}
