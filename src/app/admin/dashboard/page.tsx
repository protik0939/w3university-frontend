'use client'
import { useEffect, useState, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { isAdminAuthenticated } from '@/lib/auth'
import { useToast } from '@/Components/Providers/ToastProvider'
import { fetchDashboardStats, DashboardStats } from '@/lib/api/admin'
import AdminSidebar from '@/Components/Admin/AdminSidebar'
import Breadcrumb from '@/Components/Admin/Breadcrumb'
import { 
  BarChart3, 
  FileText, 
  Eye, 
  TrendingUp, 
  Plus,
  Loader2,
  Calendar,
  Tag
} from 'lucide-react'
import Link from 'next/link'

function DashboardContent() {
  const router = useRouter()
  const { showToast } = useToast()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.push('/admin/login')
      return
    }
    loadStats()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadStats = async () => {
    try {
      const data = await fetchDashboardStats()
      setStats(data)
    } catch (error) {
      console.error('Dashboard stats error:', error)
      showToast('Failed to fetch dashboard stats', 'error')
      // Set empty stats on error to prevent null issues
      setStats({
        total_blogs: 0,
        published_blogs: 0,
        draft_blogs: 0,
        total_views: 0,
        total_categories: 0,
        recent_blogs: [],
        popular_categories: []
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <AdminSidebar>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-green-500 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
          </div>
        </div>
      </AdminSidebar>
    )
  }

  return (
    <AdminSidebar>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors relative overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:72px_72px]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <Breadcrumb items={[]} />

          {/* Header */}
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-2xl p-6 mb-8 mt-6 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Dashboard</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Welcome back! Here&apos;s what&apos;s happening with your blog.
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
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:shadow-lg hover:shadow-green-500/10 transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white transition-colors">
                    {stats?.total_blogs || 0}
                  </div>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1 font-medium">All time</p>
                </div>
              </div>
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 transition-colors">Total Blogs</h3>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:shadow-lg hover:shadow-blue-500/10 transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white transition-colors">
                    {stats?.published_blogs || 0}
                  </div>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1 font-medium">Live content</p>
                </div>
              </div>
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 transition-colors">Published</h3>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:shadow-lg hover:shadow-yellow-500/10 transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white transition-colors">
                    {stats?.draft_blogs || 0}
                  </div>
                  <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1 font-medium">In progress</p>
                </div>
              </div>
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 transition-colors">Drafts</h3>
            </div>

            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl group-hover:scale-110 transition-transform">
                  <Eye className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white transition-colors">
                    {stats?.total_views?.toLocaleString() || 0}
                  </div>
                  <p className="text-xs text-purple-600 dark:text-purple-400 mt-1 font-medium">Engagement</p>
                </div>
              </div>
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 transition-colors">Total Views</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Blogs */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 transition-colors">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white transition-colors">Recent Blogs</h2>
                <Link 
                  href="/admin/blogs"
                  className="text-sm text-green-600 dark:text-green-400 hover:underline"
                >
                  View all
                </Link>
              </div>
              <div className="space-y-3">
                {stats?.recent_blogs && stats.recent_blogs.length > 0 ? (
                  stats.recent_blogs.slice(0, 5).map((blog) => (
                    <Link
                      key={blog.id}
                      href={`/admin/blogs/edit/${blog.id}`}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all group"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                          {blog.title}
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            blog.status === 'published'
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                              : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                          }`}>
                            {blog.status}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-gray-500">
                            <Eye size={12} />
                            {blog.views}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-gray-500">
                            <Calendar size={12} />
                            {new Date(blog.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No blogs yet. Create your first one!
                  </p>
                )}
              </div>
            </div>

            {/* Popular Categories */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 transition-colors">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white transition-colors">Popular Categories</h2>
                <Tag className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-3">
                {stats?.popular_categories && stats.popular_categories.length > 0 ? (
                  stats.popular_categories.slice(0, 6).map((cat, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {cat.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-emerald-500 h-full rounded-full transition-all"
                            style={{ 
                              width: `${Math.min((cat.count / (stats.total_blogs || 1)) * 100, 100)}%` 
                            }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 w-8 text-right">
                          {cat.count}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No categories data available
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminSidebar>
  )
}

export default function AdminDashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-green-500" />
      </div>
    }>
      <DashboardContent />
    </Suspense>
  )
}
