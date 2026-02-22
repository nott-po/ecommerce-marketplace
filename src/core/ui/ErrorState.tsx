import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

interface ErrorStateProps {
  message?: string
  onRetry?: () => void
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = 'Something went wrong. Please try again.',
  onRetry,
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
    <ErrorOutlineIcon sx={{ fontSize: 48, color: 'error.main' }} />
    <Typography variant="body1">{message}</Typography>
    {onRetry && (
      <Button variant="outlined" color="primary" onClick={onRetry}>
        Try again
      </Button>
    )}
  </Box>
)
