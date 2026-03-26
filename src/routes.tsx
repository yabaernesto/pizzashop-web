import { createBrowserRouter } from 'react-router-dom'

import { Orders } from './pages/app/orders'
import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'
import { AppLayout } from './pages/_layout/app'
import { AuthLayout } from './pages/_layout/auth'
import { Dashboard } from './pages/app/dashboard'

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
