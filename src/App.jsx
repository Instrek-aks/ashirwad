import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import GlobalPresence from './components/GlobalPresence'
import CompanyOverview from './components/CompanyOverview'
import VisionMission from './components/VisionMission'
import Excellence from './components/Excellence'
import Products from './components/Products'
import Commitment from './components/Commitment'
import Clients from './components/Clients'
import FuturePlan from './components/FuturePlan'
import Innovation from './components/Innovation'
import BottomCertifications from './components/BottomCertifications'
import Footer from './components/Footer'
import { parseCurrentLocation, getPathForTarget, getDocumentTitle } from './utils/routes'

const AboutPage = lazy(() => import('./pages/AboutPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const QueryPage = lazy(() => import('./pages/QueryPage'))
const PharmaMarketPage = lazy(() => import('./pages/PharmaMarketPage'))
const CosmeticMarketPage = lazy(() => import('./pages/CosmeticMarketPage'))
const HomeCarePage = lazy(() => import('./pages/HomeCarePage'))
const ProductDevelopmentPage = lazy(() => import('./pages/ProductDevelopmentPage'))
const ManufacturingPage = lazy(() => import('./pages/ManufacturingPage'))
const SustainabilityPage = lazy(() => import('./pages/SustainabilityPage'))
const QualityPage = lazy(() => import('./pages/QualityPage'))
const InnovationPage = lazy(() => import('./pages/InnovationPage'))
const GlobalPresencePage = lazy(() => import('./pages/GlobalPresencePage'))
const CareerPage = lazy(() => import('./pages/CareerPage'))
const EventPage = lazy(() => import('./pages/EventPage'))
const OphthalmicProductPage = lazy(() => import('./pages/OphthalmicProductPage'))
const NasalProductPage = lazy(() => import('./pages/NasalProductPage'))
const TabletProductPage = lazy(() => import('./pages/TabletProductPage'))
const ProteinJarsProductPage = lazy(() => import('./pages/ProteinJarsProductPage'))
const FlipOffProductPage = lazy(() => import('./pages/FlipOffProductPage'))
const MeasuringProductPage = lazy(() => import('./pages/MeasuringProductPage'))
const PersonalCareProductPage = lazy(() => import('./pages/PersonalCareProductPage'))
const CapsClosuresProductPage = lazy(() => import('./pages/CapsClosuresProductPage'))
const AdminPage = lazy(() => import('./pages/AdminPage'))
const BrochurePage = lazy(() => import('./pages/BrochurePage'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage'))

function App() {
  // Disable automatic scroll restoration so user always lands at the top of the new page
  if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }

  // Parse initial route on load or refresh
  const initialRoute = parseCurrentLocation();
  const [page, setPage] = useState(initialRoute.page);
  const prevPageRef = useRef(initialRoute.page);
  const [currentBlogSlug, setCurrentBlogSlug] = useState(
    initialRoute.slug || 'advancing-ophthalmic-nasal-delivery-precision-cleanroom-molding'
  );

  // Instant scroll-to-top and document title update whenever route changes
  useEffect(() => {
    document.title = getDocumentTitle(page);
  }, [page, currentBlogSlug]);

  // Handle browser Back / Forward buttons and URL hash changes
  useEffect(() => {
    const handleLocationChange = () => {
      const route = parseCurrentLocation();
      const isProductSwitch = page?.startsWith('product-') && route.page?.startsWith('product-');
      setPage(route.page);
      if (route.slug) {
        setCurrentBlogSlug(route.slug);
      }
      if (!isProductSwitch) {
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, [page]);

  // Central Navigation Handler (Updates browser URL, updates state, scrolls to top)
  const navigate = (target, data = null) => {
    const canonicalPath = getPathForTarget(target, data);
    const isProductSwitch = page?.startsWith('product-') && target?.startsWith('product-');

    if (typeof window !== 'undefined') {
      if (window.location.pathname !== canonicalPath) {
        window.history.pushState({ target, data }, '', canonicalPath);
      }
    }

    if (target === 'blog-detail' && data && typeof data === 'string') {
      setCurrentBlogSlug(data);
      setPage('blog-detail');
    } else {
      setPage(target);
    }

    // Only scroll to top on non-product full-page navigation
    // Product-to-product ribbon navigation stays smoothly anchored with zero jumping
    if (!isProductSwitch) {
      window.scrollTo(0, 0);
    }
  };

  if (page === 'admin') {
    return (
      <Suspense fallback={null}>
        <AdminPage onNavigate={navigate} />
      </Suspense>
    )
  }

  return (
    <>
      <Header page={page} onNavigate={navigate} />
      <main className="page-view-content" style={{ minHeight: '60vh' }}>
        <Suspense fallback={null}>
        {page === 'home' && (
        <>
          <Hero onNavigate={navigate} />
          <GlobalPresence onNavigate={navigate} />
          <CompanyOverview onNavigate={navigate} />
          <VisionMission />
          <Excellence />
          <Products onNavigate={navigate} />
          <BottomCertifications />
          <Commitment />
          <Clients />
          <FuturePlan />
          <Innovation />
        </>
      )}
      {page === 'about' && (
        <AboutPage onNavigate={navigate} />
      )}
      {page === 'contact' && (
        <ContactPage onNavigate={navigate} />
      )}
      {page === 'query' && (
        <QueryPage onNavigate={navigate} />
      )}
      {page === 'market-pharma' && (
        <PharmaMarketPage onNavigate={navigate} />
      )}
      {page === 'market-cosmetic' && (
        <CosmeticMarketPage onNavigate={navigate} />
      )}
      {(page === 'market-homecare' || page === 'market-nutraceutical') && (
        <HomeCarePage onNavigate={navigate} />
      )}
      {page === 'expertise' && (
        <ProductDevelopmentPage onNavigate={navigate} />
      )}
      {page === 'expertise-manufacturing' && (
        <ManufacturingPage onNavigate={navigate} />
      )}
      {page === 'expertise-sustainability' && (
        <SustainabilityPage onNavigate={navigate} />
      )}
      {page === 'expertise-quality' && (
        <QualityPage onNavigate={navigate} />
      )}
      {(page === 'expertise-innovation' || page === 'expertise-rd' || page === 'expertise-rd-innovation') && (
        <InnovationPage onNavigate={navigate} />
      )}
      {page === 'presence' && (
        <GlobalPresencePage onNavigate={navigate} />
      )}
      {page === 'career' && (
        <CareerPage onNavigate={navigate} />
      )}
      {page === 'event' && (
        <EventPage onNavigate={navigate} />
      )}
      {page === 'brochure' && (
        <BrochurePage onNavigate={navigate} />
      )}
      {page === 'blogs' && (
        <BlogPage onNavigate={navigate} />
      )}
      {page === 'blog-detail' && (
        <BlogDetailPage slug={currentBlogSlug} onNavigate={navigate} />
      )}
      {page === 'product-ophthalmic' && (
        <OphthalmicProductPage onNavigate={navigate} />
      )}
      {page === 'product-nasal' && (
        <NasalProductPage onNavigate={navigate} />
      )}
      {page === 'product-tablet' && (
        <TabletProductPage onNavigate={navigate} />
      )}
      {page === 'product-protein-jars' && (
        <ProteinJarsProductPage onNavigate={navigate} />
      )}
      {page === 'product-flipoff' && (
        <FlipOffProductPage onNavigate={navigate} />
      )}
      {page === 'product-measuring' && (
        <MeasuringProductPage onNavigate={navigate} />
      )}
      {page === 'product-personal-care' && (
        <PersonalCareProductPage onNavigate={navigate} />
      )}
      {page === 'product-caps-closures' && (
        <CapsClosuresProductPage onNavigate={navigate} />
      )}
        </Suspense>
      </main>
      <Footer page={page} onNavigate={navigate} />
    </>
  )
}

export default App

