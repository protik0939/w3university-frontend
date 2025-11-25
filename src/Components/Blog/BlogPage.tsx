'use client'
import React, { useState } from 'react'
import { Calendar, Clock, User, Tag, Search, ChevronRight, TrendingUp, Sparkles } from 'lucide-react'
import { blogPosts } from '@/data/blogData'
import Footer from '../Footer/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function BlogPage() {
  const params = useParams()
  const locale = (params?.locale as string) || 'en'
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', 'React', 'TypeScript', 'CSS', 'Node.js', 'Python', 'JavaScript', 'Next.js', 'Tools', 'Web Design']

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredPost = blogPosts[0]

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'React': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      'TypeScript': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      'CSS': 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      'Node.js': 'bg-green-500/10 text-green-400 border-green-500/30',
      'Python': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
      'JavaScript': 'bg-orange-500/10 text-orange-400 border-orange-500/30',
      'Next.js': 'bg-gray-500/10 text-gray-400 border-gray-500/30',
      'Tools': 'bg-pink-500/10 text-pink-400 border-pink-500/30',
      'Web Design': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    }
    return colors[category] || 'bg-gray-500/10 text-gray-400 border-gray-500/30'
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Header with gradient background */}
          <div className="relative max-w-5xl mx-auto text-center mb-16 py-12">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 to-transparent rounded-3xl blur-3xl" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full mb-4">
                <Sparkles size={14} className="text-green-400" />
                <span className="text-xs font-medium text-green-400">Latest Insights</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  Coding
                </span>
                {' '}Blog
              </h1>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors">
                Discover tutorials, guides, and expert insights on modern web development and programming
              </p>
            </div>
          </div>

          {/* Featured Post */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp size={20} className="text-green-400" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors">Featured Article</h2>
            </div>
            <Link href={`/${locale}/blog/${featuredPost.id}`}>
              <article className="group relative bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-900/80 dark:to-gray-900/40 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden hover:border-green-500/50 transition-all duration-300 cursor-pointer">
                <div className="grid md:grid-cols-2 gap-6 p-8">
                  <div className="flex flex-col justify-center">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg mb-4 border w-fit ${getCategoryColor(featuredPost.category)}`}>
                      <Tag size={14} />
                      <span className="text-sm font-semibold">{featuredPost.category}</span>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-green-400 transition-colors">
                      {featuredPost.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed transition-colors">
                      {featuredPost.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-500 mb-6 transition-colors">
                      <div className="flex items-center gap-2">
                        <User size={16} />
                        <span>{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-green-400 font-medium group-hover:gap-3 transition-all">
                      Read Full Article
                      <ChevronRight size={20} />
                    </div>
                  </div>
                  
                  <div className="hidden md:flex items-center justify-center">
                    <div className="w-full h-64 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30 dark:border-green-500/30 flex items-center justify-center">
                      <div className="text-6xl">📝</div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </article>
            </Link>
          </div>

          {/* Search and Filter */}
          <div className="max-w-6xl mx-auto mb-12">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Search articles by title or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-100 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:border-green-500/50 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400 font-medium transition-colors">Filter by:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-green-500 text-white shadow-lg shadow-green-500/20'
                      : 'bg-gray-100 dark:bg-gray-900/50 text-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-300 border border-gray-200 dark:border-gray-800'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          {searchQuery && (
            <div className="max-w-6xl mx-auto mb-6">
              <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors">
                Found <span className="text-green-400 font-semibold">{filteredPosts.length}</span> article{filteredPosts.length !== 1 ? 's' : ''}
              </p>
            </div>
          )}

          {/* Blog Grid */}
          <div className="max-w-6xl mx-auto">
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.slice(1).map((post) => (
                  <Link
                    key={post.id}
                    href={`/${locale}/blog/${post.id}`}
                  >
                    <article className="group relative bg-gray-100 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:border-green-500/50 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 cursor-pointer flex flex-col h-full">
                      {/* Image placeholder */}
                      <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-center relative overflow-hidden transition-colors">
                        <div className="text-5xl opacity-50">💻</div>
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-100/80 dark:from-gray-900/80 to-transparent" />
                      </div>
                      
                      <div className="p-6 flex flex-col flex-grow">
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md mb-3 border w-fit ${getCategoryColor(post.category)}`}>
                          <Tag size={12} />
                          <span className="text-xs font-semibold">{post.category}</span>
                        </div>

                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-green-400 transition-colors line-clamp-2">
                          {post.title}
                        </h2>

                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 flex-grow transition-colors">
                          {post.excerpt}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-500 mb-4 pt-4 border-t border-gray-200 dark:border-gray-800 transition-colors">
                          <div className="flex items-center gap-1.5">
                            <User size={14} />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Calendar size={14} />
                            <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock size={14} />
                            <span>{post.readTime}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-green-400 font-medium group-hover:gap-3 transition-all">
                          Read More
                          <ChevronRight size={16} />
                        </div>
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity pointer-events-none" />
                    </article>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-gray-600 dark:text-gray-400 text-lg mb-2 transition-colors">No articles found matching your criteria.</p>
                <p className="text-gray-500 dark:text-gray-500 text-sm transition-colors">Try adjusting your search or filter options.</p>
              </div>
            )}
          </div>

          {/* Load More */}
          {filteredPosts.length > 0 && (
            <div className="max-w-6xl mx-auto mt-12 text-center">
              <button className="px-8 py-3 bg-gray-100 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:border-green-500/50 hover:text-green-400 hover:shadow-lg hover:shadow-green-500/10 transition-all font-medium">
                Load More Articles
              </button>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
