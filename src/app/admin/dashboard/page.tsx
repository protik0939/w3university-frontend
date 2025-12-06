'use client'
import { useState, useEffect } from 'react'
import { FileText, Eye, FilePlus, FolderOpen, Calendar, TrendingUp } from 'lucide-react'
import AdminAuthGuard from '@/Components/Admin/AdminAuthGuard'
import AdminLayout from '@/Components/Admin/AdminLayout'
import StatsCard from '@/Components/Admin/StatsCard'
import { getAdminStats, AdminStats } from '@/lib/api/admin'
import { useToast } from '@/Components/Providers/ToastProvider'
import Link from 'next/link'

export default function AdminDashboard() {
  const toast = useToast()
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const data = await getAdminStats()
      setStats(data)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to load stats')
      if (error instanceof Error && error.message === 'Unauthorized') {
        window.location.href = '/admin/login'
      }
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <AdminAuthGuard>
        <AdminLayout currentPage="dashboard">
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
          </div>
        </AdminLayout>
      </AdminAuthGuard>
    )
  }

  return (
    <AdminAuthGuard>
      <AdminLayout currentPage="dashboard">
        <div className="space-y-6">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6">
            <h1 className="text-2xl font-bold text-white mb-2">Welcome to Admin Portal</h1>
            <p className="text-gray-400">Manage your blog content, view analytics, and more.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Total Blogs"
              value={stats?.total_blogs || 0}
              icon={FileText}
              color="green"
            />
            <StatsCard
              title="Published"
              value={stats?.published_blogs || 0}
              icon={FilePlus}
              color="blue"
            />
            <StatsCard
              title="Drafts"
              value={stats?.draft_blogs || 0}
              icon={FolderOpen}
              color="purple"
            />
            <StatsCard
              title="Total Views"
              value={stats?.total_views || 0}
              icon={Eye}
              color="orange"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Categories */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <FolderOpen className="w-5 h-5 text-green-400" />
                <h2 className="text-lg font-semibold text-white">Categories</h2>
              </div>
              
              {stats?.categories && stats.categories.length > 0 ? (
                <div className="space-y-3">
                  {stats.categories.map((cat, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <span className="text-gray-300">{cat.category}</span>
                      <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-sm font-medium">
                        {cat.count}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No categories yet</p>
              )}
            </div>

            {/* Recent Blogs */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <h2 className="text-lg font-semibold text-white">Recent Blogs</h2>
                </div>
                <Link
                  href="/admin/blogs"
                  className="text-sm text-green-400 hover:text-green-300 transition-colors"
                >
                  View All →
                </Link>
              </div>
              
              {stats?.recent_blogs && stats.recent_blogs.length > 0 ? (
                <div className="space-y-3">
                  {stats.recent_blogs.slice(0, 5).map((blog) => (
                    <Link
                      key={blog.id}
                      href={`/admin/blogs/edit/${blog.id}`}
                      className="block p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors group"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-white truncate group-hover:text-green-400 transition-colors">
                            {blog.title}
                          </h3>
                          <div className="flex items-center gap-3 mt-1">
                            <span className={`text-xs px-2 py-0.5 rounded ${
                              blog.status === 'published' 
                                ? 'bg-green-500/10 text-green-400' 
                                : 'bg-yellow-500/10 text-yellow-400'
                            }`}>
                              {blog.status}
                            </span>
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {blog.views || 0}
                            </span>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(blog.created_at).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No blogs yet</p>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                href="/admin/blogs/new"
                className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg hover:border-green-500/50 transition-colors group"
              >
                <FilePlus className="w-8 h-8 text-green-400" />
                <div>
                  <h3 className="font-medium text-white group-hover:text-green-400 transition-colors">New Blog Post</h3>
                  <p className="text-sm text-gray-400">Create a new article</p>
                </div>
              </Link>

              <Link
                href="/admin/blogs"
                className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg hover:border-blue-500/50 transition-colors group"
              >
                <FileText className="w-8 h-8 text-blue-400" />
                <div>
                  <h3 className="font-medium text-white group-hover:text-blue-400 transition-colors">Manage Blogs</h3>
                  <p className="text-sm text-gray-400">Edit or delete posts</p>
                </div>
              </Link>

              <Link
                href="/"
                className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg hover:border-purple-500/50 transition-colors group"
              >
                <Eye className="w-8 h-8 text-purple-400" />
                <div>
                  <h3 className="font-medium text-white group-hover:text-purple-400 transition-colors">View Site</h3>
                  <p className="text-sm text-gray-400">See public website</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </AdminLayout>
    </AdminAuthGuard>
  )
}
