import { createFileRoute, useRouter } from '@tanstack/react-router'
import { ShopPage, type ShopSearchParams } from '../../features/shop/pages/ShopPage'

export const Route = createFileRoute('/shop/')({
  validateSearch: (search: Record<string, unknown>): ShopSearchParams => ({
    q: typeof search.q === 'string' ? search.q : '',
    category: typeof search.category === 'string' ? search.category : '',
    page: typeof search.page === 'number' ? search.page : 0,
    sort: typeof search.sort === 'string' ? search.sort : 'title',
    order: search.order === 'desc' ? 'desc' : 'asc',
  }),
  component: ShopPageRoute,
})

function ShopPageRoute() {
  const search = Route.useSearch()
  const router = useRouter()

  const onUpdateSearch = (updates: Partial<ShopSearchParams>) => {
    const next = { ...search, ...updates }
    const qs = new URLSearchParams(
      Object.entries(next).map(([k, v]) => [k, String(v)]),
    ).toString()
    router.history.push(`/shop/?${qs}`)
  }

  return <ShopPage searchParams={search} onUpdateSearch={onUpdateSearch} />
}
