export default function FactoryProductionSvg() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 520 340" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sfGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d3590"/>
          <stop offset="100%" stopColor="#1a56db"/>
        </linearGradient>
      </defs>
      <rect width="520" height="340" fill="url(#sfGrad)"/>
      <rect x="0" y="180" width="520" height="20" rx="2" fill="#1e40af" opacity="0.5"/>
      {/* Machines */}
      <rect x="30" y="80" width="70" height="105" rx="5" fill="#1e3a8a"/>
      <rect x="36" y="86" width="58" height="40" rx="3" fill="#3b82f6" opacity="0.3"/>
      <rect x="110" y="60" width="90" height="125" rx="5" fill="#1e3a8a"/>
      <rect x="116" y="66" width="78" height="45" rx="3" fill="#3b82f6" opacity="0.3"/>
      <rect x="215" y="70" width="80" height="115" rx="5" fill="#1e3a8a"/>
      <rect x="221" y="76" width="68" height="42" rx="3" fill="#3b82f6" opacity="0.3"/>
      <rect x="310" y="90" width="70" height="95" rx="5" fill="#1e3a8a"/>
      <rect x="400" y="75" width="90" height="110" rx="5" fill="#1e3a8a"/>
      {/* Bottles on conveyor */}
      {[50,70,90,140,160,260,280].map(x => (
        <rect key={x} x={x} y="165" width="10" height="20" rx="3" fill="#bfdbfe" opacity="0.9"/>
      ))}
      {/* Workers */}
      <ellipse cx="200" cy="170" rx="7" ry="7" fill="#fcd34d" opacity="0.8"/>
      <rect x="194" y="176" width="12" height="22" rx="4" fill="#f97316" opacity="0.7"/>
      <ellipse cx="360" cy="170" rx="7" ry="7" fill="#fcd34d" opacity="0.8"/>
      <rect x="354" y="176" width="12" height="22" rx="4" fill="#fff" opacity="0.5"/>
      {/* Ceiling lights */}
      {[80,200,330,450].map(x => (
        <g key={x}>
          <line x1={x} y1="0" x2={x} y2="20" stroke="#fbbf24" strokeWidth="2"/>
          <ellipse cx={x} cy="20" rx="12" ry="5" fill="#fbbf24" opacity="0.6"/>
        </g>
      ))}
      {/* Floor */}
      <rect x="0" y="200" width="520" height="140" fill="#0a2460"/>
      <rect x="0" y="200" width="520" height="3" fill="#2563eb" opacity="0.5"/>
    </svg>
  )
}
