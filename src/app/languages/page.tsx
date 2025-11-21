'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import languagesData from '@/data/languages.json';

interface Language {
  id: string;
  name: string;
  shortDescription: string;
  image: string;
}

export default function LanguagesPage() {
  const router = useRouter();
  const languages: Language[] = languagesData;

  // Color gradients for different languages
  const colorGradients = [
    'from-yellow-400 to-orange-500',
    'from-blue-400 to-blue-600',
    'from-red-500 to-orange-600',
    'from-blue-500 to-indigo-600',
    'from-purple-500 to-pink-600',
    'from-blue-600 to-cyan-600',
    'from-indigo-500 to-purple-600',
    'from-red-400 to-pink-500',
    'from-cyan-400 to-blue-500',
    'from-orange-500 to-red-600',
    'from-orange-400 to-red-500',
    'from-purple-600 to-indigo-700',
  ];

  const handleLanguageClick = (languageId: string) => {
    router.push(`/language_page?lang=${languageId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Programming Languages
          </h1>
          <p className="text-lg md:text-xl opacity-90 text-center max-w-2xl mx-auto">
            Choose a programming language to start your learning journey
          </p>
        </div>
      </div>

      {/* Languages Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {languages.map((language, index) => (
            <div
              key={language.id}
              onClick={() => handleLanguageClick(language.id)}
              className="bg-white rounded-xl shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden group"
            >
              {/* Image Container */}
              <div className="relative h-32 md:h-40 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6 group-hover:from-blue-100 group-hover:to-purple-100 transition-colors">
                {/* Fallback colored circle with first letter - always visible as background */}
                <div className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${colorGradients[index % colorGradients.length]} rounded-full flex items-center justify-center text-white text-2xl md:text-3xl font-bold shadow-lg`}>
                  {language.name.charAt(0)}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 text-center group-hover:text-blue-600 transition-colors">
                  {language.name}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 text-center line-clamp-2">
                  {language.shortDescription}
                </p>
              </div>

              {/* Hover Effect - Learn More */}
              <div className="px-4 pb-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs md:text-sm font-semibold py-2 px-4 rounded-lg text-center">
                  Learn More →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div className="container mx-auto px-4 pb-16">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">
            Why Learn Programming?
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💼</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Career Growth</h3>
              <p className="text-sm text-gray-600">
                High demand for developers with competitive salaries
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🚀</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Innovation</h3>
              <p className="text-sm text-gray-600">
                Build applications that solve real-world problems
              </p>
            </div>
            <div className="text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌍</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Global Impact</h3>
              <p className="text-sm text-gray-600">
                Create solutions that reach millions worldwide
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
