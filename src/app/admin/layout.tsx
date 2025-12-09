import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Portal - Ekushey Coding',
  description: 'Admin dashboard for managing Ekushey Coding Platform',
}

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
