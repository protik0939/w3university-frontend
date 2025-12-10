// API Configuration and Helper Functions

import { ApiLink } from "./apiLink"

// Type definitions
interface AuthResponse {
  token?: string
  access_token?: string
  user: {
    id: number
    name: string
    email: string
  }
}

// Use localhost for development, Vercel for production
const API_BASE_URL = ApiLink;

// Get auth token from localStorage
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('authToken')
}

// Get current user from localStorage
export function getCurrentUser() {
  if (typeof window === 'undefined') return null
  const userStr = localStorage.getItem('userSession')
  return userStr ? JSON.parse(userStr) : null
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  return !!getAuthToken()
}

// API Request Helper
async function apiRequest<T = unknown>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken()
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include', // Enable credentials for CORS
  })

  const data = await response.json()

  if (!response.ok) {
    // Handle authentication errors
    if (response.status === 401) {
      // Clear invalid token
      localStorage.removeItem('authToken')
      localStorage.removeItem('userSession')
      throw new Error('Session expired. Please login again.')
    }
    throw new Error(data.message || 'Request failed')
  }

  return data
}

// Authentication APIs
export const authAPI = {
  // Register new user
  register: async (userData: {
    name: string
    email: string
    password: string
    password_confirmation: string
  }) => {
    const data = await apiRequest<AuthResponse>('/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    })

    // Store token and user data
    const token = data.token || data.access_token
    if (token) {
      localStorage.setItem('authToken', token)
      // Store user session with proper structure
      const userSession = {
        isLoggedIn: true,
        user: data.user
      }
      localStorage.setItem('userSession', JSON.stringify(userSession))
      console.log('Register - Stored user session:', userSession)
    }

    return data
  },

  // Login user
  login: async (credentials: { email: string; password: string }) => {
    const data = await apiRequest<AuthResponse>('/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })

    // Store token and user data
    const token = data.token || data.access_token
    if (token) {
      localStorage.setItem('authToken', token)
      // Store user session with proper structure
      const userSession = {
        isLoggedIn: true,
        user: data.user
      }
      localStorage.setItem('userSession', JSON.stringify(userSession))
      console.log('Login - Stored user session:', userSession)
    }

    return data
  },

  // Logout user
  logout: async () => {
    try {
      await apiRequest('/logout', { method: 'POST' })
    } finally {
      localStorage.removeItem('authToken')
      localStorage.removeItem('userSession')
    }
  },

  // Get current user
  getCurrentUser: async () => {
    return await apiRequest('/user')
  },
}

// Profile APIs
export const profileAPI = {
  // Get complete profile (uses /user endpoint)
  getProfile: async () => {
    return await apiRequest('/user')
  },

  // Update basic info (name, email)
  updateBasicInfo: async (data: { name?: string; email?: string }) => {
    return await apiRequest('/profile/basic-info', {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  // Update profile details
  updateProfile: async (data: {
    username?: string
    phone?: string
    bio?: string
    github_url?: string
    linkedin_url?: string
    twitter_url?: string
    portfolio_url?: string
    location?: string
    timezone?: string
    date_of_birth?: string
    skill_level?: string
    programming_languages?: string[]
    interests?: string[]
    daily_goal_minutes?: number
    email_notifications?: boolean
    is_public?: boolean
  }) => {
    return await apiRequest('/profile/details', {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  // Upload avatar
  uploadAvatar: async (file: File) => {
    const formData = new FormData()
    formData.append('avatar', file)

    const token = getAuthToken()
    const response = await fetch(`${API_BASE_URL}/profile/avatar`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
      body: formData,
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Avatar upload failed')
    }

    return data
  },

  // Change password
  changePassword: async (data: {
    current_password: string
    new_password: string
    new_password_confirmation: string
  }) => {
    return await apiRequest('/profile/change-password', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },
}

// Favorites APIs
export const favoritesAPI = {
  // Get all favorites
  getFavorites: async (type?: string) => {
    const query = type ? `?type=${type}` : ''
    return await apiRequest(`/profile/favorites${query}`)
  },

  // Add favorite
  addFavorite: async (data: {
    type: 'course' | 'tutorial' | 'blog' | 'tool' | 'resource'
    title: string
    description?: string
    url?: string
    category?: string
    tags?: string[]
    order?: number
  }) => {
    return await apiRequest('/profile/favorites', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  // Update favorite
  updateFavorite: async (id: number, data: Partial<{
    type: 'course' | 'tutorial' | 'blog' | 'tool' | 'resource'
    title: string
    description?: string
    url?: string
    category?: string
    tags?: string[]
    order?: number
  }>) => {
    return await apiRequest(`/profile/favorites/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  // Delete favorite
  deleteFavorite: async (id: number) => {
    return await apiRequest(`/profile/favorites/${id}`, {
      method: 'DELETE',
    })
  },
}

// Activity APIs
export const activityAPI = {
  // Track activity
  trackActivity: async (data: {
    minutes_active: number
    lessons_completed?: number
    exercises_completed?: number
    quizzes_completed?: number
    blogs_read?: number
    comments_posted?: number
    code_snippets_created?: number
  }) => {
    return await apiRequest('/profile/activity', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  // Get activity history
  getActivityHistory: async (days: number = 30) => {
    return await apiRequest(`/profile/activity/history?days=${days}`)
  },
}

// Performance APIs
export const performanceAPI = {
  // Get performance stats
  getPerformance: async () => {
    return await apiRequest('/profile/performance')
  },

  // Award badge
  awardBadge: async (badge: string) => {
    return await apiRequest('/profile/badge', {
      method: 'POST',
      body: JSON.stringify({ badge }),
    })
  },
}

// Public Profile API
export const publicProfileAPI = {
  getPublicProfile: async (userId: number) => {
    return await apiRequest(`/profiles/${userId}`)
  },
}

const api = {
  auth: authAPI,
  profile: profileAPI,
  favorites: favoritesAPI,
  activity: activityAPI,
  performance: performanceAPI,
  publicProfile: publicProfileAPI,
}

export default api
