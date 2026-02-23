import { apiClient, ApiError } from '../client'
import type { AuthUser, DummyJsonLoginResponse, DummyJsonMeResponse, UserRole } from '../../features/auth/types'

export const loginUser = async (username: string, password: string): Promise<{ user: AuthUser; token: string }> => {
  let loginData: DummyJsonLoginResponse
  try {
    loginData = await apiClient.post<DummyJsonLoginResponse>('/auth/login', {
      username,
      password,
      expiresInMins: 60,
    })
  } catch (err) {
    if (err instanceof ApiError && (err.status === 400 || err.status === 401)) {
      throw new Error('Invalid credentials')
    }
    throw err
  }

  const meData = await apiClient.get<DummyJsonMeResponse>('/auth/me', {
    headers: { Authorization: `Bearer ${loginData.accessToken}` },
  })

  const role: UserRole = meData.role === 'admin' ? 'admin' : 'user'

  const user: AuthUser = {
    id: meData.id,
    username: meData.username,
    email: meData.email,
    firstName: meData.firstName,
    lastName: meData.lastName,
    image: meData.image,
    role,
  }

  return { user, token: loginData.accessToken }
}
