'use client'
import React from 'react'
import { Calendar, Clock, User, Tag, ArrowLeft, ChevronRight } from 'lucide-react'
import { blogPosts } from '@/data/blogData'
import Footer from '../Footer/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function TagFilterPage() {
  const params = useParams()
  const tagName = decodeURIComponent(params.tagName as string)
  const locale = params.locale as string

  const filteredPosts = blogPosts.filter(post => 
    post.tags.some(tag => tag.toLowerCase() === tagName.toLowerCase())
  )

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

  // Get all unique tags from filtered posts
  const relatedTags = Array.from(
    new Set(
      filteredPosts.flatMap(post => post.tags)
        .filter(tag => tag.toLowerCase() !== tagName.toLowerCase())
    )
  ).slice(0, 8)

  const getTagColor = (index: number) => {
    const colors = [
      'bg-blue-500/10 text-blue-400 border-blue-500/30 hover:bg-blue-500/20',
      'bg-purple-500/10 text-purple-400 border-purple-500/30 hover:bg-purple-500/20',
      'bg-pink-500/10 text-pink-400 border-pink-500/30 hover:bg-pink-500/20',
      'bg-orange-500/10 text-orange-400 border-orange-500/30 hover:bg-orange-500/20',
      'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/20',
      'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20',
    ]
    return colors[index % colors.length]
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <div className="max-w-6xl mx-auto mb-8">
            <Link 
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-400 transition-colors group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Blog</span>
            </Link>
          </div>

          {/* Header */}
          <div className="max-w-6xl mx-auto mb-12">
            <div className="relative p-8 md:p-12 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-2xl border border-green-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-green-500/10 rounded-xl border border-green-500/30">
                  <Tag size={24} className="text-green-400" />
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
                  #{tagName}
                </h1>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} tagged with <span className="text-green-400 font-semibold">&apos;{tagName}&apos;</span>
              </p>
            </div>
          </div>

          {/* Related Tags */}
          {relatedTags.length > 0 && (
            <div className="max-w-6xl mx-auto mb-12">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Related Topics
              </h2>
              <div className="flex flex-wrap gap-2">
                {relatedTags.map((tag, index) => (
                  <Link
                    key={tag}
                    href={`/${locale}/blog/tag/${encodeURIComponent(tag.toLowerCase())}`}
                    className={`px-4 py-2 rounded-lg border font-medium text-sm transition-all hover:scale-105 ${getTagColor(index)}`}
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Blog Grid */}
          <div className="max-w-6xl mx-auto">
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/${locale}/blog/${post.id}`}
                    className="group relative bg-gray-100 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:border-green-500/50 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 cursor-pointer flex flex-col"
                  >
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
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-gray-600 dark:text-gray-400 text-lg mb-2 transition-colors">
                  No articles found for this tag.
                </p>
                <p className="text-gray-500 dark:text-gray-500 text-sm mb-6 transition-colors">
                  Try exploring other tags or return to the blog home.
                </p>
                <Link 
                  href={`/${locale}/blog`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
                >
                  Browse All Articles
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
