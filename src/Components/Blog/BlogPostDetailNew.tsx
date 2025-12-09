'use client'
import React, { useState, useEffect } from 'react'
import { Calendar, Clock, User, Tag, ArrowLeft, Share2, TrendingUp } from 'lucide-react'
import { BlogPost, fetchBlogBySlug, fetchBlogs, getLocalizedField } from '@/lib/blogApi'
import Footer from '../Footer/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Image from 'next/image'

export default function BlogPostDetailNew() {
  const params = useParams()
  const locale = (params?.locale as string) || 'en'
  const slug = params?.id as string

  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) return

      setLoading(true)
      setError(null)

      try {
        const blogPost = await fetchBlogBySlug(slug)
        setPost(blogPost)

        // Fetch related posts from the same category
        if (blogPost.category) {
          const related = await fetchBlogs({
            category: blogPost.category,
            per_page: 3
          })
          // Filter out the current post and limit to 3
          setRelatedPosts(related.data.filter(p => p.id !== blogPost.id).slice(0, 3))
        }
      } catch (err) {
        console.error('Error loading blog post:', err)
        setError(locale === 'bn' ? 'ব্লগ পোস্ট লোড করতে ব্যর্থ' : 'Failed to load blog post')
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [slug, locale])

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

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: getLocalizedField(post, 'title', locale),
          text: getLocalizedField(post, 'excerpt', locale),
          url: window.location.href,
        })
      } catch (error) {
        console.log('Share failed:', error)
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center transition-colors">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
        <div className="pt-20 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center py-20">
              <div className="text-6xl mb-4">😕</div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
                {error || (locale === 'bn' ? 'ব্লগ পোস্ট পাওয়া যায়নি' : 'Blog post not found')}
              </h1>
              <Link
                href={`/${locale}/blog`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all font-medium"
              >
                <ArrowLeft size={20} />
                {locale === 'bn' ? 'ব্লগে ফিরে যান' : 'Back to Blog'}
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
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
              <span>{locale === 'bn' ? 'সকল নিবন্ধে ফিরে যান' : 'Back to all articles'}</span>
            </Link>
          </div>

          {/* Article Header */}
          <article className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg mb-6 border ${getCategoryColor(getLocalizedField(post, 'category', locale))}`}>
                <Tag size={16} />
                <span className="text-sm font-semibold">{getLocalizedField(post, 'category', locale)}</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight transition-colors">
                {getLocalizedField(post, 'title', locale)}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 mb-8 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center text-white font-bold">
                    {getLocalizedField(post, 'author', locale)[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm">
                      <User size={14} />
                      <span className="font-medium text-gray-900 dark:text-white transition-colors">
                        {getLocalizedField(post, 'author', locale)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Calendar size={16} />
                  <span>{new Date(post.created_at).toLocaleDateString(locale === 'bn' ? 'bn-BD' : 'en-US', { 
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Clock size={16} />
                  <span>{getLocalizedField(post, 'read_time', locale)}</span>
                </div>

                <button
                  onClick={handleShare}
                  className="ml-auto flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:border-green-500/50 hover:text-green-400 transition-all text-sm"
                >
                  <Share2 size={16} />
                  {locale === 'bn' ? 'শেয়ার করুন' : 'Share'}
                </button>
              </div>
            </div>

            {/* Featured Image */}
            {post.image_url && (
              <div className="mb-12 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800">
                <Image
                  height={200}
                  width={300}
                  src={post.image_url}
                  alt={getLocalizedField(post, 'title', locale)}
                  className="w-full h-auto"
                />
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
              <div 
                className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors"
                dangerouslySetInnerHTML={{ __html: getLocalizedField(post, 'content', locale) }}
              />
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mb-12 pb-12 border-b border-gray-200 dark:border-gray-800">
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4 uppercase tracking-wide transition-colors">
                  {locale === 'bn' ? 'ট্যাগ' : 'Tags'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(locale === 'bn' && post.tags_bn ? post.tags_bn : post.tags).map((tag: string, index: number) => (
                    <Link
                      key={index}
                      href={`/${locale}/blog/tag/${tag}`}
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:border-green-500/50 hover:text-green-400 transition-all text-sm"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp size={20} className="text-green-400" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors">
                    {locale === 'bn' ? 'সম্পর্কিত নিবন্ধ' : 'Related Articles'}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.id}
                      href={`/${locale}/blog/${relatedPost.slug}`}
                      className="group"
                    >
                      <article className="bg-gray-100 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300">
                        <div className="w-full h-40 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-center relative overflow-hidden transition-colors">
                          {relatedPost.image_url ? (
                            <Image height={100} width={150} src={relatedPost.image_url} alt={getLocalizedField(relatedPost, 'title', locale)} className="w-full h-full object-cover" />
                          ) : (
                            <>
                              <div className="text-4xl opacity-50">📄</div>
                              <div className="absolute inset-0 bg-gradient-to-t from-gray-100/80 dark:from-gray-900/80 to-transparent" />
                            </>
                          )}
                        </div>

                        <div className="p-4">
                          <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md mb-2 border text-xs ${getCategoryColor(getLocalizedField(relatedPost, 'category', locale))}`}>
                            <Tag size={10} />
                            <span className="font-semibold">{getLocalizedField(relatedPost, 'category', locale)}</span>
                          </div>

                          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-400 transition-colors line-clamp-2">
                            {getLocalizedField(relatedPost, 'title', locale)}
                          </h3>

                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 transition-colors">
                            {getLocalizedField(relatedPost, 'excerpt', locale)}
                          </p>
                        </div>
                      </article>
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
