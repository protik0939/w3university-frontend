import { ApiLink } from '../apiLink'
import { getAdminToken } from '../auth'

const API_BASE_URL = ApiLink

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
      credentials: 'include',
      cache: 'no-store'
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Dashboard stats API error:', response.status, errorText)
      throw new Error(`Failed to fetch dashboard stats: ${response.status}`)
    }

    const data = await response.json()
    
    return {
      total_blogs: data.total || data.total_blogs || 0,
      published_blogs: data.published || data.published_blogs || 0,
      draft_blogs: data.drafts || data.draft_blogs || 0,
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
      credentials: 'include',
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
      credentials: 'include',
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
      credentials: 'include',
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
      credentials: 'include',
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
      headers: getAuthHeaders(),
      credentials: 'include'
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
      credentials: 'include',
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
      credentials: 'include',
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

// ==================== Exercise Management ====================

// Exercise Interface
export interface AdminExercise {
  id: number
  slug: string
  title: string
  title_bn?: string
  description?: string
  description_bn?: string
  instructions?: string
  instructions_bn?: string
  problem_statement?: string
  problem_statement_bn?: string
  input_description?: string
  input_description_bn?: string
  output_description?: string
  output_description_bn?: string
  sample_input?: string
  sample_input_bn?: string
  sample_output?: string
  sample_output_bn?: string
  difficulty: string
  difficulty_bn?: string
  duration?: number
  duration_bn?: string
  category?: string
  category_bn?: string
  tags?: string[]
  tags_bn?: string[]
  starter_code?: string
  solution_code?: string
  programming_language?: string
  language_id?: string
  language_name?: string
  language_name_bn?: string
  image_url?: string
  views: number
  completions: number
  status: 'published' | 'draft' | 'archived'
  created_at: string
  updated_at: string
  published_at?: string
}

export interface PaginatedExerciseResponse {
  data: AdminExercise[]
  current_page: number
  last_page: number
  per_page: number
  total: number
}

export interface ExerciseStats {
  total: number
  published: number
  drafts: number
  archived: number
  total_views: number
  total_completions: number
  by_difficulty: {
    beginner: number
    intermediate: number
    advanced: number
  }
  by_language: Array<{
    language_name: string
    count: number
  }>
  recent_exercises: Array<{
    id: number
    title: string
    difficulty: string
    views: number
    created_at: string
    status: string
  }>
}

// Fetch Exercise Stats
export async function fetchExerciseStats(): Promise<ExerciseStats> {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/exercises/stats`, {
      headers: getAuthHeaders(),
      credentials: 'include',
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error('Failed to fetch exercise stats')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching exercise stats:', error)
    throw error
  }
}

// Fetch All Exercises with Filters
export async function fetchAdminExercises(params?: {
  page?: number
  per_page?: number
  search?: string
  status?: 'published' | 'draft' | 'archived' | 'all'
  difficulty?: string
  language_id?: string
  category?: string
  sort_by?: 'created_at' | 'title' | 'views' | 'completions'
  sort_order?: 'asc' | 'desc'
}): Promise<PaginatedExerciseResponse> {
  try {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.per_page) queryParams.append('per_page', params.per_page.toString())
    if (params?.search) queryParams.append('search', params.search)
    if (params?.status && params.status !== 'all') queryParams.append('status', params.status)
    if (params?.difficulty) queryParams.append('difficulty', params.difficulty)
    if (params?.language_id) queryParams.append('language_id', params.language_id)
    if (params?.category) queryParams.append('category', params.category)
    if (params?.sort_by) queryParams.append('sort_by', params.sort_by)
    if (params?.sort_order) queryParams.append('sort_order', params.sort_order)

    const response = await fetch(`${API_BASE_URL}/admin/exercises?${queryParams}`, {
      headers: getAuthHeaders(),
      credentials: 'include',
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error('Failed to fetch exercises')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching exercises:', error)
    throw error
  }
}

// Fetch Single Exercise
export async function fetchAdminExercise(id: number | string): Promise<AdminExercise> {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/exercises/${id}`, {
      headers: getAuthHeaders(),
      credentials: 'include',
      cache: 'no-store'
    })

    if (!response.ok) {
      throw new Error('Failed to fetch exercise')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching exercise:', error)
    throw error
  }
}

// Create Exercise
export async function createExercise(data: Partial<AdminExercise>): Promise<AdminExercise> {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/exercises`, {
      method: 'POST',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to create exercise')
    }

    const result = await response.json()
    return result.exercise || result
  } catch (error) {
    console.error('Error creating exercise:', error)
    throw error
  }
}

// Update Exercise
export async function updateExercise(id: number | string, data: Partial<AdminExercise>): Promise<AdminExercise> {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/exercises/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to update exercise')
    }

    const result = await response.json()
    return result.exercise || result
  } catch (error) {
    console.error('Error updating exercise:', error)
    throw error
  }
}

// Delete Exercise
export async function deleteExercise(id: number | string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/exercises/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
      credentials: 'include'
    })

    if (!response.ok) {
      throw new Error('Failed to delete exercise')
    }
  } catch (error) {
    console.error('Error deleting exercise:', error)
    throw error
  }
}

// Bulk Delete Exercises
export async function bulkDeleteExercises(ids: number[]): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/exercises/bulk-delete`, {
      method: 'POST',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify({ ids })
    })

    if (!response.ok) {
      throw new Error('Failed to bulk delete exercises')
    }
  } catch (error) {
    console.error('Error bulk deleting exercises:', error)
    throw error
  }
}

// Bulk Update Exercise Status
export async function bulkUpdateExerciseStatus(ids: number[], status: 'published' | 'draft' | 'archived'): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/exercises/bulk-update-status`, {
      method: 'POST',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify({ ids, status })
    })

    if (!response.ok) {
      throw new Error('Failed to bulk update exercise status')
    }
  } catch (error) {
    console.error('Error bulk updating exercise status:', error)
    throw error
  }
}
