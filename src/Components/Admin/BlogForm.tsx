'use client'
import { useState, useEffect } from 'react'
import { Save, X } from 'lucide-react'
import { BlogFormData, generateSlug } from '@/lib/api/admin'
import { useToast } from '@/Components/Providers/ToastProvider'

interface BlogFormProps {
  initialData?: Partial<BlogFormData>
  onSubmit: (data: BlogFormData) => Promise<void>
  isEdit?: boolean
}

export default function BlogForm({ initialData, onSubmit, isEdit }: BlogFormProps) {
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    title_bn: '',
    content: '',
    content_bn: '',
    excerpt: '',
    excerpt_bn: '',
    category: '',
    category_bn: '',
    tags: [],
    tags_bn: [],
    author: '',
    author_bn: '',
    read_time: '',
    read_time_bn: '',
    image_url: '',
    status: 'draft',
    published_at: '',
    slug: '',
    ...initialData
  })

  const [tagInput, setTagInput] = useState('')
  const [tagInputBn, setTagInputBn] = useState('')

  // Auto-generate slug from title
  useEffect(() => {
    if (!isEdit && formData.title && !formData.slug) {
      setFormData(prev => ({ ...prev, slug: generateSlug(formData.title) }))
    }
  }, [formData.title, isEdit])

  const handleChange = (field: keyof BlogFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleAddTag = (lang: 'en' | 'bn') => {
    const input = lang === 'en' ? tagInput : tagInputBn
    if (!input.trim()) return

    const field = lang === 'en' ? 'tags' : 'tags_bn'
    const tags = formData[field] as string[]

    if (!tags.includes(input.trim())) {
      handleChange(field, [...tags, input.trim()])
    }

    if (lang === 'en') setTagInput('')
    else setTagInputBn('')
  }

  const handleRemoveTag = (lang: 'en' | 'bn', tag: string) => {
    const field = lang === 'en' ? 'tags' : 'tags_bn'
    const tags = formData[field] as string[]
    handleChange(field, tags.filter(t => t !== tag))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.title || !formData.content) {
      toast.error('Title and content are required')
      return
    }

    setLoading(true)

    try {
      await onSubmit(formData)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save blog')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Status & Slug */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Status <span className="text-red-400">*</span>
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="draft"
                checked={formData.status === 'draft'}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-4 h-4 text-green-500 focus:ring-green-500"
              />
              <span className="text-gray-300">Draft</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="published"
                checked={formData.status === 'published'}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-4 h-4 text-green-500 focus:ring-green-500"
              />
              <span className="text-gray-300">Published</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Slug {!isEdit && <span className="text-xs text-gray-500">(auto-generated)</span>}
          </label>
          <input
            type="text"
            value={formData.slug}
            onChange={(e) => handleChange('slug', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
            placeholder="blog-post-slug"
          />
        </div>
      </div>

      {/* Title */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Title (English) <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
            placeholder="Enter blog title in English"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Title (Bengali)
          </label>
          <input
            type="text"
            value={formData.title_bn}
            onChange={(e) => handleChange('title_bn', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
            placeholder="শিরোনাম বাংলায় লিখুন"
          />
        </div>
      </div>

      {/* Excerpt */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Excerpt (English)
          </label>
          <textarea
            value={formData.excerpt}
            onChange={(e) => handleChange('excerpt', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all resize-none"
            placeholder="Brief summary..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Excerpt (Bengali)
          </label>
          <textarea
            value={formData.excerpt_bn}
            onChange={(e) => handleChange('excerpt_bn', e.target.value)}
            rows={3}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all resize-none"
            placeholder="সংক্ষিপ্ত বিবরণ..."
          />
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Content (English) <span className="text-red-400">*</span>
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => handleChange('content', e.target.value)}
            rows={12}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all resize-none font-mono text-sm"
            placeholder="Write your blog content..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Content (Bengali)
          </label>
          <textarea
            value={formData.content_bn}
            onChange={(e) => handleChange('content_bn', e.target.value)}
            rows={12}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all resize-none font-mono text-sm"
            placeholder="আপনার ব্লগ কন্টেন্ট লিখুন..."
          />
        </div>
      </div>

      {/* Category & Author */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Category (English)
          </label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
            placeholder="e.g., React, TypeScript"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Category (Bengali)
          </label>
          <input
            type="text"
            value={formData.category_bn}
            onChange={(e) => handleChange('category_bn', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
            placeholder="যেমন: রিয়েক্ট"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Author (English)
          </label>
          <input
            type="text"
            value={formData.author}
            onChange={(e) => handleChange('author', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
            placeholder="Author name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Author (Bengali)
          </label>
          <input
            type="text"
            value={formData.author_bn}
            onChange={(e) => handleChange('author_bn', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
            placeholder="লেখকের নাম"
          />
        </div>
      </div>

      {/* Tags */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Tags (English)
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag('en'))}
              className="flex-1 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
              placeholder="Add tag and press Enter"
            />
            <button
              type="button"
              onClick={() => handleAddTag('en')}
              className="px-4 py-2 bg-green-500/10 text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/20 transition-all"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded-full text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag('en', tag)}
                  className="hover:text-red-400"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Tags (Bengali)
          </label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={tagInputBn}
              onChange={(e) => setTagInputBn(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag('bn'))}
              className="flex-1 px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
              placeholder="ট্যাগ যোগ করুন"
            />
            <button
              type="button"
              onClick={() => handleAddTag('bn')}
              className="px-4 py-2 bg-green-500/10 text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/20 transition-all"
            >
              যোগ
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.tags_bn.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded-full text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag('bn', tag)}
                  className="hover:text-red-400"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Read Time & Image */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Read Time (EN)
          </label>
          <input
            type="text"
            value={formData.read_time}
            onChange={(e) => handleChange('read_time', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
            placeholder="5 min read"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Read Time (BN)
          </label>
          <input
            type="text"
            value={formData.read_time_bn}
            onChange={(e) => handleChange('read_time_bn', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
            placeholder="৫ মিনিট পড়া"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Published Date
          </label>
          <input
            type="datetime-local"
            value={formData.published_at}
            onChange={(e) => handleChange('published_at', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Featured Image URL
        </label>
        <input
          type="url"
          value={formData.image_url}
          onChange={(e) => handleChange('image_url', e.target.value)}
          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      {/* Submit Buttons */}
      <div className="flex items-center gap-4 pt-6 border-t border-gray-800">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-600 focus:ring-2 focus:ring-green-500/50 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-500/20"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              {isEdit ? 'Update Blog' : 'Create Blog'}
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => window.history.back()}
          className="px-6 py-3 bg-gray-800/50 border border-gray-700 text-gray-300 font-medium rounded-lg hover:bg-gray-800 transition-all"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
