import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { Navbar } from '../shared/ui/Navbar'

export const Route = createFileRoute('/shop')({
  beforeLoad: () => {
    const token = localStorage.getItem('auth_token')
    if (!token) throw redirect({ href: '/login' })
  },
  component: ShopLayoutRoute,
})

function ShopLayoutRoute() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}
