'use client'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useToast } from '@/Components/Providers/ToastProvider'
import { fetchAdminExercise, updateExercise } from '@/lib/api/admin'
import AdminSidebar from '@/Components/Admin/AdminSidebar'
import Breadcrumb from '@/Components/Admin/Breadcrumb'
import { Save, Loader2, Globe, Code } from 'lucide-react'

export default function EditExercisePage() {
  const router = useRouter()
  const params = useParams()
  const { showToast } = useToast()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    title_bn: '',
    description: '',
    description_bn: '',
    instructions: '',
    instructions_bn: '',
    problem_statement: '',
    problem_statement_bn: '',
    input_description: '',
    input_description_bn: '',
    output_description: '',
    output_description_bn: '',
    sample_input: '',
    sample_input_bn: '',
    sample_output: '',
    sample_output_bn: '',
    difficulty: 'Beginner',
    difficulty_bn: '',
    duration: '',
    duration_bn: '',
    category: '',
    category_bn: '',
    tags: '',
    tags_bn: '',
    starter_code: '',
    solution_code: '',
    programming_language: '',
    language_id: '',
    language_name: '',
    language_name_bn: '',
    image_url: '',
    status: 'draft' as 'draft' | 'published' | 'archived'
  })

  useEffect(() => {
    const loadExercise = async () => {
      try {
        const id = params?.id as string
        const exercise = await fetchAdminExercise(parseInt(id))
        
        setFormData({
          title: exercise.title || '',
          title_bn: exercise.title_bn || '',
          description: exercise.description || '',
          description_bn: exercise.description_bn || '',
          instructions: exercise.instructions || '',
          instructions_bn: exercise.instructions_bn || '',
          problem_statement: exercise.problem_statement || '',
          problem_statement_bn: exercise.problem_statement_bn || '',
          input_description: exercise.input_description || '',
          input_description_bn: exercise.input_description_bn || '',
          output_description: exercise.output_description || '',
          output_description_bn: exercise.output_description_bn || '',
          sample_input: exercise.sample_input || '',
          sample_input_bn: exercise.sample_input_bn || '',
          sample_output: exercise.sample_output || '',
          sample_output_bn: exercise.sample_output_bn || '',
          difficulty: exercise.difficulty || 'Beginner',
          difficulty_bn: exercise.difficulty_bn || '',
          duration: exercise.duration?.toString() || '',
          duration_bn: exercise.duration_bn || '',
          category: exercise.category || '',
          category_bn: exercise.category_bn || '',
          tags: Array.isArray(exercise.tags) ? exercise.tags.join(', ') : '',
          tags_bn: Array.isArray(exercise.tags_bn) ? exercise.tags_bn.join(', ') : '',
          starter_code: exercise.starter_code || '',
          solution_code: exercise.solution_code || '',
          programming_language: exercise.programming_language || '',
          language_id: exercise.language_id || '',
          language_name: exercise.language_name || '',
          language_name_bn: exercise.language_name_bn || '',
          image_url: exercise.image_url || '',
          status: exercise.status || 'draft'
        })
      } catch (error) {
        showToast('Failed to load exercise', 'error')
        console.error('Load exercise error:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params?.id) {
      loadExercise()
    }
  }, [params?.id, showToast])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const id = params?.id as string
      const updateData = {
        ...formData,
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : [],
        tags_bn: formData.tags_bn ? formData.tags_bn.split(',').map(t => t.trim()) : [],
        duration: formData.duration ? parseInt(formData.duration) : undefined,
      }
      
      await updateExercise(parseInt(id), updateData)
      
      showToast('Exercise updated successfully!', 'success')
      router.push('/admin/exercises')
    } catch (error) {
      console.error('Error updating exercise:', error)
      showToast('Failed to update exercise', 'error')
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
            { label: 'Exercises', href: '/admin/exercises' },
            { label: 'Edit Exercise' }
          ]} />

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Edit Exercise</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Update exercise content in both English and Bengali
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 transition-colors">
              <div className="flex items-center gap-2 mb-6">
                <Code size={18} className="text-green-500" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white transition-colors">Basic Information</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Difficulty</label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
                    required
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' | 'archived' })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
                    required
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Duration (minutes)</label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
                    placeholder="30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Language ID</label>
                  <input
                    type="text"
                    value={formData.language_id}
                    onChange={(e) => setFormData({ ...formData, language_id: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
                    placeholder="javascript"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Language Name</label>
                  <input
                    type="text"
                    value={formData.language_name}
                    onChange={(e) => setFormData({ ...formData, language_name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
                    placeholder="JavaScript"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
                    placeholder="Arrays, Strings, etc."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
                    placeholder="basics, strings, arrays"
                  />
                </div>
              </div>
            </div>

            {/* English Content */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 transition-colors">
              <div className="flex items-center gap-2 mb-6">
                <Globe size={18} className="text-blue-500" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white transition-colors">English Content</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
                    required
                    placeholder="Sum of Two Numbers"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Problem Statement</label>
                  <textarea
                    value={formData.problem_statement}
                    onChange={(e) => setFormData({ ...formData, problem_statement: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all resize-none"
                    placeholder="Write a function that takes two numbers as parameters and returns their sum."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Input Description</label>
                  <textarea
                    value={formData.input_description}
                    onChange={(e) => setFormData({ ...formData, input_description: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all resize-none"
                    placeholder="Two numbers a and b."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Output Description</label>
                  <textarea
                    value={formData.output_description}
                    onChange={(e) => setFormData({ ...formData, output_description: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all resize-none"
                    placeholder="The sum of a and b."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sample Input</label>
                    <textarea
                      value={formData.sample_input}
                      onChange={(e) => setFormData({ ...formData, sample_input: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all font-mono text-sm resize-none"
                      placeholder="a = 5, b = 3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Sample Output</label>
                    <textarea
                      value={formData.sample_output}
                      onChange={(e) => setFormData({ ...formData, sample_output: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all font-mono text-sm resize-none"
                      placeholder="8"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Instructions</label>
                  <textarea
                    value={formData.instructions}
                    onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all resize-none"
                    placeholder="Detailed instructions for solving the exercise..."
                  />
                </div>
              </div>
            </div>

            {/* Bengali Content */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 transition-colors">
              <div className="flex items-center gap-2 mb-6">
                <Globe size={18} className="text-emerald-500" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white transition-colors">Bengali Content</h2>
                <span className="text-xs text-gray-500 dark:text-gray-400 transition-colors">(Optional)</span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">শিরোনাম</label>
                  <input
                    type="text"
                    value={formData.title_bn}
                    onChange={(e) => setFormData({ ...formData, title_bn: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
                    placeholder="দুটি সংখ্যার যোগফল"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">সমস্যা বিবৃতি</label>
                  <textarea
                    value={formData.problem_statement_bn}
                    onChange={(e) => setFormData({ ...formData, problem_statement_bn: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all resize-none"
                    placeholder="একটি ফাংশন লিখুন যা দুটি সংখ্যা প্যারামিটার হিসাবে নেয় এবং তাদের যোগফল রিটার্ন করে।"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">ইনপুট বর্ণনা</label>
                  <textarea
                    value={formData.input_description_bn}
                    onChange={(e) => setFormData({ ...formData, input_description_bn: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all resize-none"
                    placeholder="দুটি সংখ্যা a এবং b।"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">আউটপুট বর্ণনা</label>
                  <textarea
                    value={formData.output_description_bn}
                    onChange={(e) => setFormData({ ...formData, output_description_bn: e.target.value })}
                    rows={2}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all resize-none"
                    placeholder="a এবং b এর যোগফল।"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">নমুনা ইনপুট</label>
                    <textarea
                      value={formData.sample_input_bn}
                      onChange={(e) => setFormData({ ...formData, sample_input_bn: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all font-mono text-sm resize-none"
                      placeholder="a = ৫, b = ৩"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">নমুনা আউটপুট</label>
                    <textarea
                      value={formData.sample_output_bn}
                      onChange={(e) => setFormData({ ...formData, sample_output_bn: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all font-mono text-sm resize-none"
                      placeholder="৮"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Code Sections */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 transition-colors">
              <div className="flex items-center gap-2 mb-6">
                <Code size={18} className="text-purple-500" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white transition-colors">Code</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Starter Code</label>
                  <textarea
                    value={formData.starter_code}
                    onChange={(e) => setFormData({ ...formData, starter_code: e.target.value })}
                    rows={8}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all font-mono text-sm resize-none"
                    placeholder="function sum(a, b) {&#10;  // Your code here&#10;}"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Solution Code</label>
                  <textarea
                    value={formData.solution_code}
                    onChange={(e) => setFormData({ ...formData, solution_code: e.target.value })}
                    rows={8}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all font-mono text-sm resize-none"
                    placeholder="function sum(a, b) {&#10;  return a + b;&#10;}"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => router.push('/admin/exercises')}
                className="px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg transition-all"
                disabled={saving}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all shadow-lg shadow-green-500/20 disabled:opacity-50"
                disabled={saving}
              >
                <Save size={18} />
                {saving ? 'Updating...' : 'Update Exercise'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminSidebar>
  )
}
