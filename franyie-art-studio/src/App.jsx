import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import CustomCursor from './components/CustomCursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Gallery from './components/Gallery'
import About from './components/About'
import PriceList from './components/PriceList'
import CommissionWizard from './components/CommissionWizard'
import Footer from './components/Footer'
import LoadingIntro from './components/LoadingIntro'

// TODO: reemplazar por el logo y las piezas reales de Franyie cuando lleguen.
const LOGO_PLACEHOLDER =
  'https://images.unsplash.com/photo-1590650046871-92c887180603?w=100&h=100&fit=crop'
const AVATAR_PLACEHOLDER =
  'https://images.unsplash.com/photo-1618172193622-ae2d025f4032?w=300&h=300&fit=crop'

// Categorías alineadas a como ella misma organiza sus comisiones
const CATEGORY_CYCLE = ['Chibi', 'Icon', 'Medio Cuerpo', 'Cuerpo Completo']
const HEIGHTS = [340, 420, 260, 380, 300, 440, 320, 270, 390, 310, 350, 290]

const PLACEHOLDER_PIECES = HEIGHTS.map((h, i) => ({
  src: `https://picsum.photos/seed/franyie${i}/400/${h}`,
  category: CATEGORY_CYCLE[i % CATEGORY_CYCLE.length],
}))

function App() {
  const [wizardOpen, setWizardOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <AnimatePresence>{loading && <LoadingIntro />}</AnimatePresence>

      <CustomCursor />
      <Nav logoSrc={LOGO_PLACEHOLDER} onOpenCommission={() => setWizardOpen(true)} />
      <Hero avatarSrc={AVATAR_PLACEHOLDER} onOpenCommission={() => setWizardOpen(true)} />
      <Gallery pieces={PLACEHOLDER_PIECES} />
      <About avatarSrc={AVATAR_PLACEHOLDER} />
      <PriceList />
      <Footer onOpenCommission={() => setWizardOpen(true)} />

      <AnimatePresence>
        {wizardOpen && <CommissionWizard onClose={() => setWizardOpen(false)} />}
      </AnimatePresence>
    </>
  )
}

export default App
