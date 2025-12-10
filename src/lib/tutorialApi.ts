// Tutorial API utility functions
const API_BASE_URL = 'https://backend-w3university.vercel.app/api'

export interface Tutorial {
  id: number
  language_id: string
  title: string
  content: string
  code_example: string | null
  order: number
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface CreateTutorialData {
  language_id: string
  title: string
  content: string
  code_example?: string
  order?: number
  is_published?: boolean
}

export interface UpdateTutorialData {
  language_id?: string
  title?: string
  content?: string
  code_example?: string
  order?: number
  is_published?: boolean
}

export const tutorialAPI = {
  /**
   * Get all tutorials
   */
  async getAll(params?: {
    language_id?: string
    is_published?: boolean
    search?: string
    per_page?: number
  }): Promise<Tutorial[]> {
    const searchParams = new URLSearchParams()
    
    if (params?.language_id) searchParams.append('language_id', params.language_id)
    if (params?.is_published !== undefined) searchParams.append('is_published', params.is_published.toString())
    if (params?.search) searchParams.append('search', params.search)
    if (params?.per_page) searchParams.append('per_page', params.per_page.toString())

    const url = `${API_BASE_URL}/tutorials${searchParams.toString() ? '?' + searchParams.toString() : ''}`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch tutorials: ${response.statusText}`)
    }

    return response.json()
  },

  /**
   * Get tutorials for a specific language
   */
  async getByLanguage(languageId: string): Promise<Tutorial[]> {
    return this.getAll({ language_id: languageId })
  },

  /**
   * Get a single tutorial by ID
   */
  async getById(id: number): Promise<Tutorial> {
    const response = await fetch(`${API_BASE_URL}/tutorials/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch tutorial: ${response.statusText}`)
    }

    return response.json()
  },

  /**
   * Get all available languages that have tutorials
   */
  async getLanguages(): Promise<string[]> {
    const response = await fetch(`${API_BASE_URL}/tutorials/languages`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch languages: ${response.statusText}`)
    }

    return response.json()
  },

  /**
   * Create a new tutorial (requires authentication)
   */
  async create(data: CreateTutorialData, token: string): Promise<{ message: string; tutorial: Tutorial }> {
    const response = await fetch(`${API_BASE_URL}/tutorials`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to create tutorial')
    }

    return response.json()
  },

  /**
   * Update an existing tutorial (requires authentication)
   */
  async update(id: number, data: UpdateTutorialData, token: string): Promise<{ message: string; tutorial: Tutorial }> {
    const response = await fetch(`${API_BASE_URL}/tutorials/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to update tutorial')
    }

    return response.json()
  },

  /**
   * Delete a tutorial (requires authentication)
   */
  async delete(id: number, token: string): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/tutorials/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to delete tutorial')
    }

    return response.json()
  },

  /**
   * Bulk delete tutorials (requires authentication)
   */
  async bulkDelete(ids: number[], token: string): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/tutorials/bulk-delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ ids }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to bulk delete tutorials')
    }

    return response.json()
  },

  /**
   * Bulk update tutorial published status (requires authentication)
   */
  async bulkUpdateStatus(ids: number[], isPublished: boolean, token: string): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/tutorials/bulk-update-status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ ids, is_published: isPublished }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to bulk update status')
    }

    return response.json()
  },

  // ============= ADMIN ROUTES =============

  /**
   * Admin: Get all tutorials (including unpublished)
   */
  async adminGetAll(params: {
    language_id?: string
    search?: string
    per_page?: number
  } = {}, token: string): Promise<Tutorial[]> {
    const searchParams = new URLSearchParams()
    
    if (params?.language_id) searchParams.append('language_id', params.language_id)
    if (params?.search) searchParams.append('search', params.search)
    if (params?.per_page) searchParams.append('per_page', params.per_page.toString())

    const url = `${API_BASE_URL}/admin/tutorials${searchParams.toString() ? '?' + searchParams.toString() : ''}`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch tutorials: ${response.statusText}`)
    }

    return response.json()
  },

  /**
   * Admin: Create tutorial
   */
  async adminCreate(data: CreateTutorialData, token: string): Promise<{ message: string; tutorial: Tutorial }> {
    const response = await fetch(`${API_BASE_URL}/admin/tutorials`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to create tutorial' }))
      throw new Error(error.message || 'Failed to create tutorial')
    }

    return response.json()
  },

  /**
   * Admin: Update tutorial
   */
  async adminUpdate(id: number, data: UpdateTutorialData, token: string): Promise<{ message: string; tutorial: Tutorial }> {
    const response = await fetch(`${API_BASE_URL}/admin/tutorials/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to update tutorial' }))
      throw new Error(error.message || 'Failed to update tutorial')
    }

    return response.json()
  },

  /**
   * Admin: Delete tutorial
   */
  async adminDelete(id: number, token: string): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/admin/tutorials/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to delete tutorial' }))
      throw new Error(error.message || 'Failed to delete tutorial')
    }

    return response.json()
  },

  /**
   * Admin: Bulk delete tutorials
   */
  async adminBulkDelete(ids: number[], token: string): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/admin/tutorials/bulk-delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ ids }),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to bulk delete' }))
      throw new Error(error.message || 'Failed to bulk delete tutorials')
    }

    return response.json()
  },

  /**
   * Admin: Bulk update status
   */
  async adminBulkUpdateStatus(ids: number[], isPublished: boolean, token: string): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/admin/tutorials/bulk-update-status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ ids, is_published: isPublished }),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Failed to bulk update status' }))
      throw new Error(error.message || 'Failed to bulk update status')
    }

    return response.json()
  },
}
