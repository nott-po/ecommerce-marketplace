import React, { useState } from 'react'
import { useRouter } from '@tanstack/react-router'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import Badge from '@mui/material/Badge'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import SearchIcon from '@mui/icons-material/Search'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import { Logo } from './Logo'
import { useFavorites } from '../../hooks/useFavorites'
import { BRAND_COLORS } from '../../styles/theme'
import { useAuth } from '../../features/auth/AuthContext'

const SearchWrapper = styled('form')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.18)',
  borderRadius: 24,
  padding: '4px 14px',
  width: 280,
  transition: theme.transitions.create('width'),
  '&:focus-within': {
    backgroundColor: 'rgba(255, 255, 255, 0.26)',
    width: 340,
  },
}))

const NavLink = styled(Typography)({
  color: '#ffffff',
  cursor: 'pointer',
  fontSize: '0.875rem',
  whiteSpace: 'nowrap',
  '&:hover': { opacity: 0.85 },
})

export const Navbar: React.FC = () => {
  const router = useRouter()
  const { favorites } = useFavorites()
  const { user, logout } = useAuth()
  const [searchValue, setSearchValue] = useState('')
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleSearchSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    const q = encodeURIComponent(searchValue.trim())
    router.history.push(`/shop?q=${q}&category=&page=0`)
  }

  const handleLogout = () => {
    setAnchorEl(null)
    logout()
    router.history.push('/login')
  }

  return (
    <AppBar position="sticky" sx={{ bgcolor: BRAND_COLORS.primary, zIndex: 1200 }}>
      <Toolbar sx={{ gap: 2, py: 0.5 }}>
        <Logo />

        <SearchWrapper onSubmit={handleSearchSubmit}>
          <IconButton type="submit" size="small" sx={{ color: 'rgba(255,255,255,0.8)', p: 0.5 }}>
            <SearchIcon fontSize="small" />
          </IconButton>
          <InputBase
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            placeholder="Search products…"
            sx={{ color: '#fff', ml: 0.5, flex: 1, fontSize: '0.875rem' }}
            inputProps={{ 'aria-label': 'search products' }}
          />
        </SearchWrapper>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, alignItems: 'center' }}>
          <NavLink onClick={() => router.history.push('/about')}>About us</NavLink>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <IconButton size="small" sx={{ color: '#fff' }}>
            <Badge badgeContent={favorites.size} color="error" max={99}>
              <FavoriteBorderIcon />
            </Badge>
          </IconButton>
          <IconButton size="small" sx={{ color: '#fff' }} onClick={e => setAnchorEl(e.currentTarget)}>
            <PersonOutlineIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
            {user && (
              <MenuItem disabled sx={{ fontSize: '0.8125rem', opacity: '1 !important', fontWeight: 600 }}>
                {user.firstName} {user.lastName}
              </MenuItem>
            )}
            <MenuItem onClick={handleLogout} sx={{ fontSize: '0.875rem', color: 'error.main' }}>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
