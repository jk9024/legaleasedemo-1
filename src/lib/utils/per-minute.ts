/**
 * Per-minute pricing and pre-authorization billing calculations.
 * Exact logic from AGENTS.md lines 832-853.
 */

/**
 * Calculates fee based on actual consultation elapsed seconds.
 * Rounds up to full minutes.
 * @param ratePerMinute - Rate per minute in INR
 * @param actualSeconds - Consultation duration in seconds
 */
export function calcPerMinuteFee(
  ratePerMinute: number,
  actualSeconds: number
): number {
  const minutes = Math.ceil(actualSeconds / 60)
  return minutes * ratePerMinute
}

/**
 * Calculates pre-authorization amount (buffer of 30% over minimum expected duration).
 * @param ratePerMinute - Rate per minute in INR
 * @param minimumMinutes - Minimum commitment in minutes
 */
export function calcPreAuth(
  ratePerMinute: number,
  minimumMinutes: number
): number {
  return Math.ceil(ratePerMinute * minimumMinutes * 1.3)
}

/**
 * Calculates refund amount to return to client when session finishes below pre-auth amount.
 * @param preAuthorized - Total amount blocked during booking
 * @param actualCharge - Calculated fee based on real elapsed time
 */
export function calcRefund(
  preAuthorized: number,
  actualCharge: number
): number {
  return Math.max(0, preAuthorized - actualCharge)
}
