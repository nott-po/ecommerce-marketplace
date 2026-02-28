import React, { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import SendIcon from '@mui/icons-material/Send'
import { BRAND_COLORS, UI_COLORS } from '../../../styles/theme'

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
      <TextField
        fullWidth
        multiline
        maxRows={3}
        size="small"
        placeholder="Type a message..."
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 3,
            bgcolor: disabled ? UI_COLORS.bgSubtle : 'background.paper',
            fontSize: '0.875rem',
          },
        }}
      />
      <IconButton
        onClick={handleSend}
        disabled={disabled || !value.trim()}
        sx={{
          bgcolor: BRAND_COLORS.primary,
          color: 'common.white',
          flexShrink: 0,
          '&:hover': { bgcolor: BRAND_COLORS.primaryDark },
          '&.Mui-disabled': { bgcolor: UI_COLORS.bgActive, color: UI_COLORS.textTertiary },
          borderRadius: 2,
          p: 1,
        }}
      >
        <SendIcon sx={{ fontSize: 18 }} />
      </IconButton>
    </Box>
  )
}
