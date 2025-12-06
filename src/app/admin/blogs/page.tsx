'use client'
import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { isAdminAuthenticated } from '@/lib/auth'
import { useToast } from '@/Components/Providers/ToastProvider'
import { fetchAdminBlogs, deleteBlog, AdminBlog } from '@/lib/api/admin'
import AdminSidebar from '@/Components/Admin/AdminSidebar'
import { Search, Plus, Edit2, Trash2, Eye, Loader2, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

function BlogsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { showToast } = useToast()
  const [blogs, setBlogs] = useState<AdminBlog[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>(
    (searchParams?.get('status') as 'all' | 'published' | 'draft') || 'all'
  )
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const perPage = 15

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.push('/admin/login')
      return
    }
    loadBlogs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, statusFilter, searchTerm])

  const loadBlogs = async () => {
    setLoading(true)
    try {
      const result = await fetchAdminBlogs({
        page: currentPage,
        per_page: perPage,
        search: searchTerm || undefined,
        status: statusFilter,
        sort_by: 'created_at',
        sort_order: 'desc'
      })
      
      setBlogs(result.data)
      setTotalPages(result.last_page)
      setTotal(result.total)
    } catch (error) {
      showToast('Failed to load blogs', 'error')
      console.error('Load blogs error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this blog?')) return
    
    try {
      await deleteBlog(id)
      setBlogs(blogs.filter(b => b.id !== id))
      showToast('Blog deleted successfully', 'success')
      loadBlogs() // Reload to update counts
    } catch {
      showToast('Failed to delete blog', 'error')
    }
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1) // Reset to first page on search
  }

  const handleStatusChange = (value: 'all' | 'published' | 'draft') => {
    setStatusFilter(value)
    setCurrentPage(1) // Reset to first page on filter change
  }

  return (
    <AdminSidebar>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors relative overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:72px_72px]" />
        
        {/* Header */}
        <div className="relative z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Manage Blogs</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {total} total blog{total !== 1 ? 's' : ''}
                </p>
              </div>
              <Link
                href="/admin/blogs/new"
                className="flex items-center gap-2 px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all shadow-lg shadow-green-500/20"
              >
                <Plus size={18} />
                <span className="hidden sm:inline">New Blog</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Controls */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 mb-6 transition-colors">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex-1 w-full md:max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="Search blogs..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 w-full md:w-auto">
                <select
                  value={statusFilter}
                  onChange={(e) => handleStatusChange(e.target.value as 'all' | 'published' | 'draft')}
                  className="px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-green-500 focus:outline-none transition-colors"
                >
                  <option value="all">All Status</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>
          </div>

          {/* Blogs Table */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden transition-colors">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-green-500" />
              </div>
            ) : blogs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">No blogs found</p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider transition-colors">Title</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider transition-colors">Status</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider transition-colors">Category</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider transition-colors">Author</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider transition-colors">Views</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider transition-colors">Date</th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider transition-colors">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800 transition-colors">
                      {blogs.map(blog => (
                        <tr key={blog.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                          <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white transition-colors max-w-xs truncate">
                            {blog.title}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              blog.status === 'published' 
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                                : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                            } transition-colors`}>
                              {blog.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 transition-colors">{blog.category}</td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 transition-colors">{blog.author}</td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 transition-colors">
                            <div className="flex items-center gap-1">
                              <Eye size={14} className="text-gray-400" />
                              {blog.views?.toLocaleString() || 0}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 transition-colors">
                            {new Date(blog.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <Link
                                href={`/admin/blogs/edit/${blog.id}`}
                                className="p-2 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-lg transition-all"
                                title="Edit"
                              >
                                <Edit2 size={16} />
                              </Link>
                              <button
                                onClick={() => handleDelete(blog.id)}
                                className="p-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 rounded-lg transition-all"
                                title="Delete"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="border-t border-gray-200 dark:border-gray-800 px-6 py-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Page {currentPage} of {totalPages}
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                          disabled={currentPage === 1}
                          className="px-3 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <button
                          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                          disabled={currentPage === totalPages}
                          className="px-3 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </AdminSidebar>
  )
}

export default function AdminBlogs() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-green-500" />
      </div>
    }>
      <BlogsContent />
    </Suspense>
  )
}
