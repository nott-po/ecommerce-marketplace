import { createFileRoute, useRouter } from '@tanstack/react-router'
import { ShopPage, type ShopSearchParams } from '../../features/shop/pages/ShopPage'
import type { PriceRange, ConditionFilter } from '../../features/shop/components/FilterBar'

const toNum = (v: string): number => { const n = Number(v); return isNaN(n) ? 0 : n }

const PRICE_RANGES: PriceRange[] = ['under25', '25to50', '50to100', 'over100']
const isPriceRange = (v: unknown): v is PriceRange => PRICE_RANGES.includes(v as PriceRange)

const CONDITIONS: ConditionFilter[] = ['In Stock', 'Low Stock', 'Out of Stock']
const isConditionFilter = (v: unknown): v is ConditionFilter => CONDITIONS.includes(v as ConditionFilter)

export const Route = createFileRoute('/shop/')({
  validateSearch: (search: Record<string, unknown>): ShopSearchParams => ({
    q: typeof search.q === 'string' ? search.q : '',
    category: typeof search.category === 'string' ? search.category : '',
    page: typeof search.page === 'number' ? search.page : (typeof search.page === 'string' ? toNum(search.page) : 0),
    sort: typeof search.sort === 'string' ? search.sort : 'title',
    order: search.order === 'desc' ? 'desc' : 'asc',
    onSale: search.onSale === true || search.onSale === 'true',
    priceRange: isPriceRange(search.priceRange) ? search.priceRange : '',
    condition: isConditionFilter(search.condition) ? search.condition : '',
    minRating: typeof search.minRating === 'number' ? search.minRating : (typeof search.minRating === 'string' ? toNum(search.minRating) : 0),
  }),
  component: ShopPageRoute,
})

function ShopPageRoute() {
  const search = Route.useSearch()
  const router = useRouter()

  const onUpdateSearch = (updates: Partial<ShopSearchParams>) => {
    const next = { ...search, ...updates }
    const params = new URLSearchParams()
    if (next.q) params.set('q', next.q)
    if (next.category) params.set('category', next.category)
    if (next.page > 0) params.set('page', String(next.page))
    if (next.sort && next.sort !== 'title') params.set('sort', next.sort)
    if (next.order === 'desc') params.set('order', 'desc')
    if (next.onSale) params.set('onSale', 'true')
    if (next.priceRange) params.set('priceRange', next.priceRange)
    if (next.condition) params.set('condition', next.condition)
    if (next.minRating > 0) params.set('minRating', String(next.minRating))
    const qs = params.toString()
    router.history.push(`/shop/${qs ? '?' + qs : ''}`)
  }

  const onNavigate = (id: number) => router.history.push(`/shop/product/${id}`)

  return <ShopPage searchParams={search} onUpdateSearch={onUpdateSearch} onNavigate={onNavigate} />
}
