'use client'

import { useState } from 'react'
import { tutorialAPI } from '@/lib/tutorialApi'

export default function TestTutorialAPI() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const testPublicEndpoints = async () => {
    setLoading(true)
    setError(null)
    try {
      // Test 1: Get all tutorials
      const allTutorials = await tutorialAPI.getAll()
      
      // Test 2: Get JavaScript tutorials
      const jsTutorials = await tutorialAPI.getByLanguage('javascript')
      
      // Test 3: Get languages
      const languages = await tutorialAPI.getLanguages()
      
      setResult({
        allTutorials,
        jsTutorials,
        languages,
        timestamp: new Date().toISOString()
      })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const testCreateTutorial = async () => {
    const token = localStorage.getItem('authToken')
    if (!token) {
      setError('Please login first')
      return
    }

    setLoading(true)
    setError(null)
    try {
      const result = await tutorialAPI.adminCreate({
        language_id: 'javascript',
        title: 'Test Tutorial',
        content: 'This is a test tutorial',
        code_example: 'console.log("test");',
        order: 1,
        is_published: true
      }, token)
      
      setResult(result)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Tutorial API Test Page
        </h1>

        <div className="space-y-4 mb-8">
          <button
            onClick={testPublicEndpoints}
            disabled={loading}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg font-medium"
          >
            Test Public Endpoints
          </button>

          <button
            onClick={testCreateTutorial}
            disabled={loading}
            className="ml-4 px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white rounded-lg font-medium"
          >
            Test Create Tutorial (Admin)
          </button>
        </div>

        {loading && (
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-blue-700 dark:text-blue-300">Loading...</p>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <p className="text-red-700 dark:text-red-300 font-medium">Error:</p>
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {result && (
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-green-700 dark:text-green-300 font-medium mb-2">Success!</p>
            <pre className="text-xs text-gray-700 dark:text-gray-300 overflow-auto max-h-96 p-4 bg-white dark:bg-gray-800 rounded">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-900 rounded-lg">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">API Routes:</h2>
          <div className="space-y-2 text-sm">
            <div className="font-mono text-gray-700 dark:text-gray-300">
              <span className="text-green-500">GET</span> /api/tutorials
            </div>
            <div className="font-mono text-gray-700 dark:text-gray-300">
              <span className="text-green-500">GET</span> /api/tutorials?language_id=javascript
            </div>
            <div className="font-mono text-gray-700 dark:text-gray-300">
              <span className="text-green-500">GET</span> /api/tutorials/languages
            </div>
            <div className="font-mono text-gray-700 dark:text-gray-300">
              <span className="text-blue-500">POST</span> /api/admin/tutorials (requires auth)
            </div>
            <div className="font-mono text-gray-700 dark:text-gray-300">
              <span className="text-yellow-500">PUT</span> /api/admin/tutorials/:id (requires auth)
            </div>
            <div className="font-mono text-gray-700 dark:text-gray-300">
              <span className="text-red-500">DELETE</span> /api/admin/tutorials/:id (requires auth)
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
