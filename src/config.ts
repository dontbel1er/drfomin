let apiUrl = 'http://localhost:3001'
try {
  // @ts-ignore
  if (import.meta.env && import.meta.env.VITE_API_URL) {
    // @ts-ignore
    apiUrl = import.meta.env.VITE_API_URL
  }
} catch {
  // import.meta.env not available in this environment
}
export const API_URL = apiUrl
