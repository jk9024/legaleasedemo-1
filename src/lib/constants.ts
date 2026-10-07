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
    name: 'Standard Pay-as-you-go',
    priceINR: 0,
    interval: 'forever',
    features: [
      'Access to verified advocates & law students',
      'Pay per consultation or per minute',
      'Standard Google Meet video consultations',
      '1GB Document Vault storage',
      'Basic case status tracking'
    ]
  },
  LEGAL_SHIELD: {
    name: 'Legal Shield Personal',
    priceINR: 499,
    interval: 'month',
    features: [
      '20% flat discount on all consultations',
      '1 free 15-minute phone consultation monthly',
      'Priority lawyer booking slots',
      'Unlimited Document Vault with OCR search',
      'WhatsApp real-time case updates'
    ]
  },
  FAMILY: {
    name: 'Family Legal Care',
    priceINR: 999,
    interval: 'month',
    features: [
      'Covers up to 4 family members',
      '2 free 30-minute consultations monthly',
      '20% discount on extended sessions',
      'Free legal notice drafting review',
      '24/7 emergency advocate helpline access'
    ]
  },
  BUSINESS: {
    name: 'Startup & MSME Retainer',
    priceINR: 2499,
    interval: 'month',
    features: [
      'Dedicated corporate counsel match',
      '5 free contract reviews per month',
      '25% discount on all dispute filings',
      'Custom legal document templates library',
      'Dedicated relationship manager'
    ]
  }
} as const
