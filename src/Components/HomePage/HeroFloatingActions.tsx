'use client'
import React, { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Globe } from 'lucide-react'
import { useParams } from 'next/navigation'

export default function HeroFloatingActions() {
  const [isVisible, setIsVisible] = useState(true)
  const t = useTranslations('Navbar')
  const params = useParams()
  const currentLocale = params.locale as string

  useEffect(() => {
    const handleScroll = () => {
      // Hide when scrolling past 80% of hero section (navbar appears)
      setIsVisible(window.scrollY <= window.innerHeight * 0.8)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const switchLocale = () => {
    const newLocale = currentLocale === 'en' ? 'bn' : 'en'
    window.location.href = `/${newLocale}`
  }

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-end h-16 gap-3">
          {/* Language Switcher */}
          <button
            onClick={switchLocale}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:text-green-400 bg-white/80 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 hover:border-green-500/50 rounded-lg transition-all"
          >
            <Globe size={16} />
            <span className="hidden sm:inline">{currentLocale === 'en' ? 'বাংলা' : 'English'}</span>
          </button>

          {/* Get Started Button */}
          <button className="px-4 py-1.5 text-sm bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg transition-all font-medium shadow-lg shadow-green-500/20">
            {t('getStarted')}
          </button>
        </div>
      </div>
    </div>
  )
}
