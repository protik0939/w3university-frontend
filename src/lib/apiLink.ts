export const ApiLink = process.env.NEXT_PUBLIC_PROJECT_STAGE === "development" 
  ? process.env.NEXT_PUBLIC_API_URL 
  : process.env.NEXT_PUBLIC_BACKEND_LINK