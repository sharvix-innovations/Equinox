import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { authService } from '@/services/auth.service'

const AuthContext = createContext(null)
const STORAGE_KEY = 'equinox.admin.session'

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [ready, setReady] = useState(false)

  // Restore a persisted session on first load.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setSession(JSON.parse(raw))
    } catch {
      /* ignore corrupt storage */
    }
    setReady(true)
  }, [])

  const login = useCallback(async (credentials) => {
    const result = await authService.login(credentials)
    setSession(result)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(result))
    return result
  }, [])

  const logout = useCallback(async () => {
    await authService.logout()
    setSession(null)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user: session?.user ?? null,
        isAuthenticated: Boolean(session?.token),
        ready,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>')
  return ctx
}
