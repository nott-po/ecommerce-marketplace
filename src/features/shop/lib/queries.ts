import { useQuery } from '@tanstack/react-query'
import { getProducts, getProductById, getCategories } from '../../../api/endpoints/products'
import type { ProductFilters } from '../../../api/types'

export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters: ProductFilters) => [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: number) => [...productKeys.details(), id] as const,
  categories: () => [...productKeys.all, 'categories'] as const,
}

export const useProducts = (filters: ProductFilters) =>
  useQuery({
    queryKey: productKeys.list(filters),
    queryFn: () => getProducts(filters),
    placeholderData: prev => prev,
  })

export const useProduct = (id: number) =>
  useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => getProductById(id),
    enabled: id > 0,
  })

export const useCategories = () =>
  useQuery({
    queryKey: productKeys.categories(),
    queryFn: getCategories,
    staleTime: Infinity,
  })
