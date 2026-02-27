import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import StoreIcon from '@mui/icons-material/Store'
import { BRAND_COLORS, UI_COLORS } from '../../../styles/theme'
import type { ChatMessage as ChatMessageType } from '../types/chat'

const formatTime = (ts: number): string => {
  const d = new Date(ts)
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
}

interface ChatMessageProps {
  message: ChatMessageType
}

export const ChatMessageBubble: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user'

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isUser ? 'row-reverse' : 'row',
        alignItems: 'flex-end',
        gap: 1,
        mb: 1,
      }}
    >
      {!isUser && (
        <Avatar sx={{ width: 28, height: 28, bgcolor: BRAND_COLORS.primary, flexShrink: 0 }}>
          <StoreIcon sx={{ fontSize: 16 }} />
        </Avatar>
      )}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: isUser ? 'flex-end' : 'flex-start',
          maxWidth: '75%',
        }}
      >
        <Box
          sx={{
            px: 1.75,
            py: 1,
            bgcolor: isUser ? BRAND_COLORS.primary : UI_COLORS.bgSubtle,
            color: isUser ? '#fff' : UI_COLORS.textPrimary,
            borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
            border: isUser ? 'none' : `1px solid ${UI_COLORS.border}`,
          }}
        >
          <Typography sx={{ fontSize: '0.875rem', lineHeight: 1.5, wordBreak: 'break-word' }}>
            {message.text}
          </Typography>
        </Box>
        <Typography sx={{ fontSize: '0.6875rem', color: UI_COLORS.textTertiary, mt: 0.25 }}>
          {formatTime(message.timestamp)}
        </Typography>
      </Box>
    </Box>
  )
}
