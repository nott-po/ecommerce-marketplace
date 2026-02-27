import { createFileRoute, redirect } from '@tanstack/react-router'
import { LoginPage } from '../features/auth/pages/LoginPage'
import { STORAGE_ROLE, STORAGE_TOKEN } from '../features/auth/AuthContext'

export const Route = createFileRoute('/login')({
  beforeLoad: () => {
    const token = localStorage.getItem(STORAGE_TOKEN)
    if (token) {
      const role = localStorage.getItem(STORAGE_ROLE)
      throw redirect({ href: role === 'admin' ? '/backoffice' : '/shop' })
    }
  },
  component: LoginPage,
})
