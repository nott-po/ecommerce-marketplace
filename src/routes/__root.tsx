import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import Box from '@mui/material/Box'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box component="main" sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Outlet />
      </Box>
      {import.meta.env.DEV && <TanStackRouterDevtools position="bottom-right" />}
    </Box>
  )
}
