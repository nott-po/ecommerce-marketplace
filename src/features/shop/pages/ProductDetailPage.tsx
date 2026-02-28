import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Divider from '@mui/material/Divider'
import Rating from '@mui/material/Rating'
import CircularProgress from '@mui/material/CircularProgress'
import MuiBreadcrumbs from '@mui/material/Breadcrumbs'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import { ErrorState } from '../../../core/ui/ErrorState'
import { ClickableText } from '../../../core/ui/ClickableText'
import { useProduct } from '../lib/queries'
import { useFavorites } from '../../../hooks/useFavorites'
import { formatPrice, formatDiscount, slugToLabel } from '../../../utils/formatters'
import { BRAND_COLORS, UI_COLORS } from '../../../styles/theme'
import { ChatWindow } from '../../chat/components/ChatWindow'

interface ProductDetailPageProps {
  id: number
  onBack: () => void
  onNavigateToShop: (category?: string) => void
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  id,
  onBack,
  onNavigateToShop,
}) => {
  const { data: product, isLoading, isError, refetch } = useProduct(id)
  const { isFavorite, toggle } = useFavorites()
  const [selectedImage, setSelectedImage] = useState(0)
  const [chatOpen, setChatOpen] = useState(false)

  if (isLoading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <CircularProgress sx={{ color: BRAND_COLORS.primary }} />
    </Box>
  )
  if (isError || !product) return <ErrorState onRetry={() => void refetch()} />

  const salePrice =
    product.discountPercentage > 0
      ? formatDiscount(product.price, product.discountPercentage)
      : null

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1100, mx: 'auto' }}>
      {/* Breadcrumbs */}
      <MuiBreadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        sx={{ mb: 3, fontSize: '0.8125rem' }}
      >
        <ClickableText
          component="span"
          onClick={() => onNavigateToShop()}
          sx={{ color: BRAND_COLORS.primary, fontSize: 'inherit' }}
        >
          Shop
        </ClickableText>
        <ClickableText
          component="span"
          onClick={() => onNavigateToShop(product.category)}
          sx={{ color: BRAND_COLORS.primary, fontSize: 'inherit' }}
        >
          {slugToLabel(product.category)}
        </ClickableText>
        <Typography sx={{ fontSize: 'inherit', color: 'text.secondary' }}>
          {product.title}
        </Typography>
      </MuiBreadcrumbs>

      {/* Back */}
      <Button
        startIcon={<ArrowBackIosNewIcon fontSize="small" />}
        onClick={onBack}
        size="small"
        sx={{ mb: 3, color: 'text.secondary', fontWeight: 400 }}
      >
        Back to shop
      </Button>

      <Grid container spacing={4}>
        {/* Images */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            component="img"
            src={product.images[selectedImage] ?? product.thumbnail}
            alt={product.title}
            sx={{
              width: '100%',
              height: 420,
              objectFit: 'cover',
              borderRadius: 2,
              border: `1px solid ${UI_COLORS.border}`,
              bgcolor: UI_COLORS.bgSubtle,
            }}
          />
          {product.images.length > 1 && (
            <Box sx={{ display: 'flex', gap: 1, mt: 1.5, flexWrap: 'wrap' }}>
              {product.images.map((img, i) => (
                <Box
                  key={i}
                  component="img"
                  src={img}
                  alt={`${product.title} ${i + 1}`}
                  onClick={() => setSelectedImage(i)}
                  sx={{
                    width: 72,
                    height: 72,
                    objectFit: 'cover',
                    borderRadius: 1,
                    cursor: 'pointer',
                    border: `2px solid ${i === selectedImage ? BRAND_COLORS.primary : UI_COLORS.border}`,
                    transition: 'border-color 0.15s',
                  }}
                />
              ))}
            </Box>
          )}
        </Grid>

        {/* Details */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <Box sx={{ flex: 1 }}>
              <Chip
                label={slugToLabel(product.category)}
                size="small"
                sx={{ mb: 1, bgcolor: BRAND_COLORS.primaryAlpha12, color: BRAND_COLORS.primary, fontWeight: 600 }}
              />
              <Typography variant="h5" fontWeight={700} gutterBottom>
                {product.title}
              </Typography>
            </Box>
            <IconButton onClick={() => toggle(product.id)} sx={{ mt: 0.5 }}>
              {isFavorite(product.id) ? (
                <FavoriteIcon sx={{ color: BRAND_COLORS.primary }} />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Rating value={product.rating} precision={0.1} readOnly size="small" />
            <Typography variant="body2" color="text.secondary">
              {product.rating.toFixed(1)} ({product.reviews.length} reviews)
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            {salePrice !== null ? (
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5 }}>
                <Typography variant="h4" fontWeight={700} color="primary">
                  {formatPrice(salePrice)}
                </Typography>
                <Typography variant="h6" sx={{ textDecoration: 'line-through', color: 'text.disabled' }}>
                  {formatPrice(product.price)}
                </Typography>
                <Chip
                  label={`-${Math.round(product.discountPercentage)}%`}
                  size="small"
                  color="warning"
                  sx={{ fontWeight: 700 }}
                />
              </Box>
            ) : (
              <Typography variant="h4" fontWeight={700}>
                {formatPrice(product.price)}
              </Typography>
            )}
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
            {product.description}
          </Typography>

          <Divider sx={{ mb: 2 }} />

          {[
            { label: 'Brand', value: product.brand },
            { label: 'SKU', value: product.sku },
            { label: 'Availability', value: product.availabilityStatus },
            { label: 'Shipping', value: product.shippingInformation },
            { label: 'Warranty', value: product.warrantyInformation },
            { label: 'Return policy', value: product.returnPolicy },
          ].map(({ label, value }) => (
            <Box key={label} sx={{ display: 'flex', gap: 2, mb: 0.75 }}>
              <Typography variant="body2" color="text.secondary" sx={{ minWidth: 110 }}>
                {label}:
              </Typography>
              <Typography variant="body2" fontWeight={500}>
                {value}
              </Typography>
            </Box>
          ))}

          <Divider sx={{ my: 2.5 }} />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Tooltip title="Cart not available yet">
              <span style={{ flex: 1 }}>
                <Button variant="contained" size="large" color="primary" fullWidth disabled sx={{ py: 1.5, fontWeight: 600 }}>
                  Add to cart
                </Button>
              </span>
            </Tooltip>
            <Button
              variant="outlined"
              size="large"
              startIcon={<ChatBubbleOutlineIcon />}
              onClick={() => setChatOpen(true)}
              sx={{
                py: 1.5,
                fontWeight: 600,
                color: BRAND_COLORS.primary,
                borderColor: BRAND_COLORS.primaryBorder,
                whiteSpace: 'nowrap',
                flexShrink: 0,
                '&:hover': {
                  borderColor: BRAND_COLORS.primary,
                  bgcolor: BRAND_COLORS.primaryAlpha12,
                },
              }}
            >
              Contact Shop
            </Button>
          </Box>
        </Grid>
      </Grid>

      <ChatWindow
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        product={{
          id: product.id,
          title: product.title,
          thumbnail: product.thumbnail,
          price: product.price,
          salePrice,
        }}
      />
    </Box>
  )
}
