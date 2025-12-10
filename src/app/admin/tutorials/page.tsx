'use client'
import { useEffect, useState, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import { isAdminAuthenticated } from '@/lib/auth'
import { useToast } from '@/Components/Providers/ToastProvider'
import { tutorialAPI, Tutorial } from '@/lib/tutorialApi'
import AdminSidebar from '@/Components/Admin/AdminSidebar'
import Breadcrumb from '@/Components/Admin/Breadcrumb'
import { Search, Plus, Edit2, Trash2, Eye, EyeOff, Loader2, Code } from 'lucide-react'

function TutorialsContent() {
  const router = useRouter()
  const { showToast } = useToast()
  const [tutorials, setTutorials] = useState<Tutorial[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [languageFilter, setLanguageFilter] = useState<string>('all')
  const [total, setTotal] = useState(0)

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.push('/admin/login')
      return
    }
    loadTutorials()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageFilter, searchTerm])

  const loadTutorials = async () => {
    setLoading(true)
    try {
      const authToken = localStorage.getItem('admin_token')
      if (!authToken) {
        router.push('/admin/login')
        return
      }

      const params: { language_id?: string; search?: string } = {}
      if (languageFilter !== 'all') params.language_id = languageFilter
      if (searchTerm) params.search = searchTerm

      const data = await tutorialAPI.adminGetAll(params, authToken)
      setTutorials(data)
      setTotal(data.length)
    } catch (error: unknown) {
      console.error('Load tutorials error:', error)
      showToast('Failed to load tutorials', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this tutorial?')) return

    try {
      const authToken = localStorage.getItem('admin_token')
      if (!authToken) return

      await tutorialAPI.adminDelete(id, authToken)
      setTutorials(tutorials.filter(t => t.id !== id))
      showToast('Tutorial deleted successfully', 'success')
      loadTutorials()
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete tutorial'
      showToast(errorMessage, 'error')
    }
  }

  const handleTogglePublish = async (tutorial: Tutorial) => {
    try {
      const authToken = localStorage.getItem('admin_token')
      if (!authToken) return

      await tutorialAPI.adminUpdate(
        tutorial.id,
        { is_published: !tutorial.is_published },
        authToken
      )
      showToast('Status updated successfully', 'success')
      loadTutorials()
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update status'
      showToast(errorMessage, 'error')
    }
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value)
  }

  const handleLanguageChange = (value: string) => {
    setLanguageFilter(value)
  }

  return (
    <AdminSidebar>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors relative overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:72px_72px]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <Breadcrumb items={[
            { label: 'Tutorials' }
          ]} />

          {/* Header */}
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-2xl p-6 mb-6 mt-6 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Manage Tutorials</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {total} total tutorial{total !== 1 ? 's' : ''}
                </p>
              </div>
              <button
                onClick={() => router.push('/admin/tutorials/new')}
                className="flex items-center gap-2 px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all shadow-lg shadow-green-500/20"
              >
                <Plus size={18} />
                <span className="hidden sm:inline">New Tutorial</span>
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 mb-6 transition-colors">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex-1 w-full md:max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 transition-colors" />
                  <input
                    type="text"
                    placeholder="Search tutorials..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 w-full md:w-auto">
                <select
                  value={languageFilter}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                  className="px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-green-500 focus:outline-none transition-colors"
                >
                  <option value="all">All Languages</option>
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="html">HTML</option>
                  <option value="css">CSS</option>
                  <option value="react">React</option>
                  <option value="nodejs">Node.js</option>
                  <option value="typescript">TypeScript</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                </select>
              </div>
            </div>
          </div>

          {/* Tutorials Table */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden transition-colors">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-green-500" />
              </div>
            ) : tutorials.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">No tutorials found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700 transition-colors">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Tutorial
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Language
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Order
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Code Example
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700 transition-colors">
                    {tutorials.map((tutorial) => (
                      <tr 
                        key={tutorial.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {tutorial.title}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1 mt-1">
                              {tutorial.content}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                            {tutorial.language_id}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                          {tutorial.order}
                        </td>
                        <td className="px-6 py-4">
                          {tutorial.is_published ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                              <Eye size={12} />
                              Published
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300">
                              <EyeOff size={12} />
                              Draft
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {tutorial.code_example ? (
                            <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                              <Code size={14} className="text-green-500" />
                              Yes
                            </span>
                          ) : (
                            <span className="text-xs text-gray-400">No</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleTogglePublish(tutorial)}
                              className="p-1.5 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                              title={tutorial.is_published ? 'Unpublish' : 'Publish'}
                            >
                              {tutorial.is_published ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                            <button
                              onClick={() => router.push(`/admin/tutorials/edit/${tutorial.id}`)}
                              className="p-1.5 text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors"
                              title="Edit"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(tutorial.id)}
                              className="p-1.5 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
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
            )}
          </div>
        </div>
      </div>
    </AdminSidebar>
  )
}

export default function TutorialsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-green-500" />
      </div>
    }>
      <TutorialsContent />
    </Suspense>
  )
}
