'use client'
import React, { useState } from 'react'
import { Award, Share2, Download, Check, Calendar, User } from 'lucide-react'

interface CertificateData {
  id: string
  studentName: string
  courseName: string
  completionDate: string
  certificateNumber: string
  issueDate: string
  grade?: string
  instructor?: string
  design: 'modern' | 'classic' | 'minimal' | 'elegant'
}

interface CertificateCardProps {
  certificate: CertificateData
}

export default function CertificateCard({ certificate }: CertificateCardProps) {
  const [isSharing, setIsSharing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleShare = async () => {
    setIsSharing(true)
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${certificate.courseName} Certificate`,
          text: `I've completed ${certificate.courseName} at W3 University! 🎓`,
          url: window.location.href
        })
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 2000)
      } else {
        // Fallback: Copy link to clipboard
        await navigator.clipboard.writeText(window.location.href)
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 2000)
      }
    } catch (error) {
      console.log('Share cancelled or failed')
    } finally {
      setIsSharing(false)
    }
  }

  const handleDownload = () => {
    // In real app, this would generate and download a PDF
    console.log('Downloading certificate:', certificate.id)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
  }

  const renderCertificate = () => {
    switch (certificate.design) {
      case 'modern':
        return <ModernCertificate certificate={certificate} />
      case 'classic':
        return <ClassicCertificate certificate={certificate} />
      case 'minimal':
        return <MinimalCertificate certificate={certificate} />
      case 'elegant':
        return <ElegantCertificate certificate={certificate} />
      default:
        return <ModernCertificate certificate={certificate} />
    }
  }

  return (
    <div className="group relative">
      {/* Certificate Design */}
      <div className="relative bg-white dark:bg-gray-900 rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300">
        {renderCertificate()}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 mt-4">
        <button
          onClick={handleShare}
          disabled={isSharing}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium text-sm hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 disabled:opacity-50"
        >
          {showSuccess ? (
            <>
              <Check size={18} />
              <span>Done!</span>
            </>
          ) : (
            <>
              <Share2 size={18} />
              <span>Share</span>
            </>
          )}
        </button>
        <button
          onClick={handleDownload}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium text-sm hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300"
        >
          <Download size={18} />
          <span className="hidden sm:inline">Download</span>
        </button>
      </div>
    </div>
  )
}

