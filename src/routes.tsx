import { createBrowserRouter } from 'react-router-dom'

import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'
import { AppLayout } from './pages/_layout/app'
import { AuthLayout } from './pages/_layout/auth'
import { Dashboard } from './pages/dashboard/dashboard'
import { Orders } from './pages/dashboard/orders/orders'

export const router = createBrowserRouter([
  { 
    path: '/', element: <AppLayout />,
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
])
