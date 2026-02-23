import { createFileRoute } from '@tanstack/react-router'
import { MaintainItemsPage } from '../../features/backoffice/pages/MaintainItemsPage'

export const Route = createFileRoute('/backoffice/')({
  component: MaintainItemsPage,
})
