import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import { BORDER_RADIUS } from '../../styles/theme'

export const RoundedTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: BORDER_RADIUS * 1.5,
  },
})
