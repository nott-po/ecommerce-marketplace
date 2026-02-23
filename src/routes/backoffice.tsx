import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import Box from '@mui/material/Box'
import { BackofficeNavbar } from '../shared/ui/BackofficeNavbar'
import { BACKOFFICE_COLORS } from '../styles/theme'

export const Route = createFileRoute('/backoffice')({
  beforeLoad: () => {
    const token = localStorage.getItem('auth_token')
    if (!token) throw redirect({ href: '/login' })
    const role = localStorage.getItem('auth_role')
    if (role !== 'admin') throw redirect({ href: '/shop' })
  },
  component: BackofficeLayout,
})

function BackofficeLayout() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: BACKOFFICE_COLORS.pageBg }}>
      <BackofficeNavbar />
      <Outlet />
    </Box>
  )
}
