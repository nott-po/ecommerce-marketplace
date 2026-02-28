import React from 'react'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { styled } from '@mui/material/styles'
import { StatusBadge } from '../../../core/ui/StatusBadge'
import { formatPrice, formatDiscount } from '../../../utils/formatters'
import type { Product } from '../../../api/types'
import { BRAND_COLORS, SHADOWS } from '../../../styles/theme'

const ProductImage = styled('img')({
  width: '100%',
  height: 220,
  objectFit: 'cover',
  display: 'block',
})

interface ProductCardProps {
  product: Product
  isFavorite: boolean
  onToggleFavorite: (id: number) => void
  onNavigate: (id: number) => void
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isFavorite,
  onToggleFavorite,
  onNavigate,
}) => {
  const isOnSale = product.discountPercentage > 0
  const salePrice = isOnSale ? formatDiscount(product.price, product.discountPercentage) : null

  return (
    <Card
      sx={{
        position: 'relative',
        overflow: 'hidden',
        transition: 'box-shadow 0.2s',
        '&:hover': { boxShadow: SHADOWS.hover },
      }}
    >
      {/* Entire card is clickable */}
      <CardActionArea
        onClick={() => onNavigate(product.id)}
        sx={{ display: 'block' }}
      >
        <Box sx={{ position: 'relative' }}>
          <ProductImage src={product.thumbnail} alt={product.title} loading="lazy" />

          {/* Status badges — bottom-left of image */}
          <Stack
            direction="row"
            sx={{ position: 'absolute', bottom: 8, left: 8, flexWrap: 'wrap', gap: 0.5 }}
          >
            {product.availabilityStatus === 'Low Stock' && <StatusBadge variant="low-stock" />}
            {product.availabilityStatus === 'Out of Stock' && <StatusBadge variant="out-of-stock" />}
            {isOnSale && (
              <StatusBadge variant="sale" label={`-${Math.round(product.discountPercentage)}%`} />
            )}
          </Stack>
        </Box>

        <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 500,
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              lineHeight: 1.4,
              mb: 1,
              minHeight: '2.8em',
            }}
          >
            {product.title}
          </Typography>

          <Box>
            {salePrice !== null ? (
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.75 }}>
                <Typography variant="subtitle2" color="primary">
                  {formatPrice(salePrice)}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ textDecoration: 'line-through', color: 'text.disabled' }}
                >
                  {formatPrice(product.price)}
                </Typography>
              </Box>
            ) : (
              <Typography variant="subtitle2">{formatPrice(product.price)}</Typography>
            )}
          </Box>
        </CardContent>
      </CardActionArea>

      {/* Favorite — outside CardActionArea so it doesn't navigate */}
      <IconButton
        size="small"
        onClick={() => onToggleFavorite(product.id)}
        sx={{
          position: 'absolute',
          top: 6,
          right: 6,
          bgcolor: 'rgba(255,255,255,0.85)',
          '&:hover': { bgcolor: 'background.paper' },
          p: 0.5,
          zIndex: 1,
        }}
      >
        {isFavorite ? (
          <FavoriteIcon fontSize="small" sx={{ color: BRAND_COLORS.primary }} />
        ) : (
          <FavoriteBorderIcon fontSize="small" sx={{ color: 'text.secondary' }} />
        )}
      </IconButton>
    </Card>
  )
}
