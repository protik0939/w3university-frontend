'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/Components/Providers/ToastProvider'
import { Save, Code as CodeIcon } from 'lucide-react'
import AdminSidebar from '@/Components/Admin/AdminSidebar'
import Breadcrumb from '@/Components/Admin/Breadcrumb'
import { tutorialAPI } from '@/lib/tutorialApi'

export default function NewTutorialPage() {
  const router = useRouter()
  const { showToast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    language_id: 'javascript',
    title: '',
    content: '',
    code_example: '',
    order: 0,
    is_published: true
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const authToken = localStorage.getItem('admin_token')
      if (!authToken) {
        showToast('Please login first', 'error')
        router.push('/admin/login')
        return
      }

      await tutorialAPI.adminCreate(formData, authToken)
      showToast('Tutorial created successfully!', 'success')
      router.push('/admin/tutorials')
    } catch (error: any) {
      showToast(error.message || 'Failed to create tutorial', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminSidebar>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors relative overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:72px_72px]" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <Breadcrumb items={[
            { label: 'Tutorials', href: '/admin/tutorials' },
            { label: 'New Tutorial' }
          ]} />

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Create New Tutorial</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Add a new tutorial for a programming language
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 transition-colors">
              <div className="flex items-center gap-2 mb-6">
                <CodeIcon size={18} className="text-blue-500" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white transition-colors">Tutorial Details</h2>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors">
                      Programming Language *
                    </label>
                    <select
                      value={formData.language_id}
                      onChange={(e) => setFormData({ ...formData, language_id: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
                      required
                    >
                      <option value="javascript">JavaScript</option>
                      <option value="python">Python</option>
                      <option value="html">HTML</option>
                      <option value="css">CSS</option>
                      <option value="react">React</option>
                      <option value="nodejs">Node.js</option>
                      <option value="typescript">TypeScript</option>
                      <option value="java">Java</option>
                      <option value="cpp">C++</option>
                      <option value="php">PHP</option>
                      <option value="ruby">Ruby</option>
                      <option value="go">Go</option>
                      <option value="rust">Rust</option>
                      <option value="swift">Swift</option>
                      <option value="kotlin">Kotlin</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors">
                      Display Order
                    </label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
                      placeholder="0"
                      min="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors">
                    Tutorial Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
                    required
                    placeholder="e.g., Introduction to Variables"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors">
                    Content *
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all resize-none"
                    required
                    placeholder="Explain the tutorial topic in detail..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors">
                    Code Example (Optional)
                  </label>
                  <textarea
                    value={formData.code_example}
                    onChange={(e) => setFormData({ ...formData, code_example: e.target.value })}
                    rows={8}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all font-mono text-sm resize-none"
                    placeholder="// Enter code example here&#10;let x = 10;&#10;console.log(x);"
                  />
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <input
                    type="checkbox"
                    id="is_published"
                    checked={formData.is_published}
                    onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                    className="w-4 h-4 text-green-500 bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded focus:ring-green-500 focus:ring-2"
                  />
                  <label htmlFor="is_published" className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">
                    Publish immediately
                  </label>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all shadow-lg shadow-green-500/20"
              >
                <Save size={18} />
                {loading ? 'Creating...' : 'Create Tutorial'}
              </button>
              <button
                type="button"
                onClick={() => router.push('/admin/tutorials')}
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminSidebar>
  )
}
