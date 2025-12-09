'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { 
  Code, 
  Filter, 
  Search, 
  ChevronDown, 
  BookOpen, 
  Target,
  Zap,
  Brain,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import Footer from '@/Components/Footer/Footer';

interface Exercise {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  problemStatement: string;
  inputDescription: string;
  outputDescription: string;
  sampleInput: string;
  sampleOutput: string;
  tags: string[];
}

interface LanguageExercises {
  languageId: string;
  languageName: string;
  exercises: Exercise[];
}

interface ExercisesData {
  languages: LanguageExercises[];
}

export default function ExercisesPage() {
  const params = useParams();
  const currentLocale = params.locale as string || 'en';
  const t = useTranslations('Exercises');

  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null);
  const [exercisesData, setExercisesData] = useState<LanguageExercises[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch exercises data based on locale
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/exercises/exercises-${currentLocale}.json`);
        const data: ExercisesData = await response.json();
        setExercisesData(data.languages);
      } catch (error) {
        console.error('Error fetching exercises:', error);
        // Fallback to English if locale file not found
        try {
          const response = await fetch('/exercises/exercises-en.json');
          const data: ExercisesData = await response.json();
          setExercisesData(data.languages);
        } catch (fallbackError) {
          console.error('Error fetching fallback exercises:', fallbackError);
          setExercisesData([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [currentLocale]);

  // Color themes for difficulty levels
  const difficultyColors = {
    Beginner: { 
      bg: 'bg-green-500/10', 
      text: 'text-green-400', 
      border: 'border-green-500/30',
      badge: 'bg-green-500'
    },
    Intermediate: { 
      bg: 'bg-yellow-500/10', 
      text: 'text-yellow-400', 
      border: 'border-yellow-500/30',
      badge: 'bg-yellow-500'
    },
    Advanced: { 
      bg: 'bg-red-500/10', 
      text: 'text-red-400', 
      border: 'border-red-500/30',
      badge: 'bg-red-500'
    }
  };

  // Get unique languages
  const languages = useMemo(() => {
    return exercisesData.map(lang => ({ id: lang.languageId, name: lang.languageName }));
  }, [exercisesData]);

  // Filter exercises
  const filteredExercises = useMemo(() => {
    const filtered: Array<{ language: string; exercise: Exercise }> = [];

    exercisesData.forEach((langData) => {
      if (selectedLanguage === 'all' || langData.languageId === selectedLanguage) {
        langData.exercises.forEach((exercise) => {
          if (selectedDifficulty === 'all' || exercise.difficulty === selectedDifficulty) {
            if (searchQuery === '' || 
                exercise.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                exercise.problemStatement.toLowerCase().includes(searchQuery.toLowerCase()) ||
                exercise.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
            ) {
              filtered.push({ language: langData.languageName, exercise });
            }
          }
        });
      }
    });

    return filtered;
  }, [exercisesData, selectedLanguage, selectedDifficulty, searchQuery]);

  // Get exercise statistics
  const stats = useMemo(() => {
    const total = exercisesData.reduce((sum, lang) => sum + lang.exercises.length, 0);
    const beginner = exercisesData.reduce((sum, lang) => 
      sum + lang.exercises.filter(e => e.difficulty === 'Beginner').length, 0);
    const intermediate = exercisesData.reduce((sum, lang) => 
      sum + lang.exercises.filter(e => e.difficulty === 'Intermediate').length, 0);
    const advanced = exercisesData.reduce((sum, lang) => 
      sum + lang.exercises.filter(e => e.difficulty === 'Advanced').length, 0);
    
    return { total, beginner, intermediate, advanced };
  }, [exercisesData]);

  const toggleExercise = (exerciseId: string) => {
    setExpandedExercise(expandedExercise === exerciseId ? null : exerciseId);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">{currentLocale === 'bn' ? 'লোড হচ্ছে...' : 'Loading...'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-950 transition-colors">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:72px_72px]" />
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-green-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
        
        {/* Code-style decorative elements */}
        <div className="absolute top-20 left-10 text-green-500/10 font-mono text-sm hidden lg:block">
          <pre>
            {'function solve(problem) {\n'}
            {'  // Your solution here\n'}
            {'  return answer;\n'}
            {'}'}
          </pre>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-16 z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* Badge */}
            <div className="flex items-center justify-center gap-2 text-green-400 mb-4">
              <Code size={16} />
              <span className="text-xs font-mono uppercase tracking-wider">{t('badge')}</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight transition-colors">
              {t('title')}
            </h1>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors">
              {t('subtitle', { total: stats.total })}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <div className="flex items-center gap-2 bg-white/80 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-lg px-4 py-2 transition-colors">
                <Target className="text-green-400" size={18} />
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{stats.beginner} {t('stats.beginner')}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-lg px-4 py-2 transition-colors">
                <Zap className="text-yellow-400" size={18} />
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{stats.intermediate} {t('stats.intermediate')}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-lg px-4 py-2 transition-colors">
                <Brain className="text-red-400" size={18} />
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{stats.advanced} {t('stats.advanced')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="sticky top-16 z-40 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 transition-colors">
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder={t('search.placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                />
              </div>

              {/* Language Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="appearance-none pl-10 pr-10 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors cursor-pointer min-w-[180px]"
                >
                  <option value="all">{t('filters.allLanguages')}</option>
                  {languages.map((lang) => (
                    <option key={lang.id} value={lang.id}>{lang.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              </div>

              {/* Difficulty Filter */}
              <div className="relative">
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors cursor-pointer min-w-[160px]"
                >
                  <option value="all">{t('filters.allLevels')}</option>
                  <option value="Beginner">{t('stats.beginner')}</option>
                  <option value="Intermediate">{t('stats.intermediate')}</option>
                  <option value="Advanced">{t('stats.advanced')}</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              </div>
            </div>

            {/* Active filters indicator */}
            {(selectedLanguage !== 'all' || selectedDifficulty !== 'all' || searchQuery !== '') && (
              <div className="mt-3 flex items-center gap-2 text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  {t(filteredExercises.length === 1 ? 'search.showing' : 'search.showing_plural', { count: filteredExercises.length })}
                </span>
                <button
                  onClick={() => {
                    setSelectedLanguage('all');
                    setSelectedDifficulty('all');
                    setSearchQuery('');
                  }}
                  className="text-green-500 hover:text-green-400 font-medium transition-colors"
                >
                  {t('search.clearFilters')}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Exercises List */}
      <section className="py-12 bg-white dark:bg-gray-950 transition-colors">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {filteredExercises.length === 0 ? (
              <div className="text-center py-20">
                <BookOpen className="mx-auto text-gray-400 mb-4" size={64} />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {t('noResults.title')}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('noResults.description')}
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredExercises.map(({ language, exercise }, index) => {
                  const isExpanded = expandedExercise === exercise.id;
                  const diffColor = difficultyColors[exercise.difficulty];
                  
                  return (
                    <div
                      key={`${exercise.id}-${index}`}
                      className={`bg-gray-50 dark:bg-gray-900/50 border ${diffColor.border} rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg ${
                        isExpanded ? 'shadow-lg' : ''
                      }`}
                    >
                      {/* Exercise Header */}
                      <div
                        onClick={() => toggleExercise(exercise.id)}
                        className="p-6 cursor-pointer hover:bg-gray-100/50 dark:hover:bg-gray-900/70 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                              <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                                {exercise.title}
                              </h3>
                              <span className={`text-xs px-2 py-1 rounded-full ${diffColor.badge} text-white font-medium`}>
                                {exercise.difficulty}
                              </span>
                              <span className="text-xs px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium">
                                {language}
                              </span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                              {exercise.problemStatement}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {exercise.tags.map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className="text-xs px-2 py-1 bg-green-500/10 text-green-400 rounded-md"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className={`flex-shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                            <ChevronDown className="text-gray-400" size={24} />
                          </div>
                        </div>
                      </div>

                      {/* Exercise Details (Expanded) */}
                      {isExpanded && (
                        <div className="px-6 pb-6 space-y-6 border-t border-gray-200 dark:border-gray-800 pt-6">
                          {/* Problem Statement */}
                          <div>
                            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                              <BookOpen size={16} className="text-green-400" />
                              {t('exercise.problemStatement')}
                            </h4>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                              {exercise.problemStatement}
                            </p>
                          </div>

                          {/* Input/Output Descriptions */}
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className={`p-4 ${diffColor.bg} border ${diffColor.border} rounded-lg`}>
                              <h4 className={`text-sm font-bold ${diffColor.text} mb-2`}>
                                {t('exercise.inputDescription')}
                              </h4>
                              <p className="text-gray-700 dark:text-gray-300 text-sm">
                                {exercise.inputDescription || t('exercise.noInput')}
                              </p>
                            </div>
                            <div className={`p-4 ${diffColor.bg} border ${diffColor.border} rounded-lg`}>
                              <h4 className={`text-sm font-bold ${diffColor.text} mb-2`}>
                                {t('exercise.outputDescription')}
                              </h4>
                              <p className="text-gray-700 dark:text-gray-300 text-sm">
                                {exercise.outputDescription}
                              </p>
                            </div>
                          </div>

                          {/* Sample Input/Output */}
                          {(exercise.sampleInput || exercise.sampleOutput) && (
                            <div className="grid md:grid-cols-2 gap-4">
                              {exercise.sampleInput && (
                                <div>
                                  <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2">
                                    {t('exercise.sampleInput')}
                                  </h4>
                                  <pre className="p-4 bg-gray-900 dark:bg-black text-green-400 rounded-lg text-sm overflow-x-auto font-mono">
                                    {exercise.sampleInput}
                                  </pre>
                                </div>
                              )}
                              {exercise.sampleOutput && (
                                <div>
                                  <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2">
                                    {t('exercise.sampleOutput')}
                                  </h4>
                                  <pre className="p-4 bg-gray-900 dark:bg-black text-green-400 rounded-lg text-sm overflow-x-auto font-mono">
                                    {exercise.sampleOutput}
                                  </pre>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Action Button */}
                          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <CheckCircle2 size={16} className="text-green-400" />
                              <span>{t('exercise.readyToSolve')}</span>
                            </div>
                            <button className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg transition-all font-medium shadow-lg shadow-green-500/20">
                              {t('exercise.startCoding')}
                              <ArrowRight size={16} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 transition-colors">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              {t('cta.description')}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href={`/${currentLocale}/tutorial`}
                className="px-8 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-700 rounded-lg hover:border-green-500 transition-all font-medium"
              >
                {t('cta.browseTutorials')}
              </a>
              <a
                href={`/${currentLocale}/certificates`}
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg transition-all font-medium shadow-lg shadow-green-500/20"
              >
                {t('cta.earnCertificates')}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}