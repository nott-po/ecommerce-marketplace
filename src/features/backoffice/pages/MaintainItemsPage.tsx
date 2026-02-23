import React from 'react'
import Box from '@mui/material/Box'
import TableContainer from '@mui/material/TableContainer'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { useBackofficeItems } from '../lib/queries'
import { useItemsTable } from '../hooks/useItemsTable'
import { ItemsToolbar } from '../components/ItemsToolbar'
import { ItemsTable } from '../components/ItemsTable'
import { AddItemModal } from '../components/AddItemModal'
import { useDebounce } from '../../../hooks/useDebounce'
import { BACKOFFICE_COLORS } from '../../../styles/theme'
import { ContentPaper } from '../../../shared/ui/ContentPaper'

export const MaintainItemsPage: React.FC = () => {
  const { search, setSearch, selected, toggleSelect, toggleSelectAll, addOpen, setAddOpen } =
    useItemsTable()

  const debouncedSearch = useDebounce(search, 350)
  const { data: items = [], isLoading, isError } = useBackofficeItems(debouncedSearch)

  return (
    <Box sx={{ px: 6, py: 3 }}>
      <ContentPaper sx={{ p: 3 }}>
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
      </ContentPaper>

      <AddItemModal open={addOpen} onClose={() => setAddOpen(false)} />
    </Box>
  )
}
