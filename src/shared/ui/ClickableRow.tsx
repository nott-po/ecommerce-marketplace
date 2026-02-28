import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import { UI_COLORS, BORDER_RADIUS } from '../../styles/theme'

export const ClickableRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  border: `1px solid ${UI_COLORS.border}`,
  borderRadius: BORDER_RADIUS * 1.5,
  padding: '8px 14px',
  cursor: 'pointer',
  transition: 'all 0.15s',
  '&:hover': {
    backgroundColor: UI_COLORS.bgSubtle,
    borderColor: UI_COLORS.borderHover,
  },
})
