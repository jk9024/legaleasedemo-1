/**
 * Core constants, legal taxonomy, case stages, and pricing tiers for LegalEase.
 * Follows AGENTS.md verbatim.
 */

/**
 * 7-Stage Case Tracker progression (Swiggy/Zepto style tracking).
 * Exactly as defined in AGENTS.md lines 1592-1607.
 */
export const CASE_STAGES = [
  {
    id: 0,
    icon: '📅',
    label: 'Consultation Booked',
    desc: 'Appointment confirmed, lawyer notified'
  },
  {
    id: 1,
    icon: '📎',
    label: 'Documents Submitted',
    desc: 'Client uploaded relevant documents'
  },
  {
    id: 2,
    icon: '🔍',
    label: 'Under Review',
    desc: 'Lawyer reviewing the case details'
  },
  {
    id: 3,
    icon: '📬',
    label: 'Legal Notice Sent',
    desc: 'Notice sent to opposite party'
  },
  {
    id: 4,
    icon: '⚖️',
    label: 'Court Filing Done',
    desc: 'Case filed, hearing date assigned'
  },
  {
    id: 5,
    icon: '🗓️',
    label: 'Next Hearing',
    desc: 'Upcoming court date scheduled'
  },
  {
    id: 6,
    icon: '✅',
    label: 'Case Resolved',
    desc: 'Matter settled or judgment received'
  }
] as const

/**
 * Primary Indian Legal Practice Categories
 */
export const LEGAL_CATEGORIES = [
  { id: 'property', name: 'Property & Real Estate', icon: '🏠', desc: 'RERA, boundary disputes, tenant eviction, sale deeds' },
  { id: 'family', name: 'Family & Divorce', icon: '👨‍👩‍👦', desc: 'Mutual consent divorce, child custody, alimony, domestic violence' },
  { id: 'criminal', name: 'Criminal Law & Bail', icon: '⚖️', desc: 'Anticipatory bail, FIR quashing, police complaints, cybercrime' },
  { id: 'consumer', name: 'Consumer Disputes', icon: '🛍️', desc: 'Defective products, builder delays, warranty fraud, hospital negligence' },
  { id: 'labour', name: 'Employment & Labour', icon: '💼', desc: 'Wrongful termination, PF/ESIC disputes, sexual harassment (POSH)' },
  { id: 'corporate', name: 'Corporate & Startup', icon: '🏢', desc: 'Founder agreements, GST, trademark, contracts, ROC compliance' },
  { id: 'civil', name: 'Civil & Recovery', icon: '📜', desc: 'Cheque bounce (S.138), money recovery, succession certificate' },
  { id: 'rti', name: 'RTI & Public Law', icon: '🏛️', desc: 'Government records, municipal issues, tender disputes' }
] as const

/**
 * Indian States & Union Territories
 */
export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi NCR', 'Chandigarh'
] as const

/**
 * LegalEase Subscription Plans
 */
export const SUBSCRIPTION_PLANS = {
  FREE: {
    name: 'Pay as you go',
    priceINR: 0,
    interval: 'forever',
    features: [
      'Book any lawyer anytime',
      'Per-package pricing',
      'Case tracker',
      'Basic document vault',
    ],
  },
  LEX_BASIC: {
    name: 'LexBasic',
    priceINR: 199,
    interval: 'month',
    features: [
      '1 free 30-min consultation/month',
      '10% off all bookings',
      'Priority customer support',
      'All premium templates',
      'Case tracker notifications',
    ],
  },
  LEX_PLUS: {
    name: 'LexPlus',
    priceINR: 399,
    interval: 'month',
    features: [
      '2 free 30-min consultations/month',
      '20% off all bookings',
      '4 family members covered',
      'Document vault 5GB',
      'WhatsApp case updates',
      'Session extension priority',
    ],
  },
  LEX_PRO: {
    name: 'LexPro',
    priceINR: 999,
    interval: 'month',
    features: [
      '4 free 45-min consultations/month',
      '25% off all bookings',
      'Document drafting included (2/month)',
      'Dedicated legal manager',
      'Business contract review',
      'GST invoice generation',
    ],
  },
  LEX_ENTERPRISE: {
    name: 'LexEnterprise',
    priceINR: 2999,
    interval: 'month',
    features: [
      'Unlimited consultations',
      '30% off all bookings',
      '50 employee accounts',
      'Dedicated account manager',
      'Corporate GST invoice',
      'HR analytics dashboard',
    ],
  },
  get LEGAL_SHIELD() {
    return this.LEX_BASIC
  },
  get FAMILY() {
    return this.LEX_PLUS
  },
  get BUSINESS() {
    return this.LEX_PRO
  },
} as const

