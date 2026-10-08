/**
 * Fee breakdown and platform commission calculation utility.
 * Backed by the updated revenue model in src/lib/utils/pricing.ts.
 */

import { calculateFees as calcNewFees, FeeBreakdown as PricingFeeBreakdown } from './pricing'

export interface FeeBreakdown {
  packagePrice: number      // what client pays for package
  platformCut: number       // platform's share
  lawyerEarns: number       // lawyer's share
  serviceCharge: number     // flat Rs.19
  gst: number               // 18% on platform cut + service
  totalClientPays: number   // final amount
  commissionPercent: number
  // Legacy aliases for backward compatibility
  lawyerFee: number
  platformFee: number
  total: number
  discount: number
  platformPercent: number
}

/**
 * Calculates itemized billing breakdown for any consultation booking.
 * Supports both new signature (ratePerMinute, packageMinutes, lawyerTier, clientPlan)
 * and legacy calls (fee, type, plan).
 *
 * @param rateOrFee - Rate per minute (new) or base fee (legacy)
 * @param minutesOrType - Package duration in minutes (new) or lawyer type ('lawyer' | 'student')
 * @param tierOrPlan - Lawyer tier ('student'|'standard'|'experienced'|'senior') or user plan
 * @param clientPlan - Client subscription plan ('NONE' | 'LEX_BASIC' | 'LEX_PLUS' | 'LEX_PRO' | 'LEX_ENTERPRISE')
 * @returns Complete FeeBreakdown object with taxes and net total
 */
export function calculateFees(
  rateOrFee: number,
  minutesOrType: number | string = 30,
  tierOrPlan: string = 'standard',
  clientPlan: string = 'NONE'
): FeeBreakdown {
  let ratePerMinute: number
  let packageMinutes: number
  let lawyerTier: string
  let plan: string

  if (typeof minutesOrType === 'number') {
    // New signature: ratePerMinute, packageMinutes, lawyerTier, clientPlan
    ratePerMinute = rateOrFee
    packageMinutes = minutesOrType
    lawyerTier = tierOrPlan || 'standard'
    plan = clientPlan || 'NONE'
  } else {
    // Legacy signature: lawyerFee, lawyerType ('lawyer'|'student'), userPlan
    // Convert hourly/flat fee to equivalent rate per minute
    packageMinutes = 30
    ratePerMinute = Math.max(2, Math.round(rateOrFee / 60))
    lawyerTier = minutesOrType === 'student' ? 'student' : 'standard'
    plan = tierOrPlan.startsWith('LEX_') ? tierOrPlan : tierOrPlan === 'LEGAL_SHIELD' ? 'LEX_BASIC' : 'NONE'
  }

  const result = calcNewFees(ratePerMinute, packageMinutes, lawyerTier, plan)

  return {
    ...result,
    lawyerFee: result.lawyerEarns,
    platformFee: result.platformCut,
    total: result.totalClientPays,
    discount: 0,
    platformPercent: result.commissionPercent,
  }
}
