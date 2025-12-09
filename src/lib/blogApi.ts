// Blog API utility functions
const API_BASE_URL = 'https://backend-w3university.vercel.app/api'

// Raw API response type
interface BlogPostRaw {
  id: number
  slug: string
  title: string
  title_bn: string
  excerpt: string
  excerpt_bn: string
  content: string
  content_bn: string
  author: string
  author_bn: string
  category: string | { category: string; category_bn: string }
  category_bn?: string
  tags: string[] | string
  tags_bn?: string[] | string
  read_time: string
  read_time_bn: string
  image_url?: string
  views?: number
  created_at: string
  updated_at: string
  published_at?: string
}

// Normalized BlogPost interface
export interface BlogPost {
  id: number
  slug: string
  title: string
  title_bn: string
  excerpt: string
  excerpt_bn: string
  content: string
  content_bn: string
  author: string
  author_bn: string
  category: string
  category_bn: string
  tags: string[]
  tags_bn: string[]
  read_time: string
  read_time_bn: string
  image_url?: string
  views?: number
  created_at: string
  updated_at: string
  published_at?: string
}

export interface PaginatedBlogs {
  data: BlogPost[]
  current_page: number
  last_page: number
  per_page: number
  total: number
  next_page_url: string | null
  prev_page_url: string | null
}

// Normalize blog post from API response
function normalizeBlogPost(raw: BlogPostRaw): BlogPost {
  // Handle category
  let category = ''
  let category_bn = ''
  if (typeof raw.category === 'object' && raw.category !== null) {
    category = raw.category.category || ''
    category_bn = raw.category.category_bn || ''
  } else if (typeof raw.category === 'string') {
    category = raw.category
    category_bn = raw.category_bn || raw.category
  }

  // Handle tags
  let tags: string[] = []
  let tags_bn: string[] = []
  
  if (typeof raw.tags === 'string') {
    try {
      tags = JSON.parse(raw.tags)
    } catch {
      tags = raw.tags ? [raw.tags] : []
    }
  } else if (Array.isArray(raw.tags)) {
    tags = raw.tags
  }

  if (typeof raw.tags_bn === 'string') {
    try {
      tags_bn = JSON.parse(raw.tags_bn)
    } catch {
      tags_bn = raw.tags_bn ? [raw.tags_bn] : tags
    }
  } else if (Array.isArray(raw.tags_bn)) {
    tags_bn = raw.tags_bn
  } else {
    tags_bn = tags
  }

  return {
    ...raw,
    category,
    category_bn,
    tags,
    tags_bn
  }
}

// Fetch all blogs with pagination and filters
export async function fetchBlogs(params?: {
  page?: number
  per_page?: number
  search?: string
  category?: string
}): Promise<PaginatedBlogs> {
  const queryParams = new URLSearchParams()
  if (params?.page) queryParams.append('page', params.page.toString())
  if (params?.per_page) queryParams.append('per_page', params.per_page.toString())
  if (params?.search) queryParams.append('search', params.search)
  if (params?.category) queryParams.append('category', params.category)

  const response = await fetch(`${API_BASE_URL}/blogs?${queryParams}`)
  if (!response.ok) throw new Error('Failed to fetch blogs')
  const result = await response.json()
  return {
    ...result,
    data: result.data.map((post: BlogPostRaw) => normalizeBlogPost(post))
  }
}

// Fetch single blog by slug
export async function fetchBlogBySlug(slug: string): Promise<BlogPost> {
  const response = await fetch(`${API_BASE_URL}/blogs/${slug}`)
  if (!response.ok) throw new Error('Blog not found')
  const raw = await response.json()
  return normalizeBlogPost(raw)
}

// Fetch all categories
export async function fetchCategories(): Promise<string[]> {
  const response = await fetch(`${API_BASE_URL}/blogs/categories`)
  if (!response.ok) throw new Error('Failed to fetch categories')
  const result = await response.json()

  // Normalize categories to string[] whether API returns strings or objects with category/category_bn
  if (Array.isArray(result)) {
    return result.map((cat: unknown) => {
      if (typeof cat === 'string') return cat
      if (cat && typeof cat === 'object') {
        const obj = cat as { category?: string; category_bn?: string } | Record<string, unknown>
        return (obj as { category?: string }).category ?? (obj as { category_bn?: string }).category_bn ?? ''
      }
      return String(cat)
    })
  }

  return []
}

// Fetch popular blogs
export async function fetchPopularBlogs(limit: number = 5): Promise<BlogPost[]> {
  const response = await fetch(`${API_BASE_URL}/blogs/popular?limit=${limit}`)
  if (!response.ok) throw new Error('Failed to fetch popular blogs')
  const result = await response.json()
  return result.map((post: BlogPostRaw) => normalizeBlogPost(post))
}

// Fetch recent blogs
export async function fetchRecentBlogs(limit: number = 5): Promise<BlogPost[]> {
  const response = await fetch(`${API_BASE_URL}/blogs/recent?limit=${limit}`)
  if (!response.ok) throw new Error('Failed to fetch recent blogs')
  const result = await response.json()
  return result.map((post: BlogPostRaw) => normalizeBlogPost(post))
}

// Create blog (requires authentication)
export async function createBlog(blog: Partial<BlogPost>, token: string): Promise<BlogPost> {
  const response = await fetch(`${API_BASE_URL}/blogs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(blog)
  })
  if (!response.ok) throw new Error('Failed to create blog')
  return response.json()
}

// Update blog (requires authentication)
export async function updateBlog(slug: string, blog: Partial<BlogPost>, token: string): Promise<BlogPost> {
  const response = await fetch(`${API_BASE_URL}/blogs/${slug}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(blog)
  })
  if (!response.ok) throw new Error('Failed to update blog')
  return response.json()
}

// Delete blog (requires authentication)
export async function deleteBlog(slug: string, token: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/blogs/${slug}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  if (!response.ok) throw new Error('Failed to delete blog')
}

// Helper function to get localized field
export function getLocalizedField<T extends BlogPost>(
  post: T,
  field: 'title' | 'excerpt' | 'content' | 'author' | 'category' | 'read_time',
  locale: string
): string {
  if (locale === 'bn') {
    const bnField = `${field}_bn` as keyof T
    return (post[bnField] as string) || (post[field] as string)
  }
  return post[field] as string
}

// Helper function to get localized tags
export function getLocalizedTags(post: BlogPost, locale: string): string[] {
  return locale === 'bn' ? post.tags_bn : post.tags
}
