import React from 'react'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import { styled } from '@mui/material/styles'
import { slugToLabel } from '../../../utils/formatters'
import type { PriceRange, ConditionFilter } from './FilterBar'
import { ClickableText } from '../../../core/ui/ClickableText'

const PRICE_LABELS: Record<PriceRange, string> = {
  '': '',
  under25: 'Under €25',
  '25to50': '€25 – €50',
  '50to100': '€50 – €100',
  over100: 'Over €100',
}

const FilterChip = styled(Chip)(({ theme }) => ({
  height: 26,
  fontSize: theme.typography.body2.fontSize,
  borderRadius: theme.shape.borderRadius,
}))

const ClearAllText = styled(ClickableText)(({ theme }) => ({
  fontSize: theme.typography.body2.fontSize,
  color: theme.palette.primary.main,
})) as typeof ClickableText

interface ActiveFiltersProps {
  search: string
  category: string
  onSale: boolean
  priceRange: PriceRange
  condition: ConditionFilter
  minRating: number
  onRemove: (key: string) => void
  onClearAll: () => void
}

export const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  search,
  category,
  onSale,
  priceRange,
  condition,
  minRating,
  onRemove,
  onClearAll,
}) => {
  const filters = [
    ...(search ? [{ key: 'search', label: `"${search}"` }] : []),
    ...(category ? [{ key: 'category', label: slugToLabel(category) }] : []),
    ...(onSale ? [{ key: 'onSale', label: 'Sale' }] : []),
    ...(priceRange ? [{ key: 'priceRange', label: PRICE_LABELS[priceRange] }] : []),
    ...(condition ? [{ key: 'condition', label: condition }] : []),
    ...(minRating > 0 ? [{ key: 'minRating', label: `${minRating}★ & up` }] : []),
  ]

  if (filters.length === 0){
    return null;
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, alignItems: 'center', mt: 1 }}>
      {filters.map(f => (
        <FilterChip
          key={f.key}
          label={f.label}
          size="small"
          onDelete={() => onRemove(f.key)}
        />
      ))}

      {filters.length > 1 && (
        <ClearAllText component="span" sx={{ ml: 0.5 }} onClick={onClearAll}>
          Clear all
        </ClearAllText>
      )}
    </Box>
  )
}
