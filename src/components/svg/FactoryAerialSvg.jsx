export default function FactoryAerialSvg() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 520 320" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#87ceeb"/>
          <stop offset="100%" stopColor="#c8e8ff"/>
        </linearGradient>
        <linearGradient id="roofGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563eb"/>
          <stop offset="100%" stopColor="#1a40a0"/>
        </linearGradient>
      </defs>
      <rect width="520" height="320" fill="url(#skyGrad)"/>
      <rect y="200" width="520" height="120" fill="#4a7c59"/>
      <rect x="60" y="100" width="200" height="110" fill="url(#roofGrad)"/>
      <rect x="62" y="102" width="196" height="106" fill="#3b82f6" opacity="0.3"/>
      {[75,110,145,180,215].map(x => (
        <rect key={`w1${x}`} x={x} y="115" width="25" height="18" rx="2" fill="#bfdbfe"/>
      ))}
      {[75,110,145,180,215].map(x => (
        <rect key={`w2${x}`} x={x} y="145" width="25" height="18" rx="2" fill="#93c5fd"/>
      ))}
      <rect x="270" y="120" width="180" height="90" fill="#1e40af"/>
      <rect x="275" y="125" width="170" height="84" fill="#2563eb" opacity="0.2"/>
      {[282,312,342,372,402].map(x => (
        <rect key={`w3${x}`} x={x} y="135" width="20" height="15" rx="2" fill="#bfdbfe"/>
      ))}
      <rect x="0" y="190" width="520" height="20" fill="#555" opacity="0.5"/>
      {[100,200,300].map(x => (
        <rect key={`r${x}`} x={x} y="196" width="40" height="4" rx="2" fill="#fff" opacity="0.4"/>
      ))}
      <circle cx="40" cy="185" r="18" fill="#2d6a4f"/>
      <rect x="37" y="195" width="6" height="15" fill="#5a3e28"/>
      <circle cx="470" cy="182" r="20" fill="#2d6a4f"/>
      <rect x="467" y="193" width="6" height="17" fill="#5a3e28"/>
      <line x1="160" y1="40" x2="160" y2="100" stroke="#e11d48" strokeWidth="2"/>
      <polygon points="160,40 185,52 160,64" fill="#e11d48"/>
    </svg>
  )
}
