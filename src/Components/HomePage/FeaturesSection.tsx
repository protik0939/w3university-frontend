'use client'
import React from 'react'
import { useTranslations } from 'next-intl'
import { Code2, Globe, BookOpen, Clock, Zap, Award } from 'lucide-react'

const iconMap: Record<string, React.ElementType> = {
  'feature1': Code2,
  'feature2': Globe,
  'feature3': BookOpen,
  'feature4': Clock,
  'feature5': Zap,
  'feature6': Award,
}

export default function FeaturesSection() {
  const t = useTranslations('HomePage.features')

  const features = [
    { key: 'feature1', icon: iconMap.feature1 },
    { key: 'feature2', icon: iconMap.feature2 },
    { key: 'feature3', icon: iconMap.feature3 },
    { key: 'feature4', icon: iconMap.feature4 },
    { key: 'feature5', icon: iconMap.feature5 },
    { key: 'feature6', icon: iconMap.feature6 },
  ]

  return (
    <section className="py-16 md:py-20 bg-white dark:bg-gray-950 transition-colors">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="max-w-6xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900 dark:text-white transition-colors">
            {t("title")}
          </h2>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 transition-colors">
            {t("subtitle")}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {features.map(({ key, icon: Icon }) => (
            <div
              key={key}
              className="group relative bg-gray-100 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:border-green-500/50 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
                <Icon className="text-green-400" size={20} />
              </div>

              {/* Content */}
              <h3 className="text-base font-semibold mb-2 text-gray-900 dark:text-white transition-colors">
                {t(`${key}.title`)}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed transition-colors">
                {t(`${key}.description`)}
              </p>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-lg transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
