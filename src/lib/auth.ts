// Authentication utility functions
const API_BASE_URL = 'https://backend-w3university.vercel.app/api'

export interface AdminUser {
  id: number
  name: string
  email: string
  role: string
  created_at: string
}

export interface LoginResponse {
  token: string
  user: AdminUser
}

// Admin login
export async function adminLogin(email: string, password: string): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Invalid credentials')
    }
    throw new Error('Login failed')
  }

  const data = await response.json()
  
  // Check if user has admin role
  if (!data.user || (data.user.role !== 'admin' && data.user.role !== 'super_admin')) {
    throw new Error('Access denied. Admin privileges required.')
  }
  
  // Store token and user in localStorage
  if (typeof window !== 'undefined') {
    const token = data.token || data.access_token
    localStorage.setItem('adminToken', token)
    localStorage.setItem('adminUser', JSON.stringify(data.user))
  }

  return {
    token: data.token || data.access_token,
    user: data.user
  }
}

// Admin logout
export function adminLogout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
  }
}

// Get current admin user
export function getAdminUser(): AdminUser | null {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('adminUser')
    if (userStr) {
      try {
        return JSON.parse(userStr)
      } catch {
        return null
      }
    }
  }
  return null
}

// Check if user is authenticated
export function isAdminAuthenticated(): boolean {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('adminToken')
    const user = getAdminUser()
    return !!(token && user)
  }
  return false
}

// Check if user is admin
export function isAdmin(): boolean {
  const user = getAdminUser()
  return user?.role === 'admin' || user?.role === 'super_admin'
}

// Get auth token
export function getAdminToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('adminToken')
  }
  return null
}
