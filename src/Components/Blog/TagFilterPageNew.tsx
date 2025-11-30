'use client'
import React, { useState, useEffect } from 'react'
import { Calendar, Clock, User, Tag, ArrowLeft, ChevronRight } from 'lucide-react'
import { BlogPost, fetchBlogs, getLocalizedField } from '@/lib/blogApi'
import Footer from '../Footer/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function TagFilterPageNew() {
  const params = useParams()
  const locale = (params?.locale as string) || 'en'
  const tagName = decodeURIComponent((params?.tagName as string) || '')

  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true)
      try {
        // Fetch all blogs and filter by tag on client side
        // Note: If your Laravel API supports tag filtering, use that instead
        const data = await fetchBlogs({
          page,
          per_page: 100, // Get more to filter
        })

        // Filter posts that have the tag
        const filtered = data.data.filter(post => {
          const tags = locale === 'bn' && post.tags_bn ? post.tags_bn : post.tags
          return tags.some(tag => 
            tag.toLowerCase() === tagName.toLowerCase()
          )
        })

        if (page === 1) {
          setFilteredPosts(filtered)
        } else {
          setFilteredPosts(prev => [...prev, ...filtered])
        }

        setHasMore(data.next_page_url !== null)
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [page, tagName, locale])

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1)
    }
  }

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
          {/* Back Button */}
          <div className="max-w-6xl mx-auto mb-8">
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-400 transition-colors group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span>{locale === 'bn' ? 'সকল নিবন্ধে ফিরে যান' : 'Back to all articles'}</span>
            </Link>
          </div>

          {/* Header */}
          <div className="max-w-6xl mx-auto mb-12">
            <div className="relative py-12 text-center">
              <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 to-transparent rounded-3xl blur-3xl" />
              
              <div className="relative">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-green-500/10 border border-green-500/20 rounded-full mb-6">
                  <Tag size={20} className="text-green-400" />
                  <span className="text-lg font-semibold text-green-400">#{tagName}</span>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
                  {locale === 'bn' ? 'ট্যাগ সহ নিবন্ধ:' : 'Articles tagged with:'}
                  <span className="block mt-2 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    {tagName}
                  </span>
                </h1>

                {!loading && (
                  <p className="text-gray-600 dark:text-gray-400 text-lg transition-colors">
                    {locale === 'bn' ? 'পাওয়া গেছে' : 'Found'} <span className="text-green-400 font-semibold">{filteredPosts.length}</span> {locale === 'bn' ? 'নিবন্ধ' : `article${filteredPosts.length !== 1 ? 's' : ''}`}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Articles Grid */}
          <div className="max-w-6xl mx-auto">
            {loading && page === 1 ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
              </div>
            ) : filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/${locale}/blog/${post.slug}`}
                  >
                    <article className="group relative bg-gray-100 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:border-green-500/50 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300 cursor-pointer flex flex-col h-full">
                      {/* Image */}
                      <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-center relative overflow-hidden transition-colors">
                        {post.image_url ? (
                          <img src={post.image_url} alt={getLocalizedField(post, 'title', locale)} className="w-full h-full object-cover" />
                        ) : (
                          <>
                            <div className="text-5xl opacity-50">💻</div>
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-100/80 dark:from-gray-900/80 to-transparent" />
                          </>
                        )}
                      </div>

                      <div className="p-6 flex flex-col flex-grow">
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md mb-3 border w-fit ${getCategoryColor(getLocalizedField(post, 'category', locale))}`}>
                          <Tag size={12} />
                          <span className="text-xs font-semibold">{getLocalizedField(post, 'category', locale)}</span>
                        </div>

                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-green-400 transition-colors line-clamp-2">
                          {getLocalizedField(post, 'title', locale)}
                        </h2>

                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 flex-grow transition-colors">
                          {getLocalizedField(post, 'excerpt', locale)}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-500 mb-4 pt-4 border-t border-gray-200 dark:border-gray-800 transition-colors">
                          <div className="flex items-center gap-1.5">
                            <User size={14} />
                            <span>{getLocalizedField(post, 'author', locale)}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Calendar size={14} />
                            <span>{new Date(post.created_at).toLocaleDateString(locale === 'bn' ? 'bn-BD' : 'en-US', { month: 'short', day: 'numeric' })}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock size={14} />
                            <span>{getLocalizedField(post, 'read_time', locale)}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-green-400 font-medium group-hover:gap-3 transition-all">
                          {locale === 'bn' ? 'আরও পড়ুন' : 'Read More'}
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
                <p className="text-gray-600 dark:text-gray-400 text-lg mb-2 transition-colors">
                  {locale === 'bn' ? `'${tagName}' ট্যাগ সহ কোনো নিবন্ধ পাওয়া যায়নি।` : `No articles found with the tag '${tagName}'.`}
                </p>
                <Link
                  href={`/${locale}/blog`}
                  className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all font-medium"
                >
                  <ArrowLeft size={20} />
                  {locale === 'bn' ? 'সকল নিবন্ধ দেখুন' : 'View all articles'}
                </Link>
              </div>
            )}
          </div>

          {/* Load More */}
          {filteredPosts.length > 0 && hasMore && (
            <div className="max-w-6xl mx-auto mt-12 text-center">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="px-8 py-3 bg-gray-100 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:border-green-500/50 hover:text-green-400 hover:shadow-lg hover:shadow-green-500/10 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (locale === 'bn' ? 'লোড হচ্ছে...' : 'Loading...') : (locale === 'bn' ? 'আরও দেখুন' : 'Load More Articles')}
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
