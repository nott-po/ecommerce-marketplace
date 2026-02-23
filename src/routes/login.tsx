import { createFileRoute, redirect } from '@tanstack/react-router'
import { LoginPage } from '../features/auth/pages/LoginPage'

export const Route = createFileRoute('/login')({
  beforeLoad: () => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      const role = localStorage.getItem('auth_role')
      throw redirect({ href: role === 'admin' ? '/backoffice' : '/shop' })
    }
  },
  component: LoginPage,
})
