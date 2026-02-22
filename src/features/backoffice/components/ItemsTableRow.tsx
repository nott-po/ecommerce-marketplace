import React from 'react'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Checkbox from '@mui/material/Checkbox'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useRouter } from '@tanstack/react-router'
import type { BackofficeItem, ItemStatus } from '../types/backoffice'
import { STATUS_COLORS, BACKOFFICE_COLORS, UI_COLORS } from '../../../styles/theme'

const STATUS_COLOR: Record<ItemStatus, string> = {
  'In Sale':     STATUS_COLORS.inSale,
  'In Progress': STATUS_COLORS.inProgress,
  'Locked':      STATUS_COLORS.locked,
  'Reserved':    STATUS_COLORS.reserved,
  'Sold':        STATUS_COLORS.sold,
  'Closed Out':  STATUS_COLORS.closedOut,
}

const cellSx = { fontSize: '0.875rem', color: UI_COLORS.textMedium, py: 1.25 }

interface ItemsTableRowProps {
  item: BackofficeItem
  selected: boolean
  onToggleSelect: () => void
}

export const ItemsTableRow: React.FC<ItemsTableRowProps> = ({ item, selected, onToggleSelect }) => {
  const router = useRouter()

  return (
    <TableRow
      hover
      selected={selected}
      onClick={() => router.history.push(`/backoffice/product/${item.id}`)}
      sx={{
        cursor: 'pointer',
        '&:last-child td, &:last-child th': { border: 0 },
        '&.Mui-selected': { bgcolor: 'rgba(26,173,232,0.04)' },
        '&.Mui-selected:hover': { bgcolor: 'rgba(26,173,232,0.08)' },
      }}
    >
      <TableCell padding="checkbox" sx={{ pl: 1 }} onClick={e => e.stopPropagation()}>
        <Checkbox
          checked={selected}
          onChange={onToggleSelect}
          size="small"
          sx={{ '&.Mui-checked': { color: BACKOFFICE_COLORS.primary } }}
        />
      </TableCell>

      <TableCell sx={{ ...cellSx, minWidth: 260 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar
            src={item.thumbnail}
            alt={item.name}
            variant="rounded"
            sx={{ width: 38, height: 38, flexShrink: 0 }}
          />
          <Typography
            sx={{
              fontSize: '0.875rem',
              color: UI_COLORS.textPrimary,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: 280,
            }}
          >
            {item.name}
          </Typography>
        </Box>
      </TableCell>

      <TableCell sx={cellSx}>{item.items}</TableCell>
      <TableCell sx={cellSx}>{item.category}</TableCell>
      <TableCell sx={cellSx}>{item.subcategory}</TableCell>

      <TableCell sx={{ ...cellSx, maxWidth: 220 }}>
        <Typography sx={{ fontSize: '0.875rem', color: UI_COLORS.textSecondary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {item.storage}
        </Typography>
      </TableCell>

      <TableCell sx={cellSx}>
        <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: STATUS_COLOR[item.status] }}>
          {item.status}
        </Typography>
      </TableCell>
    </TableRow>
  )
}
