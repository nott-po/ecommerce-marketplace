import { createFileRoute, useRouter, redirect } from '@tanstack/react-router'
import { ProductDetailPage } from '../../features/shop/pages/ProductDetailPage'

export const Route = createFileRoute('/shop/product/$id')({
  beforeLoad: ({ params }) => {
    const numId = parseInt(params.id, 10)
    if (isNaN(numId) || numId <= 0) throw redirect({ href: '/shop/' })
  },
  component: ProductDetailRoute,
})

function ProductDetailRoute() {
  const { id } = Route.useParams()
  const router = useRouter()
  return (
    <ProductDetailPage
      id={parseInt(id, 10)}
      onBack={() => router.history.back()}
      onNavigateToShop={(category?: string) => {
        const qs = category ? `?category=${encodeURIComponent(category)}` : ''
        router.history.push(`/shop/${qs}`)
      }}
    />
  )
}
