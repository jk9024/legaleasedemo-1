import { GoogleGenerativeAI, type GenerativeModel } from '@google/generative-ai'

/**
 * Gemini AI client for LegalEase.
 * Uses Gemini 1.5 Flash (free tier: 15 req/min) for all AI features.
 * All functions have try/catch with fallback values.
 * Rate limit: max 10 AI calls per user per hour (enforced at API route level).
 *
 * Use cases:
 * 1. Lawyer matching
 * 2. Call summary generation
 * 3. Similar case finding
 * 4. Case timeline prediction
 * 5. AI legal chatbot (streaming)
 * 6. Review sentiment analysis
 * 7. Knowledge base auto-tagging
 */

/** Initialise Google Generative AI client */
function getGenAI(): GoogleGenerativeAI | null {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    console.warn('[Gemini] GEMINI_API_KEY not set — AI features disabled')
    return null
  }
  return new GoogleGenerativeAI(apiKey)
}

/** Get Gemini 1.5 Flash model (free tier) */
function getFlashModel(): GenerativeModel | null {
  const genAI = getGenAI()
  if (!genAI) return null
  return genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
}

/** Get Gemini 1.5 Pro model (for complex tasks) */
function getProModel(): GenerativeModel | null {
  const genAI = getGenAI()
  if (!genAI) return null
  return genAI.getGenerativeModel({ model: 'gemini-1.5-pro' })
}

/**
 * Generate free-form text response from Gemini.
 * @param prompt - The prompt to send to Gemini
 * @param usePro - Whether to use Pro model (default: Flash)
 * @returns Generated text string
 */
export async function generateText(
  prompt: string,
  usePro: boolean = false
): Promise<string> {
  try {
    const model = usePro ? getProModel() : getFlashModel()
    if (!model) return ''

    const result = await model.generateContent(prompt)
    return result.response.text()
  } catch (error) {
    console.error('[Gemini] generateText error:', error)
    return ''
  }
}

/**
 * Generate structured JSON response from Gemini.
 * Appends JSON-only instruction to ensure clean output.
 * @param prompt - The prompt describing desired JSON structure
 * @returns Parsed JSON object of type T
 */
export async function generateJSON<T>(prompt: string): Promise<T | null> {
  try {
    const fullPrompt = prompt + '\n\nRespond with ONLY valid JSON. No markdown formatting, no code blocks, no explanation.'
    const text = await generateText(fullPrompt)

    if (!text) return null

    const cleaned = text
      .replace(/```json\s*/g, '')
      .replace(/```\s*/g, '')
      .trim()

    return JSON.parse(cleaned) as T
  } catch (error) {
    console.error('[Gemini] generateJSON parse error:', error)
    return null
  }
}

/**
 * Stream text response from Gemini for real-time chat experience.
 * @param prompt - The prompt to send
 * @param systemInstruction - Optional system prompt
 * @returns AsyncGenerator yielding text chunks
 */
export async function* streamText(
  prompt: string,
  systemInstruction?: string
): AsyncGenerator<string> {
  try {
    const genAI = getGenAI()
    if (!genAI) {
      yield 'AI features are currently unavailable. Please try again later.'
      return
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      ...(systemInstruction ? { systemInstruction } : {}),
    })

    const result = await model.generateContentStream(prompt)

    for await (const chunk of result.stream) {
      const text = chunk.text()
      if (text) yield text
    }
  } catch (error) {
    console.error('[Gemini] streamText error:', error)
    yield 'An error occurred while generating the response.'
  }
}

// =====================================================
// USE CASE 1: Lawyer Matching
// =====================================================

/** Result of AI lawyer matching */
interface LawyerMatchResult {
  category: string
  complexity: string
  lawyerType: string
  rankedLawyerIds: string[]
  estimatedMonths: number
}

/**
 * Match a client's issue to the best lawyers using Gemini AI.
 * @param issueDescription - Client's description of their legal issue
 * @param lawyerProfiles - Array of available lawyer profiles
 * @returns Ranked lawyer match results
 */
