// Admin API utility functions
const API_BASE_URL = 'https://backend-w3university.vercel.app/api'

// Types
export interface AdminStats {
  total_blogs: number
  published_blogs: number
  draft_blogs: number
  total_views: number
  categories: Array<{ category: string; count: number }>
  recent_blogs: Array<{
    id: number
    slug: string
    title: string
    title_bn: string
    status: 'published' | 'draft'
    views: number
    published_at: string
    created_at: string
  }>
}

export interface BlogListItem {
  id: number
  slug: string
  title: string
  title_bn: string
  excerpt: string
  excerpt_bn: string
  category: string
  category_bn: string
  status: 'published' | 'draft'
  author: string
  author_bn: string
  views: number
  published_at: string
  created_at: string
  updated_at: string
}

export interface BlogFormData {
  title: string
  title_bn: string
  content: string
  content_bn: string
  excerpt: string
  excerpt_bn: string
  category: string
  category_bn: string
  tags: string[]
  tags_bn: string[]
  author: string
  author_bn: string
  read_time: string
  read_time_bn: string
  image_url?: string
  status: 'published' | 'draft'
  published_at?: string
  slug?: string
}

export interface PaginatedBlogList {
  data: BlogListItem[]
  current_page: number
  last_page: number
  per_page: number
  total: number
  next_page_url: string | null
  prev_page_url: string | null
}

// Get auth token from localStorage
const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('adminToken')
  }
  return null
}

// Create auth headers
const getAuthHeaders = () => {
  const token = getAuthToken()
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  }
}

// Admin Stats
export async function getAdminStats(): Promise<AdminStats> {
  const response = await fetch(`${API_BASE_URL}/blogs/stats`, {
    headers: getAuthHeaders()
  })
  
  if (!response.ok) {
    if (response.status === 401) throw new Error('Unauthorized')
    if (response.status === 403) throw new Error('Forbidden')
    throw new Error('Failed to fetch stats')
  }
  
  const data = await response.json()
  
  // Transform the response to match our AdminStats interface
  return {
    total_blogs: data.total || 0,
    published_blogs: data.published || 0,
    draft_blogs: data.drafts || 0,
    total_views: data.total_views || 0,
    categories: data.categories || [],
    recent_blogs: data.recent_blogs || []
  }
}

// Get all blogs (admin)
export async function getAdminBlogs(params?: {
  page?: number
  per_page?: number
  search?: string
  status?: 'published' | 'draft'
  category?: string
  author?: string
  sort_by?: 'created_at' | 'title' | 'views'
  sort_order?: 'asc' | 'desc'
}): Promise<PaginatedBlogList> {
  const queryParams = new URLSearchParams()
  if (params?.page) queryParams.append('page', params.page.toString())
  if (params?.per_page) queryParams.append('per_page', params.per_page.toString())
  if (params?.search) queryParams.append('search', params.search)
  if (params?.status) queryParams.append('status', params.status)
  if (params?.category) queryParams.append('category', params.category)
  if (params?.author) queryParams.append('author', params.author)
  if (params?.sort_by) queryParams.append('sort_by', params.sort_by)
  if (params?.sort_order) queryParams.append('sort_order', params.sort_order)

  const response = await fetch(`${API_BASE_URL}/blogs?${queryParams}`, {
    headers: getAuthHeaders()
  })
  
  if (!response.ok) {
    if (response.status === 401) throw new Error('Unauthorized')
    if (response.status === 403) throw new Error('Forbidden')
    throw new Error('Failed to fetch blogs')
  }
  
  return response.json()
}

// Get single blog (admin)
export async function getAdminBlog(id: number | string): Promise<BlogFormData> {
  const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
    headers: getAuthHeaders()
  })
  
  if (!response.ok) {
    if (response.status === 401) throw new Error('Unauthorized')
    if (response.status === 403) throw new Error('Forbidden')
    if (response.status === 404) throw new Error('Blog not found')
    throw new Error('Failed to fetch blog')
  }
  
  return response.json()
}

// Create blog
export async function createBlog(data: BlogFormData): Promise<BlogFormData> {
  const response = await fetch(`${API_BASE_URL}/blogs`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  })
  
  if (!response.ok) {
    if (response.status === 401) throw new Error('Unauthorized')
    if (response.status === 403) throw new Error('Forbidden')
    if (response.status === 422) {
      const error = await response.json()
      throw new Error(error.message || 'Validation error')
    }
    throw new Error('Failed to create blog')
  }
  
  return response.json()
}

// Update blog
export async function updateBlog(id: number | string, data: Partial<BlogFormData>): Promise<BlogFormData> {
  const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  })
  
  if (!response.ok) {
    if (response.status === 401) throw new Error('Unauthorized')
    if (response.status === 403) throw new Error('Forbidden')
    if (response.status === 404) throw new Error('Blog not found')
    if (response.status === 422) {
      const error = await response.json()
      throw new Error(error.message || 'Validation error')
    }
    throw new Error('Failed to update blog')
  }
  
  return response.json()
}

// Delete blog
export async function deleteBlog(id: number | string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  })
  
  if (!response.ok) {
    if (response.status === 401) throw new Error('Unauthorized')
    if (response.status === 403) throw new Error('Forbidden')
    if (response.status === 404) throw new Error('Blog not found')
    throw new Error('Failed to delete blog')
  }
}

// Bulk delete blogs
export async function bulkDeleteBlogs(ids: number[]): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/admin/blogs/bulk-delete`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ ids })
  })
  
  if (!response.ok) {
    if (response.status === 401) throw new Error('Unauthorized')
    if (response.status === 403) throw new Error('Forbidden')
    throw new Error('Failed to delete blogs')
  }
}

// Bulk update status
export async function bulkUpdateStatus(ids: number[], status: 'published' | 'draft'): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/admin/blogs/bulk-status`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ ids, status })
  })
  
  if (!response.ok) {
    if (response.status === 401) throw new Error('Unauthorized')
    if (response.status === 403) throw new Error('Forbidden')
    throw new Error('Failed to update blog status')
  }
}

// Generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
