import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { Router } from './Router/router'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { CartProvider } from './Context/CartProvider '
import AuthProvider from './Context/AuthProvider'

const queryClient = new QueryClient()


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <RouterProvider router={Router}>
          </RouterProvider>
        </CartProvider>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
)
