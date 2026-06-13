export default function BottlesSvg() {
  return (
    <div className="bottles-container">
      {/* Bottle 1: Pump */}
      <div className="bottle-item">
        <svg width="54" height="90" viewBox="0 0 60 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bg1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.6"/>
              <stop offset="100%" stopColor="#c8d8f0" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <rect x="22" y="8" width="16" height="6" rx="2" fill="#c8d8f0"/>
          <rect x="28" y="2" width="4" height="10" rx="2" fill="#94b0d6"/>
          <rect x="15" y="14" width="30" height="78" rx="10" fill="#e8f0fb"/>
          <rect x="15" y="14" width="30" height="78" rx="10" fill="url(#bg1)" opacity="0.5"/>
          <rect x="18" y="40" width="24" height="1.5" rx="1" fill="#b0c8e8"/>
        </svg>
      </div>
      {/* Bottle 2: Spray */}
      <div className="bottle-item">
        <svg width="54" height="90" viewBox="0 0 60 100" xmlns="http://www.w3.org/2000/svg">
          <rect x="28" y="5" width="20" height="7" rx="3" fill="#b0c8e8"/>
          <rect x="44" y="8" width="10" height="3" rx="1.5" fill="#94b0d6"/>
          <rect x="14" y="12" width="28" height="80" rx="8" fill="#e8f0fb"/>
          <rect x="17" y="35" width="22" height="2" rx="1" fill="#b0c8e8"/>
          <rect x="17" y="50" width="22" height="1" rx="0.5" fill="#c8d8f0"/>
        </svg>
      </div>
      {/* Bottle 3: Round */}
      <div className="bottle-item">
        <svg width="54" height="90" viewBox="0 0 60 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bg3" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.7"/>
              <stop offset="100%" stopColor="#c8d8f0" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <rect x="24" y="6" width="12" height="12" rx="3" fill="#c8d8f0"/>
          <ellipse cx="30" cy="62" rx="18" ry="32" fill="#e8f0fb"/>
          <ellipse cx="30" cy="62" rx="18" ry="32" fill="url(#bg3)" opacity="0.4"/>
          <rect x="24" y="30" width="12" height="2" rx="1" fill="#b0c8e8"/>
        </svg>
      </div>
      {/* Bottle 4: Tall */}
      <div className="bottle-item">
        <svg width="54" height="90" viewBox="0 0 60 100" xmlns="http://www.w3.org/2000/svg">
          <rect x="25" y="3" width="10" height="8" rx="3" fill="#94b0d6"/>
          <rect x="18" y="11" width="24" height="82" rx="6" fill="#e8f0fb"/>
          <rect x="21" y="35" width="18" height="1.5" rx="0.75" fill="#b0c8e8"/>
          <rect x="21" y="55" width="18" height="1" rx="0.5" fill="#c8d8f0"/>
        </svg>
      </div>
    </div>
  )
}
