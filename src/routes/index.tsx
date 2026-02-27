import { createFileRoute, redirect } from '@tanstack/react-router'
import { STORAGE_ROLE, STORAGE_TOKEN } from '../features/auth/AuthContext'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    const token = localStorage.getItem(STORAGE_TOKEN)
    if (!token) throw redirect({ href: '/login' })
    const role = localStorage.getItem(STORAGE_ROLE)
    throw redirect({ href: role === 'admin' ? '/backoffice' : '/shop' })
  },
  component: () => null,
})
