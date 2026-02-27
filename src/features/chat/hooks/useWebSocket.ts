import { useCallback, useEffect, useRef, useState } from 'react'

export type WsStatus = 'idle' | 'connecting' | 'connected' | 'error'

export const useWebSocket = (
  url: string,
  onMessage: (data: string) => void,
  enabled: boolean,
): { status: WsStatus; send: (text: string) => void } => {
  const [status, setStatus] = useState<WsStatus>('idle')
  const wsRef = useRef<WebSocket | null>(null)

  const onMessageRef = useRef(onMessage)
  useEffect(() => {
    onMessageRef.current = onMessage
  }, [onMessage])

  useEffect(() => {
    if (!enabled) {
      wsRef.current?.close()
      wsRef.current = null
      setStatus('idle')
      return
    }

    setStatus('connecting')
    const ws = new WebSocket(url)
    wsRef.current = ws

    ws.onopen = () => setStatus('connected')
    ws.onmessage = (e: MessageEvent) => onMessageRef.current(e.data as string)
    ws.onerror = () => setStatus('error')
    ws.onclose = () => {
      if (wsRef.current === ws) {
        setStatus('idle')
        wsRef.current = null
      }
    }

    return () => {
      ws.onopen = null
      ws.onmessage = null
      ws.onerror = null
      ws.onclose = null
      ws.close()
      wsRef.current = null
    }
  }, [url, enabled])

  const send = useCallback((text: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(text)
    }
  }, [])

  return { status, send }
}
