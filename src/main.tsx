import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import './index.css'
import { AdminLayout } from './admin/components/AdminLayout'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/admin/mesas" replace />
  },
  {
    path: "/admin/*",
    element: <AdminLayout />,
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)