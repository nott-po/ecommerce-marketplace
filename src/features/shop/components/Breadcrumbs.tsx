import React from 'react'
import MuiBreadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { useRouter } from '@tanstack/react-router'
import { slugToLabel } from '../../../utils/formatters'
import { BRAND_COLORS } from '../../../styles/theme'

interface BreadcrumbsProps {
  category: string
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ category }) => {
  const router = useRouter()

  return (
    <MuiBreadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      sx={{ mb: 2, fontSize: '0.8125rem' }}
    >
      <Typography
        component="span"
        onClick={() => router.history.push('/shop')}
        sx={{ color: BRAND_COLORS.primary, fontSize: 'inherit', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
      >
        Home
      </Typography>

      {category ? (
        <Typography sx={{ fontSize: 'inherit', color: 'text.secondary' }}>
          {slugToLabel(category)}
        </Typography>
      ) : (
        <Typography sx={{ fontSize: 'inherit', color: 'text.secondary' }}>All Products</Typography>
      )}
    </MuiBreadcrumbs>
  )
}
