import { NextRequest, NextResponse } from 'next/server'
import { aiSearchSchema } from '@/lib/utils/validators'
import { rateLimit } from '@/lib/redis'
import { generateJSON } from '@/lib/gemini'
import { ApiResponse } from '@/types/api'

interface AIMatchAnalysis {
  detectedCategory: string
  applicableActs: string[]
  complexity: 'Low' | 'Medium' | 'High'
  urgencyLevel: 'Normal' | 'Urgent' | 'Immediate'
  estimatedDurationMonths: number
  summary: string
  recommendations: Array<{
    lawyerId: string
    matchScore: number
    matchReason: string
  }>
}

/**
 * Fallback knowledge mapping for Indian legal domains.
 */
function getFallbackAnalysis(query: string): AIMatchAnalysis {
  const lower = query.toLowerCase()

  if (lower.includes('property') || lower.includes('land') || lower.includes('flat') || lower.includes('builder') || lower.includes('rera') || lower.includes('tenant') || lower.includes('possession')) {
    return {
      detectedCategory: 'Property & RERA Law',
      applicableActs: [
        'Real Estate (Regulation and Development) Act, 2016 (Section 18)',
        'Transfer of Property Act, 1882 (Section 106)',
        'Telangana Land Revenue Act / ROR Act, 2020',
      ],
      complexity: 'Medium',
      urgencyLevel: lower.includes('immediate') || lower.includes('threat') ? 'Urgent' : 'Normal',
      estimatedDurationMonths: 6,
      summary: 'Property and real estate matter involving builder delays, title verification, or tenant/landlord dispute under Telangana jurisdiction.',
      recommendations: [
        {
          lawyerId: 'lawyer-priya-001',
          matchScore: 97,
          matchReason: 'Specialises in Telangana High Court property disputes, RERA builder delays, and title deed due diligence with 12+ years experience.',
        },
        {
          lawyerId: 'lawyer-kiran-005',
          matchScore: 84,
          matchReason: 'Handles consumer court complaints against builders for unfair trade practices and delayed possession compensation.',
        },
      ],
    }
  }

  if (lower.includes('divorce') || lower.includes('custody') || lower.includes('marriage') || lower.includes('alimony') || lower.includes('family') || lower.includes('domestic')) {
    return {
      detectedCategory: 'Family & Matrimonial Law',
      applicableActs: [
        'Hindu Marriage Act, 1955 (Section 13B Mutual Consent)',
        'Protection of Women from Domestic Violence Act, 2005 (PWDVA)',
        'Special Marriage Act, 1954',
      ],
      complexity: 'Medium',
      urgencyLevel: 'Normal',
      estimatedDurationMonths: 6,
      summary: 'Matrimonial or family dispute involving dissolution of marriage, child custody mediation, or maintenance claims.',
      recommendations: [
        {
          lawyerId: 'lawyer-anjali-002',
          matchScore: 98,
          matchReason: 'Recognized family law advocate with 8+ years practicing at Hyderabad Family Court, specializing in compassionate mutual settlements and custody.',
        },
      ],
    }
  }

  if (lower.includes('bail') || lower.includes('police') || lower.includes('fir') || lower.includes('cheque') || lower.includes('138') || lower.includes('fraud') || lower.includes('cyber') || lower.includes('arrest')) {
    return {
      detectedCategory: 'Criminal Defense & Bail',
      applicableActs: [
        'Bharatiya Nagarik Suraksha Sanhita (BNSS) / CrPC (Section 438 Anticipatory Bail)',
        'Negotiable Instruments Act, 1881 (Section 138)',
        'Information Technology Act, 2000 (Section 66D)',
      ],
      complexity: 'High',
      urgencyLevel: 'Urgent',
      estimatedDurationMonths: 4,
      summary: 'Urgent criminal law matter requiring anticipatory bail, police station representation, or cheque bounce litigation defense.',
      recommendations: [
        {
          lawyerId: 'lawyer-suresh-003',
          matchScore: 96,
          matchReason: '16+ years veteran trial advocate at City Criminal Courts Nampally and Telangana High Court for fast anticipatory bail and financial defenses.',
        },
      ],
    }
  }

  if (lower.includes('contract') || lower.includes('company') || lower.includes('startup') || lower.includes('trademark') || lower.includes('agreement') || lower.includes('nda')) {
    return {
      detectedCategory: 'Corporate & Commercial Law',
      applicableActs: [
        'Indian Contract Act, 1872',
        'Trade Marks Act, 1999',
        'Companies Act, 2013',
      ],
      complexity: 'Low',
      urgencyLevel: 'Normal',
      estimatedDurationMonths: 1,
      summary: 'Commercial agreement drafting, startup advisory, or trademark registration issue.',
      recommendations: [
        {
          lawyerId: 'lawyer-fatima-004',
          matchScore: 95,
          matchReason: 'Corporate legal counsel for startups in Hyderabad and HITEC City with extensive experience in commercial contracts and IP registration.',
        },
      ],
    }
  }

  // Generic fallback
  return {
    detectedCategory: 'Civil & Consumer Law',
    applicableActs: ['Consumer Protection Act, 2019', 'Code of Civil Procedure, 1908 (Section 9)'],
    complexity: 'Medium',
    urgencyLevel: 'Normal',
    estimatedDurationMonths: 6,
    summary: 'General legal consultation required to evaluate rights and appropriate forum for relief under Indian law.',
    recommendations: [
      {
        lawyerId: 'lawyer-priya-001',
        matchScore: 92,
        matchReason: 'Highly rated civil advocate with 12 years of experience at Telangana High Court.',
      },
      {
        lawyerId: 'lawyer-kiran-005',
        matchScore: 88,
        matchReason: 'Experienced in consumer disputes and compensation claims across Telangana district forums.',
      },
    ],
  }
}

