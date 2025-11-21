'use client'
import React from 'react'
import { useTranslations } from 'next-intl'
import { ChevronRight, Code } from 'lucide-react'

interface CourseCardProps {
  title: string
  description: string
  lessons: string
  bgColor: string
  textColor: string
}

function CourseCard({ title, description, lessons, bgColor, textColor }: CourseCardProps) {
  return (
    <div className="group relative bg-gray-100 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:border-green-500/50 transition-all duration-300 cursor-pointer">
      {/* Tag */}
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md mb-4 ${bgColor}`}>
        <Code size={14} className={textColor} />
        <span className={`text-xs font-semibold ${textColor}`}>{title}</span>
      </div>
      
      {/* Content */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 transition-colors">{description}</p>
      
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500 dark:text-gray-500 transition-colors">{lessons}</span>
        <button className="flex items-center gap-1 text-xs text-green-400 group-hover:gap-2 transition-all">
          Start
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-lg transition-opacity" />
    </div>
  )
}

export default function CoursesSection() {
  const t = useTranslations('HomePage.courses')

  const courses = [
    { key: 'html', textColor: 'text-orange-400', bgColor: 'bg-orange-500/10' },
    { key: 'css', textColor: 'text-blue-400', bgColor: 'bg-blue-500/10' },
    { key: 'javascript', textColor: 'text-yellow-400', bgColor: 'bg-yellow-500/10' },
    { key: 'python', textColor: 'text-green-400', bgColor: 'bg-green-500/10' },
    { key: 'react', textColor: 'text-cyan-400', bgColor: 'bg-cyan-500/10' },
    { key: 'nodejs', textColor: 'text-emerald-400', bgColor: 'bg-emerald-500/10' },
  ]

  return (
    <section id="courses" className="py-16 md:py-20 bg-white dark:bg-gray-950 transition-colors">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12 max-w-6xl mx-auto">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900 dark:text-white transition-colors">
              {t("title")}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors">
              {t("subtitle")}
            </p>
          </div>
          <button className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm text-green-400 hover:text-green-300 transition-colors">
            {t("viewAll")}
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto mb-8">
          {courses.map(({ key, textColor, bgColor }) => (
            <CourseCard
              key={key}
              title={t(`${key}.title`)}
              description={t(`${key}.description`)}
              lessons={t(`${key}.lessons`)}
              textColor={textColor}
              bgColor={bgColor}
            />
          ))}
        </div>

        {/* Mobile View All */}
        <button className="sm:hidden w-full flex items-center justify-center gap-2 px-4 py-3 text-sm text-green-400 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-green-500/50 transition-all">
          {t("viewAll")}
          <ChevronRight size={16} />
        </button>
      </div>
    </section>
  )
}
