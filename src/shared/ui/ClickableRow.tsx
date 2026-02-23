import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import { UI_COLORS } from '../../styles/theme'

export const ClickableRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  border: `1px solid ${UI_COLORS.border}`,
  borderRadius: (theme.shape.borderRadius as number) * 1.5,
  padding: '8px 14px',
  cursor: 'pointer',
  transition: 'all 0.15s',
  '&:hover': {
    backgroundColor: UI_COLORS.bgSubtle,
    borderColor: UI_COLORS.borderHover,
  },
}))