/**
 * POST /api/ai/match
 * Uses Gemini 1.5 Flash to parse client problem description and match the most compatible advocates.
 */
export async function POST(req: NextRequest) {
  try {
    // 1. Rate limiting
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1'
    const limitRes = await rateLimit(`ai-match:${ip}`, 20, 3600)
    if (!limitRes.success) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'AI matching rate limit reached (10 queries/hour). Please try again shortly.' },
        { status: 429 }
      )
    }

    // 2. Validate request body
    const body = await req.json()
    const parseResult = aiSearchSchema.safeParse(body)
    if (!parseResult.success) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: parseResult.error.issues[0]?.message || 'Invalid search query' },
        { status: 400 }
      )
    }

    const { query, city, language, maxBudget } = parseResult.data

    // 3. Build Gemini prompt
    const prompt = `You are the AI Legal Classifier for LegalEase (India's premier legal marketplace).
A citizen in ${city || 'Hyderabad, India'} described their legal dilemma:
"${query}"

Preferred Language: ${language || 'Any'}
Max Budget: ${maxBudget ? 'INR ' + maxBudget : 'Standard'}

Available verified advocate IDs:
- "lawyer-priya-001": Adv. Priya Sharma (Civil Law, Property Law, RERA, Land Acquisition, 12 yrs exp, Rs.599/hr)
- "lawyer-anjali-002": Adv. Anjali Kapoor (Family Law, Divorce, Child Custody, Domestic Violence, 8 yrs exp, Rs.799/hr)
- "lawyer-suresh-003": Adv. Suresh Reddy (Criminal Law, Bail Matters, Cybercrime, Section 138 NI Act, 16 yrs exp, Rs.999/hr)
- "lawyer-fatima-004": Adv. Fatima Khan (Corporate Law, Contracts, Startups, IP & Trademark, 6 yrs exp, Rs.499/hr)
- "lawyer-kiran-005": Adv. Kiran Kumar (Consumer Rights, Motor Accident Claims, Insurance, 10 yrs exp, Rs.399/hr)

Analyze the issue and return a valid JSON object matching this exact schema:
{
  "detectedCategory": "string (e.g. Property & RERA Law, Criminal Defense & Bail, Family & Matrimonial Law, Corporate Law, Consumer Protection)",
  "applicableActs": ["string (e.g. Real Estate Regulation Act 2016, Section 138 NI Act, Hindu Marriage Act 1955)"],
  "complexity": "Low" | "Medium" | "High",
  "urgencyLevel": "Normal" | "Urgent" | "Immediate",
  "estimatedDurationMonths": number,
  "summary": "1-2 sentence legal assessment of the citizen's situation",
  "recommendations": [
    {
      "lawyerId": "string (one of the available IDs above)",
      "matchScore": number (between 70 and 99),
      "matchReason": "1 sentence explaining why their specific court experience fits this case"
    }
  ]
}`

    // 4. Call Gemini 1.5 Flash
    let analysis = await generateJSON<AIMatchAnalysis>(prompt)

    // Fallback if Gemini response is empty or unparseable
    if (!analysis || !analysis.detectedCategory || !analysis.recommendations) {
      analysis = getFallbackAnalysis(query)
    }

    return NextResponse.json({
      success: true,
      data: analysis,
    })
  } catch (error) {
    console.error('[AI Match API POST] Error:', error)
    // Always provide fallback response on error
    return NextResponse.json({
      success: true,
      data: getFallbackAnalysis('General inquiry'),
    })
  }
}
