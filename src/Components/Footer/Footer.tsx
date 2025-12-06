'use client'
import React from 'react'
import { useTranslations } from 'next-intl'
import { Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react'
import { useParams } from 'next/navigation'
import Image from 'next/image'

export default function Footer() {
  const t = useTranslations('Footer')
  const params = useParams()
  const currentLocale = params.locale as string

  const quickLinks = [
    { label: t('tutorials'), href: '#tutorials' },
    { label: t('exercises'), href: '#exercises' },
    { label: t('certificates'), href: '#certificates' },
    { label: t('blog'), href: `/${currentLocale}/blog` },
  ]

  const resources = [
    { label: t('documentation'), href: '#docs' },
    { label: t('community'), href: '#community' },
    { label: t('support'), href: '#support' },
    { label: t('changelog'), href: '#changelog' },
  ]

  const legal = [
    { label: t('privacy'), href: '#privacy' },
    { label: t('terms'), href: '#terms' },
    { label: t('license'), href: '#license' },
    { label: t('cookies'), href: '#cookies' },
  ]

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:contact@ekusheycoding.com', label: 'Email' },
  ]

  return (
    <footer className="relative bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 transition-colors">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="relative container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <a href={`/${currentLocale}`} className="flex items-center gap-3 group mb-4">
              <div className="relative w-12 h-12">
                <Image
                  height={48}
                  width={48}
                  src="/assets/icons/icon.svg" 
                  alt="Ekushey Coding Logo" 
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Ekushey Coding
              </span>
            </a>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 max-w-xs transition-colors">
              {t('description')}
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-100 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-lg text-gray-600 dark:text-gray-400 hover:text-green-400 hover:border-green-500/50 transition-all"
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4 text-sm transition-colors">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-green-400 transition-colors inline-flex items-center gap-1 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-green-400 transition-all" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4 text-sm transition-colors">{t('resources')}</h3>
            <ul className="space-y-2">
              {resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-green-400 transition-colors inline-flex items-center gap-1 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-green-400 transition-all" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4 text-sm transition-colors">{t('legal')}</h3>
            <ul className="space-y-2">
              {legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-green-400 transition-colors inline-flex items-center gap-1 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-green-400 transition-all" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 transition-colors">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1 transition-colors">
              {t('copyright')}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1 transition-colors">
              {t('madeWith')} <Heart size={14} className="text-red-500 fill-red-500" /> {t('byDevelopers')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
