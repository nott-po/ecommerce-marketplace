export type UserRole = 'admin' | 'user'

export interface AuthUser {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  image: string
  role: UserRole
}

export interface AuthContextValue {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<AuthUser>
  logout: () => void
}

export interface DummyJsonLoginResponse {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
  accessToken: string
  refreshToken: string
}

export interface DummyJsonMeResponse {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  image: string
  role: string
}

