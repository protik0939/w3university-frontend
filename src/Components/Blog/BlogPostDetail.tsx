'use client'
import React from 'react'
import { Calendar, Clock, User, Tag, ArrowLeft, Share2, Bookmark } from 'lucide-react'
import { blogPosts } from '@/data/blogData'
import Footer from '../Footer/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function BlogPostDetail() {
  const params = useParams()
  const id = params.id as string
  const locale = params.locale as string

  const post = blogPosts.find(p => p.id === id)

  const handleShare = async () => {
    if (!post) return

    const shareData = {
      title: post.title,
      text: post.excerpt,
      url: window.location.href,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href)
        alert('Link copied to clipboard!')
      }
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        console.error('Error sharing:', error)
      }
    }
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 pt-20">
        <div className="container mx-auto px-4 py-20 text-center">
          <div className="text-6xl mb-4">📭</div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Post Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link 
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && (
      p.category === post.category || 
      p.tags.some(tag => post.tags.includes(tag))
    ))
    .slice(0, 3)

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
          <div className="max-w-4xl mx-auto mb-8">
            <Link 
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-400 transition-colors group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Blog</span>
            </Link>
          </div>

          {/* Article Header */}
          <article className="max-w-4xl mx-auto">
            {/* Category Badge */}
            <div className="mb-6">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border ${getCategoryColor(post.category)}`}>
                <Tag size={16} />
                <span className="text-sm font-semibold">{post.category}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-gray-600 dark:text-gray-400 mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <User size={18} />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>{post.readTime}</span>
              </div>
              
              {/* Action Buttons */}
              <div className="ml-auto flex items-center gap-3">
                <button 
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
                  aria-label="Bookmark this article"
                >
                  <Bookmark size={18} />
                </button>
                <button 
                  onClick={handleShare}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
                  aria-label="Share this article"
                >
                  <Share2 size={18} />
                </button>
              </div>
            </div>

            {/* Featured Image */}
            <div className="w-full h-64 md:h-96 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-500/30 dark:border-green-500/30 flex items-center justify-center mb-12">
              <div className="text-8xl">📝</div>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-6">
                {post.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-base md:text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Tags Section */}
            <div className="mb-12 p-8 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-900/80 dark:to-gray-900/40 rounded-2xl border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2 mb-4">
                <Tag size={20} className="text-green-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Related Topics</h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag, index) => (
                  <Link
                    key={tag}
                    href={`/${locale}/blog/tag/${encodeURIComponent(tag.toLowerCase())}`}
                    className={`px-4 py-2 rounded-lg border font-medium transition-all hover:scale-105 ${getTagColor(index)}`}
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                Click on a tag to see more posts on this topic
              </p>
            </div>

            {/* Author Card */}
            <div className="mb-12 p-6 md:p-8 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-2xl border border-green-500/20">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                  {post.author.charAt(0)}
                </div>
                <div className="flex-grow">
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {post.author}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    Content Writer & Developer Advocate
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    Passionate about sharing knowledge and helping developers build amazing things. 
                    Specializing in modern web technologies and best practices.
                  </p>
                </div>
              </div>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Related Articles
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.id}
                      href={`/${locale}/blog/${relatedPost.id}`}
                      className="group bg-gray-100 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10 transition-all"
                    >
                      <div className="w-full h-32 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                        <div className="text-3xl">💻</div>
                      </div>
                      <div className="p-4">
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold border mb-2 ${getCategoryColor(relatedPost.category)}`}>
                          {relatedPost.category}
                        </div>
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-green-400 transition-colors">
                          {relatedPost.title}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
