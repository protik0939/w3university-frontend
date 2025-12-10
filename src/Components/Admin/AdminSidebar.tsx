'use client'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { isAdminAuthenticated, adminLogout, getAdminUser } from '@/lib/auth'
import { useToast } from '@/Components/Providers/ToastProvider'
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  ChevronRight,
  Terminal,
  Code
} from 'lucide-react'
import Link from 'next/link'

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminSidebar({ children }: AdminLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { showToast } = useToast()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const user = getAdminUser()

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.push('/admin/login')
    }
  }, [router])

  const handleLogout = () => {
    adminLogout()
    showToast('Logged out successfully', 'success')
    router.push('/admin/login')
  }

  const menuItems = [
    {
      name: 'Dashboard',
      icon: LayoutDashboard,
      href: '/admin/dashboard',
      active: pathname === '/admin/dashboard'
    },
    {
      name: 'Blogs',
      icon: FileText,
      href: '/admin/blogs',
      active: pathname?.startsWith('/admin/blogs')
    },
    {
      name: 'Exercises',
      icon: Code,
      href: '/admin/exercises',
      active: pathname?.startsWith('/admin/exercises')
    },
    {
      name: 'Settings',
      icon: Settings,
      href: '/admin/settings',
      active: pathname === '/admin/settings'
    }
  ]

  if (!isAdminAuthenticated()) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      {/* Sidebar - Desktop */}
      <aside className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ${
        sidebarOpen ? 'w-64' : 'w-20'
      } hidden lg:block`}>
        <div className="h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col transition-colors">
          {/* Logo */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
            {sidebarOpen ? (
              <div className="flex items-center gap-2">
                <Terminal size={20} className="text-green-500" />
                <span className="font-bold text-gray-900 dark:text-white">Admin Portal</span>
              </div>
            ) : (
              <Terminal size={20} className="text-green-500 mx-auto" />
            )}
          </div>

          {/* Menu Items */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${
                    item.active
                      ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  title={!sidebarOpen ? item.name : undefined}
                >
                  <Icon size={20} />
                  {sidebarOpen && (
                    <>
                      <span className="flex-1 font-medium">{item.name}</span>
                      {item.active && <ChevronRight size={16} />}
                    </>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* User Section */}
          <div className="border-t border-gray-200 dark:border-gray-800 p-3">
            {sidebarOpen ? (
              <div className="flex items-center gap-3 px-3 py-2">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                    {user?.name?.charAt(0).toUpperCase() || 'A'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {user?.name || 'Admin'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user?.email || 'admin@ekusheycoding.com'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                  {user?.name?.charAt(0).toUpperCase() || 'A'}
                </span>
              </div>
            )}
            
            <button
              onClick={handleLogout}
              className={`w-full mt-2 flex items-center gap-3 px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all ${
                !sidebarOpen && 'justify-center'
              }`}
            >
              <LogOut size={18} />
              {sidebarOpen && <span className="font-medium">Logout</span>}
            </button>
          </div>

          {/* Toggle Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute -right-3 top-20 w-6 h-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <ChevronRight size={14} className={`transition-transform ${!sidebarOpen && 'rotate-180'}`} />
          </button>
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg"
      >
        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="lg:hidden fixed top-0 left-0 z-50 h-screen w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col">
            <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <Terminal size={20} className="text-green-500" />
                <span className="font-bold text-gray-900 dark:text-white">Admin Portal</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      item.active
                        ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="flex-1 font-medium">{item.name}</span>
                  </Link>
                )
              })}
            </nav>

            <div className="border-t border-gray-200 dark:border-gray-800 p-3">
              <div className="flex items-center gap-3 px-3 py-2">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                    {user?.name?.charAt(0).toUpperCase() || 'A'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {user?.name || 'Admin'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user?.email || 'admin@ekusheycoding.com'}
                  </p>
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                className="w-full mt-2 flex items-center gap-3 px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
              >
                <LogOut size={18} />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </aside>
        </>
      )}

      {/* Main Content */}
      <main className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        {children}
      </main>
    </div>
  )
}
