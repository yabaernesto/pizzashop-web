import { createBrowserRouter } from 'react-router-dom'

import { Error } from './pages/error'
import { NotFound } from './pages/404'
import { Orders } from './pages/app/orders'
import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'
import { AppLayout } from './pages/_layout/app'
import { AuthLayout } from './pages/_layout/auth'
import { Dashboard } from './pages/app/dashboard'

export const router = createBrowserRouter([
  { 
    path: '/', element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: '/', element: <Dashboard />},
      { path: '/orders', element: <Orders />}
    ]
  },
  { 
    path: '/', element: <AuthLayout />,
    children: [
      { path: '/sign-in', element: <SignIn /> },
      { path: '/sign-up', element: <SignUp /> },
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
])
