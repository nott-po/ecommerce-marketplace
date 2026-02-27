import { useMemo } from 'react'
import type { ProductFilters } from '../../../api/types'
import { PRODUCTS_PAGE_SIZE } from '../../../utils/constants'

export interface ShopParams {
  q: string
  category: string
  page: number
  sort: string
  order: 'asc' | 'desc'
}

const VALID_SORT = ['price', 'title', 'rating'] as const

export const useProductFilters = (params: ShopParams): ProductFilters => {
  return useMemo<ProductFilters>(
    () => ({
      search: params.q,
      category: params.category,
      sortBy: VALID_SORT.find(v => v === params.sort) ?? 'title',
      order: params.order,
      limit: PRODUCTS_PAGE_SIZE,
      skip: params.page * PRODUCTS_PAGE_SIZE,
    }),
    [params.q, params.category, params.sort, params.order, params.page],
  )
}
