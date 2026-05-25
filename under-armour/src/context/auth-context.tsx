import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { auth, setToken, clearToken, getToken } from '@/lib/api'
import type { User } from '@/lib/api'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = getToken()
    if (token) {
      auth.getUser()
        .then(setUser)
        .catch(() => {
          clearToken()
        })
        .finally(() => setIsLoading(false))
    } else {
      setIsLoading(false)
    }
  }, [])

  const login = async (email: string, password: string) => {
    const res = await auth.login({ email, password })
    setToken(res.token)
    localStorage.setItem('ua_user', JSON.stringify(res.user))
    setUser(res.user)
  }

  const register = async (name: string, email: string, password: string) => {
    const res = await auth.register({ name, email, password, password_confirmation: password } as any)
    setToken(res.token)
    localStorage.setItem('ua_user', JSON.stringify(res.user))
    setUser(res.user)
  }

  const logout = async () => {
    try {
      await auth.logout()
    } catch {}
    clearToken()
    setUser(null)
  }

  const updateProfile = async (data: Partial<User>) => {
    const res = await auth.updateUser(data)
    setUser(res.user)
    localStorage.setItem('ua_user', JSON.stringify(res.user))
  }

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      updateProfile,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
