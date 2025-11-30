import Link from 'next/link'
import { Code2, Home, ArrowLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function NotFound() {
  const t = useTranslations('NotFound')
  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-950 transition-colors overflow-hidden flex items-center justify-center">
      {/* Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:72px_72px]" />
      
      {/* Gradient Orbs */}
      <div className="fixed top-0 -left-48 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="fixed bottom-0 -right-48 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-2 group mb-8">
            <div className="relative">
              <Code2 className="text-green-500 group-hover:text-green-400 transition-colors" size={32} />
              <div className="absolute inset-0 bg-green-500/20 blur-xl group-hover:bg-green-400/30 transition-all" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Ekushey Coding
            </span>
          </Link>

          {/* 404 Display */}
          <div className="mb-8">
            <h1 className="text-9xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-4">
              {t('title')}
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('heading')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              {t('description')}
            </p>
          </div>

          {/* Terminal-style Error Box */}
          <div className="bg-white/80 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-300 dark:border-gray-800 rounded-lg p-6 font-mono text-left mb-8 transition-colors">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-xs text-gray-400 dark:text-gray-500 ml-2">{t('errorTitle')}</span>
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-300">
              <div className="text-red-400">{t('errorMessage')}</div>
              <div className="text-gray-500 dark:text-gray-400 mt-2">
                {t('errorDetail')}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="group px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Home size={18} />
              {t('homeButton')}
            </Link>
            <button
              onClick={() => globalThis.history.back()}
              className="px-6 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} />
              {t('backButton')}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-green-500"></div>
    </div>
  )
}
