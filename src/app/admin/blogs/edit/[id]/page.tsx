'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Trash2 } from 'lucide-react'
import AdminAuthGuard from '@/Components/Admin/AdminAuthGuard'
import AdminLayout from '@/Components/Admin/AdminLayout'
import BlogForm from '@/Components/Admin/BlogForm'
import { getAdminBlog, updateBlog, deleteBlog, BlogFormData } from '@/lib/api/admin'
import { useToast } from '@/Components/Providers/ToastProvider'

export default function EditBlog() {
  const router = useRouter()
  const params = useParams()
  const toast = useToast()
  const id = params.id as string

  const [blog, setBlog] = useState<BlogFormData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBlog()
  }, [id])

  const loadBlog = async () => {
    try {
      const data = await getAdminBlog(id)
      setBlog(data)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to load blog')
      if (error instanceof Error && error.message === 'Unauthorized') {
        router.push('/admin/login')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (data: BlogFormData) => {
    try {
      await updateBlog(id, data)
      toast.success('Blog updated successfully!')
      router.push('/admin/blogs')
    } catch (error) {
      throw error // Let BlogForm handle the error display
    }
  }

  const handleDelete = async () => {
    if (!blog) return

    if (!confirm(`Are you sure you want to delete "${blog.title}"? This action cannot be undone.`)) {
      return
    }

    try {
      await deleteBlog(id)
      toast.success('Blog deleted successfully!')
      router.push('/admin/blogs')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete blog')
    }
  }

  if (loading) {
    return (
      <AdminAuthGuard>
        <AdminLayout currentPage="edit-blog">
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
          </div>
        </AdminLayout>
      </AdminAuthGuard>
    )
  }

  if (!blog) {
    return (
      <AdminAuthGuard>
        <AdminLayout currentPage="edit-blog">
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold text-white mb-4">Blog Not Found</h1>
            <button
              onClick={() => router.push('/admin/blogs')}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              Back to Blogs
            </button>
          </div>
        </AdminLayout>
      </AdminAuthGuard>
    )
  }

  return (
    <AdminAuthGuard>
      <AdminLayout currentPage="edit-blog">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white">Edit Blog</h1>
              <p className="text-gray-400 mt-1">Update your blog post</p>
            </div>
            
            <button
              onClick={handleDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/20 transition-all"
            >
              <Trash2 className="w-5 h-5" />
              Delete Blog
            </button>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <BlogForm initialData={blog} onSubmit={handleSubmit} isEdit={true} />
          </div>
        </div>
      </AdminLayout>
    </AdminAuthGuard>
  )
}
