import React, { useState, useCallback } from 'react'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Divider from '@mui/material/Divider'
import { CategorySidebar } from '../components/CategorySidebar'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { FilterBar, DEFAULT_FILTER_VALUES, type FilterBarValues } from '../components/FilterBar'
import { ActiveFilters } from '../components/ActiveFilters'
import { SortControls } from '../components/SortControls'
import { ProductGrid } from '../components/ProductGrid'
import { useProducts } from '../lib/queries'
import { useProductFilters } from '../hooks/useProductFilters'
import { GENDER_TABS, EXCLUDED_CATEGORIES, PRODUCTS_PAGE_SIZE } from '../../../utils/constants'
import { UI_COLORS } from '../../../styles/theme'

// Exported so route files can import this type without circular deps
export interface ShopSearchParams {
  q: string
  category: string
  page: number
  sort: string
  order: 'asc' | 'desc'
}

interface ShopPageProps {
  searchParams: ShopSearchParams
  onUpdateSearch: (updates: Partial<ShopSearchParams>) => void
}

export const ShopPage: React.FC<ShopPageProps> = ({ searchParams, onUpdateSearch }) => {
  const { q, category, page } = searchParams

  const [filterValues, setFilterValues] = useState<FilterBarValues>(DEFAULT_FILTER_VALUES)

  const filters = useProductFilters({
    q,
    category,
    page,
    sort: filterValues.sort,
    order: filterValues.order,
  })

  const { data, isLoading, isError, refetch } = useProducts(filters)

  const products = data?.products ?? []

  // Client-side filtering
  const visibleProducts = products.filter(p => {
    // When browsing all products, hide excluded categories (vehicles, groceries)
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
  })

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
      else if (key === 'onSale') { setFilterValues(prev => ({ ...prev, onSale: false })); if (page > 0) onUpdateSearch({ page: 0 }) }
      else if (key === 'priceRange') { setFilterValues(prev => ({ ...prev, priceRange: '' })); if (page > 0) onUpdateSearch({ page: 0 }) }
      else if (key === 'condition') { setFilterValues(prev => ({ ...prev, condition: '' })); if (page > 0) onUpdateSearch({ page: 0 }) }
      else if (key === 'minRating') { setFilterValues(prev => ({ ...prev, minRating: 0 })); if (page > 0) onUpdateSearch({ page: 0 }) }
    },
    [onUpdateSearch, page],
  )

  const handleClearAll = useCallback(() => {
    onUpdateSearch({ q: '', category: '', page: 0 })
    setFilterValues(DEFAULT_FILTER_VALUES)
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
        <CategorySidebar selectedCategory={category} onSelect={setCategory} />

        <Box sx={{ flex: 1, p: 3, minWidth: 0 }}>
          <Breadcrumbs category={category} />

          <FilterBar
            values={filterValues}
            onChange={(newValues) => {
              setFilterValues(newValues)
              if (page > 0) onUpdateSearch({ page: 0 })
            }}
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

          <SortControls total={visibleProducts.length} />

          <Box sx={{ mt: 2 }}>
            <ProductGrid
              products={visibleProducts.slice(page * PRODUCTS_PAGE_SIZE, (page + 1) * PRODUCTS_PAGE_SIZE)}
              total={visibleProducts.length}
              page={page}
              isLoading={isLoading}
              isError={isError}
              onPageChange={setPage}
              onRetry={() => void refetch()}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
