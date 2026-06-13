import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import GlobalPresence from './components/GlobalPresence'
import CompanyOverview from './components/CompanyOverview'
import VisionMission from './components/VisionMission'
import Excellence from './components/Excellence'
import Certifications from './components/Certifications'
import Products from './components/Products'
import Clients from './components/Clients'
import FuturePlan from './components/FuturePlan'
import Innovation from './components/Innovation'
import ReachOut from './components/ReachOut'
import Footer from './components/Footer'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import PharmaMarketPage from './pages/PharmaMarketPage'
import ProductDevelopmentPage from './pages/ProductDevelopmentPage'
import ManufacturingPage from './pages/ManufacturingPage'
import GlobalPresencePage from './pages/GlobalPresencePage'
import CareerPage from './pages/CareerPage'
import OphthalmicProductPage from './pages/OphthalmicProductPage'
import NasalProductPage from './pages/NasalProductPage'
import EventPage from './pages/EventPage'

function App() {
  const [page, setPage] = useState('home')

  const navigate = (target) => {
    setPage(target)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Header page={page} onNavigate={navigate} />
      {page === 'home' && (
        <>
          <Hero onNavigate={navigate} />
          <GlobalPresence onNavigate={navigate} />
          <CompanyOverview onNavigate={navigate} />
          <VisionMission />
          <Excellence />
          <Certifications />
          <Products onNavigate={navigate} />
          <Clients />
          <FuturePlan />
          <Innovation />
          <ReachOut />
        </>
      )}
      {page === 'about' && (
        <AboutPage onNavigate={navigate} />
      )}
      {page === 'contact' && (
        <ContactPage onNavigate={navigate} />
      )}
      {page === 'market' && (
        <PharmaMarketPage onNavigate={navigate} />
      )}
      {page === 'expertise' && (
        <ProductDevelopmentPage onNavigate={navigate} />
      )}
      {page === 'manufacturing' && (
        <ManufacturingPage onNavigate={navigate} />
      )}
      {page === 'presence' && (
        <GlobalPresencePage onNavigate={navigate} />
      )}
      {page === 'career' && (
        <CareerPage onNavigate={navigate} />
      )}
      {page === 'product-ophthalmic' && (
        <OphthalmicProductPage onNavigate={navigate} />
      )}
      {page === 'product-nasal' && (
        <NasalProductPage onNavigate={navigate} />
      )}
      {page === 'event' && (
        <EventPage onNavigate={navigate} />
      )}
      <Footer page={page} onNavigate={navigate} />
    </>
  )
}

export default App
