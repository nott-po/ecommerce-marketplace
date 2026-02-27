import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { Navbar } from '../shared/ui/Navbar'
import { STORAGE_TOKEN } from '../features/auth/AuthContext'

export const Route = createFileRoute('/shop')({
  beforeLoad: () => {
    const token = localStorage.getItem(STORAGE_TOKEN)
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
