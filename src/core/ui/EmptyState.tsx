import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import SearchOffIcon from '@mui/icons-material/SearchOff'

interface EmptyStateProps {
  message?: string
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  message = 'No products found. Try adjusting your filters.',
}) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      py: 8,
      gap: 2,
      color: 'text.secondary',
    }}
  >
    <SearchOffIcon sx={{ fontSize: 48 }} />
    <Typography variant="body1">{message}</Typography>
  </Box>
)
