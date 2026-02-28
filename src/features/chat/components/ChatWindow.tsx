import React, { useEffect, useRef } from 'react'
import Drawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import CloseIcon from '@mui/icons-material/Close'
import StoreIcon from '@mui/icons-material/Store'
import { useChat } from '../hooks/useChat'
import { ChatMessageBubble } from './ChatMessage'
import { ChatInput } from './ChatInput'
import { BACKOFFICE_COLORS, BRAND_COLORS, UI_COLORS } from '../../../styles/theme'
import { formatPrice } from '../../../utils/formatters'
import type { WsStatus } from '../hooks/useWebSocket'

export interface ChatProduct {
  id: number
  title: string
  thumbnail: string
  price: number
  salePrice: number | null
}

interface ChatWindowProps {
  open: boolean
  onClose: () => void
  product: ChatProduct
}

const STATUS_CHIP: Record<WsStatus, { label: string; color: 'default' | 'success' | 'warning' | 'error' }> = {
  idle:       { label: 'Disconnected', color: 'default' },
  connecting: { label: 'Connecting…',  color: 'warning' },
  connected:  { label: 'Connected',    color: 'success' },
  error:      { label: 'Offline',      color: 'error'   },
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ open, onClose, product }) => {
  const { messages, sendMessage, isTyping, wsStatus } = useChat(product.id, open)
  const scrollRef = useRef<HTMLDivElement>(null)
  const chip = STATUS_CHIP[wsStatus]

  // Auto-scroll to bottom only when the user is already near the bottom,
  // so reading history isn't interrupted by new incoming messages
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 80
    if (isNearBottom) el.scrollTop = el.scrollHeight
  }, [messages, isTyping])

  const displayPrice = product.salePrice !== null ? product.salePrice : product.price

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: 380, display: 'flex', flexDirection: 'column' } }}
    >
      {/* ── Header ── */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1.5,
          bgcolor: BACKOFFICE_COLORS.navBg,
          flexShrink: 0,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <StoreIcon sx={{ color: 'common.white', fontSize: 20 }} />
          <Typography sx={{ color: 'common.white', fontWeight: 600, fontSize: '0.9375rem' }}>
            Chat with Shop
          </Typography>
        </Box>
        <IconButton onClick={onClose} sx={{ color: 'common.white', p: 0.75 }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* ── Product context card ── */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          px: 2,
          py: 1.25,
          bgcolor: UI_COLORS.bgSubtle,
          borderBottom: `1px solid ${UI_COLORS.border}`,
          flexShrink: 0,
        }}
      >
        <Box
          component="img"
          src={product.thumbnail}
          alt={product.title}
          sx={{
            width: 44,
            height: 44,
            objectFit: 'cover',
            borderRadius: 1,
            flexShrink: 0,
            border: `1px solid ${UI_COLORS.border}`,
          }}
        />
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            sx={{
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: UI_COLORS.textPrimary,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {product.title}
          </Typography>
          <Typography sx={{ fontSize: '0.8125rem', color: BRAND_COLORS.primary, fontWeight: 700 }}>
            {formatPrice(displayPrice)}
          </Typography>
        </Box>
      </Box>

      {/* ── Messages area ── */}
      <Box
        ref={scrollRef}
        sx={{
          flex: 1,
          overflowY: 'auto',
          px: 2,
          py: 1.5,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* WS status indicator */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1.5 }}>
          <Chip
            label={chip.label}
            color={chip.color}
            size="small"
            sx={{ fontSize: '0.75rem', height: 22 }}
          />
        </Box>

        {/* Empty state */}
        {messages.length === 0 && !isTyping && (
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              py: 6,
            }}
          >
            <Avatar sx={{ width: 48, height: 48, bgcolor: BRAND_COLORS.primaryAlpha12, mb: 1.5 }}>
              <StoreIcon sx={{ color: BRAND_COLORS.primary, fontSize: 26 }} />
            </Avatar>
            <Typography sx={{ fontSize: '0.9375rem', fontWeight: 600, color: UI_COLORS.textPrimary, mb: 0.5 }}>
              Start a conversation
            </Typography>
            <Typography sx={{ fontSize: '0.8125rem', color: UI_COLORS.textSecondary, textAlign: 'center', px: 2 }}>
              Ask about availability, condition, or shipping
            </Typography>
          </Box>
        )}

        {/* Message bubbles */}
        {messages.map(msg => (
          <ChatMessageBubble key={msg.id} message={msg} />
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1, mb: 1 }}>
            <Avatar sx={{ width: 28, height: 28, bgcolor: BRAND_COLORS.primary, flexShrink: 0 }}>
              <StoreIcon sx={{ fontSize: 16 }} />
            </Avatar>
            <Box
              sx={{
                px: 2,
                py: 1.25,
                bgcolor: UI_COLORS.bgSubtle,
                border: `1px solid ${UI_COLORS.border}`,
                borderRadius: '16px 16px 16px 4px',
                display: 'flex',
                gap: 0.5,
                alignItems: 'center',
              }}
            >
              {[0, 1, 2].map(i => (
                <Box
                  key={i}
                  sx={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    bgcolor: UI_COLORS.textTertiary,
                    animation: 'typingDot 1.4s infinite ease-in-out',
                    animationDelay: `${i * 0.2}s`,
                    '@keyframes typingDot': {
                      '0%, 60%, 100%': { transform: 'translateY(0)' },
                      '30%': { transform: 'translateY(-5px)' },
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        )}
      </Box>

      {/* ── Input ── */}
      <ChatInput onSend={sendMessage} disabled={wsStatus !== 'connected'} />
    </Drawer>
  )
}
