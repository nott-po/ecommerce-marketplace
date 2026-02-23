import React from 'react'
import Chip from '@mui/material/Chip'
import { STATUS_COLORS } from '../../styles/theme'

type BadgeVariant = 'new' | 'sale' | 'reserved' | 'low-stock' | 'out-of-stock'

interface StatusBadgeProps {
  variant: BadgeVariant
  label?: string
}

const BADGE_STYLES: Record<BadgeVariant, { bgcolor: string; color: string }> = {
  new:            { bgcolor: '#4b9ef4',              color: '#fff' },
  sale:           { bgcolor: STATUS_COLORS.reserved,  color: '#fff' },
  reserved:       { bgcolor: STATUS_COLORS.reserved,  color: '#fff' },
  'low-stock':    { bgcolor: STATUS_COLORS.lowStock,  color: '#fff' },
  'out-of-stock': { bgcolor: STATUS_COLORS.locked,    color: '#fff' },
}

const DEFAULT_LABELS: Record<BadgeVariant, string> = {
  new:            'New',
  sale:           'Sale',
  reserved:       'Reserved',
  'low-stock':    'Low Stock',
  'out-of-stock': 'Out of Stock',
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ variant, label }) => (
  <Chip
    label={label ?? DEFAULT_LABELS[variant]}
    size="small"
    sx={{
      ...BADGE_STYLES[variant],
      height: 20,
      fontSize: '0.7rem',
      fontWeight: 600,
      borderRadius: 2,
      '& .MuiChip-label': { px: 0.75 },
    }}
  />
)
