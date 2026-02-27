import { createFileRoute } from '@tanstack/react-router'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import { UI_COLORS } from '../../styles/theme'

export const Route = createFileRoute('/backoffice/reporting')({
  component: ReportingPage,
})

function ReportingPage() {
  return (
    <Box sx={{ px: { xs: 2, sm: 4, md: 6 }, py: 3 }}>
      <Paper sx={{ p: 4, borderRadius: 2, border: `1px solid ${UI_COLORS.border}`, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          Reporting
        </Typography>
        <Typography color="text.secondary">This section is coming soon.</Typography>
      </Paper>
    </Box>
  )
}
