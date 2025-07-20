'use client'

import { ReactNode, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { localStorageUtils } from '../../utils/localStorage'

interface AuthProps {
  children: ReactNode
}

export default function Auth({ children }: AuthProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Don't protect login page
    if (pathname === '/login') {
      setIsLoading(false)
      return
    }

    // Check localStorage for user phone
    const isAuth = localStorageUtils.isAuthenticated()
    
    if (isAuth) {
      setIsAuthenticated(true)
    } else {
      // Redirect to login if no phone found
      router.push('/login')
    }
    
    setIsLoading(false)
  }, [router, pathname])

  // Don't protect login page
  if (pathname === '/login') {
    return <>{children}</>
  }

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px'
      }}>
        در حال بارگذاری...
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect to login
  }

  return <>{children}</>
}