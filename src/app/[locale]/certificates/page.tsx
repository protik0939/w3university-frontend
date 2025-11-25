'use client'
import React, { useState } from 'react'
import CertificateCard from '@/Components/Certificates/CertificateCard'
import { certificatesData } from '@/data/certificatesData'
import { Award, Filter, Grid3x3, LayoutList } from 'lucide-react'

export default function CertificatesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filterDesign, setFilterDesign] = useState<string>('all')

  const filteredCertificates = filterDesign === 'all' 
    ? certificatesData 
    : certificatesData.filter(cert => cert.design === filterDesign)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      {/* Header Section */}
      <section className="relative bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        {/* Gradient Orbs */}
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="flex items-center gap-2 text-green-400 mb-4">
              <Award size={20} />
              <span className="text-sm font-mono uppercase tracking-wider">Your Achievements</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
              My Certificates
            </h1>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 transition-colors">
              View and share your course completion certificates. Download or share your achievements with your network.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mt-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-gray-600 dark:text-gray-400 transition-colors">
                  {certificatesData.length} Certificates Earned
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-gray-600 dark:text-gray-400 transition-colors">
                  All Verified
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Controls Section */}
      <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 transition-colors">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Filter */}
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-gray-400" />
              <select
                value={filterDesign}
                onChange={(e) => setFilterDesign(e.target.value)}
                className="px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
              >
                <option value="all">All Designs</option>
                <option value="modern">Modern</option>
                <option value="classic">Classic</option>
                <option value="minimal">Minimal</option>
                <option value="elegant">Elegant</option>
              </select>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {filteredCertificates.length} certificate{filteredCertificates.length !== 1 ? 's' : ''}
              </span>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1 transition-colors">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <Grid3x3 size={16} />
                <span className="hidden sm:inline">Grid</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <LayoutList size={16} />
                <span className="hidden sm:inline">List</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Certificates Grid/List */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        {filteredCertificates.length === 0 ? (
          <div className="text-center py-16">
            <Award className="mx-auto text-gray-300 dark:text-gray-700 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No certificates found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your filters
            </p>
          </div>
        ) : (
          <div
            className={`grid gap-6 md:gap-8 ${
              viewMode === 'grid'
                ? 'grid-cols-1 lg:grid-cols-2'
                : 'grid-cols-1 max-w-4xl mx-auto'
            }`}
          >
            {filteredCertificates.map((certificate) => (
              <CertificateCard key={certificate.id} certificate={certificate} />
            ))}
          </div>
        )}
      </section>

      {/* Info Section */}
      <section className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              About Your Certificates
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>
                All certificates are digitally verified and can be shared with employers, educational institutions, 
                or on professional networks like LinkedIn.
              </p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Each certificate has a unique verification ID</li>
                <li>Certificates can be downloaded as high-quality PDFs</li>
                <li>Share directly using your device&apos;s native share functionality</li>
                <li>All achievements are permanently stored in your profile</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
