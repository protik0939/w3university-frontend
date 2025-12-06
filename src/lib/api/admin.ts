import { getAdminToken } from '../auth'

const API_BASE_URL = 'https://backend-w3university.vercel.app/api'

// Helper function to get auth headers
function getAuthHeaders(): HeadersInit {
  const token = getAdminToken()
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  }
}

// Dashboard Stats Interface
export interface DashboardStats {
  total_blogs: number
  published_blogs: number
  draft_blogs: number
  total_views: number
  total_categories: number
  recent_blogs: Array<{
    id: number
    title: string
    status: string
    views: number
    created_at: string
  }>
  popular_categories: Array<{
    category: string
    count: number
  }>
}

// Blog Interface
export interface AdminBlog {
  id: number
  slug: string
  title: string
  title_bn?: string
  excerpt: string
  excerpt_bn?: string
  content: string
  content_bn?: string
  category: string
  category_bn?: string
  author: string
  author_bn?: string
  tags: string[]
  tags_bn?: string[]
  read_time: string
  read_time_bn?: string
  image_url?: string
  views: number
  status: 'published' | 'draft'
  created_at: string
  updated_at: string
  published_at?: string
}

export interface PaginatedBlogResponse {
  data: AdminBlog[]
  current_page: number
  last_page: number
  per_page: number
  total: number
}

// Fetch Dashboard Stats
export async function fetchDashboardStats(): Promise<DashboardStats> {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/stats`, {
      headers: getAuthHeaders(),
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error('Failed to fetch dashboard stats')
    }

    const data = await response.json()
    
    return {
      total_blogs: data.total || 0,
      published_blogs: data.published || 0,
      draft_blogs: data.drafts || 0,
      total_views: data.total_views || 0,
      total_categories: data.total_categories || 0,
      recent_blogs: data.recent_blogs || [],
      popular_categories: data.popular_categories || []
    }
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    throw error
  }
}

// Fetch All Blogs with Filters
export async function fetchAdminBlogs(params?: {
  page?: number
  per_page?: number
  search?: string
  status?: 'published' | 'draft' | 'all'
  category?: string
  sort_by?: 'created_at' | 'title' | 'views'
  sort_order?: 'asc' | 'desc'
}): Promise<PaginatedBlogResponse> {
  try {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.per_page) queryParams.append('per_page', params.per_page.toString())
    if (params?.search) queryParams.append('search', params.search)
    if (params?.status && params.status !== 'all') queryParams.append('status', params.status)
    if (params?.category) queryParams.append('category', params.category)
    if (params?.sort_by) queryParams.append('sort_by', params.sort_by)
    if (params?.sort_order) queryParams.append('sort_order', params.sort_order)

    const response = await fetch(`${API_BASE_URL}/blogs?${queryParams}`, {
      headers: getAuthHeaders(),
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error('Failed to fetch blogs')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching blogs:', error)
    throw error
  }
}

// Fetch Single Blog
export async function fetchAdminBlog(id: number | string): Promise<AdminBlog> {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      headers: getAuthHeaders(),
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error('Failed to fetch blog')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching blog:', error)
    throw error
  }
}

// Create Blog
export async function createBlog(data: Partial<AdminBlog>): Promise<AdminBlog> {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to create blog')
    }

    return await response.json()
  } catch (error) {
    console.error('Error creating blog:', error)
    throw error
  }
}

// Update Blog
export async function updateBlog(id: number | string, data: Partial<AdminBlog>): Promise<AdminBlog> {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to update blog')
    }

    return await response.json()
  } catch (error) {
    console.error('Error updating blog:', error)
    throw error
  }
}

// Delete Blog
export async function deleteBlog(id: number | string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    })

    if (!response.ok) {
      throw new Error('Failed to delete blog')
    }
  } catch (error) {
    console.error('Error deleting blog:', error)
    throw error
  }
}

// Bulk Delete Blogs
export async function bulkDeleteBlogs(ids: number[]): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/blogs/bulk-delete`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ ids })
    })

    if (!response.ok) {
      throw new Error('Failed to bulk delete blogs')
    }
  } catch (error) {
    console.error('Error bulk deleting blogs:', error)
    throw error
  }
}

// Fetch Categories
export async function fetchCategories(): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      headers: getAuthHeaders(),
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error('Failed to fetch categories')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}
