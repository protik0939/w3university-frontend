'use client'
import React, { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Terminal, ChevronRight } from 'lucide-react'

export default function HeroSection() {
  const t = useTranslations('HomePage.hero')
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  
  const texts = t.raw('typing_texts') as string[]

  useEffect(() => {
    const currentText = texts[currentTextIndex]
    const typingSpeed = isDeleting ? 30 : 50

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentText.length) {
          setDisplayedText(currentText.slice(0, displayedText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 1500)
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setCurrentTextIndex((currentTextIndex + 1) % texts.length)
        }
      }
    }, typingSpeed)

    return () => clearTimeout(timer)
  }, [displayedText, isDeleting, currentTextIndex, texts])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-950 transition-colors">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:72px_72px]" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-green-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
      
      {/* Code-style decorative elements */}
      <div className="absolute top-20 left-10 text-green-500/10 font-mono text-sm hidden lg:block">
        <pre>{'{'}<br />{'  "status": "learning",'}<br />{'  "progress": "∞"'}<br />{'}'}</pre>
      </div>
      <div className="absolute bottom-20 right-10 text-emerald-500/10 font-mono text-sm hidden lg:block">
        <pre>{'<code>'}<br />{'  <learn />'}<br />{'  <build />'}<br />{'</code>'}</pre>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-20 z-10">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Terminal-style badge */}
          <div className="flex items-center gap-2 text-green-400 mb-4">
            <Terminal size={16} />
            <span className="text-xs font-mono uppercase tracking-wider">Easy Code Learning Platform</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white leading-tight transition-colors">
              {t("title")}
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl transition-colors">
              {t("description")}
            </p>
          </div>

          {/* Terminal-style Typing Animation */}
          <div className="bg-white/80 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-300 dark:border-gray-800 rounded-lg p-6 font-mono transition-colors">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-xs text-gray-400 dark:text-gray-500 ml-2 transition-colors">terminal</span>
            </div>
            <div className="text-sm md:text-base">
              <span className="text-green-400">$</span>
              <span className="text-gray-700 dark:text-gray-300 ml-2 transition-colors">npm run learn</span>
              <span className="text-green-400 ml-2">--course=</span>
              <span className="text-emerald-400">"{displayedText}"</span>
              <span className="animate-pulse text-green-400">_</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button className="group px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium text-sm hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 flex items-center justify-center gap-2">
              {t("cta_primary")}
              <ChevronRight className="group-hover:translate-x-1 transition-transform" size={18} />
            </button>
            <button className="px-6 py-3 bg-gray-200 dark:bg-gray-800/50 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium text-sm hover:bg-gray-300 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300">
              {t("cta_secondary")}
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 pt-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-gray-600 dark:text-gray-400 transition-colors">10M+ learners</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-gray-600 dark:text-gray-400 transition-colors">100+ courses</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-gray-600 dark:text-gray-400 transition-colors">Free forever</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
