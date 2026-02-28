import { useQuery } from '@tanstack/react-query'
import { apiClient } from '../../../api/client'
import type { ProductsResponse, Product } from '../../../api/types/product'
import type { BackofficeItem, ItemStatus } from '../types/backoffice'
import { STATUS_CYCLE } from '../types/backoffice'
import { slugToLabel } from '../../../utils/formatters'
import { EXCLUDED_CATEGORIES } from '../../../utils/constants'

// by product ID so the table looks realistic, but they are not real locations.
const MOCK_STORAGES = [
  'Warehouse A — Berlin, DE',
  'Warehouse B — Vienna, AT',
  'Depot C — Warsaw, PL',
  'Depot D — Zurich, CH',
  'Storage E — Munich, DE',
]

const toBackofficeItem = (p: Product): BackofficeItem => ({
  id: p.id,
  name: p.title,
  thumbnail: p.thumbnail,
  items: p.minimumOrderQuantity > 1 ? p.minimumOrderQuantity : 1,
  category: slugToLabel(p.category),
  subcategory: p.tags?.[0] ? slugToLabel(p.tags[0]) : slugToLabel(p.category),
  storage: MOCK_STORAGES[p.id % MOCK_STORAGES.length],
  status: STATUS_CYCLE[p.id % STATUS_CYCLE.length],
})

const STATUS_ORDER: Record<ItemStatus, number> = {
  'In Sale': 0,
  'In Progress': 1,
  'Reserved': 2,
  'Sold': 3,
  'Locked': 4,
  'Closed Out': 5,
}

export const backofficeKeys = {
  all: ['backoffice'] as const,
  items: (search = '') => ['backoffice', 'items', search] as const,
  product: (id: number) => ['backoffice', 'product', id] as const,
}

export const useBackofficeItems = (search = '') => {
  return useQuery({
    queryKey: backofficeKeys.items(search),
    queryFn: async () => {
      const url = search
        ? `/products/search?q=${encodeURIComponent(search)}&limit=100`
        : '/products?limit=100'
      const data = await apiClient.get<ProductsResponse>(url)
      return data.products
        .filter(p => !EXCLUDED_CATEGORIES.has(p.category))
        .map(toBackofficeItem)
        .sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status])
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: prev => prev,
  })
}

export const useBackofficeProduct = (id: number) => {
  return useQuery({
    queryKey: backofficeKeys.product(id),
    queryFn: () => apiClient.get<Product>(`/products/${id}`),
    staleTime: 1000 * 60 * 5,
  })
}
