import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import PersonIcon from '@mui/icons-material/Person'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { useRouter, useRouterState } from '@tanstack/react-router'
import { useAuth } from '../../features/auth/AuthContext'
import { BACKOFFICE_COLORS } from '../../styles/theme'

const NAV_LINKS = [
  { label: 'Maintain Items', path: '/backoffice' },
  { label: 'Master Data', path: '/backoffice/master-data' },
  { label: 'User Management', path: '/backoffice/users' },
  { label: 'Reporting', path: '/backoffice/reporting' },
  { label: 'Settlement BC', path: '/backoffice/settlement' },
]

export const BackofficeNavbar: React.FC = () => {
  const router = useRouter()
  const pathname = useRouterState({ select: s => s.location.pathname })
  const { user, logout } = useAuth()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleLogout = () => {
    setAnchorEl(null)
    logout()
    router.history.push('/login')
  }

  return (
    <AppBar position="sticky" sx={{ bgcolor: BACKOFFICE_COLORS.navBg, boxShadow: 'none' }}>
      <Toolbar sx={{ gap: 1, minHeight: 64, px: 3 }}>
        <Box
          component="img"
          src="/logo-backoffice.svg"
          alt="2nd Hand Market Backoffice"
          sx={{ height: 48, cursor: 'pointer', mr: 3, flexShrink: 0 }}
          onClick={() => router.history.push('/backoffice')}
        />

        <Box sx={{ display: 'flex', gap: 0.25, flex: 1 }}>
          {NAV_LINKS.map(link => {
            const isActive =
              pathname === link.path ||
              (link.path !== '/backoffice' && pathname.startsWith(link.path))
            return (
              <Button
                key={link.label}
                onClick={() => router.history.push(link.path)}
                disableRipple
                sx={{
                  color: '#fff',
                  fontWeight: isActive ? 600 : 400,
                  fontSize: '0.875rem',
                  textTransform: 'none',
                  borderRadius: 0,
                  px: 1.5,
                  py: 0,
                  minHeight: 64,
                  borderBottom: isActive ? '2px solid #fff' : '2px solid transparent',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.06)', borderBottomColor: 'rgba(255,255,255,0.4)' },
                }}
              >
                {link.label}
              </Button>
            )
          })}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Button sx={{ color: '#fff', textTransform: 'none', fontSize: '0.875rem', fontWeight: 400 }}>
            Checkout
          </Button>
          <IconButton
            onClick={e => setAnchorEl(e.currentTarget)}
            sx={{ color: '#fff', p: 0.75, gap: 0.25 }}
          >
            <Avatar sx={{ width: 30, height: 30, bgcolor: 'rgba(255,255,255,0.18)', fontSize: 14 }}>
              {user ? (
                <Typography sx={{ fontSize: 11, fontWeight: 700, color: '#fff', lineHeight: 1 }}>
                  {user.firstName[0]}{user.lastName[0]}
                </Typography>
              ) : (
                <PersonIcon sx={{ fontSize: 17 }} />
              )}
            </Avatar>
            <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
            {user && (
              <MenuItem disabled sx={{ fontSize: '0.8125rem', opacity: '1 !important', fontWeight: 600 }}>
                {user.firstName} {user.lastName}
              </MenuItem>
            )}
            <MenuItem
              onClick={() => { setAnchorEl(null); router.history.push('/shop') }}
              sx={{ fontSize: '0.875rem' }}
            >
              Go to Shop
            </MenuItem>
            <MenuItem onClick={handleLogout} sx={{ fontSize: '0.875rem', color: 'error.main' }}>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
