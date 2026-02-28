import React from 'react'
import Grid from '@mui/material/Grid'
import Pagination from '@mui/material/Pagination'
import Box from '@mui/material/Box'
import { ProductCard } from './ProductCard'
import { LoadingState } from '../../../core/ui/LoadingState'
import { ErrorState } from '../../../core/ui/ErrorState'
import { EmptyState } from '../../../core/ui/EmptyState'
import { useFavorites } from '../../../hooks/useFavorites'
import type { Product } from '../../../api/types'
import { PRODUCTS_PAGE_SIZE } from '../../../utils/constants'

interface ProductGridProps {
  products: Product[]
  total: number
  page: number
  isLoading: boolean
  isError: boolean
  onPageChange: (page: number) => void
  onRetry: () => void
  onNavigate: (id: number) => void
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  total,
  page,
  isLoading,
  isError,
  onPageChange,
  onRetry,
  onNavigate,
}) => {
  const { isFavorite, toggle } = useFavorites()
  const totalPages = Math.ceil(total / PRODUCTS_PAGE_SIZE)

  if (isLoading) return <LoadingState count={8} />
  if (isError) return <ErrorState onRetry={onRetry} />
  if (products.length === 0) return <EmptyState />

  return (
    <Box>
      <Grid container spacing={2}>
        {products.map(product => (
          <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <ProductCard
              product={product}
              isFavorite={isFavorite(product.id)}
              onToggleFavorite={toggle}
              onNavigate={onNavigate}
            />
          </Grid>
        ))}
      </Grid>

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page + 1}
            onChange={(_, value) => onPageChange(value - 1)}
            color="primary"
            shape="rounded"
          />
        </Box>
      )}
    </Box>
  )
}
