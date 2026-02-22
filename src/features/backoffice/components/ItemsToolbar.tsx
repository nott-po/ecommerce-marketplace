import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import { styled } from '@mui/material/styles'
import { BACKOFFICE_COLORS, UI_COLORS } from '../../../styles/theme'

const SearchBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: BACKOFFICE_COLORS.pageBg,
  borderRadius: 20,
  padding: '5px 14px',
  gap: 6,
  minWidth: 220,
  border: '1px solid transparent',
  '&:focus-within': { border: `1px solid ${BACKOFFICE_COLORS.primary}` },
})

interface ItemsToolbarProps {
  search: string
  onSearchChange: (v: string) => void
  onAddClick: () => void
}

export const ItemsToolbar: React.FC<ItemsToolbarProps> = ({ search, onSearchChange, onAddClick }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
    <Typography sx={{ fontSize: '1.125rem', fontWeight: 700, color: UI_COLORS.textPrimary }}>
      Maintain Items
    </Typography>

    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
      <SearchBox>
        <SearchIcon sx={{ fontSize: 17, color: UI_COLORS.textTertiary, flexShrink: 0 }} />
        <InputBase
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="Search..."
          sx={{ fontSize: '0.875rem', flex: 1, '& input': { p: 0 } }}
        />
      </SearchBox>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onAddClick}
        sx={{
          bgcolor: BACKOFFICE_COLORS.primary,
          '&:hover': { bgcolor: BACKOFFICE_COLORS.primaryDark },
          borderRadius: 1.5,
          fontWeight: 600,
          fontSize: '0.875rem',
          px: 2,
          py: 0.875,
          boxShadow: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        Add an Item
      </Button>
    </Box>
  </Box>
)
