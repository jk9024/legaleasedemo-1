import { generateJSON } from '@/lib/gemini'

/**
 * AI-powered legal consultation summary generator.
 * Uses Google Gemini 1.5 Flash to synthesize notes, statutory references, and actionable next steps.
 * From AGENTS.md lines 882-919.
 */

export interface SummaryData {
  issueDiscussed: string
  keyFacts: string[]
  adviceGiven: string
  legalSectionsReferenced: string[]
  nextStepsForClient: string[]
  followUpRecommended: boolean
  followUpTimeline: string
}

/**
 * Synthesizes a structured legal consultation summary using Gemini AI.
 * @param issueDescription - Description of the client's legal issue
 * @param issueCategory - Legal category (e.g. Property Law, Consumer Dispute)
 * @param transcript - Optional raw transcript or lawyer notes from the session
 */
export async function generateCallSummary(
  issueDescription: string,
  issueCategory: string,
  transcript?: string
): Promise<SummaryData> {
  const prompt = `
  Generate a structured legal consultation summary.
  
  Issue category: ${issueCategory}
  Client issue: ${issueDescription}
  ${transcript ? 'Transcript/Notes:\n' + transcript : ''}
  
  Return JSON only:
  {
    "issueDiscussed": "2-3 sentence summary",
    "keyFacts": ["fact1", "fact2", "fact3"],
    "adviceGiven": "detailed paragraph of advice",
    "legalSectionsReferenced": ["IPC 420", "CPC 9"],
    "nextStepsForClient": ["step1", "step2", "step3"],
    "followUpRecommended": true,
    "followUpTimeline": "30 days"
  }`

  try {
    const result = await generateJSON<SummaryData>(prompt)
    if (result) return result
  } catch (error) {
    console.warn('[CallSummary] Gemini API fallback triggered:', error)
  }

  return {
    issueDiscussed: `Consultation regarding ${issueCategory}: ${issueDescription.slice(0, 100)}...`,
    keyFacts: [issueDescription],
    adviceGiven: 'Lawyer reviewed documents and suggested immediate statutory representation.',
    legalSectionsReferenced: ['Relevant provisions of Indian Law'],
    nextStepsForClient: ['Collate primary agreements and correspondence', 'Await advocate formal review notice'],
    followUpRecommended: true,
    followUpTimeline: '14 days',
  }
}
