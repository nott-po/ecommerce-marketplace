import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

export const ClickableText = styled(Typography)({
  cursor: 'pointer',
  '&:hover': { textDecoration: 'underline' },
}) as typeof Typography
