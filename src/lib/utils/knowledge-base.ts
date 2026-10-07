import { prisma } from '@/lib/prisma'
import { generateJSON } from '@/lib/gemini'

/**
 * AI-assisted knowledge base retrieval and case matching for lawyers.
 * Finds similar precedents and past resolutions using Gemini vector reasoning.
 * From AGENTS.md lines 922-978.
 */

export interface MatchedCase {
  id: string
  caseTitle: string
  caseCategory: string
  issueDescription: string
  solutionSummary: string
  legalSectionsUsed: string[]
  similarityScore: number
  reason: string
}

/**
 * Queries the lawyer's past case history and uses Gemini AI to rank similarity.
 * @param newIssue - Client's present legal concern
 * @param lawyerId - Unique ID of the lawyer
 * @returns Array of matched past cases with AI similarity scores and explanations
 */
export async function findSimilarCases(
  newIssue: string,
  lawyerId: string
): Promise<MatchedCase[]> {
  try {
    const existingCases = await prisma.caseKnowledge.findMany({
      where: { lawyerId },
      take: 50,
      orderBy: { createdAt: 'desc' }
    })

    if (existingCases.length === 0) return []

    const caseSummaries = existingCases.map((c) => ({
      id: c.id,
      title: c.caseTitle,
      issue: c.issueDescription.substring(0, 200),
      category: c.caseCategory,
      tags: c.tags
    }))

    const prompt = `
    New legal issue: "${newIssue}"
    
    Past cases (JSON array):
    ${JSON.stringify(caseSummaries)}
    
    Find the top 3 most similar past cases.
    Return JSON only:
    {
      "matches": [
        { 
          "id": "case-id", 
          "similarityScore": 92,
          "reason": "why similar in one sentence" 
        }
      ]
    }`

    const result = await generateJSON<{
      matches: Array<{
        id: string
        similarityScore: number
        reason: string
      }>
    }>(prompt)

    if (!result?.matches || !Array.isArray(result.matches)) {
      return []
    }

    const matchedCases = await Promise.all(
      result.matches.map(async (m) => {
        const kbCase = await prisma.caseKnowledge.findUnique({
          where: { id: m.id }
        })
        if (!kbCase) return null
        return {
          id: kbCase.id,
          caseTitle: kbCase.caseTitle,
          caseCategory: kbCase.caseCategory,
          issueDescription: kbCase.issueDescription,
          solutionSummary: kbCase.solutionSummary,
          legalSectionsUsed: kbCase.legalSectionsUsed,
          similarityScore: m.similarityScore,
          reason: m.reason
        }
      })
    )

    return matchedCases.filter((c): c is MatchedCase => c !== null)
  } catch (error) {
    console.warn('[KnowledgeBase] findSimilarCases failed or fallback triggered:', error)
    return []
  }
}
