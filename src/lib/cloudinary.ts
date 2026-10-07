import { v2 as cloudinary } from 'cloudinary'

/**
 * Cloudinary file upload and management integration.
 * Provides 25GB free tier file storage for documents, avatars, and legal filings.
 */

const isConfigured = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET &&
  !process.env.CLOUDINARY_CLOUD_NAME.includes('your_')
)

if (isConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  })
}

/**
 * Upload a file buffer to Cloudinary with folder and overwrite options.
 * @param buffer - File content as Buffer
 * @param fileName - Target public_id name
 * @param folder - Folder path in Cloudinary (defaults to 'legalease')
 * @returns Object with secure url and publicId
 */
export async function uploadFile(
  buffer: Buffer,
  fileName: string,
  folder: string = 'legalease'
): Promise<{ url: string; publicId: string }> {
  if (!isConfigured) {
    console.warn('[Cloudinary] Missing credentials. Returning mock upload URL for development.')
    return {
      url: `/uploads/${folder}/${fileName}`,
      publicId: `${folder}/${fileName}`
    }
  }

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          resource_type: 'auto',
          public_id: fileName,
          overwrite: true
        },
        (error, result) => {
          if (error) reject(error)
          else
            resolve({
              url: result!.secure_url,
              publicId: result!.public_id
            })
        }
      )
      .end(buffer)
  })
}

/**
 * Delete a file from Cloudinary by its publicId.
 * @param publicId - Public identifier of the file in Cloudinary
 */
export async function deleteFile(
  publicId: string
): Promise<void> {
  if (!isConfigured) {
    console.warn(`[Cloudinary] Dev mode: Mock deleted ${publicId}`)
    return
  }
  await cloudinary.uploader.destroy(publicId)
}
