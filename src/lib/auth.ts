const API_BASE_URL = 'https://backend-w3university.vercel.app/api'

// Admin login
export async function adminLogin(email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Login failed' }))
    throw new Error(error.message || 'Login failed')
  }

  const data = await response.json()

  // Validate user role
  if (!data.user || (data.user.role !== 'admin' && data.user.role !== 'super_admin')) {
    throw new Error('Access denied. Admin privileges required.')
  }

  // Handle both token formats (Laravel may return 'token' or 'access_token')
  const token = data.token || data.access_token
  if (!token) {
    throw new Error('No authentication token received')
  }

  // Store token and user data
  localStorage.setItem('admin_token', token)
  localStorage.setItem('admin_user', JSON.stringify(data.user))

  return data
}

// Admin logout
export function adminLogout() {
  localStorage.removeItem('admin_token')
  localStorage.removeItem('admin_user')
}

// Get admin user
export function getAdminUser() {
  if (typeof window === 'undefined') return null
  const userStr = localStorage.getItem('admin_user')
  return userStr ? JSON.parse(userStr) : null
}

// Check if admin is authenticated
export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  return !!localStorage.getItem('admin_token')
}

// Check if user is admin
export function isAdmin(): boolean {
  const user = getAdminUser()
  return user?.role === 'admin' || user?.role === 'super_admin'
}

// Get admin token
export function getAdminToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('admin_token')
}
