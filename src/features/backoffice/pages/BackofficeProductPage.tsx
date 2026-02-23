import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Link from '@mui/material/Link'
import Skeleton from '@mui/material/Skeleton'
import Button from '@mui/material/Button'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useBackofficeProduct } from '../lib/queries'
import { formatPrice, formatDiscount, slugToLabel } from '../../../utils/formatters'
import type { ItemStatus } from '../types/backoffice'
import { STATUS_CYCLE } from '../types/backoffice'
import { BACKOFFICE_COLORS, BRAND_COLORS, STATUS_COLORS, UI_COLORS } from '../../../styles/theme'
import { ContentPaper } from '../../../shared/ui/ContentPaper'

const STATUS_STYLE: Record<ItemStatus, { bg: string; color: string }> = {
  'In Sale':     { bg: STATUS_COLORS.inSaleBg,     color: STATUS_COLORS.inSale },
  'In Progress': { bg: STATUS_COLORS.inProgressBg, color: STATUS_COLORS.inProgress },
  'Locked':      { bg: STATUS_COLORS.lockedBg,     color: STATUS_COLORS.locked },
  'Reserved':    { bg: STATUS_COLORS.reservedBg,   color: STATUS_COLORS.reserved },
  'Sold':        { bg: STATUS_COLORS.soldBg,       color: STATUS_COLORS.sold },
  'Closed Out':  { bg: STATUS_COLORS.closedOutBg,  color: STATUS_COLORS.closedOut },
}

const Field: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <Box>
    <Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: UI_COLORS.textTertiary, textTransform: 'uppercase', letterSpacing: '0.05em', mb: 0.25 }}>
      {label}
    </Typography>
    <Typography sx={{ fontSize: '0.9375rem', color: UI_COLORS.textPrimary }}>
      {value}
    </Typography>
  </Box>
)

interface BackofficeProductPageProps {
  id: number
  onBack: () => void
  onNavigate: (path: string) => void
}

