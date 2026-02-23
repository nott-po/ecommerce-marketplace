import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'

export const FlatButton = styled(Button)(({ theme }) => ({
  borderRadius: (theme.shape.borderRadius as number) * 1.5,
  boxShadow: 'none',
  '&:hover': { boxShadow: 'none' },
  '&:active': { boxShadow: 'none' },
}))
