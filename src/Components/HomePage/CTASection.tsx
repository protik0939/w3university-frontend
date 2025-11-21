'use client'
import React from 'react'
import { useTranslations } from 'next-intl'
import { ChevronRight } from 'lucide-react'

export default function CTASection() {
  const t = useTranslations('HomePage.cta')

  return (
    <section className="py-16 md:py-20 bg-white dark:bg-gray-950 relative overflow-hidden transition-colors">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:72px_72px]" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Heading */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
            {t("title")}
          </h2>

          {/* Subtitle */}
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto transition-colors">
            {t("subtitle")}
          </p>

          {/* CTA Button */}
          <button className="group px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium text-sm hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 flex items-center gap-2 mx-auto">
            {t("button")}
            <ChevronRight className="group-hover:translate-x-1 transition-transform" size={18} />
          </button>

          {/* Additional Info */}
          <p className="mt-6 text-xs text-gray-500 dark:text-gray-500 transition-colors">
            No credit card required • Free forever
          </p>
        </div>
      </div>
    </section>
  )
}
