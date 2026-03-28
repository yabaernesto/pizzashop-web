import { Toaster } from 'sonner'
import { RouterProvider } from 'react-router-dom'
import { HelmetProvider, Helmet } from 'react-helmet-async'
import { QueryClientProvider } from '@tanstack/react-query'

import { ThemeProvider } from '@/components/theme/theme-provider'

import { router } from './routes'
import { queryClient } from './lib/react-query'

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme='dark' storageKey='pizzashop-theme'>
        <Helmet titleTemplate='%s | pizza.shop'/>
        <Toaster richColors />
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}
