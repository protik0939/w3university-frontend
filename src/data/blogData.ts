export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  readTime: string
  category: string
  tags: string[]
  imageUrl?: string
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with React Hooks: A Complete Guide',
    excerpt: 'Learn how to use React Hooks to write cleaner, more efficient functional components. This comprehensive guide covers useState, useEffect, and custom hooks.',
    content: 'React Hooks revolutionized the way we write React components...',
    author: 'Sarah Johnson',
    date: '2025-11-20',
    readTime: '8 min read',
    category: 'React',
    tags: ['React', 'JavaScript', 'Web Development'],
  },
  {
    id: '2',
    title: 'Mastering TypeScript: Advanced Types and Patterns',
    excerpt: 'Dive deep into TypeScript advanced types, generics, and design patterns that will make your code more robust and maintainable.',
    content: 'TypeScript has become the go-to language for large-scale JavaScript applications...',
    author: 'Michael Chen',
    date: '2025-11-18',
    readTime: '12 min read',
    category: 'TypeScript',
    tags: ['TypeScript', 'JavaScript', 'Programming'],
  },
  {
    id: '3',
    title: 'CSS Grid vs Flexbox: When to Use Which',
    excerpt: 'Understanding the differences between CSS Grid and Flexbox will help you choose the right layout tool for your projects.',
    content: 'Both CSS Grid and Flexbox are powerful layout systems...',
    author: 'Emily Rodriguez',
    date: '2025-11-15',
    readTime: '6 min read',
    category: 'CSS',
    tags: ['CSS', 'Web Design', 'Layout'],
  },
  {
    id: '4',
    title: 'Building RESTful APIs with Node.js and Express',
    excerpt: 'A step-by-step guide to creating scalable and secure REST APIs using Node.js, Express, and best practices.',
    content: 'RESTful APIs are the backbone of modern web applications...',
    author: 'David Kim',
    date: '2025-11-12',
    readTime: '10 min read',
    category: 'Node.js',
    tags: ['Node.js', 'Express', 'Backend'],
  },
  {
    id: '5',
    title: 'Python for Data Science: NumPy and Pandas Essentials',
    excerpt: 'Master the fundamental libraries for data manipulation and analysis in Python with practical examples and use cases.',
    content: 'Data science with Python starts with understanding NumPy and Pandas...',
    author: 'Dr. Aisha Patel',
    date: '2025-11-10',
    readTime: '15 min read',
    category: 'Python',
    tags: ['Python', 'Data Science', 'Analytics'],
  },
  {
    id: '6',
    title: 'Understanding JavaScript Closures and Scope',
    excerpt: 'Closures are one of the most powerful features in JavaScript. Learn how they work and when to use them effectively.',
    content: 'JavaScript closures often confuse beginners, but they are essential...',
    author: 'James Williams',
    date: '2025-11-08',
    readTime: '7 min read',
    category: 'JavaScript',
    tags: ['JavaScript', 'Programming', 'Fundamentals'],
  },
  {
    id: '7',
    title: 'Next.js 15: What\'s New and How to Upgrade',
    excerpt: 'Explore the latest features in Next.js 15 including Turbopack, improved routing, and performance enhancements.',
    content: 'Next.js 15 brings significant improvements to the framework...',
    author: 'Lisa Anderson',
    date: '2025-11-05',
    readTime: '9 min read',
    category: 'Next.js',
    tags: ['Next.js', 'React', 'Framework'],
  },
  {
    id: '8',
    title: 'Git Best Practices for Team Collaboration',
    excerpt: 'Learn essential Git workflows, branching strategies, and best practices that will make your team more productive.',
    content: 'Effective Git usage is crucial for modern software development teams...',
    author: 'Marcus Thompson',
    date: '2025-11-03',
    readTime: '11 min read',
    category: 'Tools',
    tags: ['Git', 'Version Control', 'DevOps'],
  },
  {
    id: '9',
    title: 'Responsive Web Design: Mobile-First Approach',
    excerpt: 'Discover why mobile-first design is essential and how to implement it effectively in your web projects.',
    content: 'Mobile-first design has become the industry standard...',
    author: 'Nina Martinez',
    date: '2025-11-01',
    readTime: '8 min read',
    category: 'Web Design',
    tags: ['Responsive Design', 'CSS', 'Mobile'],
  },
]
