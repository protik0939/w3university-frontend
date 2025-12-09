'use client'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useToast } from '@/Components/Providers/ToastProvider'
import { fetchAdminBlog, updateBlog } from '@/lib/api/admin'
import AdminSidebar from '@/Components/Admin/AdminSidebar'
import Breadcrumb from '@/Components/Admin/Breadcrumb'
import { Save, Loader2, Globe } from 'lucide-react'

export default function EditBlogPage() {
  const router = useRouter()
  const params = useParams()
  const { showToast } = useToast()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    title_bn: '',
    excerpt: '',
    excerpt_bn: '',
    content: '',
    content_bn: '',
    category: '',
    author: '',
    tags: '',
    read_time: '',
    status: 'draft' as 'draft' | 'published',
    image_url: ''
  })

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const id = params?.id as string
        const blog = await fetchAdminBlog(parseInt(id))
        
        setFormData({
          title: blog.title || '',
          title_bn: blog.title_bn || '',
          excerpt: blog.excerpt || '',
          excerpt_bn: blog.excerpt_bn || '',
          content: blog.content || '',
          content_bn: blog.content_bn || '',
          category: blog.category || '',
          author: blog.author || '',
          tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : '',
          read_time: blog.read_time || '',
          status: blog.status || 'draft',
          image_url: blog.image_url || ''
        })
      } catch (error) {
        showToast('Failed to load blog', 'error')
        console.error('Load blog error:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params?.id) {
      loadBlog()
    }
  }, [params?.id, showToast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const id = params?.id as string
      const updateData = {
        title: formData.title,
        title_bn: formData.title_bn,
        excerpt: formData.excerpt,
        excerpt_bn: formData.excerpt_bn,
        content: formData.content,
        content_bn: formData.content_bn,
        category: formData.category,
        author: formData.author,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        read_time: formData.read_time,
        status: formData.status,
        image_url: formData.image_url
      }
      
      await updateBlog(parseInt(id), updateData)
      
      showToast('Blog updated successfully!', 'success')
      router.push('/admin/blogs')
    } catch {
      showToast('Failed to update blog', 'error')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <AdminSidebar>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
          <Loader2 className="w-8 h-8 animate-spin text-green-500" />
        </div>
      </AdminSidebar>
    )
  }

  return (
    <AdminSidebar>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors relative overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:72px_72px]" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <Breadcrumb items={[
            { label: 'Blogs', href: '/admin/blogs' },
            { label: 'Edit Blog' }
          ]} />

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Edit Blog</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Update blog post in both English and Bengali
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 transition-colors">
              <div className="flex items-center gap-2 mb-6">
                <Globe className="text-green-500" size={20} />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">English Content</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
                    placeholder="Enter blog title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Excerpt
                  </label>
                  <textarea
                    required
                    value={formData.excerpt}
                    onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all resize-none"
                    placeholder="Enter blog excerpt"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Content
                  </label>
                  <textarea
                    required
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    rows={12}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all resize-none font-mono text-sm"
                    placeholder="Enter blog content (Markdown supported)"
                  />
                </div>
              </div>
            </div>

            {/* Bengali Content */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 transition-colors">
              <div className="flex items-center gap-2 mb-6">
                <Globe className="text-green-500" size={20} />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">বাংলা কন্টেন্ট</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    শিরোনাম (Title)
                  </label>
                  <input
                    type="text"
                    value={formData.title_bn}
                    onChange={(e) => setFormData({...formData, title_bn: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
                    placeholder="ব্লগ শিরোনাম লিখুন"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    সারাংশ (Excerpt)
                  </label>
                  <textarea
                    value={formData.excerpt_bn}
                    onChange={(e) => setFormData({...formData, excerpt_bn: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all resize-none"
                    placeholder="ব্লগ সারাংশ লিখুন"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    বিষয়বস্তু (Content)
                  </label>
                  <textarea
                    value={formData.content_bn}
                    onChange={(e) => setFormData({...formData, content_bn: e.target.value})}
                    rows={12}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all resize-none font-mono text-sm"
                    placeholder="ব্লগ বিষয়বস্তু লিখুন"
                  />
                </div>
              </div>
            </div>

            {/* Metadata */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 transition-colors">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Metadata</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
                    placeholder="e.g., React, TypeScript"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
                    placeholder="Author name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
                    placeholder="react, javascript, tutorial"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Read Time (minutes)
                  </label>
                  <input
                    type="number"
                    value={formData.read_time}
                    onChange={(e) => setFormData({...formData, read_time: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
                    placeholder="5"
                    min="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value as 'draft' | 'published'})}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-500/20"
              >
                {saving ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Update Blog
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminSidebar>
  )
}
