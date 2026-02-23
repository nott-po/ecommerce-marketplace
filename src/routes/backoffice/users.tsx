import { createFileRoute } from '@tanstack/react-router'
import { AddUserPage } from '../../features/backoffice/pages/AddUserPage'

export const Route = createFileRoute('/backoffice/users')({
  component: AddUserPage,
})
