import React from 'react'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import type { BackofficeItem } from '../types/backoffice'
import { ItemsTableRow } from './ItemsTableRow'
import { BACKOFFICE_COLORS, UI_COLORS } from '../../../styles/theme'

const HEADERS = ['Name', 'Items', 'Category', 'Subcategory', 'Storage', 'Status']

const headCellSx = {
  fontSize: '0.8125rem',
  fontWeight: 600,
  color: UI_COLORS.textSecondary,
  py: 1.25,
  borderBottom: `1px solid ${UI_COLORS.border}`,
}

interface ItemsTableProps {
  items: BackofficeItem[]
  selected: Set<number>
  onToggleSelect: (id: number) => void
  onToggleSelectAll: () => void
}

export const ItemsTable: React.FC<ItemsTableProps> = ({
  items,
  selected,
  onToggleSelect,
  onToggleSelectAll,
}) => {
  const allSelected = items.length > 0 && selected.size === items.length
  const someSelected = selected.size > 0 && selected.size < items.length

  return (
    <Table sx={{ minWidth: 700 }}>
      <TableHead>
        <TableRow sx={{ bgcolor: '#fff' }}>
          <TableCell padding="checkbox" sx={{ ...headCellSx, pl: 1 }}>
            <Checkbox
              checked={allSelected}
              indeterminate={someSelected}
              onChange={onToggleSelectAll}
              size="small"
              sx={{ '&.Mui-checked, &.MuiCheckbox-indeterminate': { color: BACKOFFICE_COLORS.primary } }}
            />
          </TableCell>
          {HEADERS.map(h => (
            <TableCell key={h} sx={headCellSx}>
              {h}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>

      <TableBody>
        {items.map(item => (
          <ItemsTableRow
            key={item.id}
            item={item}
            selected={selected.has(item.id)}
            onToggleSelect={() => onToggleSelect(item.id)}
          />
        ))}

        {items.length === 0 && (
          <TableRow>
            <TableCell colSpan={7} align="center" sx={{ py: 8 }}>
              <Typography variant="body2" color="text.secondary">
                No items found
              </Typography>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