export async function matchLawyers(
  issueDescription: string,
  lawyerProfiles: Array<{ id: string; name: string; specializations: string[]; experience: number; rating: number }>
): Promise<LawyerMatchResult | null> {
  const prompt = `You are a legal AI assistant for India.
  
A client described their legal issue: "${issueDescription}"

Available lawyers:
${JSON.stringify(lawyerProfiles, null, 2)}

Analyse the issue and return JSON:
{
  "category": "legal category (e.g., Property Law, Family Law)",
  "complexity": "low|medium|high",
  "lawyerType": "ideal lawyer type description",
  "rankedLawyerIds": ["id1", "id2", "id3"],
  "estimatedMonths": number
}

Rank lawyers by relevance to the issue. Consider specializations, experience, and rating.`

  return generateJSON<LawyerMatchResult>(prompt)
}

// =====================================================
// USE CASE 4: Case Timeline Prediction
// =====================================================

/** Predicted timeline for a legal case */
interface TimelinePrediction {
  minMonths: number
  maxMonths: number
  typicalSteps: string[]
}

/**
 * Predict the timeline for a legal case using Gemini.
 * @param caseType - Category of the legal case
 * @param description - Detailed case description
 * @returns Timeline prediction with steps
 */
export async function predictCaseTimeline(
  caseType: string,
  description: string
): Promise<TimelinePrediction | null> {
  const prompt = `You are a legal AI assistant specialising in Indian law.

Case type: ${caseType}
Case description: ${description}

Predict the timeline for resolving this case in India. Return JSON:
{
  "minMonths": number,
  "maxMonths": number,
  "typicalSteps": ["step1", "step2", "step3", ...]
}

Be realistic about Indian court timelines.`

  return generateJSON<TimelinePrediction>(prompt)
}

// =====================================================
// USE CASE 5: AI Legal Chatbot System Prompt
// =====================================================

/** System instruction for the LexAI chatbot */
export const LEXAI_SYSTEM_PROMPT = `You are LexAI, LegalEase's legal assistant. You serve users in India.

Rules:
- Provide general legal information only
- Always recommend booking a lawyer for specific legal advice
- Be concise and helpful
- Reference relevant Indian laws and sections when applicable
- Never guarantee outcomes
- Be empathetic and professional
- If asked about fees, direct to the LegalEase platform
- Support queries in English, Hindi, and Telugu`

// =====================================================
// USE CASE 6: Review Sentiment Analysis
// =====================================================

/** Sentiment analysis result */
interface SentimentResult {
  score: number
  keywords: string[]
}

/**
 * Analyse the sentiment of a review using Gemini.
 * @param reviewText - The review text to analyse
 * @returns Sentiment score (-1 to 1) and keywords
 */
export async function analyseSentiment(
  reviewText: string
): Promise<SentimentResult | null> {
  const prompt = `Analyse the sentiment of this legal service review:

"${reviewText}"

Return JSON:
{
  "score": number between -1 (very negative) and 1 (very positive),
  "keywords": ["keyword1", "keyword2", "keyword3"]
}

Extract 3-5 sentiment keywords.`

  return generateJSON<SentimentResult>(prompt)
}

// =====================================================
// USE CASE 7: Knowledge Base Auto-Tagging
// =====================================================

/** Auto-generated tags for knowledge base entry */
interface AutoTagResult {
  tags: string[]
  complexity: string
}

/**
 * Auto-generate tags and complexity for a knowledge base entry.
 * @param caseTitle - Title of the case
 * @param caseCategory - Legal category
 * @param issueDescription - Issue description
 * @returns Generated tags and complexity level
 */
export async function autoTagKnowledgeBase(
  caseTitle: string,
  caseCategory: string,
  issueDescription: string
): Promise<AutoTagResult | null> {
  const prompt = `Generate tags for this legal case knowledge base entry:

Title: ${caseTitle}
Category: ${caseCategory}
Issue: ${issueDescription}

Return JSON:
{
  "tags": ["tag1", "tag2", "tag3", ...],
  "complexity": "low|medium|high"
}

Generate 5-8 relevant tags. Tags should be lowercase, specific Indian legal terms.`

  return generateJSON<AutoTagResult>(prompt)
}
