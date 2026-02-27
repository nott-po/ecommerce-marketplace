import React, { useCallback, useMemo } from 'react'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Divider from '@mui/material/Divider'
import { CategorySidebar } from '../components/CategorySidebar'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { FilterBar, type FilterBarValues, type PriceRange, type ConditionFilter } from '../components/FilterBar'
import { ActiveFilters } from '../components/ActiveFilters'
import { SortControls } from '../components/SortControls'
import { ProductGrid } from '../components/ProductGrid'
import { useProducts } from '../lib/queries'
import { useProductFilters } from '../hooks/useProductFilters'
import { GENDER_TABS, EXCLUDED_CATEGORIES } from '../../../utils/constants'
import { UI_COLORS } from '../../../styles/theme'

export interface ShopSearchParams {
  q: string
  category: string
  page: number
  sort: string
  order: 'asc' | 'desc'
  onSale: boolean
  priceRange: PriceRange
  condition: ConditionFilter
  minRating: number
}

interface ShopPageProps {
  searchParams: ShopSearchParams
  onUpdateSearch: (updates: Partial<ShopSearchParams>) => void
  onNavigate: (id: number) => void
}

export const ShopPage: React.FC<ShopPageProps> = ({ searchParams, onUpdateSearch, onNavigate }) => {
  const { q, category, page, sort, order } = searchParams

  const filterValues: FilterBarValues = {
    sort,
    order,
    onSale: searchParams.onSale,
    priceRange: searchParams.priceRange,
    condition: searchParams.condition,
    minRating: searchParams.minRating,
  }

  const filters = useProductFilters({ q, category, page, sort, order })

  const { data, isLoading, isError, refetch } = useProducts(filters)

  const products = data?.products ?? []

  // Client-side filtering — memoized so it only re-runs when products or filter values change
  const visibleProducts = useMemo(() => products.filter(p => {
    if (!category && EXCLUDED_CATEGORIES.has(p.category)) return false
    if (filterValues.onSale && !(p.discountPercentage > 0)) return false
    if (filterValues.condition && p.availabilityStatus !== filterValues.condition) return false
    if (filterValues.minRating > 0 && p.rating < filterValues.minRating) return false
    if (filterValues.priceRange) {
      const pr = filterValues.priceRange
      if (pr === 'under25' && p.price >= 25) return false
      if (pr === '25to50' && (p.price < 25 || p.price > 50)) return false
      if (pr === '50to100' && (p.price < 50 || p.price > 100)) return false
      if (pr === 'over100' && p.price <= 100) return false
    }
    return true
  }), [products, category, filterValues])

  const setCategory = useCallback(
    (cat: string) => onUpdateSearch({ category: cat, page: 0 }),
    [onUpdateSearch],
  )

  const setPage = useCallback(
    (p: number) => onUpdateSearch({ page: p }),
    [onUpdateSearch],
  )

  const handleRemoveFilter = useCallback(
    (key: string) => {
      if (key === 'search') onUpdateSearch({ q: '', page: 0 })
      else if (key === 'category') onUpdateSearch({ category: '', page: 0 })
      else if (key === 'onSale') onUpdateSearch({ onSale: false, page: 0 })
      else if (key === 'priceRange') onUpdateSearch({ priceRange: '', page: 0 })
      else if (key === 'condition') onUpdateSearch({ condition: '', page: 0 })
      else if (key === 'minRating') onUpdateSearch({ minRating: 0, page: 0 })
    },
    [onUpdateSearch],
  )

  const handleClearAll = useCallback(() => {
    onUpdateSearch({ q: '', category: '', page: 0, onSale: false, priceRange: '', condition: '', minRating: 0 })
  }, [onUpdateSearch])

  const tabIndex = GENDER_TABS.findIndex(t => t.category === category)
  const activeTab = tabIndex === -1 ? false : tabIndex

  const handleTabChange = (_: React.SyntheticEvent, idx: number) => {
    const tab = GENDER_TABS[idx]
    if (tab) setCategory(tab.category)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 64px)' }}>
      {/* Gender / demographic tabs */}
      <Box sx={{ bgcolor: 'white', borderBottom: `1px solid ${UI_COLORS.border}`, display: 'flex', justifyContent: 'center', py: 1.25 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          slotProps={{ indicator: { style: { display: 'none' } } }}
          sx={{
            minHeight: 36,
            border: `1px solid ${UI_COLORS.border}`,
            borderRadius: '20px',
            overflow: 'hidden',
            p: 0,
            '& .MuiTabs-flexContainer': { gap: 0 },
          }}
        >
          {GENDER_TABS.map((tab, i) => (
            <Tab
              key={tab.label}
              label={tab.label}
              sx={{
                minHeight: 36,
                py: 0.5,
                px: 2.5,
                fontSize: '0.875rem',
                fontWeight: 500,
                textTransform: 'none',
                borderRadius: 0,
                color: 'text.primary',
                borderRight: i < GENDER_TABS.length - 1 ? `1px solid ${UI_COLORS.border}` : 'none',
                '&.Mui-selected': { color: 'text.primary', bgcolor: UI_COLORS.bgActive },
                '&:hover': { bgcolor: UI_COLORS.bgPage },
              }}
            />
          ))}
        </Tabs>
      </Box>

      {/* Sidebar + content */}
      <Box sx={{ display: 'flex', flex: 1, bgcolor: UI_COLORS.bgPage }}>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <CategorySidebar selectedCategory={category} onSelect={setCategory} />
        </Box>

        <Box sx={{ flex: 1, p: 3, minWidth: 0 }}>
          <Breadcrumbs category={category} />

          <FilterBar
            values={filterValues}
            onChange={(newValues) => onUpdateSearch({ ...newValues, page: 0 })}
          />

          <ActiveFilters
            search={q}
            category={category}
            onSale={filterValues.onSale}
            priceRange={filterValues.priceRange}
            condition={filterValues.condition}
            minRating={filterValues.minRating}
            onRemove={handleRemoveFilter}
            onClearAll={handleClearAll}
          />

          <Divider sx={{ my: 1.5 }} />

          {/* Show API total only when client-side filters aren't further narrowing the page */}
          <SortControls total={
            (filterValues.onSale || filterValues.priceRange || filterValues.condition || filterValues.minRating > 0)
              ? undefined
              : (data?.total ?? 0)
          } />

          <Box sx={{ mt: 2 }}>
            <ProductGrid
              products={visibleProducts}
              total={data?.total ?? 0}
              page={page}
              isLoading={isLoading}
              isError={isError}
              onPageChange={setPage}
              onRetry={() => void refetch()}
              onNavigate={onNavigate}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
