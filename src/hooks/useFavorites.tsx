import React, { createContext, useCallback, useContext, useState } from 'react'

const STORAGE_KEY = 'shop_favorites'

const loadFromStorage = (): Set<number> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return new Set()
    const parsed = JSON.parse(raw) as number[]
    return new Set(parsed)
  } catch {
    return new Set()
  }
}

const saveToStorage = (favorites: Set<number>): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...favorites]))
}

interface FavoritesContextValue {
  favorites: Set<number>
  toggle: (productId: number) => void
  isFavorite: (productId: number) => boolean
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Set<number>>(loadFromStorage)

  const toggle = useCallback((productId: number) => {
    setFavorites(prev => {
      const next = new Set(prev)
      if (next.has(productId)) {
        next.delete(productId)
      } else {
        next.add(productId)
      }
      saveToStorage(next)
      return next
    })
  }, [])

  const isFavorite = useCallback(
    (productId: number): boolean => favorites.has(productId),
    [favorites],
  )

  return (
    <FavoritesContext.Provider value={{ favorites, toggle, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = (): FavoritesContextValue => {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used inside <FavoritesProvider>')
  return ctx
}
