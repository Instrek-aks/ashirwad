import { useState, useEffect, useRef } from 'react'
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
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import PharmaMarketPage from './pages/PharmaMarketPage'
import CosmeticMarketPage from './pages/CosmeticMarketPage'
import HomeCarePage from './pages/HomeCarePage'
import ProductDevelopmentPage from './pages/ProductDevelopmentPage'
import ManufacturingPage from './pages/ManufacturingPage'
import SustainabilityPage from './pages/SustainabilityPage'
import QualityPage from './pages/QualityPage'
import InnovationPage from './pages/InnovationPage'
import ResearchDevelopmentPage from './pages/ResearchDevelopmentPage'
import GlobalPresencePage from './pages/GlobalPresencePage'
import CareerPage from './pages/CareerPage'
import EventPage from './pages/EventPage'
import OphthalmicProductPage from './pages/OphthalmicProductPage'
import NasalProductPage from './pages/NasalProductPage'
import TabletProductPage from './pages/TabletProductPage'
import FlipOffProductPage from './pages/FlipOffProductPage'
import MeasuringProductPage from './pages/MeasuringProductPage'
import GlassDropperProductPage from './pages/GlassDropperProductPage'
import DispenserProductPage from './pages/DispenserProductPage'
import TriggerProductPage from './pages/TriggerProductPage'
import MistCreamProductPage from './pages/MistCreamProductPage'
import CapsClosuresProductPage from './pages/CapsClosuresProductPage'
import AdminPage from './pages/AdminPage'
import BlogPage from './pages/BlogPage'
import BlogDetailPage from './pages/BlogDetailPage'
import { parseCurrentLocation, getPathForTarget, getDocumentTitle } from './utils/routes'

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
    const isProductSwitch = prevPageRef.current?.startsWith('product-') && page?.startsWith('product-');
    if (!isProductSwitch) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;

      const timer = setTimeout(() => {
        window.scrollTo(0, 0);
        if (document.documentElement) document.documentElement.scrollTop = 0;
        if (document.body) document.body.scrollTop = 0;
      }, 40);

      return () => clearTimeout(timer);
    }
    prevPageRef.current = page;
  }, [page, currentBlogSlug]);

  // Handle browser Back / Forward buttons and URL hash changes
  useEffect(() => {
    const handleLocationChange = () => {
      const route = parseCurrentLocation();
      setPage(route.page);
      if (route.slug) {
        setCurrentBlogSlug(route.slug);
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Central Navigation Handler (Updates browser URL, updates state, scrolls to top)
  const navigate = (target, data = null) => {
    const canonicalPath = getPathForTarget(target, data);
    const isRibbonSwitch = Boolean(data?.fromRibbon) || (page?.startsWith('product-') && target?.startsWith('product-'));

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

    if (isRibbonSwitch) {
      const scrollY = data?.scrollY ?? 280;
      window.scrollTo({ top: scrollY, behavior: 'instant' });
      requestAnimationFrame(() => {
        const ribbonEl = document.getElementById('product-ribbon');
        if (ribbonEl) {
          const y = ribbonEl.getBoundingClientRect().top + window.pageYOffset - 74;
          window.scrollTo({ top: Math.max(0, y), behavior: 'instant' });
        }
      });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    }
  };

  if (page === 'admin') {
    return <AdminPage onNavigate={navigate} />
  }

  return (
    <>
      <Header page={page} onNavigate={navigate} />
      <main key={page} className="page-view-transition" style={{ minHeight: '60vh' }}>
        {page === 'home' && (
        <>
          <Hero onNavigate={navigate} />
          <GlobalPresence onNavigate={navigate} />
          <CompanyOverview onNavigate={navigate} />
          <VisionMission />
          <Excellence />
          <Products onNavigate={navigate} />
          <Commitment />
          <Clients />
          <FuturePlan />
          <Innovation />
          <BottomCertifications />
        </>
      )}
      {page === 'about' && (
        <AboutPage onNavigate={navigate} />
      )}
      {page === 'contact' && (
        <ContactPage onNavigate={navigate} />
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
      {page === 'product-flipoff' && (
        <FlipOffProductPage onNavigate={navigate} />
      )}
      {page === 'product-measuring' && (
        <MeasuringProductPage onNavigate={navigate} />
      )}
      {page === 'product-glass-dropper' && (
        <GlassDropperProductPage onNavigate={navigate} />
      )}
      {page === 'product-dispenser' && (
        <DispenserProductPage onNavigate={navigate} />
      )}
      {page === 'product-trigger' && (
        <TriggerProductPage onNavigate={navigate} />
      )}
      {page === 'product-mist-cream' && (
        <MistCreamProductPage onNavigate={navigate} />
      )}
      {page === 'product-caps-closures' && (
        <CapsClosuresProductPage onNavigate={navigate} />
      )}
      </main>
      <Footer page={page} onNavigate={navigate} />
    </>
  )
}

export default App