// Modern Certificate Design
function ModernCertificate({ certificate }: { certificate: CertificateData }) {
  return (
    <div className="relative aspect-[1.414/1] p-8 md:p-12 bg-gradient-to-br from-gray-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-900 dark:to-green-950">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-green-500/20 to-transparent rounded-br-full" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-emerald-500/20 to-transparent rounded-tl-full" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-between text-center z-10">
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-full border border-green-500/20">
            <Award className="text-green-500" size={16} />
            <span className="text-xs font-mono text-green-500">CERTIFICATE</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">W3 UNIVERSITY</h1>
        </div>

        {/* Main Content */}
        <div className="space-y-4 max-w-md">
          <p className="text-sm text-gray-600 dark:text-gray-400">This certifies that</p>
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            {certificate.studentName}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">has successfully completed</p>
          <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
            {certificate.courseName}
          </h3>
          {certificate.grade && (
            <div className="inline-block px-4 py-1.5 bg-green-500/10 rounded-full border border-green-500/20">
              <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                Grade: {certificate.grade}
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="w-full space-y-3">
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
            <span>Date: {certificate.completionDate}</span>
            <span>ID: {certificate.certificateNumber}</span>
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />
          <div className="flex items-center justify-center gap-2">
            <div className="w-12 h-px bg-green-500" />
            <span className="text-xs font-mono text-green-500">VERIFIED</span>
            <div className="w-12 h-px bg-green-500" />
          </div>
        </div>
      </div>
    </div>
  )
}

// Classic Certificate Design
function ClassicCertificate({ certificate }: { certificate: CertificateData }) {
  return (
    <div className="relative aspect-[1.414/1] p-8 md:p-12 bg-gradient-to-br from-amber-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Ornate Border */}
      <div className="absolute inset-4 border-4 border-double border-amber-600 dark:border-amber-500 rounded-lg" />
      <div className="absolute inset-6 border border-amber-400 dark:border-amber-600 rounded-lg" />

      {/* Corner Decorations */}
      <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-amber-600 dark:border-amber-500" />
      <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-amber-600 dark:border-amber-500" />
      <div className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-amber-600 dark:border-amber-500" />
      <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-amber-600 dark:border-amber-500" />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-between text-center z-10 py-8">
        {/* Header */}
        <div className="space-y-2">
          <Award className="text-amber-600 dark:text-amber-500 mx-auto" size={40} />
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-amber-900 dark:text-amber-400">
            Certificate of Achievement
          </h1>
          <div className="w-24 h-px bg-amber-600 dark:bg-amber-500 mx-auto" />
        </div>

        {/* Main Content */}
        <div className="space-y-6 max-w-md">
          <p className="text-sm font-serif italic text-gray-700 dark:text-gray-400">This is to certify that</p>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 dark:text-white border-b-2 border-amber-600 dark:border-amber-500 pb-2">
            {certificate.studentName}
          </h2>
          <p className="text-sm font-serif italic text-gray-700 dark:text-gray-400">has successfully completed the course</p>
          <h3 className="text-xl md:text-2xl font-serif font-semibold text-amber-900 dark:text-amber-400">
            {certificate.courseName}
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-500">
            with distinction on {certificate.completionDate}
          </p>
        </div>

        {/* Footer */}
        <div className="space-y-2">
          <div className="flex items-center gap-8">
            <div className="text-center">
              <div className="w-24 h-px bg-gray-900 dark:bg-gray-400 mb-1" />
              <p className="text-xs text-gray-600 dark:text-gray-400">Director</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-px bg-gray-900 dark:bg-gray-400 mb-1" />
              <p className="text-xs text-gray-600 dark:text-gray-400">Instructor</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-500 font-mono">ID: {certificate.certificateNumber}</p>
        </div>
      </div>
    </div>
  )
}

// Minimal Certificate Design
function MinimalCertificate({ certificate }: { certificate: CertificateData }) {
  return (
    <div className="relative aspect-[1.414/1] p-8 md:p-12 bg-white dark:bg-gray-950">
      {/* Simple Border */}
      <div className="absolute inset-8 border border-gray-200 dark:border-gray-800" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-between z-10 py-12">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-xs font-mono uppercase tracking-widest text-gray-400">Certificate</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            W3 University
          </h1>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-500">Student</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {certificate.studentName}
            </h2>
          </div>
          
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-500">Course Completed</p>
            <h3 className="text-xl md:text-2xl font-semibold text-green-600 dark:text-green-400">
              {certificate.courseName}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-400">
                <Calendar size={14} />
                <p className="text-xs uppercase tracking-wider">Completion Date</p>
              </div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{certificate.completionDate}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-400">
                <Award size={14} />
                <p className="text-xs uppercase tracking-wider">Certificate ID</p>
              </div>
              <p className="text-sm font-mono font-medium text-gray-700 dark:text-gray-300">{certificate.certificateNumber}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-gray-500 dark:text-gray-500 font-mono">VERIFIED</span>
          </div>
          <span className="text-xs text-gray-400">ekusheycoding.com</span>
        </div>
      </div>
    </div>
  )
}

// Elegant Certificate Design
function ElegantCertificate({ certificate }: { certificate: CertificateData }) {
  return (
    <div className="relative aspect-[1.414/1] p-8 md:p-12 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950">
      {/* Elegant Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="elegant-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#elegant-pattern)" />
        </svg>
      </div>

      {/* Decorative Frame */}
      <div className="absolute inset-6 border-2 border-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg opacity-30" />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-between text-center z-10 py-6">
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg">
            <Award className="text-white" size={32} />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Certificate of Excellence
          </h1>
          <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400">W3 University</p>
        </div>

        {/* Main Content */}
        <div className="space-y-6 max-w-md">
          <div className="space-y-2">
            <p className="text-sm font-light text-gray-600 dark:text-gray-400">This certificate is proudly presented to</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {certificate.studentName}
            </h2>
          </div>

          <div className="py-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent mx-auto mb-4" />
            <p className="text-sm text-gray-600 dark:text-gray-400">for the successful completion of</p>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mt-2">
              {certificate.courseName}
            </h3>
          </div>

          {certificate.grade && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full border border-purple-500/20">
              <Award className="text-purple-500" size={16} />
              <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                {certificate.grade}
              </span>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="space-y-3">
          <div className="flex items-center gap-8 text-sm">
            <div className="text-center">
              <p className="font-medium text-gray-700 dark:text-gray-300">{certificate.completionDate}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500">Date</p>
            </div>
            <div className="w-px h-8 bg-gray-300 dark:bg-gray-700" />
            <div className="text-center">
              <p className="font-mono text-xs text-gray-700 dark:text-gray-300">{certificate.certificateNumber}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500">Certificate ID</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
