import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface SortControlsProps {
  total?: number
}

export const SortControls: React.FC<SortControlsProps> = ({ total }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1.5, mb: 1 }}>
    {total !== undefined && (
      <Typography variant="body2" color="text.secondary">
        {total} {total === 1 ? 'item' : 'items'} found
      </Typography>
    )}
  </Box>
)
