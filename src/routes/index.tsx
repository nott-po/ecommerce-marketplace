import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    const token = localStorage.getItem('auth_token')
    if (!token) throw redirect({ href: '/login' })
    const role = localStorage.getItem('auth_role')
    throw redirect({ href: role === 'admin' ? '/backoffice' : '/shop' })
  },
  component: () => null,
})
