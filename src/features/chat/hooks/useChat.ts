import { useCallback, useEffect, useRef, useState } from 'react'
import { useWebSocket } from './useWebSocket'
import type { WsStatus } from './useWebSocket'
import type { ChatMessage } from '../types/chat'
import { WS_URL } from '../../../utils/constants'

const STORAGE_KEY = 'chat_messages'

const isMessageStore = (v: unknown): v is Record<string, ChatMessage[]> =>
  typeof v === 'object' && v !== null && !Array.isArray(v)

const loadMessages = (productId: number): ChatMessage[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    const store = isMessageStore(parsed) ? parsed : {}
    return store[productId.toString()] ?? []
  } catch {
    return []
  }
}

const persistMessages = (productId: number, messages: ChatMessage[]): void => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : null
    const store: Record<string, ChatMessage[]> = isMessageStore(parsed) ? parsed : {}
    store[productId.toString()] = messages
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
  } catch {
    // ignore storage errors
  }
}

export const useChat = (
  productId: number,
  open: boolean,
): {
  messages: ChatMessage[]
  sendMessage: (text: string) => void
  isTyping: boolean
  wsStatus: WsStatus
} => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => loadMessages(productId))
  const [isTyping, setIsTyping] = useState(false)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  // Reload when product changes
  useEffect(() => {
    timersRef.current.forEach(t => clearTimeout(t))
    timersRef.current = []
    setMessages(loadMessages(productId))
    setIsTyping(false)
  }, [productId])

  // Cleanup all pending timers on unmount
  useEffect(() => {
    return () => { timersRef.current.forEach(t => clearTimeout(t)) }
  }, [])

  const onWsMessage = useCallback(
    (text: string) => {
      setIsTyping(true)
      const timer = setTimeout(() => {
        const msg: ChatMessage = {
          id: crypto.randomUUID(),
          text,
          sender: 'shop',
          timestamp: Date.now(),
        }
        setMessages(prev => {
          const next = [...prev, msg]
          persistMessages(productId, next)
          return next
        })
        timersRef.current = timersRef.current.filter(t => t !== timer)
        setIsTyping(timersRef.current.length > 0)
      }, 900 + Math.random() * 400)
      timersRef.current.push(timer)
    },
    [productId],
  )

  const { status: wsStatus, send: wsSend } = useWebSocket(WS_URL, onWsMessage, open)

  const sendMessage = useCallback(
    (text: string) => {
      const msg: ChatMessage = {
        id: crypto.randomUUID(),
        text,
        sender: 'user',
        timestamp: Date.now(),
      }
      setMessages(prev => {
        const next = [...prev, msg]
        persistMessages(productId, next)
        return next
      })
      wsSend(text)
    },
    [productId, wsSend],
  )

  return { messages, sendMessage, isTyping, wsStatus }
}
