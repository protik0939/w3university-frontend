'use client'
import { useState, useRef } from 'react'
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react'
import { uploadToImgBB, validateImageFile, ImageUploadOptions } from '@/lib/imageUpload'

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  label?: string
  aspectRatio?: number
  maxWidth?: number
  maxHeight?: number
  className?: string
}

export default function ImageUpload({
  value,
  onChange,
  label = 'Featured Image',
  aspectRatio = 16 / 9, // Default blog post aspect ratio
  maxWidth = 1200,
  maxHeight = 630,
  className = ''
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | undefined>(value)
  const [error, setError] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError('')

    // Validate file
    const validation = validateImageFile(file)
    if (!validation.valid) {
      setError(validation.error || 'Invalid file')
      return
    }

    // Show preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    // Upload to ImgBB
    setUploading(true)
    try {
      const options: ImageUploadOptions = {
        maxWidth,
        maxHeight,
        quality: 0.9,
        aspectRatio
      }

      const result = await uploadToImgBB(file, options)

      if (result.success && result.url) {
        onChange(result.url)
        setPreview(result.url)
      } else {
        setError(result.error || 'Upload failed')
        setPreview(undefined)
      }
    } catch (err) {
      setError('Upload failed. Please try again.')
      setPreview(undefined)
      console.error('Upload error:', err)
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = () => {
    setPreview(undefined)
    onChange('')
    setError('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors">
        {label}
      </label>

      <div className="space-y-3">
        {/* Upload Area */}
        {!preview ? (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="relative border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center hover:border-green-500 dark:hover:border-green-500 transition-colors cursor-pointer bg-gray-50 dark:bg-gray-800/50"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              disabled={uploading}
            />

            {uploading ? (
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="animate-spin text-green-500" size={40} />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Uploading and optimizing image...
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <Upload className="text-gray-400" size={40} />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Click to upload image
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    PNG, JPG, WebP up to 10MB
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Recommended: {maxWidth}x{maxHeight}px (aspect ratio {aspectRatio.toFixed(2)})
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Preview */
          <div className="relative group">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium"
                >
                  <Upload size={16} className="inline mr-2" />
                  Change
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                >
                  <X size={16} className="inline mr-2" />
                  Remove
                </button>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              disabled={uploading}
            />
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <X className="text-red-500 flex-shrink-0 mt-0.5" size={16} />
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Info */}
        <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <ImageIcon className="text-blue-500 flex-shrink-0 mt-0.5" size={16} />
          <p className="text-xs text-blue-600 dark:text-blue-400">
            Images are automatically compressed and resized to {maxWidth}x{maxHeight}px for optimal performance.
            {aspectRatio && ` Images will be cropped to ${aspectRatio.toFixed(2)}:1 aspect ratio.`}
          </p>
        </div>
      </div>
    </div>
  )
}
