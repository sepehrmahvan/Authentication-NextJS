// localStorage utility functions
export const localStorageUtils = {
  // Set user phone in localStorage
  setUserPhone: (phone: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('userPhone', phone)
    }
  },

  // Get user phone from localStorage
  getUserPhone: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userPhone')
    }
    return null
  },

  // Remove user phone from localStorage (logout)
  removeUserPhone: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userPhone')
    }
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('userPhone')
    }
    return false
  }
} 