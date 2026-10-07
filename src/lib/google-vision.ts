/**
 * Google Cloud Vision API for OCR (Optical Character Recognition).
 * Extracts text from uploaded legal documents, ID proofs, and images.
 * Used in Document Vault for making scanned documents searchable.
 *
 * Falls back gracefully when API credentials are not configured.
 */

/** Check if Cloud Vision API is configured */
function isConfigured(): boolean {
  return !!process.env.GOOGLE_APPLICATION_CREDENTIALS
}

/**
 * Extract text from an image URL using Google Cloud Vision API.
 * Uses the REST API directly to avoid the heavy @google-cloud/vision SDK dependency at build time.
 *
 * @param imageUrl - Public URL of the image to process
 * @returns Extracted text string
 */
export async function extractTextFromImage(imageUrl: string): Promise<string> {
  if (!isConfigured()) {
    console.warn('[CloudVision] API not configured — OCR disabled')
    return ''
  }

  try {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY
    const response = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requests: [
            {
              image: { source: { imageUri: imageUrl } },
              features: [{ type: 'TEXT_DETECTION', maxResults: 1 }],
            },
          ],
        }),
      }
    )

    if (!response.ok) {
      throw new Error(`Vision API error: ${response.status}`)
    }

    const data = await response.json()
    const annotations = data.responses?.[0]?.textAnnotations
    return annotations?.[0]?.description ?? ''
  } catch (error) {
    console.error('[CloudVision] extractTextFromImage error:', error)
    return ''
  }
}

/**
 * Extract text from a base64-encoded image buffer.
 * Used when processing uploaded files that haven't been stored yet.
 *
 * @param base64Content - Base64 encoded image content
 * @returns Extracted text string
 */
export async function extractTextFromBuffer(base64Content: string): Promise<string> {
  if (!isConfigured()) {
    console.warn('[CloudVision] API not configured — OCR disabled')
    return ''
  }

  try {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY
    const response = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requests: [
            {
              image: { content: base64Content },
              features: [{ type: 'TEXT_DETECTION', maxResults: 1 }],
            },
          ],
        }),
      }
    )

    if (!response.ok) {
      throw new Error(`Vision API error: ${response.status}`)
    }

    const data = await response.json()
    const annotations = data.responses?.[0]?.textAnnotations
    return annotations?.[0]?.description ?? ''
  } catch (error) {
    console.error('[CloudVision] extractTextFromBuffer error:', error)
    return ''
  }
}
