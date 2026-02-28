import React, { useState, useCallback } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Drawer from '@mui/material/Drawer'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import PersonIcon from '@mui/icons-material/Person'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import MenuIcon from '@mui/icons-material/Menu'
import { styled } from '@mui/material/styles'
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

// Desktop nav button — white text on dark AppBar, underline indicates active state
const NavButton = styled(Button)(({ theme }) => ({
  color: 'inherit',
  fontWeight: 400,
  fontSize: theme.typography.labelMd.fontSize,
  textTransform: 'none',
  borderRadius: 0,
  padding: `0 ${theme.spacing(1.5)}`,
  minHeight: 64,
  borderBottom: '2px solid transparent',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderBottomColor: 'rgba(255,255,255,0.4)',
  },
}))

// Mobile drawer nav item — white text + subtle hover/selected backgrounds
const MobileNavItem = styled(ListItemButton)({
  '&.Mui-selected': { backgroundColor: 'rgba(255,255,255,0.1)' },
  '&:hover': { backgroundColor: 'rgba(255,255,255,0.06)' },
  '&.Mui-selected:hover': { backgroundColor: 'rgba(255,255,255,0.14)' },
  '& .MuiListItemText-primary': { color: 'inherit', fontSize: '0.875rem' },
})

export const BackofficeNavbar: React.FC = () => {
  const router = useRouter()
  const pathname = useRouterState({ select: s => s.location.pathname })
  const { user, logout } = useAuth()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleLogout = () => {
    setAnchorEl(null)
    logout()
    router.history.push('/login')
  }

  const isActive = useCallback((path: string) =>
    pathname === path || (path !== '/backoffice' && pathname.startsWith(path))
  , [pathname])

  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: BACKOFFICE_COLORS.navBg, boxShadow: 'none', color: 'common.white' }}>
        <Toolbar sx={{ gap: 1, minHeight: 64, px: 3 }}>
          {/* Hamburger — mobile only */}
          <IconButton
            onClick={() => setMobileOpen(true)}
            sx={{ display: { xs: 'flex', md: 'none' }, color: 'inherit', mr: 0.5, p: 0.75 }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            component="img"
            src="/logo-backoffice.svg"
            alt="2nd Hand Market Backoffice"
            sx={{ height: 48, cursor: 'pointer', mr: 3, flexShrink: 0 }}
            onClick={() => router.history.push('/backoffice')}
          />

          {/* Desktop nav — hidden on mobile */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.25, flex: 1 }}>
            {NAV_LINKS.map(link => (
              <NavButton
                key={link.label}
                onClick={() => router.history.push(link.path)}
                disableRipple
                sx={{
                  fontWeight: isActive(link.path) ? 600 : 400,
                  borderBottomColor: isActive(link.path) ? 'common.white' : undefined,
                }}
              >
                {link.label}
              </NavButton>
            ))}
          </Box>

          {/* Spacer: fills gap on mobile (desktop nav is display:none and not in flow) */}
          <Box sx={{ flex: { xs: 1, md: 0 } }} />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Button sx={{ display: { xs: 'none', sm: 'inline-flex' }, color: 'inherit', textTransform: 'none', fontSize: '0.875rem', fontWeight: 400 }}>
              Checkout
            </Button>
            <IconButton
              onClick={e => setAnchorEl(e.currentTarget)}
              sx={{ color: 'inherit', p: 0.75, gap: 0.25 }}
            >
              <Avatar sx={{ width: 30, height: 30, bgcolor: 'rgba(255,255,255,0.18)', fontSize: 14 }}>
                {user ? (
                  <Typography sx={{ fontSize: 11, fontWeight: 700, color: 'inherit', lineHeight: 1 }}>
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

      {/* Mobile nav drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{ display: { md: 'none' }, '& .MuiDrawer-paper': { width: 260, bgcolor: BACKOFFICE_COLORS.navBg, color: 'common.white' } }}
      >
        <Box sx={{ pt: 1 }}>
          {NAV_LINKS.map(link => (
            <MobileNavItem
              key={link.label}
              selected={isActive(link.path)}
              onClick={() => { router.history.push(link.path); setMobileOpen(false) }}
            >
              <ListItemText
                primary={link.label}
                slotProps={{ primary: { style: { fontWeight: isActive(link.path) ? 600 : 400 } } }}
              />
            </MobileNavItem>
          ))}
        </Box>
      </Drawer>
    </>
  )
}
