/**
 * LegalEase — Revenue & Pricing Models Constants & Utilities
 * Comprehensive pricing configuration for consultations, subscriptions,
 * session extensions, B2B plans, documents, and loyalty points.
 */

// ─── CONSULTATION PACKAGES ───────────────────────

export const CONSULTATION_PACKAGES = [
  {
    key: 'MIN_15',
    minutes: 15,
    label: '15 Minutes',
    description: 'Quick Query',
    badge: null,
    studentMultiplier: 1.0,
    standardMultiplier: 1.0
  },
  {
    key: 'MIN_20',
    minutes: 20,
    label: '20 Minutes',
    description: 'Short Consult',
    badge: null,
    studentMultiplier: 1.0,
    standardMultiplier: 1.0
  },
  {
    key: 'MIN_30',
    minutes: 30,
    label: '30 Minutes',
    description: 'Standard',
    badge: 'POPULAR',
    studentMultiplier: 1.0,
    standardMultiplier: 1.0
  },
  {
    key: 'MIN_45',
    minutes: 45,
    label: '45 Minutes',
    description: 'Detailed',
    badge: null,
    studentMultiplier: 1.0,
    standardMultiplier: 1.0
  },
  {
    key: 'MIN_60',
    minutes: 60,
    label: '60 Minutes',
    description: 'Full Consult',
    badge: 'BEST VALUE',
    studentMultiplier: 1.0,
    standardMultiplier: 1.0
  }
]

// ─── STARTING PACKAGES (INITIAL BOOKING) ─────────
// At starting booking, client can only choose 30 Mins or 1 Hour (60 Mins).
// Extensions (+15, +30, +45, +60 min) are available later during the live call.
export const STARTING_PACKAGES = [
  {
    key: 'MIN_30',
    minutes: 30,
    label: '30 Minutes',
    description: 'Standard Consultation',
    badge: 'POPULAR',
    studentMultiplier: 1.0,
    standardMultiplier: 1.0
  },
  {
    key: 'MIN_60',
    minutes: 60,
    label: '1 Hour',
    description: 'Full Comprehensive Consult',
    badge: 'BEST VALUE',
    studentMultiplier: 1.0,
    standardMultiplier: 1.0
  }
]

// ─── LAWYER RATE TIERS ────────────────────────────
// All rates in Rs. per minute

export const LAWYER_TIERS = {
  student: {
    label: 'Law Student',
    minRatePerMin: 2,    // Rs.120/hr minimum
    maxRatePerMin: 5,    // Rs.300/hr maximum
    platformCommission: 0.20,  // 20%
    color: '#9d174d',
    badge: '🎓 Law Student'
  },
  standard: {
    label: 'Junior Advocate',
    minRatePerMin: 5,    // Rs.300/hr minimum
    maxRatePerMin: 12,   // Rs.720/hr maximum
    platformCommission: 0.17,  // 17%
    color: '#1d4ed8',
    badge: '⚖️ Advocate'
  },
  experienced: {
    label: 'Experienced Advocate',
    minRatePerMin: 10,   // Rs.600/hr minimum
    maxRatePerMin: 20,   // Rs.1,200/hr maximum
    platformCommission: 0.15,  // 15%
    color: '#0D7A55',
    badge: '⭐ Experienced'
  },
  senior: {
    label: 'Senior Advocate',
    minRatePerMin: 18,   // Rs.1,080/hr minimum
    maxRatePerMin: 50,   // Rs.3,000/hr maximum
    platformCommission: 0.12,  // 12%
    color: '#92400e',
    badge: '🏆 Senior Advocate'
  }
}

// ─── PACKAGE PRICE CALCULATOR ────────────────────

/**
 * Calculates total package price based on rate per minute and duration
 * @param ratePerMinute Base rate per minute in INR
 * @param minutes Consultation duration in minutes
 * @returns Total package price rounded to nearest integer
 */
export function calcPackagePrice(
  ratePerMinute: number,
  minutes: number
): number {
  return Math.round(ratePerMinute * minutes)
}

/**
 * Calculates pricing for all 5 consultation packages
 * @param ratePerMinute Base rate per minute in INR
 * @returns Dictionary mapping package keys to price in INR
 */
export function calcAllPackagePrices(
  ratePerMinute: number
): Record<string, number> {
  return {
    MIN_15: calcPackagePrice(ratePerMinute, 15),
    MIN_20: calcPackagePrice(ratePerMinute, 20),
    MIN_30: calcPackagePrice(ratePerMinute, 30),
    MIN_45: calcPackagePrice(ratePerMinute, 45),
    MIN_60: calcPackagePrice(ratePerMinute, 60)
  }
}

