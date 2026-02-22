import { createFileRoute } from '@tanstack/react-router'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export const Route = createFileRoute('/about')({
  component: AboutComponent,
})

function AboutComponent() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">About</Typography>
    </Box>
  )
}
