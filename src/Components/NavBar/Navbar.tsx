'use client'
import React, { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Code2, Menu, X, Globe, BookOpen, Trophy, Users, User, LogOut } from 'lucide-react'
import { useParams } from 'next/navigation'
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher'
import Link from 'next/link'
import Image from 'next/image'

interface UserSession {
  id: number
  email: string
  name: string
  isLoggedIn: boolean
  loginTime: string
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [userSession, setUserSession] = useState<UserSession | null>(null)
  const [mounted, setMounted] = useState(false)
  const t = useTranslations('Navbar')
  const params = useParams()
  const currentLocale = params.locale as string

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      // Show background after scrolling down a bit
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = () => {
      const session = localStorage.getItem('userSession')
      const token = localStorage.getItem('authToken')
      
      if (session && token) {
        try {
          const parsedSession: UserSession = JSON.parse(session)
          if (parsedSession.isLoggedIn) {
            setUserSession(parsedSession)
          }
        } catch (error) {
          console.error('Error parsing user session:', error)
        }
      }
    }

    checkAuth()
    
    // Listen for storage changes (for cross-tab sync)
    window.addEventListener('storage', checkAuth)
    return () => window.removeEventListener('storage', checkAuth)
  }, [])

  const handleLogout = async () => {
    const authToken = localStorage.getItem('authToken')
    
    try {
      await fetch('https://backend-w3university.vercel.app/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        credentials: 'include'
      })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('userSession')
      localStorage.removeItem('authToken')
      setUserSession(null)
      window.location.href = `/${currentLocale}/login`
    }
  }
  
  const navLinks = [
    { key: 'tutorials', icon: BookOpen, href: `/${currentLocale}/tutorial` },
    { key: 'exercises', icon: Code2, href: `/${currentLocale}/exercises` },
    { key: 'blog', icon: BookOpen, href: `/${currentLocale}/blog` },
    { key: 'certificates', icon: Trophy, href: `/${currentLocale}/certificates` },
    { key: 'profile', icon: Users, href: `/${currentLocale}/profile` },
  ]

  const switchLocale = () => {
    const newLocale = currentLocale === 'en' ? 'bn' : 'en'
    window.location.href = `/${newLocale}`
  }

  return (
    <>
      {/* Navbar - Always visible, background appears on scroll */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
        {/* Glass background - fades in on scroll */}
        <div className={`absolute inset-0 backdrop-blur-xl border-b transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 dark:bg-gray-900/95 border-gray-200 dark:border-gray-800 opacity-100'
            : 'bg-transparent border-transparent opacity-0'
        }`} />
        
        <div className="relative container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href={`/${currentLocale}`} className="flex items-center gap-3 group">
              <div className="relative w-10 h-10">
                <Image
                  height={40}
                  width={40} 
                  src="/assets/icons/icon.svg" 
                  alt="Ekushey Coding Logo" 
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Ekushey Coding
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(({ key, icon: Icon, href }) => (
                <Link
                  key={key}
                  href={href}
                  className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-green-400 dark:hover:text-green-400 transition-colors group"
                >
                  <Icon size={16} className="group-hover:scale-110 transition-transform" />
                  <span>{t(key)}</span>
                </Link>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Theme Switcher */}
              <ThemeSwitcher />
              
              {/* Language Switcher */}
              <button
                onClick={switchLocale}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:text-green-400 dark:hover:text-green-400 border border-gray-300 dark:border-gray-700 hover:border-green-500/50 dark:hover:border-green-500/50 rounded-lg transition-all bg-white dark:bg-gray-900/50"
              >
                <Globe size={16} />
                <span className="hidden sm:inline">{currentLocale === 'en' ? 'বাংলা' : 'English'}</span>
              </button>

              {/* User Menu or Login Button */}
              {mounted && userSession ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:text-green-400 dark:hover:text-green-400 border border-gray-300 dark:border-gray-700 hover:border-green-500/50 dark:hover:border-green-500/50 rounded-lg transition-all bg-white dark:bg-gray-900/50"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 flex items-center justify-center text-white text-xs font-bold">
                      {userSession.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden sm:inline">{userSession.name}</span>
                  </button>
                  
                  {/* User Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg py-2 z-50">
                      <Link
                        href={`/${currentLocale}/profile`}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User size={16} />
                        <span>Profile</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : mounted ? (
                <Link
                  href={`/${currentLocale}/login`}
                  className="hidden sm:block px-4 py-1.5 text-sm bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg transition-all font-medium shadow-lg shadow-green-500/20"
                >
                  {t('getStarted')}
                </Link>
              ) : (
                <div className="hidden sm:block w-20 h-9" /> // Placeholder to prevent layout shift
              )}

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
            {mounted && userSession && (
              <div className="pb-3 mb-3 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 flex items-center justify-center text-white font-bold">
                    {userSession.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-medium">{userSession.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{userSession.email}</div>
                  </div>
                </div>
              </div>
            )}
            {navLinks.map(({ key, icon: Icon, href }) => (
              <Link
                key={key}
                href={href}
                className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-green-400 dark:hover:text-green-400 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Icon size={20} />
                <span>{t(key)}</span>
              </Link>
            ))}
            {mounted && (userSession ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full mt-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            ) : (
              <Link
                href={`/${currentLocale}/login`}
                className="block w-full mt-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('getStarted')}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  )
}
