import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { router } from './router'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: '#18181b',
          color: '#fff',
          borderRadius: '12px',
          boxShadow: '0 4px 32px 0 rgba(0,0,0,0.25)',
          fontSize: '1rem',
          border: '1px solid #27272a',
          padding: '16px 20px',
        },
        success: {
          iconTheme: {
            primary: '#22c55e',
            secondary: '#fff',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: '#fff',
          },
        },
      }}
    />
    <RouterProvider router={router} />
  </StrictMode>,
)
