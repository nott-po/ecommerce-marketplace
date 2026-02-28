import React from 'react'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Checkbox from '@mui/material/Checkbox'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { useRouter } from '@tanstack/react-router'
import type { BackofficeItem, ItemStatus } from '../types/backoffice'
import { STATUS_COLORS, BACKOFFICE_COLORS, UI_COLORS } from '../../../styles/theme'

const TEXT_CLIP = { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } as const

const STATUS_COLOR: Record<ItemStatus, string> = {
  'In Sale':     STATUS_COLORS.inSale,
  'In Progress': STATUS_COLORS.inProgress,
  'Locked':      STATUS_COLORS.locked,
  'Reserved':    STATUS_COLORS.reserved,
  'Sold':        STATUS_COLORS.sold,
  'Closed Out':  STATUS_COLORS.closedOut,
}

const ClickableTableRow = styled(TableRow)({
  cursor: 'pointer',
  '&:last-child td, &:last-child th': { border: 0 },
  '&.Mui-selected': { backgroundColor: 'rgba(26,173,232,0.04)' },
  '&.Mui-selected:hover': { backgroundColor: 'rgba(26,173,232,0.08)' },
})

const BodyTableCell = styled(TableCell)(({ theme }) => ({
  fontSize: theme.typography.labelMd.fontSize,
  color: UI_COLORS.textMedium,
  paddingTop: theme.spacing(1.25),
  paddingBottom: theme.spacing(1.25),
}))

interface ItemsTableRowProps {
  item: BackofficeItem
  selected: boolean
  onToggleSelect: () => void
}

export const ItemsTableRow: React.FC<ItemsTableRowProps> = ({ item, selected, onToggleSelect }) => {
  const router = useRouter()

  return (
    <ClickableTableRow
      hover
      selected={selected}
      onClick={() => router.history.push(`/backoffice/product/${item.id}`)}
    >
      <TableCell padding="checkbox" sx={{ pl: 1 }} onClick={e => e.stopPropagation()}>
        <Checkbox
          checked={selected}
          onChange={onToggleSelect}
          size="small"
          sx={{ '&.Mui-checked': { color: BACKOFFICE_COLORS.primary } }}
        />
      </TableCell>

      <BodyTableCell sx={{ minWidth: 260 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar
            src={item.thumbnail}
            alt={item.name}
            variant="rounded"
            sx={{ width: 38, height: 38, flexShrink: 0 }}
          />
          <Typography
            variant="labelMd"
            sx={{ color: UI_COLORS.textPrimary, maxWidth: 280, ...TEXT_CLIP }}
          >
            {item.name}
          </Typography>
        </Box>
      </BodyTableCell>

      <BodyTableCell>{item.items}</BodyTableCell>
      <BodyTableCell>{item.category}</BodyTableCell>
      <BodyTableCell>{item.subcategory}</BodyTableCell>

      <BodyTableCell sx={{ maxWidth: 220 }}>
        <Typography
          variant="labelMd"
          sx={{ color: UI_COLORS.textSecondary, ...TEXT_CLIP }}
        >
          {item.storage}
        </Typography>
      </BodyTableCell>

      <BodyTableCell>
        <Typography variant="labelMd" sx={{ fontWeight: 500, color: STATUS_COLOR[item.status] }}>
          {item.status}
        </Typography>
      </BodyTableCell>
    </ClickableTableRow>
  )
}
