import { useMemo } from 'react'
import type { ProductFilters } from '../../../api/types'
import { PRODUCTS_PER_PAGE } from '../../../utils/constants'

export interface ShopParams {
  q: string
  category: string
  page: number
  sort: string
  order: 'asc' | 'desc'
}

export const useProductFilters = (params: ShopParams): ProductFilters => {
  return useMemo<ProductFilters>(
    () => ({
      search: params.q,
      category: params.category,
      sortBy: (params.sort as ProductFilters['sortBy']) || 'title',
      order: params.order,
      limit: PRODUCTS_PER_PAGE,
      skip: 0,
      onSale: false,
    }),
    [params.q, params.category, params.sort, params.order],
  )
}
