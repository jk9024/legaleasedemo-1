/**
 * Compatibility score calculator between client and legal professional.
 * Matches language, jurisdiction/city, specialization, experience, and review rating.
 * Exact logic from AGENTS.md lines 981-1022.
 */

export interface LawyerCompatibilityProfile {
  languages: string[]
  city: string
  specializations: string[]
  experienceYears: number
  rating: number
}

/**
 * Calculates a match score out of 100 based on compatibility parameters.
 * @param clientLanguage - Primary spoken language of the client
 * @param clientCity - City/Jurisdiction of the client
 * @param issueCategory - Specific legal domain (e.g. Property, Family, Labour)
 * @param lawyer - Lawyer details for scoring
 */
export function calcCompatibility(
  clientLanguage: string,
  clientCity: string,
  issueCategory: string,
  lawyer: LawyerCompatibilityProfile
): number {
  let score = 0

  // 1. Language alignment (25 pts)
  if (lawyer.languages.some((l) => l.toLowerCase() === clientLanguage.toLowerCase())) {
    score += 25
  }

  // 2. City / Local jurisdiction match (20 pts)
  if (lawyer.city.toLowerCase() === clientCity.toLowerCase()) {
    score += 20
  }

  // 3. Specialization alignment (30 pts)
  if (
    lawyer.specializations.some((s) =>
      s.toLowerCase().includes(issueCategory.toLowerCase()) ||
      issueCategory.toLowerCase().includes(s.toLowerCase())
    )
  ) {
    score += 30
  }

  // 4. Experience rating (15 pts)
  if (lawyer.experienceYears >= 5) {
    score += 15
  } else if (lawyer.experienceYears >= 2) {
    score += 8
  }

  // 5. Client rating weight (10 pts)
  score += Math.round((lawyer.rating / 5) * 10)

  return Math.min(score, 100)
}

/**
 * Returns brand badge color based on compatibility score threshold.
 * @param score - Compatibility score (0-100)
 */
export function getCompatibilityColor(score: number): string {
  if (score >= 80) return '#0D7A55' // Emerald green
  if (score >= 60) return '#D97706' // Amber gold
  return '#94A3B8' // Slate gray
}

/**
 * Returns user-facing label for match quality.
 * @param score - Compatibility score (0-100)
 */
export function getCompatibilityLabel(score: number): string {
  if (score >= 80) return 'Great Match'
  if (score >= 60) return 'Good Match'
  return 'Partial Match'
}
