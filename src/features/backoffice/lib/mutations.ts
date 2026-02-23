import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '../../../api/client'
import { backofficeKeys } from './queries'
import type { AddItemForm } from '../types/backoffice'

export const useAddItem = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (form: AddItemForm) =>
      apiClient.post('/products/add', {
        title: form.title,
        description: form.description,
        price: form.price,
        category: form.category,
        stock: form.stock,
      }),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: backofficeKeys.items() })
    },
  })
}

export const useUpdateItem = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, ...form }: AddItemForm & { id: number }) =>
      apiClient.put(`/products/${id}`, form),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: backofficeKeys.items() })
    },
  })
}

export const useDeleteItem = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => apiClient.delete(`/products/${id}`),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: backofficeKeys.items() })
    },
  })
}
