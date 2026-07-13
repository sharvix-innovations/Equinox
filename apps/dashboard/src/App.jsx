import { Routes, Route } from 'react-router-dom'

import { ToastProvider } from '@/store/ToastContext'
import { AuthProvider } from '@/store/AuthContext'
import { DataProvider } from '@/store/DataContext'

import ProtectedRoute from '@/components/common/ProtectedRoute'
import DashboardLayout from '@/components/layout/DashboardLayout'
import ToastViewport from '@/components/ui/ToastViewport'

import LoginPage from '@/pages/auth/LoginPage'
import DashboardHome from '@/pages/DashboardHome'
import ProductsPage from '@/pages/products/ProductsPage'
import ServicesPage from '@/pages/services/ServicesPage'
import EventsPage from '@/pages/events/EventsPage'
import GalleryPage from '@/pages/gallery/GalleryPage'
import ClientsPage from '@/pages/clients/ClientsPage'
import TeamPage from '@/pages/team/TeamPage'
import EnquiriesPage from '@/pages/enquiries/EnquiriesPage'
import SettingsPage from '@/pages/settings/SettingsPage'
import NotFoundPage from '@/pages/NotFoundPage'

/** Authenticated shell: gate → data store → layout with nested routes. */
function ProtectedShell() {
  return (
    <ProtectedRoute>
      <DataProvider>
        <DashboardLayout />
      </DataProvider>
    </ProtectedRoute>
  )
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route element={<ProtectedShell />}>
            <Route index element={<DashboardHome />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/enquiries" element={<EnquiriesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        <ToastViewport />
      </AuthProvider>
    </ToastProvider>
  )
}
