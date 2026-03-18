import { Toaster } from 'sonner'
import { RouterProvider } from 'react-router-dom'
import { HelmetProvider, Helmet } from 'react-helmet-async'

import { ThemeProvider } from '@/components/theme/theme-provider'

import { router } from './routes'

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme='dark' storageKey='pizzashop-theme'>
        <Helmet titleTemplate='%s | pizza.shop'/>
        <Toaster richColors />
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  )
}
