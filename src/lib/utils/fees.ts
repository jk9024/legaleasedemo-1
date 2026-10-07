/**
 * Fee breakdown and platform commission calculation utility.
 * Exact logic specified in AGENTS.md lines 788-829.
 *
 * Commission tiers:
 * - Law Student: 15%
 * - Lawyer (< ₹599): 12%
 * - Lawyer (₹599 - ₹1500): 10%
 * - Lawyer (> ₹1500): 8%
 *
 * Discounts:
 * - 20% discount on lawyer fee for subscribers (LEGAL_SHIELD, FAMILY, BUSINESS)
 * - Platform fee applies on discounted fee
 * - Fixed service charge: ₹19
 * - GST: 18% on (Platform Fee + Service Charge)
 */

export interface FeeBreakdown {
  lawyerFee: number
  platformFee: number
  serviceCharge: number
  gst: number
  total: number
  discount: number
  platformPercent: number
}

/**
 * Calculates itemized billing breakdown for any consultation booking.
 * @param lawyerFee - Base fee quoted by the lawyer
 * @param lawyerType - 'lawyer' or 'student'
 * @param userPlan - User subscription plan ('FREE', 'LEGAL_SHIELD', 'FAMILY', 'BUSINESS')
 * @returns Complete FeeBreakdown object with taxes and net total
 */
export function calculateFees(
  lawyerFee: number,
  lawyerType: 'lawyer' | 'student',
  userPlan: string = 'FREE'
): FeeBreakdown {
  let platformPercent: number
  if (lawyerType === 'student') platformPercent = 15
  else if (lawyerFee < 599) platformPercent = 12
  else if (lawyerFee <= 1500) platformPercent = 10
  else platformPercent = 8

  let discount = 0
  const discountPlans = ['LEGAL_SHIELD', 'FAMILY', 'BUSINESS']
  let effectiveLawyerFee = lawyerFee

  if (discountPlans.includes(userPlan)) {
    discount = Math.round(lawyerFee * 0.20)
    effectiveLawyerFee = lawyerFee - discount
  }

  const platformFee = Math.round(effectiveLawyerFee * (platformPercent / 100))
  const serviceCharge = 19
  const gst = Math.round((platformFee + serviceCharge) * 0.18)
  const total = effectiveLawyerFee + platformFee + serviceCharge + gst

  return {
    lawyerFee: effectiveLawyerFee,
    platformFee,
    serviceCharge,
    gst,
    total,
    discount,
    platformPercent
  }
}
