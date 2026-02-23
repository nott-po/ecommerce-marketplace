import { styled } from '@mui/material/styles'
import Paper from '@mui/material/Paper'
import { UI_COLORS } from '../../styles/theme'

export const ContentPaper = styled(Paper)(({ theme }) => ({
  borderRadius: (theme.shape.borderRadius as number) * 2,
  border: `1px solid ${UI_COLORS.border}`,
  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
}))
