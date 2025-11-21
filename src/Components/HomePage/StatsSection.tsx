'use client'
import React from 'react'
import { useTranslations } from 'next-intl'
import { Users, BookOpen, Globe, Zap } from 'lucide-react'

export default function StatsSection() {
  const t = useTranslations('HomePage.stats')

  const stats = [
    { icon: Users, value: t("students"), label: t("studentsLabel") },
    { icon: BookOpen, value: t("courses"), label: t("coursesLabel") },
    { icon: Globe, value: t("languages"), label: t("languagesLabel") },
    { icon: Zap, value: t("hours"), label: t("hoursLabel") },
  ]

  return (
    <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-900/50 transition-colors">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-6xl mx-auto">
          {stats.map(({ icon: Icon, value, label }, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <Icon className="text-green-400 mb-3" size={24} />
              <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1 transition-colors">{value}</div>
              <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 transition-colors">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
