import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { routeTree } from './routeTree.gen'
import { theme } from './styles/theme'
import { GlobalStyles } from './styles/GlobalStyles'
import { AuthProvider } from './features/auth/AuthContext'
import { FavoritesProvider } from './hooks/useFavorites'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('app')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <AuthProvider>
      <FavoritesProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles />
            <RouterProvider router={router} />
          </ThemeProvider>
        </QueryClientProvider>
      </FavoritesProvider>
    </AuthProvider>,
  )
}
