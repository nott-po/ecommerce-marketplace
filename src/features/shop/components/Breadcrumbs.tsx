import React from 'react'
import MuiBreadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { styled } from '@mui/material/styles'
import { useRouter } from '@tanstack/react-router'
import { slugToLabel } from '../../../utils/formatters'
import { BRAND_COLORS } from '../../../styles/theme'
import { ClickableText } from '../../../core/ui/ClickableText'

const StyledBreadcrumbs = styled(MuiBreadcrumbs)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontSize: theme.typography.body2.fontSize,
}))

const BreadcrumbLink = styled(ClickableText)({
  color: BRAND_COLORS.primary,
  fontSize: 'inherit',
}) as typeof Typography

const BreadcrumbCurrent = styled(Typography)(({ theme }) => ({
  fontSize: 'inherit',
  color: theme.palette.text.secondary,
}))

interface BreadcrumbsProps {
  category: string
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ category }) => {
  const router = useRouter()

  return (
    <StyledBreadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
      <BreadcrumbLink component="span" onClick={() => router.history.push('/shop')}>
        Home
      </BreadcrumbLink>

      {category ? (
        <BreadcrumbCurrent>{slugToLabel(category)}</BreadcrumbCurrent>
      ) : (
        <BreadcrumbCurrent>All Products</BreadcrumbCurrent>
      )}
    </StyledBreadcrumbs>
  )
}
