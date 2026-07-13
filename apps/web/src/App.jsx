import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'

import ScrollProgress from '@/components/layout/ScrollProgress'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ChatAssistant from '@/components/widgets/ChatAssistant'

import Home from '@/pages/Home'
import AboutPage from '@/pages/AboutPage'
import ManagementPage from '@/pages/ManagementPage'
import ExpertsPage from '@/pages/ExpertsPage'
import ProductsPage from '@/pages/ProductsPage'
import ProductDetailsPage from '@/pages/ProductDetailsPage'
import ServicesPage from '@/pages/ServicesPage'
import ServiceDetailsPage from '@/pages/ServiceDetailsPage'
import GalleryPage from '@/pages/GalleryPage'
import EventsPage from '@/pages/EventsPage'
import EventDetailsPage from '@/pages/EventDetailsPage'
import ClientsPage from '@/pages/ClientsPage'
import ContactPage from '@/pages/ContactPage'
import PrivacyPage from '@/pages/PrivacyPage'
import TermsPage from '@/pages/TermsPage'
import ThankYouPage from '@/pages/ThankYouPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  useSmoothScroll()

  return (
    <BrowserRouter>
      <ScrollToTop />
      <ScrollProgress />

      {/* Full-bleed white page surface */}
      <div className="w-full overflow-hidden bg-surface">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/team/management" element={<ManagementPage />} />
          <Route path="/team/experts" element={<ExpertsPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:slug" element={<ProductDetailsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:slug" element={<EventDetailsPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer />
      </div>

      <ChatAssistant />
    </BrowserRouter>
  )
}
