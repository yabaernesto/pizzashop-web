import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'
import { HelmetProvider, Helmet } from 'react-helmet-async'

import { router } from './routes'

export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate='%s | pizza.shop'/>
      <Toaster richColors />
      <RouterProvider router={router} />
    </HelmetProvider>
  )
}
