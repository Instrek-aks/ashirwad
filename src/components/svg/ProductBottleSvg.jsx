const bottles = {
  pump: (
    <svg width="80" height="120" viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pg1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.7"/>
          <stop offset="100%" stopColor="transparent"/>
        </linearGradient>
      </defs>
      <rect x="30" y="8" width="20" height="10" rx="4" fill="#c8d8f0"/>
      <rect x="36" y="2" width="8" height="10" rx="3" fill="#94b0d6"/>
      <rect x="14" y="18" width="52" height="90" rx="14" fill="#e8f0fb"/>
      <rect x="14" y="18" width="52" height="90" rx="14" fill="url(#pg1)" opacity="0.4"/>
      <rect x="20" y="55" width="40" height="2" rx="1" fill="#b0c8e8"/>
      <text x="40" y="80" textAnchor="middle" fontSize="8" fill="#94b0d6" fontWeight="600">PUMP</text>
    </svg>
  ),
  spray: (
    <svg width="80" height="120" viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pg2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.7"/>
          <stop offset="100%" stopColor="transparent"/>
        </linearGradient>
      </defs>
      <rect x="35" y="5" width="30" height="10" rx="4" fill="#b0c8e8"/>
      <rect x="60" y="8" width="16" height="5" rx="2" fill="#94b0d6"/>
      <rect x="10" y="15" width="46" height="95" rx="10" fill="#e8f0fb"/>
      <rect x="10" y="15" width="46" height="95" rx="10" fill="url(#pg2)" opacity="0.4"/>
      <rect x="16" y="50" width="34" height="2" rx="1" fill="#b0c8e8"/>
      <text x="33" y="75" textAnchor="middle" fontSize="7" fill="#94b0d6" fontWeight="600">SPRAY</text>
    </svg>
  ),
  round: (
    <svg width="80" height="120" viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pg3" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.7"/>
          <stop offset="100%" stopColor="transparent"/>
        </linearGradient>
      </defs>
      <rect x="28" y="5" width="24" height="12" rx="5" fill="#c8d8f0"/>
      <ellipse cx="40" cy="75" rx="26" ry="40" fill="#e8f0fb"/>
      <ellipse cx="40" cy="75" rx="26" ry="40" fill="url(#pg3)" opacity="0.4"/>
      <rect x="28" y="35" width="24" height="3" rx="1.5" fill="#b0c8e8"/>
      <text x="40" y="80" textAnchor="middle" fontSize="8" fill="#94b0d6" fontWeight="600">ROUND</text>
    </svg>
  ),
  hdpe: (
    <svg width="80" height="120" viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pg4" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.7"/>
          <stop offset="100%" stopColor="transparent"/>
        </linearGradient>
      </defs>
      <rect x="30" y="3" width="20" height="12" rx="4" fill="#94b0d6"/>
      <rect x="18" y="15" width="44" height="95" rx="8" fill="#e8f0fb"/>
      <rect x="18" y="15" width="44" height="95" rx="8" fill="url(#pg4)" opacity="0.4"/>
      <rect x="24" y="50" width="32" height="2" rx="1" fill="#b0c8e8"/>
      <rect x="24" y="65" width="32" height="1.5" rx="0.75" fill="#c8d8f0"/>
      <text x="40" y="82" textAnchor="middle" fontSize="7" fill="#94b0d6" fontWeight="600">HDPE</text>
    </svg>
  ),
  jar: (
    <svg width="80" height="120" viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="40" cy="90" rx="32" ry="28" fill="#e8f0fb"/>
      <ellipse cx="40" cy="63" rx="32" ry="10" fill="#d0e2f5"/>
      <rect x="8" y="62" width="64" height="28" fill="#e8f0fb"/>
      <ellipse cx="40" cy="62" rx="32" ry="10" fill="#c8d8f0"/>
      <ellipse cx="40" cy="62" rx="28" ry="7" fill="#d8e8f8"/>
      <text x="40" y="83" textAnchor="middle" fontSize="7" fill="#94b0d6" fontWeight="600">CREAM JAR</text>
    </svg>
  ),
  foamer: (
    <svg width="80" height="120" viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pg5" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="transparent"/>
        </linearGradient>
      </defs>
      <rect x="32" y="5" width="16" height="20" rx="3" fill="#c8d8f0"/>
      <rect x="34" y="2" width="12" height="8" rx="2" fill="#94b0d6"/>
      <rect x="20" y="25" width="40" height="85" rx="12" fill="#e8f0fb"/>
      <rect x="20" y="25" width="40" height="85" rx="12" fill="url(#pg5)" opacity="0.3"/>
      <text x="40" y="78" textAnchor="middle" fontSize="7" fill="#94b0d6" fontWeight="600">FOAMER</text>
    </svg>
  ),
  trigger: (
    <svg width="80" height="120" viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="26" y="3" width="28" height="8" rx="3" fill="#94b0d6"/>
      <rect x="20" y="11" width="40" height="100" rx="6" fill="#e8f0fb"/>
      <rect x="24" y="30" width="32" height="2" rx="1" fill="#b0c8e8"/>
      <rect x="24" y="55" width="32" height="2" rx="1" fill="#b0c8e8"/>
      <text x="40" y="85" textAnchor="middle" fontSize="7" fill="#94b0d6" fontWeight="600">TRIGGER</text>
    </svg>
  ),
  airless: (
    <svg width="80" height="120" viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="40" cy="105" rx="30" ry="12" fill="#d0e2f5"/>
      <rect x="10" y="30" width="60" height="75" rx="5" fill="#e8f0fb"/>
      <rect x="26" y="20" width="28" height="14" rx="4" fill="#c8d8f0"/>
      <rect x="32" y="14" width="16" height="10" rx="3" fill="#94b0d6"/>
      <text x="40" y="78" textAnchor="middle" fontSize="7" fill="#94b0d6" fontWeight="600">AIRLESS</text>
    </svg>
  ),
  flat: (
    <svg width="80" height="120" viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pg6" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="transparent"/>
        </linearGradient>
      </defs>
      <rect x="22" y="5" width="36" height="105" rx="5" fill="#e8f0fb"/>
      <rect x="22" y="5" width="36" height="105" rx="5" fill="url(#pg6)" opacity="0.3"/>
      <rect x="28" y="25" width="24" height="2" rx="1" fill="#b0c8e8"/>
      <rect x="28" y="50" width="24" height="2" rx="1" fill="#b0c8e8"/>
      <text x="40" y="85" textAnchor="middle" fontSize="7" fill="#94b0d6" fontWeight="600">FLAT</text>
    </svg>
  ),
  disc: (
    <svg width="80" height="120" viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="40" cy="85" rx="28" ry="30" fill="#e8f0fb"/>
      <ellipse cx="40" cy="55" rx="20" ry="10" fill="#c8d8f0"/>
      <rect x="20" y="54" width="40" height="31" fill="#e8f0fb"/>
      <rect x="30" y="40" width="20" height="18" rx="5" fill="#c8d8f0"/>
      <rect x="35" y="35" width="10" height="10" rx="3" fill="#94b0d6"/>
      <text x="40" y="95" textAnchor="middle" fontSize="7" fill="#94b0d6" fontWeight="600">DISC TOP</text>
    </svg>
  ),
}

export default function ProductBottleSvg({ type }) {
  return bottles[type] || bottles.pump
}