// ─── PLATFORM FEE CALCULATOR ─────────────────────

export interface FeeBreakdown {
  packagePrice: number      // what client pays for package
  platformCut: number       // platform's share
  lawyerEarns: number       // lawyer's share
  serviceCharge: number     // flat Rs.19
  gst: number               // 18% on platform cut + service
  totalClientPays: number   // final amount
  commissionPercent: number
}

/**
 * Computes complete fee breakdown including subscription discounts, GST, and service charges
 * @param ratePerMinute Base rate per minute in INR
 * @param packageMinutes Consultation duration in minutes
 * @param lawyerTier Tier of lawyer (student, standard, experienced, senior)
 * @param clientPlan Active subscription plan of client
 * @returns Structured FeeBreakdown object
 */
export function calculateFees(
  ratePerMinute: number,
  packageMinutes: number,
  lawyerTier: string,
  clientPlan: string
): FeeBreakdown {
  const tier = LAWYER_TIERS[lawyerTier as keyof typeof LAWYER_TIERS]
    || LAWYER_TIERS.standard
  
  let packagePrice = calcPackagePrice(ratePerMinute, packageMinutes)
  
  // Apply subscription discount
  let subscriptionDiscount = 0
  if (clientPlan === 'LEX_BASIC')      subscriptionDiscount = 0.10
  if (clientPlan === 'LEX_PLUS')       subscriptionDiscount = 0.20
  if (clientPlan === 'LEX_PRO')        subscriptionDiscount = 0.25
  if (clientPlan === 'LEX_ENTERPRISE') subscriptionDiscount = 0.30
  
  if (subscriptionDiscount > 0) {
    packagePrice = Math.round(packagePrice * (1 - subscriptionDiscount))
  }
  
  const platformCut = Math.round(
    packagePrice * tier.platformCommission)
  const lawyerEarns = packagePrice - platformCut
  const serviceCharge = 19
  const gst = Math.round((platformCut + serviceCharge) * 0.18)
  const totalClientPays = packagePrice + serviceCharge + gst

  return {
    packagePrice,
    platformCut,
    lawyerEarns,
    serviceCharge,
    gst,
    totalClientPays,
    commissionPercent: tier.platformCommission * 100
  }
}

// ─── SESSION EXTENSION RULES ─────────────────────
// CRITICAL RULE: Extension ONLY available when
// booking.sessionActive === true
// meaning the call is currently connected

export const EXTENSION_OPTIONS = [
  {
    minutes: 15,
    label: '+15 Minutes',
    firstExtDiscount: 15,    // 15% off on 1st extension
    secondExtDiscount: 7,    // 7% off on 2nd extension
    thirdExtDiscount: 0      // no discount on 3rd+
  },
  {
    minutes: 30,
    label: '+30 Minutes',
    firstExtDiscount: 30,
    secondExtDiscount: 15,
    thirdExtDiscount: 0
  },
  {
    minutes: 45,
    label: '+45 Minutes',
    firstExtDiscount: 40,
    secondExtDiscount: 20,
    thirdExtDiscount: 0
  },
  {
    minutes: 60,
    label: '+60 Minutes',
    firstExtDiscount: 50,
    secondExtDiscount: 25,
    thirdExtDiscount: 0
  }
]

/**
 * Calculates extension fee, discount, savings, and platform/lawyer shares
 * @param ratePerMinute Base rate per minute in INR
 * @param extensionMinutes Extension duration in minutes (15, 30, 45, 60)
 * @param extensionNumber Extension sequence number (1, 2, 3+)
 * @returns Structured extension fee breakdown
 */
export function calcExtensionFee(
  ratePerMinute: number,
  extensionMinutes: number,
  extensionNumber: number   // 1, 2, 3
): {
  originalFee: number
  discountPercent: number
  discountedFee: number
  platformCut: number
  lawyerEarns: number
  saving: number
} {
  const option = EXTENSION_OPTIONS.find(
    o => o.minutes === extensionMinutes
  )
  if (!option) throw new Error('Invalid extension minutes')

  const originalFee = Math.round(
    ratePerMinute * extensionMinutes)

  let discountPercent = 0
  if (extensionNumber === 1)      discountPercent = option.firstExtDiscount
  else if (extensionNumber === 2) discountPercent = option.secondExtDiscount
  else                             discountPercent = option.thirdExtDiscount

  const discountedFee = Math.round(
    originalFee * (1 - discountPercent / 100))
  const platformCut = Math.round(discountedFee * 0.20)
  const lawyerEarns = discountedFee - platformCut
  const saving = originalFee - discountedFee

  return {
    originalFee,
    discountPercent,
    discountedFee,
    platformCut,
    lawyerEarns,
    saving
  }
}

