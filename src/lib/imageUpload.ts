// Image upload utility for ImgBB with compression and cropping

export interface ImageUploadOptions {
  maxWidth?: number
  maxHeight?: number
  quality?: number
  aspectRatio?: number // e.g., 16/9 or 4/3
}

export interface UploadResult {
  success: boolean
  url?: string
  error?: string
}

/**
 * Compress and resize image before upload
 */
export async function compressImage(
  file: File,
  options: ImageUploadOptions = {}
): Promise<Blob> {
  const {
    maxWidth = 1200,
    maxHeight = 630, // Good for blog featured images (OG image size)
    quality = 0.9,
    aspectRatio
  } = options

  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (e) => {
      const img = new Image()
      
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        
        if (!ctx) {
          reject(new Error('Failed to get canvas context'))
          return
        }

        let { width, height } = img
        
        // Apply aspect ratio if specified
        if (aspectRatio) {
          const currentRatio = width / height
          if (currentRatio > aspectRatio) {
            // Image is wider, crop width
            width = height * aspectRatio
          } else if (currentRatio < aspectRatio) {
            // Image is taller, crop height
            height = width / aspectRatio
          }
        }

        // Calculate new dimensions while maintaining aspect ratio
        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }
        
        if (height > maxHeight) {
          width = (width * maxHeight) / height
          height = maxHeight
        }

        canvas.width = width
        canvas.height = height

        // Enable image smoothing for better quality
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'

        // Draw image centered if cropped
        const sourceX = aspectRatio && img.width > width ? (img.width - width) / 2 : 0
        const sourceY = aspectRatio && img.height > height ? (img.height - height) / 2 : 0

        ctx.drawImage(
          img,
          sourceX,
          sourceY,
          width,
          height,
          0,
          0,
          width,
          height
        )

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob)
            } else {
              reject(new Error('Failed to create blob'))
            }
          },
          'image/jpeg',
          quality
        )
      }

      img.onerror = () => reject(new Error('Failed to load image'))
      img.src = e.target?.result as string
    }

    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}

/**
 * Upload image to ImgBB
 */
export async function uploadToImgBB(
  file: File | Blob,
  options: ImageUploadOptions = {}
): Promise<UploadResult> {
  try {
    // ImgBB API key (should be in environment variables)
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY
    
    if (!apiKey) {
      return {
        success: false,
        error: 'ImgBB API key not configured'
      }
    }

    // Compress image before upload
    let imageBlob: Blob
    if (file instanceof File) {
      imageBlob = await compressImage(file, options)
    } else {
      imageBlob = file
    }

    // Create form data
    const formData = new FormData()
    formData.append('image', imageBlob)
    formData.append('key', apiKey)
    
    // Optional: Set expiration (in seconds)
    // formData.append('expiration', '600') // 10 minutes

    // Upload to ImgBB
    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formData
    })

    const data = await response.json()

    if (data.success && data.data?.url) {
      return {
        success: true,
        url: data.data.url
      }
    } else {
      return {
        success: false,
        error: data.error?.message || 'Upload failed'
      }
    }
  } catch (error) {
    console.error('Image upload error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed'
    }
  }
}

/**
 * Validate image file
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  // Check file type
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Please upload a valid image file (JPEG, PNG, WebP, or GIF)'
    }
  }

  // Check file size (max 10MB for ImgBB free tier)
  const maxSize = 10 * 1024 * 1024 // 10MB
  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'Image size must be less than 10MB'
    }
  }

  return { valid: true }
}
