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
      {page === 'market-pharma' && (
        <PharmaMarketPage onNavigate={navigate} />
      )}
      {page === 'market-cosmetic' && (
        <CosmeticMarketPage onNavigate={navigate} />
      )}
      {page === 'market-homecare' && (
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
      {page === 'expertise-innovation' && (
        <InnovationPage onNavigate={navigate} />
      )}
      {page === 'expertise-rd' && (
        <ResearchDevelopmentPage onNavigate={navigate} />
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
      <Footer page={page} onNavigate={navigate} />
    </>
  )
}

export default App

