import React, { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import SendIcon from '@mui/icons-material/Send'
import { styled } from '@mui/material/styles'
import { BRAND_COLORS, UI_COLORS } from '../../../styles/theme'

const MessageTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: (theme.shape.borderRadius as number) * 3,
    fontSize: '0.875rem',
    backgroundColor: theme.palette.background.paper,
  },
  '& .MuiOutlinedInput-root.Mui-disabled': {
    backgroundColor: UI_COLORS.bgSubtle,
  },
}))

const SendButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: BRAND_COLORS.primary,
  color: 'white',
  flexShrink: 0,
  borderRadius: (theme.shape.borderRadius as number) * 2,
  padding: theme.spacing(1),
  '&:hover': { backgroundColor: BRAND_COLORS.primaryDark },
  '&.Mui-disabled': { backgroundColor: UI_COLORS.bgActive, color: UI_COLORS.textTertiary },
}))

interface ChatInputProps {
  onSend: (text: string) => void
  disabled: boolean
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [value, setValue] = useState('')

  const handleSend = () => {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 1,
        p: 1.5,
        borderTop: `1px solid ${UI_COLORS.border}`,
        bgcolor: 'background.paper',
        flexShrink: 0,
      }}
    >
      <MessageTextField
        fullWidth
        multiline
        maxRows={3}
        size="small"
        placeholder="Type a message..."
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
      <SendButton onClick={handleSend} disabled={disabled || !value.trim()}>
        <SendIcon sx={{ fontSize: 18 }} />
      </SendButton>
    </Box>
  )
}
