import { createFileRoute, useRouter } from '@tanstack/react-router'
import { BackofficeProductPage } from '../../features/backoffice/pages/BackofficeProductPage'

export const Route = createFileRoute('/backoffice/product/$id')({
  component: BackofficeProductRoute,
})

function BackofficeProductRoute() {
  const { id } = Route.useParams()
  const router = useRouter()
  return (
    <BackofficeProductPage
      id={parseInt(id, 10)}
      onBack={() => router.history.back()}
      onNavigate={path => router.history.push(path)}
    />
  )
}
