import React, { createContext, useCallback, useContext, useState } from 'react'
import { loginUser } from '../../api/endpoints/auth'
import type { AuthContextValue, AuthUser } from './types'

export const STORAGE_TOKEN = 'auth_token'
export const STORAGE_ROLE = 'auth_role'
const STORAGE_USER = 'auth_user'

const isAuthUser = (v: unknown): v is AuthUser => {
  if (typeof v !== 'object' || v === null) return false
  const o = v as Record<string, unknown>
  return (
    typeof o.id === 'number' &&
    typeof o.username === 'string' &&
    typeof o.email === 'string' &&
    typeof o.firstName === 'string' &&
    typeof o.lastName === 'string' &&
    typeof o.image === 'string' &&
    (o.role === 'admin' || o.role === 'user')
  )
}

const readStorage = (): { user: AuthUser | null; token: string | null } => {
  try {
    const token = localStorage.getItem(STORAGE_TOKEN)
    const raw = localStorage.getItem(STORAGE_USER)
    const parsed: unknown = raw ? JSON.parse(raw) : null
    const user = isAuthUser(parsed) ? parsed : null
    return { token, user }
  } catch {
    return { user: null, token: null }
  }
}

const AuthContext = createContext<AuthContextValue | null>(null)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [{ user, token }, setAuth] = useState(readStorage)

  const login = useCallback(async (username: string, password: string): Promise<AuthUser> => {
    const { user: authUser, token: accessToken } = await loginUser(username, password)

    localStorage.setItem(STORAGE_TOKEN, accessToken)
    localStorage.setItem(STORAGE_ROLE, authUser.role)
    localStorage.setItem(STORAGE_USER, JSON.stringify(authUser))

    setAuth({ user: authUser, token: accessToken })
    return authUser
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_TOKEN)
    localStorage.removeItem(STORAGE_ROLE)
    localStorage.removeItem(STORAGE_USER)
    setAuth({ user: null, token: null })
  }, [])

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
