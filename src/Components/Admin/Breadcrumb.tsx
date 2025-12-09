'use client'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm mb-6">
      <Link 
        href="/admin/dashboard" 
        className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors"
      >
        <Home size={16} />
        <span>Dashboard</span>
      </Link>
      
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        
        return (
          <div key={index} className="flex items-center gap-2">
            <ChevronRight size={16} className="text-gray-400 dark:text-gray-600" />
            {item.href && !isLast ? (
              <Link 
                href={item.href}
                className="text-gray-600 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className={isLast 
                ? "font-semibold text-gray-900 dark:text-white" 
                : "text-gray-600 dark:text-gray-400"
              }>
                {item.label}
              </span>
            )}
          </div>
        )
      })}
    </nav>
  )
}
