/**
 * Session extension fee calculations with tiered discounts.
 * From AGENTS.md lines 856-879:
 * - 1st Extension: 33% discount on prorated hourly fee
 * - 2nd Extension: 20% discount on prorated hourly fee
 */

export interface ExtensionFeeResult {
  originalFee: number
  discountPct: number
  discountedFee: number
  saving: number
}

/**
 * Calculates extension fee with automatic loyalty discount.
 * @param lawyerFeePerHour - Lawyer's standard hourly fee
 * @param extensionMinutes - Additional minutes requested (e.g. 15, 30)
 * @param extensionNumber - Which extension in this session (1 for first, 2 for second)
 */
export function calcExtensionFee(
  lawyerFeePerHour: number,
  extensionMinutes: number,
  extensionNumber: number
): ExtensionFeeResult {
  const ratePerMinute = lawyerFeePerHour / 60
  const originalFee = Math.round(ratePerMinute * extensionMinutes)
  const discountPct = extensionNumber === 1 ? 33 : 20
  const discountedFee = Math.round(originalFee * (1 - discountPct / 100))
  return {
    originalFee,
    discountPct,
    discountedFee,
    saving: originalFee - discountedFee
  }
}