// ─── CLIENT SUBSCRIPTION PLANS ───────────────────

export const CLIENT_PLANS = [
  {
    key: 'NONE',
    name: 'Pay as you go',
    price: 0,
    priceAnnual: 0,
    freeConsults: 0,
    discount: 0,
    members: 1,
    features: [
      'Book any lawyer anytime',
      'Per-package pricing',
      'Case tracker',
      'Basic document vault'
    ],
    color: '#475569',
    cta: 'Start for Free'
  },
  {
    key: 'LEX_BASIC',
    name: 'LexBasic',
    price: 199,
    priceAnnual: 1990,   // 2 months free
    freeConsults: 1,      // 1 free 30-min per month
    freeConsultMinutes: 30,
    discount: 10,         // 10% off all bookings
    members: 1,
    features: [
      '1 free 30-min consultation/month',
      '10% off all bookings',
      'Priority customer support',
      'All premium templates',
      'Case tracker notifications'
    ],
    color: '#1a56db',
    popular: false,
    cta: 'Start Free Trial',
    trial: 7
  },
  {
    key: 'LEX_PLUS',
    name: 'LexPlus',
    price: 399,
    priceAnnual: 3990,
    freeConsults: 2,
    freeConsultMinutes: 30,
    discount: 20,
    members: 4,
    features: [
      '2 free 30-min consultations/month',
      '20% off all bookings',
      '4 family members covered',
      'Document vault 5GB',
      'WhatsApp case updates',
      'Session extension priority'
    ],
    color: '#0D7A55',
    popular: true,
    cta: 'Start Free Trial',
    trial: 7
  },
  {
    key: 'LEX_PRO',
    name: 'LexPro',
    price: 999,
    priceAnnual: 9990,
    freeConsults: 4,
    freeConsultMinutes: 45,
    discount: 25,
    members: 1,
    features: [
      '4 free 45-min consultations/month',
      '25% off all bookings',
      'Document drafting included (2/month)',
      'Dedicated legal manager',
      'Business contract review',
      'GST invoice generation'
    ],
    color: '#7c3aed',
    popular: false,
    cta: 'Start Free Trial',
    trial: 7
  },
  {
    key: 'LEX_ENTERPRISE',
    name: 'LexEnterprise',
    price: 2999,
    priceAnnual: 29990,
    freeConsults: -1,     // unlimited
    discount: 30,
    members: 50,
    features: [
      'Unlimited consultations',
      '30% off all bookings',
      '50 employee accounts',
      'Dedicated account manager',
      'Corporate GST invoice',
      'HR analytics dashboard',
      'Monthly compliance review',
      'API access'
    ],
    color: '#0B1F3A',
    popular: false,
    cta: 'Contact Sales',
    trial: 0
  }
]

// ─── LAWYER SUBSCRIPTION PLANS ───────────────────

export const LAWYER_PLANS = [
  {
    key: 'FREE',
    name: 'Free',
    price: 0,
    commission: 20,
    bookingsPerMonth: 5,
    features: [
      'Basic profile listing',
      '5 bookings per month',
      'Standard search placement',
      'Basic analytics'
    ],
    upgradeHook: 'Upgrade when you earn Rs.800+ in commissions'
  },
  {
    key: 'STARTER',
    name: 'Starter',
    price: 299,
    commission: 15,
    bookingsPerMonth: -1,   // unlimited
    features: [
      'Verified badge on profile',
      'Unlimited bookings',
      'Priority in search results',
      'WhatsApp lead notifications',
      'Advanced analytics',
      'Knowledge base (50 cases)'
    ],
    upgradeHook: 'Upgrade at 20+ bookings/month to save on commission'
  },
  {
    key: 'PRO',
    name: 'Pro',
    price: 599,
    commission: 10,
    bookingsPerMonth: -1,
    features: [
      'Everything in Starter',
      'Homepage featured card',
      'Auto-extension approval',
      'Priority emergency assignments',
      'Unlimited knowledge base',
      'Client satisfaction reports',
      'Google Calendar sync'
    ],
    popular: true,
    upgradeHook: 'Best for lawyers doing 30+ consultations/month'
  },
  {
    key: 'ELITE',
    name: 'Elite',
    price: 1199,
    commission: 7,
    bookingsPerMonth: -1,
    features: [
      'Everything in Pro',
      'Dedicated account manager',
      'Top placement in all searches',
      'Firm profile (up to 3 lawyers)',
      'Custom profile URL',
      'Referral network access',
      'Monthly performance review call'
    ],
    popular: false
  }
]

// ─── B2B PLANS ───────────────────────────────────

