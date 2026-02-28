import { useState, useCallback } from 'react'
import type { BackofficeItem } from '../types/backoffice'

export const useItemsTable = () => {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const [addOpen, setAddOpen] = useState(false)

  const toggleSelect = useCallback((id: number) => {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const toggleSelectAll = useCallback((items: BackofficeItem[]) => {
    setSelected(prev =>
      items.every(i => prev.has(i.id)) ? new Set() : new Set(items.map(i => i.id)),
    )
  }, [])

  return { search, setSearch, selected, toggleSelect, toggleSelectAll, addOpen, setAddOpen }
}
