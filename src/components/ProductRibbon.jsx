import { useLayoutEffect, useRef } from 'react'

const productsList = [
  { name: 'Ophthalmic Delivery System ↗', path: 'product-ophthalmic' },
  { name: 'Nasal Delivery System ↗', path: 'product-nasal' },
  { name: 'Tablet Containers & Closures ↗', path: 'product-tablet' },
  { name: 'Flip off Seals ↗', path: 'product-flipoff' },
  { name: 'Measuring Caps & Oral Droppers ↗', path: 'product-measuring' },
  { name: 'Glass Droppers ↗', path: 'product-glass-dropper' },
  { name: 'Dispenser Pumps ↗', path: 'product-dispenser' },
  { name: 'Trigger Pumps ↗', path: 'product-trigger' },
  { name: 'Mist & Cream Pumps ↗', path: 'product-mist-cream' },
  { name: 'Caps & Closures ↗', path: 'product-caps-closures' }
]

export default function ProductRibbon({ activePath, onNavigate }) {
  const containerRef = useRef(null)
  const activeBtnRef = useRef(null)

  // Align ribbon IMMEDIATELY before browser paint so there is ZERO jump or horizontal reset
  useLayoutEffect(() => {
    if (activeBtnRef.current && containerRef.current) {
      const btn = activeBtnRef.current
      const container = containerRef.current
      const btnLeft = btn.offsetLeft
      const btnWidth = btn.offsetWidth
      const containerWidth = container.offsetWidth
      const targetScroll = Math.max(0, btnLeft - (containerWidth / 2) + (btnWidth / 2))

      container.scrollLeft = targetScroll
    }
  }, [activePath])

  const handleClick = (e, path) => {
    e.preventDefault()
    if (path === activePath) return

    // Keep current vertical scroll anchored right at the sticky ribbon
    const ribbonEl = document.getElementById('product-ribbon')
    const currentScroll = window.scrollY
    const ribbonTop = ribbonEl ? ribbonEl.getBoundingClientRect().top + window.pageYOffset - 74 : 280

    const scrollY = currentScroll >= ribbonTop - 30 ? ribbonTop : currentScroll

    onNavigate(path, { fromRibbon: true, scrollY })
  }

  return (
    <div className="op-tabs-bar np-tabs-bar" id="product-ribbon">
      <div 
        className="container op-tabs-container np-tabs-container" 
        ref={containerRef}
      >
        {productsList.map((prod, idx) => {
          const isActive = prod.path === activePath
          return (
            <button
              key={idx}
              ref={isActive ? activeBtnRef : null}
              type="button"
              className={`op-tab-btn np-tab-btn ${isActive ? 'active' : ''}`}
              onClick={(e) => handleClick(e, prod.path)}
            >
              {prod.name}
            </button>
          )
        })}
      </div>
    </div>
  )
}
