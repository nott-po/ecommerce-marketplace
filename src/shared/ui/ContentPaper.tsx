import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import { UI_COLORS, BORDER_RADIUS, SHADOWS } from '../../styles/theme'

export const ContentPaper = styled(Paper)({
  borderRadius: BORDER_RADIUS * 2,
  border: `1px solid ${UI_COLORS.border}`,
  boxShadow: SHADOWS.card,
})
