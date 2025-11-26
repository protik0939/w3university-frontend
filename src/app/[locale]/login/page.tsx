'use client'
import React, { useState } from 'react'
import { Mail, Lock, Eye, EyeOff, ChevronRight, Terminal } from 'lucide-react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function LoginPage() {
  const t = useTranslations('Login')
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [isLoading, setIsLoading] = useState(false)

  const params = useParams()
  const currentLocale = params.locale as string || 'en'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Add your login logic here
    setTimeout(() => {
      setIsLoading(false)
      console.log('Login attempt:', formData)
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-950 transition-colors overflow-hidden">
      {/* Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:72px_72px]" />
      
      {/* Gradient Orbs */}
      <div className="fixed top-0 -left-48 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="fixed bottom-0 -right-48 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
      
      {/* Code-style decorative elements */}
      <div className="fixed top-20 left-10 text-green-500/10 font-mono text-sm hidden lg:block">
        <pre>{'{'}<br />{'  "user": "returning",'}<br />{'  "status": "login"'}<br />{'}'}</pre>
      </div>
      <div className="fixed bottom-20 right-10 text-emerald-500/10 font-mono text-sm hidden lg:block">
        <pre>{'<code>'}<br />{'  <authenticate />'}<br />{'  <continue />'}<br />{'</code>'}</pre>
      </div>

      {/* Top Navigation */}
      <div className="relative z-10 container mx-auto px-4 py-6"/>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 lg:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left Side - Info Section */}
            <div className="space-y-6 order-2 lg:order-1">
              {/* Terminal-style badge */}
              <div className="flex items-center gap-2 text-green-400">
                <Terminal size={16} />
                <span className="text-xs font-mono uppercase tracking-wider">{t('badge')}</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight transition-colors">
                  {t('title')} <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">{t('titleHighlight')}</span>
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 transition-colors">
                  {t('subtitle')}
                </p>
              </div>

              {/* Terminal-style Info Box */}
              <div className="bg-white/80 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-300 dark:border-gray-800 rounded-lg p-6 font-mono transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-xs text-gray-400 dark:text-gray-500 ml-2">{t('progressTitle')}</span>
                </div>
                <div className="text-sm space-y-1 text-gray-700 dark:text-gray-300">
                  <div><span className="text-green-400">✓</span> {t('benefit1')} <span className="text-emerald-400">{t('benefit1Highlight')}</span></div>
                  <div><span className="text-green-400">✓</span> {t('benefit2')} <span className="text-emerald-400">{t('benefit2Highlight')}</span></div>
                  <div><span className="text-green-400">✓</span> {t('benefit3')} <span className="text-emerald-400">{t('benefit3Highlight')}</span></div>
                  <div><span className="text-green-400">✓</span> {t('benefit4')} <span className="text-emerald-400">{t('benefit4Highlight')}</span></div>
                  <div><span className="text-green-400">✓</span> {t('benefit5')} <span className="text-emerald-400">{t('benefit5Highlight')}</span> {t('benefit5Text')}</div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 pt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-gray-600 dark:text-gray-400">{t('secureLogin')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-gray-600 dark:text-gray-400">{t('access247')}</span>
                </div>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="order-1 lg:order-2">
              <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl p-6 md:p-8 transition-colors">
                
                {/* Form Header */}
                <div className="text-center mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {t('formTitle')}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t('noAccount')}{' '}
                    <Link 
                      href={`/${currentLocale}/signup`}
                      className="text-green-500 hover:text-green-400 font-medium transition-colors"
                    >
                      {t('createOne')}
                    </Link>
                  </p>
                </div>

                {/* Social Login Buttons */}
                <div className="space-y-3 mb-6">
                  <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all group">
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span className="font-medium text-gray-700 dark:text-gray-300">{t('githubButton')}</span>
                  </button>
                  <button className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all group">
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="font-medium text-gray-700 dark:text-gray-300">{t('googleButton')}</span>
                  </button>
                </div>

                {/* Divider */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white dark:bg-gray-900 px-2 text-gray-500 dark:text-gray-400">
                      {t('divider')}
                    </span>
                  </div>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('emailLabel')}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder={t('emailPlaceholder')}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder-gray-500"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('passwordLabel')}
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder={t('passwordPlaceholder')}
                        className="w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder-gray-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me and Forgot Password */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="rememberMe"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                        className="w-4 h-4 rounded border-gray-300 text-green-500 focus:ring-green-500"
                      />
                      <label htmlFor="rememberMe" className="text-sm text-gray-600 dark:text-gray-400">
                        {t('rememberMe')}
                      </label>
                    </div>
                    <button type="button" className="text-sm text-green-500 hover:text-green-400 transition-colors">
                      {t('forgotPassword')}
                    </button>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full group px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        {t('signingIn')}
                      </>
                    ) : (
                      <>
                        {t('signInButton')}
                        <ChevronRight className="group-hover:translate-x-1 transition-transform" size={18} />
                      </>
                    )}
                  </button>
                </form>

                {/* Additional Info */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                  <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                    By signing in, you agree to our{' '}
                    <button type="button" className="text-green-500 hover:text-green-400 transition-colors">
                      Terms of Service
                    </button>{' '}
                    and{' '}
                    <button type="button" className="text-green-500 hover:text-green-400 transition-colors">
                      Privacy Policy
                    </button>
                  </p>
                </div>
              </div>

              {/* Quick Access Card */}
              <div className="mt-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Terminal className="text-green-400" size={16} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                      New to Ekushey Coding?
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                      Create a free account to start learning today!
                    </p>
                    <Link 
                      href={`/${currentLocale}/signup`}
                      className="inline-flex items-center gap-1 text-xs text-green-500 hover:text-green-400 font-medium transition-colors"
                    >
                      Sign up now
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-green-500"></div>
    </div>
  )
}
