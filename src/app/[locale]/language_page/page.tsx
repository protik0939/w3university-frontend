'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter, useParams } from 'next/navigation';
import languagesData from '@/data/languages.json';
import { Terminal, Code, BookOpen, Dumbbell, ChevronLeft, ChevronDown, CheckCircle2, XCircle } from 'lucide-react';

interface Tutorial {
  id: number;
  title: string;
  content: string;
  codeExample?: string;
}

interface Exercise {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface LanguageData {
  id: string;
  name: string;
  shortDescription: string;
  image: string;
  description: string;
  version: string;
  difficulty: string;
  features: string[];
  useCases: string[];
}

function LanguagePageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useParams();
  const currentLocale = params.locale as string || 'en';
  const langId = searchParams.get('lang');
  
  const [activeTab, setActiveTab] = useState<'about' | 'tutorial' | 'exercise'>('about');
  const [expandedTutorial, setExpandedTutorial] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [languageInfo, setLanguageInfo] = useState<LanguageData | null>(null);

  useEffect(() => {
    if (langId) {
      const language = languagesData.find((lang: LanguageData) => lang.id === langId);
      if (language) {
        setLanguageInfo(language);
      } else {
        // Redirect to languages page if language not found
        router.push(`/${currentLocale}/languages`);
      }
    } else {
      // Redirect to languages page if no language specified
      router.push(`/${currentLocale}/languages`);
    }
  }, [langId, router, currentLocale]);

