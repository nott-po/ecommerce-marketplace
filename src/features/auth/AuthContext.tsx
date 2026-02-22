import React, { createContext, useCallback, useContext, useState } from 'react'
import { API_BASE_URL } from '../../utils/constants'
import type { AuthContextValue, AuthUser, DummyJsonLoginResponse, DummyJsonMeResponse, UserRole } from './types'

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

  const login = useCallback(async (username: string, password: string) => {
    const loginRes = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, expiresInMins: 60 }),
    })

    if (!loginRes.ok) {
      const err = await loginRes.json().catch(() => ({})) as Record<string, unknown>
      throw new Error(typeof err.message === 'string' ? err.message : 'Invalid credentials')
    }

    const loginData = (await loginRes.json()) as DummyJsonLoginResponse

    const meRes = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${loginData.accessToken}` },
    })

    if (!meRes.ok) throw new Error('Failed to load user profile')

    const meData = (await meRes.json()) as DummyJsonMeResponse
    const role: UserRole = meData.role === 'admin' ? 'admin' : 'user'

    const authUser: AuthUser = {
      id: meData.id,
      username: meData.username,
      email: meData.email,
      firstName: meData.firstName,
      lastName: meData.lastName,
      image: meData.image,
      role,
    }

    localStorage.setItem(STORAGE_TOKEN, loginData.accessToken)
    localStorage.setItem(STORAGE_ROLE, role)
    localStorage.setItem(STORAGE_USER, JSON.stringify(authUser))

    setAuth({ user: authUser, token: loginData.accessToken })
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
