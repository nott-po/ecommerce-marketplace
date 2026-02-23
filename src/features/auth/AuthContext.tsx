import React, { createContext, useCallback, useContext, useState } from 'react'
import { loginUser } from '../../api/endpoints/auth'
import type { AuthContextValue, AuthUser } from './types'

const STORAGE_TOKEN = 'auth_token'
const STORAGE_ROLE = 'auth_role'
const STORAGE_USER = 'auth_user'

const readStorage = (): { user: AuthUser | null; token: string | null } => {
  try {
    const token = localStorage.getItem(STORAGE_TOKEN)
    const raw = localStorage.getItem(STORAGE_USER)
    const user = raw ? (JSON.parse(raw) as AuthUser) : null
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