export const BackofficeProductPage: React.FC<BackofficeProductPageProps> = ({ id, onBack, onNavigate }) => {
  const { data: product, isLoading, isError } = useBackofficeProduct(id)

  if (isLoading) {
    return (
      <Box sx={{ px: 6, py: 3 }}>
        <Skeleton variant="rectangular" height={48} sx={{ mb: 3, borderRadius: 1 }} />
        <Skeleton variant="rectangular" height={500} sx={{ borderRadius: 2 }} />
      </Box>
    )
  }

  if (isError || !product) {
    return (
      <Box sx={{ px: 6, py: 3 }}>
        <Typography color="error">Failed to load product. <Link sx={{ cursor: 'pointer' }} onClick={onBack}>Go back</Link></Typography>
      </Box>
    )
  }

  const status = STATUS_CYCLE[product.id % STATUS_CYCLE.length]
  const statusStyle = STATUS_STYLE[status]
  const discountedPrice = product.discountPercentage > 0
    ? formatDiscount(product.price, product.discountPercentage)
    : null

  return (
    <Box sx={{ px: 6, py: 3 }}>
      {/* Breadcrumb */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          variant="text"
          color="inherit"
          sx={{ minWidth: 0, color: UI_COLORS.textSecondary, fontWeight: 400, fontSize: '0.875rem', px: 0 }}
        >
          Back
        </Button>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ '& .MuiBreadcrumbs-separator': { color: UI_COLORS.textTertiary } }}>
          <Link
            underline="hover"
            sx={{ cursor: 'pointer', fontSize: '0.875rem', color: UI_COLORS.textSecondary }}
            onClick={() => onNavigate('/backoffice')}
          >
            Maintain Items
          </Link>
          <Typography sx={{ fontSize: '0.875rem', color: UI_COLORS.textMedium, maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {product.title}
          </Typography>
        </Breadcrumbs>
      </Box>

      <ContentPaper sx={{ p: 3.5 }}>
        <Grid container spacing={4}>
          {/* Left — images */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              component="img"
              src={product.thumbnail}
              alt={product.title}
              sx={{ width: '100%', borderRadius: 1.5, objectFit: 'cover', aspectRatio: '1', mb: 1.5, border: `1px solid ${UI_COLORS.bgActive}` }}
            />
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {product.images.slice(0, 4).map((img, i) => (
                <Box
                  key={i}
                  component="img"
                  src={img}
                  alt={`${product.title} ${i + 1}`}
                  sx={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 1, border: `1px solid ${UI_COLORS.border}`, cursor: 'pointer', '&:hover': { borderColor: BACKOFFICE_COLORS.primary } }}
                />
              ))}
            </Box>
          </Grid>

          {/* Right — details */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
              <Typography sx={{ fontSize: '1.375rem', fontWeight: 700, color: UI_COLORS.textPrimary, flex: 1, pr: 2 }}>
                {product.title}
              </Typography>
              <Chip
                label={status}
                size="small"
                sx={{ bgcolor: statusStyle.bg, color: statusStyle.color, fontWeight: 600, border: 'none', flexShrink: 0 }}
              />
            </Box>

            <Typography sx={{ fontSize: '0.875rem', color: UI_COLORS.textSecondary, mb: 2.5, lineHeight: 1.6 }}>
              {product.description}
            </Typography>

            {/* Pricing */}
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, mb: 3 }}>
              {discountedPrice !== null ? (
                <>
                  <Typography sx={{ fontSize: '1.5rem', fontWeight: 700, color: BRAND_COLORS.primary }}>
                    {formatPrice(discountedPrice)}
                  </Typography>
                  <Typography sx={{ fontSize: '1rem', color: UI_COLORS.textTertiary, textDecoration: 'line-through' }}>
                    {formatPrice(product.price)}
                  </Typography>
                  <Chip label={`-${Math.round(product.discountPercentage)}%`} size="small" sx={{ bgcolor: BRAND_COLORS.saleBg, color: BRAND_COLORS.primary, fontWeight: 600 }} />
                </>
              ) : (
                <Typography sx={{ fontSize: '1.5rem', fontWeight: 700 }}>
                  {formatPrice(product.price)}
                </Typography>
              )}
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Info grid */}
            <Grid container spacing={2.5}>
              <Grid size={{ xs: 6, sm: 4 }}>
                <Field label="SKU" value={product.sku} />
              </Grid>
              <Grid size={{ xs: 6, sm: 4 }}>
                <Field label="Brand" value={product.brand || '—'} />
              </Grid>
              <Grid size={{ xs: 6, sm: 4 }}>
                <Field label="Category" value={slugToLabel(product.category)} />
              </Grid>
              <Grid size={{ xs: 6, sm: 4 }}>
                <Field label="Stock" value={`${product.stock} units`} />
              </Grid>
              <Grid size={{ xs: 6, sm: 4 }}>
                <Field label="Min. Order Qty" value={product.minimumOrderQuantity} />
              </Grid>
              <Grid size={{ xs: 6, sm: 4 }}>
                <Field label="Rating" value={`${product.rating.toFixed(1)} / 5`} />
              </Grid>
              <Grid size={{ xs: 6, sm: 4 }}>
                <Field label="Availability" value={
                  <Typography component="span" sx={{
                    fontSize: '0.9375rem',
                    fontWeight: 500,
                    color: product.availabilityStatus === 'In Stock'
                      ? STATUS_COLORS.inStock
                      : product.availabilityStatus === 'Low Stock'
                        ? STATUS_COLORS.lowStock
                        : STATUS_COLORS.outOfStock,
                  }}>
                    {product.availabilityStatus}
                  </Typography>
                } />
              </Grid>
              <Grid size={{ xs: 6, sm: 4 }}>
                <Field label="Weight" value={`${product.weight} kg`} />
              </Grid>
              <Grid size={{ xs: 6, sm: 4 }}>
                <Field label="Warranty" value={product.warrantyInformation} />
              </Grid>
              <Grid size={{ xs: 12, sm: 8 }}>
                <Field label="Shipping" value={product.shippingInformation} />
              </Grid>
              <Grid size={{ xs: 12, sm: 4 }}>
                <Field label="Return Policy" value={product.returnPolicy} />
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* Tags */}
            {product.tags.length > 0 && (
              <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
                {product.tags.map(tag => (
                  <Chip key={tag} label={tag} size="small" variant="outlined" sx={{ fontSize: '0.8125rem', borderRadius: 1 }} />
                ))}
              </Box>
            )}
          </Grid>
        </Grid>

        {/* Reviews */}
        {product.reviews.length > 0 && (
          <>
            <Divider sx={{ my: 3 }} />
            <Typography sx={{ fontWeight: 700, fontSize: '1rem', mb: 2 }}>
              Customer Reviews ({product.reviews.length})
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {product.reviews.map((r, i) => (
                <Box key={i} sx={{ p: 2, bgcolor: UI_COLORS.bgSubtle, borderRadius: 1.5, border: `1px solid ${UI_COLORS.bgActive}` }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                    <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{r.reviewerName}</Typography>
                    <Typography sx={{ fontSize: '0.8125rem', color: UI_COLORS.textTertiary }}>
                      {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: '0.875rem', color: UI_COLORS.textSecondary }}>{r.comment}</Typography>
                </Box>
              ))}
            </Box>
          </>
        )}
      </ContentPaper>
    </Box>
  )
}