  if (!languageInfo) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center transition-colors">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 transition-colors">Loading...</p>
        </div>
      </div>
    );
  }

  const tutorials: Tutorial[] = [
    {
      id: 1,
      title: 'Introduction to JavaScript',
      content: 'JavaScript is a lightweight, interpreted programming language with first-class functions.',
      codeExample: 'console.log("Hello, World!");'
    },
    {
      id: 2,
      title: 'Variables and Data Types',
      content: 'Learn about var, let, const and different data types in JavaScript.',
      codeExample: 'let name = "John";\nconst age = 25;\nvar isStudent = true;'
    },
    {
      id: 3,
      title: 'Functions',
      content: 'Functions are reusable blocks of code that perform specific tasks.',
      codeExample: 'function greet(name) {\n  return `Hello, ${name}!`;\n}'
    },
    {
      id: 4,
      title: 'Arrays and Objects',
      content: 'Learn how to work with arrays and objects in JavaScript.',
      codeExample: 'const arr = [1, 2, 3];\nconst obj = { name: "Alice", age: 30 };'
    }
  ];

  const exercises: Exercise[] = [
    {
      id: 1,
      question: 'What keyword is used to declare a constant variable?',
      options: ['var', 'let', 'const', 'constant'],
      correctAnswer: 2
    },
    {
      id: 2,
      question: 'Which method is used to print to the console?',
      options: ['print()', 'console.log()', 'log()', 'output()'],
      correctAnswer: 1
    },
    {
      id: 3,
      question: 'What is the correct syntax for a function?',
      options: ['func myFunction()', 'function myFunction()', 'def myFunction()', 'myFunction function()'],
      correctAnswer: 1
    }
  ];

  const toggleTutorial = (id: number) => {
    setExpandedTutorial(expandedTutorial === id ? null : id);
  };

  const handleAnswerSelect = (exerciseId: number, optionIndex: number) => {
    setSelectedAnswers({ ...selectedAnswers, [exerciseId]: optionIndex });
  };

  const checkAnswers = () => {
    setShowResults(true);
  };

  const resetExercises = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const calculateScore = () => {
    let correct = 0;
    exercises.forEach(exercise => {
      if (selectedAnswers[exercise.id] === exercise.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      {/* Hero Header with Terminal Theme */}
      <section className="relative min-h-[40vh] flex items-end overflow-hidden bg-gray-50 dark:bg-gray-950 transition-colors">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:72px_72px]" />
        
        {/* Gradient Orb */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 py-12 z-10 w-full">
          {/* Back Button */}
          <button
            onClick={() => router.push(`/${currentLocale}/languages`)}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-400 dark:hover:text-green-400 transition-colors mb-8"
          >
            <ChevronLeft size={20} />
            <span className="text-sm">Back to Languages</span>
          </button>

          {/* Language Info */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-green-500/10 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-green-400">{languageInfo.name.charAt(0)}</span>
            </div>
            <div>
              <div className="flex items-center gap-2 text-green-400 mb-1">
                <Terminal size={14} />
                <span className="text-xs font-mono uppercase tracking-wider">Language</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white transition-colors">
                {languageInfo.name}
              </h1>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 max-w-2xl transition-colors">
            {languageInfo.description}
          </p>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10 transition-colors">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('about')}
              className={`flex items-center gap-2 py-3 px-4 font-medium text-sm transition-all whitespace-nowrap ${
                activeTab === 'about'
                  ? 'text-green-400 border-b-2 border-green-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-green-400 dark:hover:text-green-400'
              }`}
            >
              <BookOpen size={16} />
              <span>About</span>
            </button>
            <button
              onClick={() => setActiveTab('tutorial')}
              className={`flex items-center gap-2 py-3 px-4 font-medium text-sm transition-all whitespace-nowrap ${
                activeTab === 'tutorial'
                  ? 'text-green-400 border-b-2 border-green-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-green-400 dark:hover:text-green-400'
              }`}
            >
              <Code size={16} />
              <span>Tutorials</span>
            </button>
            <button
              onClick={() => setActiveTab('exercise')}
              className={`flex items-center gap-2 py-3 px-4 font-medium text-sm transition-all whitespace-nowrap ${
                activeTab === 'exercise'
                  ? 'text-green-400 border-b-2 border-green-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-green-400 dark:hover:text-green-400'
              }`}
            >
              <Dumbbell size={16} />
              <span>Exercises</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        {/* About Section */}
        {activeTab === 'about' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-100 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-lg p-8 transition-colors">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4 transition-colors">
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 transition-colors">Version</h3>
                  <p className="text-lg font-bold text-gray-900 dark:text-white transition-colors">{languageInfo.version}</p>
                </div>
                <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4 transition-colors">
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 transition-colors">Difficulty Level</h3>
                  <p className="text-lg font-bold text-gray-900 dark:text-white transition-colors">{languageInfo.difficulty}</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2 transition-colors">
                    <div className="w-1 h-6 bg-green-400 rounded" />
                    Key Features
                  </h3>
                  <ul className="space-y-3">
                    {languageInfo.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-600 dark:text-gray-400 transition-colors">
                        <CheckCircle2 className="text-green-400 mt-0.5 flex-shrink-0" size={18} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2 transition-colors">
                    <div className="w-1 h-6 bg-emerald-400 rounded" />
                    Use Cases
                  </h3>
                  <ul className="space-y-3">
                    {languageInfo.useCases.map((useCase, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-600 dark:text-gray-400 transition-colors">
                        <Code className="text-emerald-400 mt-0.5 flex-shrink-0" size={18} />
                        <span>{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tutorial Section */}
        {activeTab === 'tutorial' && (
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {tutorials.map((tutorial) => (
                <div key={tutorial.id} className="bg-gray-100 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden transition-colors">
                  <button
                    onClick={() => toggleTutorial(tutorial.id)}
                    className="w-full px-6 py-4 flex justify-between items-center hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <span className="text-lg font-semibold text-gray-900 dark:text-white transition-colors">{tutorial.title}</span>
                    <ChevronDown
                      className={`text-gray-600 dark:text-gray-400 transform transition-transform ${
                        expandedTutorial === tutorial.id ? 'rotate-180' : ''
                      }`}
                      size={24}
                    />
                  </button>
                  
                  {expandedTutorial === tutorial.id && (
                    <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 transition-colors">
                      <p className="text-gray-600 dark:text-gray-400 mb-4 transition-colors">{tutorial.content}</p>
                      {tutorial.codeExample && (
                        <div>
                          <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-2 transition-colors">
                            <Code size={14} className="text-green-400" />
                            Code Example:
                          </h4>
                          <pre className="bg-gray-900 dark:bg-gray-950 text-green-400 p-4 rounded-lg overflow-x-auto border border-gray-800">
                            <code>{tutorial.codeExample}</code>
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Exercise Section */}
        {activeTab === 'exercise' && (
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div />
              {showResults && (
                <div className="px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <span className="text-lg font-semibold text-green-400">
                    Score: {calculateScore()} / {exercises.length}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {exercises.map((exercise) => {
                const isCorrect = selectedAnswers[exercise.id] === exercise.correctAnswer;

                return (
                  <div key={exercise.id} className="bg-gray-100 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-lg p-6 transition-colors">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 transition-colors">
                      Question {exercise.id}: {exercise.question}
                    </h3>
                    <div className="space-y-3">
                      {exercise.options.map((option, index) => {
                        const isSelected = selectedAnswers[exercise.id] === index;
                        const isCorrectAnswer = index === exercise.correctAnswer;
                        
                        return (
                          <button
                            key={index}
                            onClick={() => !showResults && handleAnswerSelect(exercise.id, index)}
                            disabled={showResults}
                            className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                              showResults
                                ? isCorrectAnswer
                                  ? 'border-green-500 bg-green-500/10 dark:bg-green-500/10'
                                  : isSelected
                                  ? 'border-red-500 bg-red-500/10 dark:bg-red-500/10'
                                  : 'border-gray-200 dark:border-gray-800'
                                : isSelected
                                ? 'border-green-500 bg-green-500/10 dark:bg-green-500/10'
                                : 'border-gray-200 dark:border-gray-800 hover:border-green-400'
                            }`}
                          >
                            <div className="flex items-center">
                              <span className="flex-1 text-gray-900 dark:text-white transition-colors">{option}</span>
                              {showResults && isCorrectAnswer && (
                                <CheckCircle2 className="text-green-500" size={20} />
                              )}
                              {showResults && isSelected && !isCorrect && (
                                <XCircle className="text-red-500" size={20} />
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex gap-4">
              {!showResults ? (
                <button
                  onClick={checkAnswers}
                  disabled={Object.keys(selectedAnswers).length !== exercises.length}
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all shadow-lg shadow-green-500/20"
                >
                  Submit Answers
                </button>
              ) : (
                <button
                  onClick={resetExercises}
                  className="px-8 py-3 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors border border-gray-300 dark:border-gray-700"
                >
                  Reset Exercises
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function LanguagePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center transition-colors">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 transition-colors">Loading...</p>
        </div>
      </div>
    }>

   
      <LanguagePageContent />
    </Suspense>
  );
}
