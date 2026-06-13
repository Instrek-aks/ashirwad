export default function FactorySceneSvg({ variant = 0 }) {
  const scenes = [
    // Scene 0: Production line
    <svg key="s0" width="100%" height="100%" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="80" width="180" height="12" rx="4" fill="#1e40af"/>
      <rect x="10" y="80" width="180" height="12" rx="4" fill="#3b82f6" opacity="0.4"/>
      <rect x="20" y="30" width="40" height="55" rx="3" fill="#1e3a8a"/>
      <rect x="25" y="35" width="30" height="20" rx="2" fill="#60a5fa" opacity="0.5"/>
      <rect x="80" y="20" width="50" height="65" rx="3" fill="#1e3a8a"/>
      <rect x="85" y="25" width="40" height="25" rx="2" fill="#60a5fa" opacity="0.5"/>
      <rect x="145" y="35" width="40" height="50" rx="3" fill="#1e3a8a"/>
      <rect x="150" y="40" width="30" height="18" rx="2" fill="#60a5fa" opacity="0.5"/>
      <ellipse cx="65" cy="78" rx="5" ry="5" fill="#93c5fd" opacity="0.7"/>
      <rect x="62" y="82" width="6" height="14" rx="2" fill="#93c5fd" opacity="0.7"/>
      <ellipse cx="130" cy="78" rx="5" ry="5" fill="#93c5fd" opacity="0.7"/>
      <rect x="127" y="82" width="6" height="14" rx="2" fill="#93c5fd" opacity="0.7"/>
      <line x1="40" y1="0" x2="40" y2="15" stroke="#fbbf24" strokeWidth="2"/>
      <ellipse cx="40" cy="15" rx="8" ry="4" fill="#fbbf24" opacity="0.7"/>
      <line x1="100" y1="0" x2="100" y2="15" stroke="#fbbf24" strokeWidth="2"/>
      <ellipse cx="100" cy="15" rx="8" ry="4" fill="#fbbf24" opacity="0.7"/>
      <line x1="160" y1="0" x2="160" y2="15" stroke="#fbbf24" strokeWidth="2"/>
      <ellipse cx="160" cy="15" rx="8" ry="4" fill="#fbbf24" opacity="0.7"/>
    </svg>,

    // Scene 1: Warehouse
    <svg key="s1" width="100%" height="100%" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      {[20,50,80,110].map(y => (
        <rect key={y} x="5" y={y} width="190" height="6" rx="2" fill="#1e40af"/>
      ))}
      {[12,22,32,42,52,62,72,82,92,102,112].map(x => (
        <rect key={`b1${x}`} x={x} y="10" width="6" height="12" rx="2" fill="#bfdbfe"/>
      ))}
      {[12,22,32,42,52,62].map(x => (
        <rect key={`b2${x}`} x={x} y="40" width="6" height="12" rx="2" fill="#93c5fd"/>
      ))}
      <rect x="145" y="100" width="45" height="30" rx="3" fill="#f59e0b"/>
      <rect x="148" y="103" width="20" height="15" rx="2" fill="#fbbf24" opacity="0.5"/>
      <circle cx="155" cy="132" r="7" fill="#374151"/>
      <circle cx="178" cy="132" r="7" fill="#374151"/>
      <rect x="130" y="90" width="5" height="40" fill="#6b7280"/>
      <rect x="120" y="90" width="15" height="3" fill="#6b7280"/>
      <rect x="120" y="108" width="15" height="3" fill="#6b7280"/>
    </svg>,

    // Scene 2: Molding machine
    <svg key="s2" width="100%" height="100%" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      <rect x="20" y="30" width="80" height="80" rx="5" fill="#1e3a8a"/>
      <rect x="25" y="35" width="70" height="40" rx="3" fill="#2563eb" opacity="0.3"/>
      <circle cx="60" cy="90" r="12" fill="#1d4ed8"/>
      <circle cx="60" cy="90" r="6" fill="#3b82f6" opacity="0.5"/>
      <rect x="110" y="50" width="70" height="50" rx="4" fill="#1e3a8a"/>
      <rect x="115" y="55" width="30" height="20" rx="2" fill="#60a5fa" opacity="0.6"/>
      <circle cx="160" cy="65" r="6" fill="#ef4444"/>
      <circle cx="175" cy="65" r="6" fill="#22c55e"/>
      <rect x="115" y="82" width="60" height="4" rx="2" fill="#3b82f6" opacity="0.6"/>
      <rect x="115" y="90" width="40" height="4" rx="2" fill="#3b82f6" opacity="0.4"/>
      <ellipse cx="100" cy="105" rx="6" ry="6" fill="#fcd34d" opacity="0.8"/>
      <rect x="96" y="110" width="8" height="18" rx="3" fill="#f97316" opacity="0.8"/>
    </svg>,

    // Scene 3: Large hall
    <svg key="s3" width="100%" height="100%" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      <polygon points="100,10 190,60 190,140 10,140 10,60" fill="#1e40af" opacity="0.5"/>
      <line x1="100" y1="10" x2="10" y2="60" stroke="#60a5fa" strokeWidth="0.5" opacity="0.5"/>
      <line x1="100" y1="10" x2="190" y2="60" stroke="#60a5fa" strokeWidth="0.5" opacity="0.5"/>
      {[80,100,120].map(y => (
        <line key={y} x1="10" y1={y} x2="190" y2={y} stroke="#3b82f6" strokeWidth="0.5" opacity="0.3"/>
      ))}
      <rect x="30" y="60" width="30" height="70" rx="3" fill="#1e3a8a"/>
      <rect x="80" y="45" width="40" height="85" rx="3" fill="#1e3a8a"/>
      <rect x="140" y="58" width="35" height="72" rx="3" fill="#1e3a8a"/>
      <polygon points="100,0 70,60 130,60" fill="#fbbf24" opacity="0.1"/>
    </svg>,

    // Scene 4: Quality check
    <svg key="s4" width="100%" height="100%" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="200" height="5" fill="#e0e7ff" opacity="0.3"/>
      <rect x="0" y="0" width="5" height="150" fill="#e0e7ff" opacity="0.2"/>
      <rect x="195" y="0" width="5" height="150" fill="#e0e7ff" opacity="0.2"/>
      <rect x="30" y="70" width="140" height="8" rx="2" fill="#334155"/>
      <rect x="40" y="78" width="8" height="50" rx="2" fill="#334155"/>
      <rect x="152" y="78" width="8" height="50" rx="2" fill="#334155"/>
      {[50,65,80,95,110,125,140].map((x, i) => (
        <rect key={i} x={x} y={52 + (i % 2) * 3} width="10" height={16 + (i % 3) * 2} rx="3" fill="#e8f0fb"/>
      ))}
      <rect x="160" y="40" width="8" height="32" rx="2" fill="#475569"/>
      <ellipse cx="164" cy="40" rx="10" ry="6" fill="#334155"/>
      <circle cx="164" cy="58" r="5" fill="#60a5fa" opacity="0.7"/>
      <ellipse cx="50" cy="90" rx="6" ry="6" fill="#fcd34d" opacity="0.8"/>
      <rect x="46" y="95" width="8" height="20" rx="3" fill="#fff" opacity="0.5"/>
    </svg>,
  ]

  return scenes[variant] || scenes[0]
}
