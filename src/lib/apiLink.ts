// API Link Configuration
// Switches between development and production API URLs based on environment

const isDevelopment = process.env.NEXT_PUBLIC_PROJECT_STAGE === "development"

export const ApiLink = isDevelopment
  ? (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api')
  : (process.env.NEXT_PUBLIC_BACKEND_LINK || 'https://backend-w3university.vercel.app/api')

// Log the API URL being used (only in browser)
if (typeof window !== 'undefined') {
  console.log('API Link:', ApiLink)
  console.log('Environment:', isDevelopment ? 'Development' : 'Production')
}
