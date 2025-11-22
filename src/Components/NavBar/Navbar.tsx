'use client'
import React, { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Code2, Menu, X, Globe, BookOpen, Trophy, Users } from 'lucide-react'
import { useParams } from 'next/navigation'
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const t = useTranslations('Navbar')
  const params = useParams()
  const currentLocale = params.locale as string

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar after scrolling past hero section (80vh)
      setIsScrolled(window.scrollY > window.innerHeight * 0.8)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { key: 'tutorials', icon: BookOpen, href: '#courses' },
    { key: 'exercises', icon: Code2, href: '#exercises' },
    { key: 'blog', icon: BookOpen, href: `/${currentLocale}/blog` },
    { key: 'certificates', icon: Trophy, href: '#certificates' },
    { key: 'community', icon: Users, href: '#community' },
  ]

  const switchLocale = () => {
    const newLocale = currentLocale === 'en' ? 'bn' : 'en'
    window.location.href = `/${newLocale}`
  }

  return (
    <>
      {/* Navbar - Hidden initially, appears on scroll */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'translate-y-0 opacity-100'
            : '-translate-y-full opacity-0'
        }`}
      >
        {/* Glass background */}
        <div className="absolute inset-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 transition-colors" />
        
        <div className="relative container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href={`/${currentLocale}`} className="flex items-center gap-2 group">
              <div className="relative">
                <Code2 className="text-green-500 group-hover:text-green-400 transition-colors" size={28} />
                <div className="absolute inset-0 bg-green-500/20 blur-xl group-hover:bg-green-400/30 transition-all" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                W3University
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(({ key, icon: Icon, href }) => (
                <a
                  key={key}
                  href={href}
                  className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-green-400 dark:hover:text-green-400 transition-colors group"
                >
                  <Icon size={16} className="group-hover:scale-110 transition-transform" />
                  <span>{t(key)}</span>
                </a>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Theme Switcher */}
              <ThemeSwitcher />
              
              {/* Language Switcher */}
              <button
                onClick={switchLocale}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-300 dark:text-gray-300 hover:text-green-400 dark:hover:text-green-400 border border-gray-700 dark:border-gray-700 hover:border-green-500/50 dark:hover:border-green-500/50 rounded-lg transition-all"
              >
                <Globe size={16} />
                <span className="hidden sm:inline">{currentLocale === 'en' ? 'বাংলা' : 'English'}</span>
              </button>

              {/* Get Started Button */}
              <button className="hidden sm:block px-4 py-1.5 text-sm bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg transition-all font-medium shadow-lg shadow-green-500/20">
                {t('getStarted')}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-gray-700 dark:text-gray-300 hover:text-green-400 dark:hover:text-green-400 transition-colors"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-16 left-0 right-0 bg-white/98 dark:bg-gray-900/98 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="container mx-auto px-4 py-4 space-y-3">
            {navLinks.map(({ key, icon: Icon, href }) => (
              <a
                key={key}
                href={href}
                className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-green-400 dark:hover:text-green-400 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon size={20} />
                <span>{t(key)}</span>
              </a>
            ))}
            <button className="w-full mt-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium">
              {t('getStarted')}
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}
