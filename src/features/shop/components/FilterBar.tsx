import React from 'react'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Chip from '@mui/material/Chip'
import { styled } from '@mui/material/styles'
import { BRAND_COLORS, UI_COLORS } from '../../../styles/theme'

export type PriceRange = '' | 'under25' | '25to50' | '50to100' | 'over100'
export type ConditionFilter = '' | 'In Stock' | 'Low Stock' | 'Out of Stock'

export interface FilterBarValues {
  sort: string
  order: 'asc' | 'desc'
  onSale: boolean
  priceRange: PriceRange
  condition: ConditionFilter
  minRating: number
}

export const DEFAULT_FILTER_VALUES: FilterBarValues = {
  sort: 'title',
  order: 'asc',
  onSale: false,
  priceRange: '',
  condition: '',
  minRating: 0,
}

interface FilterBarProps {
  values: FilterBarValues
  onChange: (values: FilterBarValues) => void
}

const PillFormControl = styled(FormControl)({
  '& .MuiOutlinedInput-root': {
    height: 36,
    fontSize: '0.8125rem',
    backgroundColor: 'white',
    borderRadius: 20,
    '& fieldset': { borderColor: UI_COLORS.border },
    '&:hover fieldset': { borderColor: UI_COLORS.borderStrong },
    '& .MuiSelect-select': {
      paddingTop: 7,
      paddingBottom: 7,
      paddingLeft: 14,
      paddingRight: '32px !important',
    },
  },
})

const PRICE_LABELS: Record<PriceRange, string> = {
  '': 'Price',
  under25: 'Under €25',
  '25to50': '€25 – €50',
  '50to100': '€50 – €100',
  over100: 'Over €100',
}

const RATING_LABELS: Record<string, string> = {
  '0': 'Rating',
  '4': '4★ & up',
  '3': '3★ & up',
  '2': '2★ & up',
}

const SORT_LABELS: Record<string, string> = {
  title_asc: 'Name A–Z',
  title_desc: 'Name Z–A',
  price_asc: 'Price: Low–High',
  price_desc: 'Price: High–Low',
  rating_desc: 'Top Rated',
}

export const FilterBar: React.FC<FilterBarProps> = ({ values, onChange }) => {
  const set = (patch: Partial<FilterBarValues>) => onChange({ ...values, ...patch })

  return (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
      {/* Price */}
      <PillFormControl size="small" sx={{ minWidth: 110 }}>
        <Select
          value={values.priceRange}
          displayEmpty
          renderValue={v => PRICE_LABELS[v as PriceRange]}
          onChange={(e: SelectChangeEvent) => set({ priceRange: e.target.value as PriceRange })}
        >
          <MenuItem value="">Any price</MenuItem>
          <MenuItem value="under25">Under €25</MenuItem>
          <MenuItem value="25to50">€25 – €50</MenuItem>
          <MenuItem value="50to100">€50 – €100</MenuItem>
          <MenuItem value="over100">Over €100</MenuItem>
        </Select>
      </PillFormControl>

      {/* Condition */}
      <PillFormControl size="small" sx={{ minWidth: 130 }}>
        <Select
          value={values.condition}
          displayEmpty
          renderValue={v => (v as string) || 'Condition'}
          onChange={(e: SelectChangeEvent) => set({ condition: e.target.value as ConditionFilter })}
        >
          <MenuItem value="">Any condition</MenuItem>
          <MenuItem value="In Stock">In Stock</MenuItem>
          <MenuItem value="Low Stock">Low Stock</MenuItem>
          <MenuItem value="Out of Stock">Out of Stock</MenuItem>
        </Select>
      </PillFormControl>

      {/* Rating */}
      <PillFormControl size="small" sx={{ minWidth: 110 }}>
        <Select
          value={String(values.minRating)}
          displayEmpty
          renderValue={v => RATING_LABELS[v as string] ?? 'Rating'}
          onChange={(e: SelectChangeEvent) => set({ minRating: Number(e.target.value) })}
        >
          <MenuItem value="0">Any rating</MenuItem>
          <MenuItem value="4">4★ & up</MenuItem>
          <MenuItem value="3">3★ & up</MenuItem>
          <MenuItem value="2">2★ & up</MenuItem>
        </Select>
      </PillFormControl>

      {/* Sort */}
      <PillFormControl size="small" sx={{ minWidth: 140 }}>
        <Select
          value={`${values.sort}_${values.order}`}
          displayEmpty
          renderValue={v => SORT_LABELS[v as string] ?? 'Sort by'}
          onChange={(e: SelectChangeEvent) => {
            const [s, o] = e.target.value.split('_')
            set({ sort: s, order: o as 'asc' | 'desc' })
          }}
        >
          <MenuItem value="title_asc">Name A–Z</MenuItem>
          <MenuItem value="title_desc">Name Z–A</MenuItem>
          <MenuItem value="price_asc">Price: Low to High</MenuItem>
          <MenuItem value="price_desc">Price: High to Low</MenuItem>
          <MenuItem value="rating_desc">Top Rated</MenuItem>
        </Select>
      </PillFormControl>

      {/* Sale chip */}
      <Chip
        label="Sale"
        clickable
        onClick={() => set({ onSale: !values.onSale })}
        onDelete={values.onSale ? () => set({ onSale: false }) : undefined}
        sx={{
          height: 36,
          borderRadius: 20,
          fontWeight: 600,
          fontSize: '0.8125rem',
          px: 0.5,
          bgcolor: values.onSale ? BRAND_COLORS.primary : 'white',
          color: values.onSale ? 'white' : 'text.primary',
          border: `1px solid ${values.onSale ? BRAND_COLORS.primary : UI_COLORS.border}`,
          '& .MuiChip-deleteIcon': { color: values.onSale ? 'rgba(255,255,255,0.7)' : undefined },
          '&:hover': { bgcolor: values.onSale ? BRAND_COLORS.primaryDark : UI_COLORS.bgPage },
        }}
      />
    </Box>
  )
}
