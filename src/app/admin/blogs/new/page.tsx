'use client'
import { useRouter } from 'next/navigation'
import AdminAuthGuard from '@/Components/Admin/AdminAuthGuard'
import AdminLayout from '@/Components/Admin/AdminLayout'
import BlogForm from '@/Components/Admin/BlogForm'
import { createBlog, BlogFormData } from '@/lib/api/admin'
import { useToast } from '@/Components/Providers/ToastProvider'

export default function NewBlog() {
  const router = useRouter()
  const toast = useToast()

  const handleSubmit = async (data: BlogFormData) => {
    try {
      await createBlog(data)
      toast.success('Blog created successfully!')
      router.push('/admin/blogs')
    } catch (error) {
      throw error // Let BlogForm handle the error display
    }
  }

  return (
    <AdminAuthGuard>
      <AdminLayout currentPage="new-blog">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white">Create New Blog</h1>
            <p className="text-gray-400 mt-1">Write a new blog post in both English and Bengali</p>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <BlogForm onSubmit={handleSubmit} isEdit={false} />
          </div>
        </div>
      </AdminLayout>
    </AdminAuthGuard>
  )
}
