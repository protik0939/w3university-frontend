'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import languagesData from '@/data/languages.json';

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
        router.push('/languages');
      }
    } else {
      // Redirect to languages page if no language specified
      router.push('/languages');
    }
  }, [langId, router]);

  if (!languageInfo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
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
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <button
            onClick={() => router.push('/languages')}
            className="mb-4 flex items-center text-white hover:text-gray-200 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Languages
          </button>
          <h1 className="text-5xl font-bold mb-4">{languageInfo.name}</h1>
          <p className="text-xl opacity-90">{languageInfo.description}</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('about')}
              className={`py-4 px-6 font-semibold transition-colors ${
                activeTab === 'about'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              About
            </button>
            <button
              onClick={() => setActiveTab('tutorial')}
              className={`py-4 px-6 font-semibold transition-colors ${
                activeTab === 'tutorial'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Tutorials
            </button>
            <button
              onClick={() => setActiveTab('exercise')}
              className={`py-4 px-6 font-semibold transition-colors ${
                activeTab === 'exercise'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Exercises
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        {/* About Section */}
        {activeTab === 'about' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">About {languageInfo.name}</h2>
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Version</h3>
                  <p className="text-gray-600">{languageInfo.version}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Difficulty Level</h3>
                  <p className="text-gray-600">{languageInfo.difficulty}</p>
                </div>
              </div>
              
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Overview</h3>
                <p className="text-gray-600 mb-4">
                  {languageInfo.description}
                </p>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-6">Key Features</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  {languageInfo.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>

                <h3 className="text-xl font-semibold text-gray-800 mb-4 mt-6">Use Cases</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  {languageInfo.useCases.map((useCase, index) => (
                    <li key={index}>{useCase}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tutorial Section */}
        {activeTab === 'tutorial' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Tutorials</h2>
            <div className="space-y-4">
              {tutorials.map((tutorial) => (
                <div key={tutorial.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <button
                    onClick={() => toggleTutorial(tutorial.id)}
                    className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg font-semibold text-gray-800">{tutorial.title}</span>
                    <svg
                      className={`w-6 h-6 text-gray-600 transform transition-transform ${
                        expandedTutorial === tutorial.id ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {expandedTutorial === tutorial.id && (
                    <div className="px-6 py-4 border-t border-gray-200">
                      <p className="text-gray-600 mb-4">{tutorial.content}</p>
                      {tutorial.codeExample && (
                        <div>
                          <h4 className="text-sm font-semibold text-gray-700 mb-2">Code Example:</h4>
                          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
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
              <h2 className="text-3xl font-bold text-gray-800">Exercises</h2>
              {showResults && (
                <div className="text-xl font-semibold text-blue-600">
                  Score: {calculateScore()} / {exercises.length}
                </div>
              )}
            </div>

            <div className="space-y-6">
              {exercises.map((exercise) => {
                const isAnswered = selectedAnswers[exercise.id] !== undefined;
                const isCorrect = selectedAnswers[exercise.id] === exercise.correctAnswer;

                return (
                  <div key={exercise.id} className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
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
                            className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-colors ${
                              showResults
                                ? isCorrectAnswer
                                  ? 'border-green-500 bg-green-50'
                                  : isSelected
                                  ? 'border-red-500 bg-red-50'
                                  : 'border-gray-200'
                                : isSelected
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-blue-300'
                            }`}
                          >
                            <div className="flex items-center">
                              <span className="flex-1">{option}</span>
                              {showResults && isCorrectAnswer && (
                                <span className="text-green-600 font-semibold">✓ Correct</span>
                              )}
                              {showResults && isSelected && !isCorrect && (
                                <span className="text-red-600 font-semibold">✗ Wrong</span>
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
                  className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  Submit Answers
                </button>
              ) : (
                <button
                  onClick={resetExercises}
                  className="px-8 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
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
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    }>
      <LanguagePageContent />
    </Suspense>
  );
}
