'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  ChevronLeft, 
  ChevronRight,
  CheckSquare,
  Square
} from 'lucide-react'
import AdminAuthGuard from '@/Components/Admin/AdminAuthGuard'
import AdminLayout from '@/Components/Admin/AdminLayout'
import { getAdminBlogs, deleteBlog, bulkDeleteBlogs, bulkUpdateStatus, BlogListItem, PaginatedBlogList } from '@/lib/api/admin'
import { useToast } from '@/Components/Providers/ToastProvider'

export default function AdminBlogs() {
  const toast = useToast()
  const [blogs, setBlogs] = useState<PaginatedBlogList | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedBlogs, setSelectedBlogs] = useState<number[]>([])
  
  // Filters
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<'all' | 'published' | 'draft'>('all')
  const [category, setCategory] = useState('all')
  const [sortBy, setSortBy] = useState<'created_at' | 'title' | 'views'>('created_at')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [page, setPage] = useState(1)

  useEffect(() => {
    loadBlogs()
  }, [search, status, category, sortBy, sortOrder, page])

  const loadBlogs = async () => {
    setLoading(true)
    try {
      const data = await getAdminBlogs({
        page,
        per_page: 15,
        ...(search && { search }),
        ...(status !== 'all' && { status }),
        ...(category !== 'all' && { category }),
        sort_by: sortBy,
        sort_order: sortOrder
      })
      setBlogs(data)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to load blogs')
      if (error instanceof Error && error.message === 'Unauthorized') {
        window.location.href = '/admin/login'
      }
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return

    try {
      await deleteBlog(id)
      toast.success('Blog deleted successfully')
      loadBlogs()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete blog')
    }
  }

  const handleBulkDelete = async () => {
    if (selectedBlogs.length === 0) {
      toast.warning('Please select blogs to delete')
      return
    }

    if (!confirm(`Delete ${selectedBlogs.length} selected blog(s)?`)) return

    try {
      await bulkDeleteBlogs(selectedBlogs)
      toast.success(`${selectedBlogs.length} blog(s) deleted successfully`)
      setSelectedBlogs([])
      loadBlogs()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete blogs')
    }
  }

  const handleBulkStatusChange = async (newStatus: 'published' | 'draft') => {
    if (selectedBlogs.length === 0) {
      toast.warning('Please select blogs to update')
      return
    }

    try {
      await bulkUpdateStatus(selectedBlogs, newStatus)
      toast.success(`${selectedBlogs.length} blog(s) updated to ${newStatus}`)
      setSelectedBlogs([])
      loadBlogs()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update blogs')
    }
  }

  const toggleSelectAll = () => {
    if (selectedBlogs.length === blogs?.data.length) {
      setSelectedBlogs([])
    } else {
      setSelectedBlogs(blogs?.data.map(b => b.id) || [])
    }
  }

  const toggleSelect = (id: number) => {
    setSelectedBlogs(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  return (
    <AdminAuthGuard>
      <AdminLayout currentPage="all-blogs">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">All Blogs</h1>
              <p className="text-gray-400 mt-1">Manage your blog posts</p>
            </div>
            <Link
              href="/admin/blogs/new"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg shadow-green-500/20"
            >
              <Plus className="w-5 h-5" />
              New Blog
            </Link>
          </div>

          {/* Filters */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search blogs..."
                className="w-full pl-11 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
              />
            </div>

            {/* Filter Controls */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
              >
                <option value="created_at">Sort by Date</option>
                <option value="title">Sort by Title</option>
                <option value="views">Sort by Views</option>
              </select>

              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
                className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>

              <button
                onClick={() => {
                  setSearch('')
                  setStatus('all')
                  setCategory('all')
                  setSortBy('created_at')
                  setSortOrder('desc')
                }}
                className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-all"
              >
                Reset Filters
              </button>
            </div>

            {/* Bulk Actions */}
            {selectedBlogs.length > 0 && (
              <div className="flex items-center gap-3 pt-4 border-t border-gray-800">
                <span className="text-sm text-gray-400">{selectedBlogs.length} selected</span>
                <button
                  onClick={() => handleBulkStatusChange('published')}
                  className="px-3 py-1.5 bg-green-500/10 text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/20 transition-all text-sm"
                >
                  Publish Selected
                </button>
                <button
                  onClick={() => handleBulkStatusChange('draft')}
                  className="px-3 py-1.5 bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 rounded-lg hover:bg-yellow-500/20 transition-all text-sm"
                >
                  Draft Selected
                </button>
                <button
                  onClick={handleBulkDelete}
                  className="px-3 py-1.5 bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/20 transition-all text-sm"
                >
                  Delete Selected
                </button>
              </div>
            )}
          </div>

          {/* Blog Table */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
              </div>
            ) : blogs && blogs.data.length > 0 ? (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-800/50 border-b border-gray-800">
                      <tr>
                        <th className="px-6 py-4 text-left">
                          <button onClick={toggleSelectAll} className="text-gray-400 hover:text-white">
                            {selectedBlogs.length === blogs.data.length ? (
                              <CheckSquare className="w-5 h-5" />
                            ) : (
                              <Square className="w-5 h-5" />
                            )}
                          </button>
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Title</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Category</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Author</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Views</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Date</th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {blogs.data.map((blog) => (
                        <tr key={blog.id} className="hover:bg-gray-800/30 transition-colors">
                          <td className="px-6 py-4">
                            <button onClick={() => toggleSelect(blog.id)} className="text-gray-400 hover:text-white">
                              {selectedBlogs.includes(blog.id) ? (
                                <CheckSquare className="w-5 h-5 text-green-400" />
                              ) : (
                                <Square className="w-5 h-5" />
                              )}
                            </button>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <p className="text-white font-medium">{blog.title}</p>
                              <p className="text-sm text-gray-500 mt-0.5">{blog.title_bn}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded text-xs">
                              {blog.category}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded text-xs ${
                              blog.status === 'published'
                                ? 'bg-green-500/10 text-green-400'
                                : 'bg-yellow-500/10 text-yellow-400'
                            }`}>
                              {blog.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-400 text-sm">{blog.author}</td>
                          <td className="px-6 py-4 text-gray-400 text-sm">{blog.views || 0}</td>
                          <td className="px-6 py-4 text-gray-400 text-sm">
                            {new Date(blog.created_at).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <Link
                                href={`/en/blog/${blog.slug}`}
                                target="_blank"
                                className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all"
                                title="View"
                              >
                                <Eye className="w-4 h-4" />
                              </Link>
                              <Link
                                href={`/admin/blogs/edit/${blog.id}`}
                                className="p-2 text-gray-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4" />
                              </Link>
                              <button
                                onClick={() => handleDelete(blog.id, blog.title)}
                                className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-gray-800 flex items-center justify-between">
                  <p className="text-sm text-gray-400">
                    Showing {((blogs.current_page - 1) * blogs.per_page) + 1} to {Math.min(blogs.current_page * blogs.per_page, blogs.total)} of {blogs.total} results
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={blogs.current_page === 1}
                      className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="text-sm text-gray-400">
                      Page {blogs.current_page} of {blogs.last_page}
                    </span>
                    <button
                      onClick={() => setPage(p => p + 1)}
                      disabled={blogs.current_page === blogs.last_page}
                      className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg mb-4">No blogs found</p>
                <Link
                  href="/admin/blogs/new"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Create Your First Blog
                </Link>
              </div>
            )}
          </div>
        </div>
      </AdminLayout>
    </AdminAuthGuard>
  )
}
