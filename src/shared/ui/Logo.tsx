import React from 'react'
import { Link } from '@tanstack/react-router'
import Box from '@mui/material/Box'

export const Logo: React.FC = () => (
  <Link to="/shop" search={{ q: '', category: '', page: 0, sort: 'title', order: 'asc' }} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
    <Box
      component="img"
      src="/logo.svg"
      alt="2nd Hand Market"
      sx={{ height: 44, width: 'auto', objectFit: 'contain' }}
    />
  </Link>
)