export const B2B_PLANS = [
  {
    key: 'B2B_STARTUP',
    name: 'Startup',
    price: 4999,
    priceAnnual: 49990,
    employees: 10,
    consultationsPerMonth: 10,
    features: [
      '10 employee accounts',
      '10 consultations per month',
      'Contract review (2/month)',
      'Legal helpdesk via WhatsApp',
      'Startup compliance guide',
      'Incorporation document drafts'
    ]
  },
  {
    key: 'B2B_SME',
    name: 'SME',
    price: 9999,
    priceAnnual: 99990,
    employees: 25,
    consultationsPerMonth: 25,
    features: [
      '25 employee accounts',
      '25 consultations per month',
      'Dedicated lawyer assigned',
      'Monthly legal review meeting',
      'HR policy legal review',
      'Contract templates library',
      'GST invoice for accounting'
    ],
    popular: true
  },
  {
    key: 'B2B_CORPORATE',
    name: 'Corporate',
    price: 24999,
    priceAnnual: 249990,
    employees: 50,
    consultationsPerMonth: -1,   // unlimited
    features: [
      '50 employee accounts',
      'Unlimited consultations',
      '2 dedicated lawyers',
      'Compliance dashboard',
      'API integration available',
      'Custom contract templates',
      'Quarterly legal audit',
      'Priority emergency support'
    ]
  }
]

// ─── DOCUMENT PRICING ────────────────────────────

export const DOCUMENT_PRICES = [
  {
    key: 'rti',
    name: 'RTI Application',
    price: 99,
    lawyerEarns: 79,
    platformEarns: 20,
    deliveryHours: 24
  },
  {
    key: 'police_complaint',
    name: 'Police Complaint Draft',
    price: 149,
    lawyerEarns: 119,
    platformEarns: 30,
    deliveryHours: 24
  },
  {
    key: 'consumer_complaint',
    name: 'Consumer Complaint',
    price: 199,
    lawyerEarns: 159,
    platformEarns: 40,
    deliveryHours: 24
  },
  {
    key: 'affidavit',
    name: 'Affidavit',
    price: 299,
    lawyerEarns: 239,
    platformEarns: 60,
    deliveryHours: 48
  },
  {
    key: 'legal_notice',
    name: 'Legal Notice',
    price: 349,
    lawyerEarns: 279,
    platformEarns: 70,
    deliveryHours: 48
  },
  {
    key: 'rent_agreement',
    name: 'Rent Agreement',
    price: 499,
    lawyerEarns: 399,
    platformEarns: 100,
    deliveryHours: 48
  },
  {
    key: 'employment_contract',
    name: 'Employment Contract',
    price: 799,
    lawyerEarns: 639,
    platformEarns: 160,
    deliveryHours: 72
  },
  {
    key: 'partnership_deed',
    name: 'Partnership Deed',
    price: 1499,
    lawyerEarns: 1199,
    platformEarns: 300,
    deliveryHours: 72
  },
  {
    key: 'startup_docs',
    name: 'Startup Incorporation Docs',
    price: 2999,
    lawyerEarns: 2399,
    platformEarns: 600,
    deliveryHours: 96
  }
]

// ─── EMERGENCY PRICING ────────────────────────────

export const EMERGENCY_PRICING = {
  flatFee: 999,             // Rs.999 flat — below Rs.1,000 barrier
  lawyerEarns: 699,         // 70%
  platformEarns: 300,       // 30%
  guaranteedResponseMin: 30,
  noExtensionAllowed: true  // emergency sessions cannot be extended
}

// ─── PRIORITY ADD-ONS ─────────────────────────────

export const PRIORITY_ADDONS = [
  {
    key: 'priority_queue',
    name: 'Priority Queue',
    price: 99,
    description: 'Skip the queue — next available slot'
  },
  {
    key: 'same_day',
    name: 'Same Day',
    price: 149,
    description: 'Guaranteed booking today'
  },
  {
    key: 'weekend',
    name: 'Weekend Slot',
    price: 100,
    description: 'Saturday or Sunday consultation'
  }
]

// ─── FORUM PRICING ───────────────────────────────

export const FORUM_PRICING = {
  askQuestion: 0,           // free
  priorityAnswer: 49,       // Rs.49 for guaranteed 2-hr answer
  lawyerEarnsFromPriority: 39,  // 80%
  platformEarnsFromPriority: 10  // 20%
}

// ─── LOYALTY POINTS ──────────────────────────────

export const LOYALTY = {
  pointsPerConsultation: 50,
  pointsPerReview: 20,
  pointsPerReferral: 100,
  pointsPerSubscriptionRenewal: 50,
  redemptionRate: 100,      // 100 points = Rs.10
  minimumRedemption: 200,   // min Rs.20 discount
  expiryMonths: 12
}
