export default function PlantationSvg() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 520 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="plantGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#064e3b"/>
          <stop offset="100%" stopColor="#065f46"/>
        </linearGradient>
      </defs>
      <rect width="520" height="300" fill="url(#plantGrad)"/>
      <rect width="520" height="150" fill="#155e75" opacity="0.5"/>
      {/* Mountains */}
      <polygon points="0,150 100,60 200,150" fill="#047857" opacity="0.6"/>
      <polygon points="100,150 220,50 340,150" fill="#065f46" opacity="0.8"/>
      <polygon points="250,150 370,70 490,150" fill="#047857" opacity="0.6"/>
      {/* Trees */}
      {[
        { cx: 50, cy: 145, r: 22 },
        { cx: 130, cy: 140, r: 28 },
        { cx: 210, cy: 138, r: 25 },
        { cx: 290, cy: 142, r: 22 },
        { cx: 360, cy: 138, r: 28 },
        { cx: 440, cy: 143, r: 24 },
      ].map((t, i) => (
        <g key={i}>
          <circle cx={t.cx} cy={t.cy} r={t.r} fill={i % 2 === 0 ? '#064e3b' : '#065f46'}/>
          <rect x={t.cx - 3} y={t.cy + 10} width="6" height={t.r + 5} fill="#5a3e28"/>
        </g>
      ))}
      {/* Ground */}
      <rect x="0" y="175" width="520" height="125" fill="#14532d"/>
      {/* Path */}
      <polygon points="210,300 310,300 290,175 230,175" fill="#92400e" opacity="0.4"/>
      {/* Factory building */}
      <rect x="160" y="100" width="200" height="80" fill="#1e40af" opacity="0.4"/>
      <rect x="165" y="108" width="190" height="70" fill="#3b82f6" opacity="0.1"/>
      {/* Chimneys */}
      <rect x="190" y="70" width="14" height="32" fill="#1e3a8a" opacity="0.5"/>
      <rect x="260" y="65" width="14" height="37" fill="#1e3a8a" opacity="0.5"/>
      {/* Leaf clusters */}
      <circle cx="80" cy="50" r="35" fill="#064e3b" opacity="0.5"/>
      <circle cx="440" cy="55" r="30" fill="#064e3b" opacity="0.5"/>
    </svg>
  )
}
