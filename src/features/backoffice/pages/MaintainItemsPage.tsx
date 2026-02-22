import React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import TableContainer from '@mui/material/TableContainer'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { useBackofficeItems } from '../lib/queries'
import { useItemsTable } from '../hooks/useItemsTable'
import { ItemsToolbar } from '../components/ItemsToolbar'
import { ItemsTable } from '../components/ItemsTable'
import { AddItemModal } from '../components/AddItemModal'
import { useDebounce } from '../../../hooks/useDebounce'
import { BACKOFFICE_COLORS, UI_COLORS } from '../../../styles/theme'

export const MaintainItemsPage: React.FC = () => {
  const { search, setSearch, selected, toggleSelect, toggleSelectAll, addOpen, setAddOpen } =
    useItemsTable()

  const debouncedSearch = useDebounce(search, 350)
  const { data: items = [], isLoading, isError } = useBackofficeItems(debouncedSearch)

  return (
    <Box sx={{ px: 6, py: 3 }}>
      <Paper
        sx={{
          p: 3,
          borderRadius: 2,
          border: `1px solid ${UI_COLORS.border}`,
          boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        }}
      >
        <ItemsToolbar search={search} onSearchChange={setSearch} onAddClick={() => setAddOpen(true)} />

        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress size={32} sx={{ color: BACKOFFICE_COLORS.primary }} />
          </Box>
        )}

        {isError && (
          <Typography align="center" color="error" sx={{ py: 10 }}>
            Failed to load items. Please try again.
          </Typography>
        )}

        {!isLoading && !isError && (
          <TableContainer>
            <ItemsTable
              items={items}
              selected={selected}
              onToggleSelect={toggleSelect}
              onToggleSelectAll={() => toggleSelectAll(items)}
            />
          </TableContainer>
        )}
      </Paper>

      <AddItemModal open={addOpen} onClose={() => setAddOpen(false)} />
    </Box>
  )
}
