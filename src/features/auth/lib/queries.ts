import { useMutation } from '@tanstack/react-query'
import { useAuth } from '../AuthContext'
import type { AuthUser } from '../types'

export const useLoginMutation = () => {
  const { login } = useAuth()
  return useMutation<AuthUser, Error, { username: string; password: string }>({
    mutationFn: ({ username, password }) => login(username, password),
  })
}
