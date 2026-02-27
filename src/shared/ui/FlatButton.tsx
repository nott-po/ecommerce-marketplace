import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import { BORDER_RADIUS } from '../../styles/theme'

export const FlatButton = styled(Button)({
  borderRadius: BORDER_RADIUS * 1.5,
  boxShadow: 'none',
  '&:hover': { boxShadow: 'none' },
  '&:active': { boxShadow: 'none' },
})
