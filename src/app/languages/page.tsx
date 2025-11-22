'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import languagesData from '@/data/languages.json';
import { Terminal, ChevronRight, Sparkles, Rocket, Globe } from 'lucide-react';

interface Language {
  id: string;
  name: string;
  shortDescription: string;
  image: string;
}

export default function LanguagesPage() {
  const router = useRouter();
  const languages: Language[] = languagesData;

  // Color themes matching homepage style
  const colorThemes = [
    { bg: 'bg-yellow-500/10', text: 'text-yellow-400', glow: 'group-hover:shadow-yellow-500/20' },
    { bg: 'bg-blue-500/10', text: 'text-blue-400', glow: 'group-hover:shadow-blue-500/20' },
    { bg: 'bg-orange-500/10', text: 'text-orange-400', glow: 'group-hover:shadow-orange-500/20' },
    { bg: 'bg-green-500/10', text: 'text-green-400', glow: 'group-hover:shadow-green-500/20' },
    { bg: 'bg-purple-500/10', text: 'text-purple-400', glow: 'group-hover:shadow-purple-500/20' },
    { bg: 'bg-cyan-500/10', text: 'text-cyan-400', glow: 'group-hover:shadow-cyan-500/20' },
    { bg: 'bg-indigo-500/10', text: 'text-indigo-400', glow: 'group-hover:shadow-indigo-500/20' },
    { bg: 'bg-pink-500/10', text: 'text-pink-400', glow: 'group-hover:shadow-pink-500/20' },
    { bg: 'bg-teal-500/10', text: 'text-teal-400', glow: 'group-hover:shadow-teal-500/20' },
    { bg: 'bg-red-500/10', text: 'text-red-400', glow: 'group-hover:shadow-red-500/20' },
    { bg: 'bg-amber-500/10', text: 'text-amber-400', glow: 'group-hover:shadow-amber-500/20' },
    { bg: 'bg-violet-500/10', text: 'text-violet-400', glow: 'group-hover:shadow-violet-500/20' },
  ];

  const handleLanguageClick = (languageId: string) => {
    router.push(`/language_page?lang=${languageId}`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      {/* Hero Section with Developer Theme */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-950 transition-colors">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:72px_72px]" />
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-green-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
        
        {/* Code-style decorative elements */}
        <div className="absolute top-20 left-10 text-green-500/10 font-mono text-sm hidden lg:block">
          <pre>{'const languages = ['}<br />{'  "JavaScript",'}<br />{'  "Python",'}<br />{'  "Java"...'}<br />{'];'}</pre>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-20 z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* Terminal-style badge */}
            <div className="flex items-center justify-center gap-2 text-green-400 mb-4">
              <Terminal size={16} />
              <span className="text-xs font-mono uppercase tracking-wider">Choose Your Path</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight transition-colors">
              Programming Languages
            </h1>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors">
              Master the languages that power the digital world. From web development to AI, find your perfect match.
            </p>

            {/* Terminal-style command */}
            <div className="inline-block bg-white/80 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-300 dark:border-gray-800 rounded-lg p-4 font-mono text-sm transition-colors">
              <span className="text-green-400">$</span>
              <span className="text-gray-700 dark:text-gray-300 ml-2 transition-colors">npm install knowledge</span>
              <span className="animate-pulse text-green-400">_</span>
            </div>
          </div>
        </div>
      </section>

      {/* Languages Grid */}
      <section className="py-16 md:py-20 bg-white dark:bg-gray-950 transition-colors">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 max-w-7xl mx-auto">
            {languages.map((language, index) => {
              const theme = colorThemes[index % colorThemes.length];
              return (
                <div
                  key={language.id}
                  onClick={() => handleLanguageClick(language.id)}
                  className={`group relative bg-gray-100 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:border-green-500/50 transition-all duration-300 cursor-pointer shadow-lg ${theme.glow}`}
                >
                  {/* Icon */}
                  <div className={`w-12 h-12 md:w-16 md:h-16 ${theme.bg} rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                    <span className={`text-xl md:text-2xl font-bold ${theme.text}`}>
                      {language.name.charAt(0)}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <h3 className={`text-sm md:text-base font-semibold text-gray-900 dark:text-white mb-2 text-center transition-colors`}>
                    {language.name}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 text-center line-clamp-2 transition-colors">
                    {language.shortDescription}
                  </p>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-lg transition-opacity" />
                  
                  {/* Arrow on hover */}
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="text-green-400" size={16} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Info Section with Developer Theme */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50 transition-colors">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center transition-colors">
              Why Learn Programming?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/80 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-lg p-6 text-center transition-colors">
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="text-green-400" size={24} />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 transition-colors">Career Growth</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors">
                  High demand for developers with competitive salaries
                </p>
              </div>
              <div className="bg-white/80 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-lg p-6 text-center transition-colors">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Rocket className="text-emerald-400" size={24} />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 transition-colors">Innovation</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors">
                  Build applications that solve real-world problems
                </p>
              </div>
              <div className="bg-white/80 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-lg p-6 text-center transition-colors">
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Globe className="text-green-400" size={24} />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 transition-colors">Global Impact</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors">
                  Create solutions that reach millions worldwide
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
