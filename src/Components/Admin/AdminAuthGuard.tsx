'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { isAdminAuthenticated, isAdmin } from '@/lib/auth'

export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.push('/admin/login')
      return
    }

    if (!isAdmin()) {
      router.push('/')
      return
    }
  }, [router])

  if (!isAdminAuthenticated() || !isAdmin()) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  return <>{children}</>
}
