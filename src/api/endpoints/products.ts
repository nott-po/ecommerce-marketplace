import { apiClient } from '../client'
import type { Product, ProductFilters, ProductsResponse, CategoryItem } from '../types'

export const getProducts = async (filters: ProductFilters): Promise<ProductsResponse> => {
  const params = new URLSearchParams()
  params.set('limit', filters.limit.toString())
  params.set('skip', filters.skip.toString())
  params.set('sortBy', filters.sortBy)
  params.set('order', filters.order)

  if (filters.search) {
    return apiClient.get<ProductsResponse>(
      `/products/search?q=${encodeURIComponent(filters.search)}&${params.toString()}`,
    )
  }

  if (filters.category) {
    return apiClient.get<ProductsResponse>(
      `/products/category/${encodeURIComponent(filters.category)}?${params.toString()}`,
    )
  }

  return apiClient.get<ProductsResponse>(`/products?${params.toString()}`)
}

export const getProductById = async (id: number): Promise<Product> => {
  return apiClient.get<Product>(`/products/${id}`)
}

export const getCategories = async (): Promise<CategoryItem[]> => {
  return apiClient.get<CategoryItem[]>('/products/categories')
}
