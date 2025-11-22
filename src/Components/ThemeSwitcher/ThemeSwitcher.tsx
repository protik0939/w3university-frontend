'use client'
import React, { useState, useEffect, useRef } from 'react'
import { Sun, Moon, Monitor } from 'lucide-react'
import { useTheme } from '@/lib/ThemeContext'

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const themes = [
    { value: 'light' as const, label: 'Light', icon: Sun },
    { value: 'dark' as const, label: 'Dark', icon: Moon },
    { value: 'system' as const, label: 'System', icon: Monitor },
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const currentTheme = themes.find(t => t.value === theme) || themes[1]
  const Icon = currentTheme.icon

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-300 dark:text-gray-300 hover:text-green-400 dark:hover:text-green-400 border border-gray-700 dark:border-gray-700 hover:border-green-500/50 dark:hover:border-green-500/50 rounded-lg transition-all bg-gray-900/50 dark:bg-gray-900/50"
        aria-label="Theme switcher"
      >
        <Icon size={16} />
        <span className="hidden sm:inline">{currentTheme.label}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-gray-900 dark:bg-gray-900 border border-gray-800 dark:border-gray-800 rounded-lg shadow-xl shadow-black/50 overflow-hidden z-50">
          {themes.map(({ value, label, icon: ThemeIcon }) => (
            <button
              key={value}
              onClick={() => {
                setTheme(value)
                setIsOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                theme === value
                  ? 'bg-green-500/20 text-green-400 dark:bg-green-500/20 dark:text-green-400'
                  : 'text-gray-300 dark:text-gray-300 hover:bg-gray-800 dark:hover:bg-gray-800'
              }`}
            >
              <ThemeIcon size={16} />
              <span>{label}</span>
              {theme === value && (
                <span className="ml-auto text-green-400 dark:text-green-400">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
