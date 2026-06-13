export default function WorldMapSvg() {
  return (
    <svg className="hero-map" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="400" cy="200" rx="380" ry="180" fill="none" stroke="#1a56db" strokeWidth="1"/>
      <ellipse cx="400" cy="200" rx="260" ry="180" fill="none" stroke="#1a56db" strokeWidth="0.5"/>
      <ellipse cx="400" cy="200" rx="140" ry="180" fill="none" stroke="#1a56db" strokeWidth="0.5"/>
      <line x1="20" y1="200" x2="780" y2="200" stroke="#1a56db" strokeWidth="0.5"/>
      <line x1="400" y1="20" x2="400" y2="380" stroke="#1a56db" strokeWidth="0.5"/>
      {/* Continents */}
      <path d="M150,140 Q180,110 230,130 Q260,150 240,180 Q220,200 190,190 Q160,170 150,140Z" fill="#1a56db" opacity="0.5"/>
      <path d="M280,100 Q350,80 420,90 Q480,100 500,140 Q510,170 490,190 Q460,210 420,200 Q370,195 340,210 Q310,220 290,200 Q260,175 270,145 Q275,120 280,100Z" fill="#1a56db" opacity="0.5"/>
      <path d="M530,120 Q570,110 610,130 Q640,155 630,185 Q610,210 580,205 Q550,195 535,170 Q520,145 530,120Z" fill="#1a56db" opacity="0.5"/>
      <path d="M620,90 Q660,80 700,100 Q720,120 710,145 Q695,160 670,155 Q645,145 630,125 Q618,108 620,90Z" fill="#1a56db" opacity="0.5"/>
      <path d="M200,220 Q230,215 250,235 Q265,255 255,275 Q240,295 220,290 Q200,280 195,260 Q190,240 200,220Z" fill="#1a56db" opacity="0.5"/>
      <path d="M310,240 Q360,230 400,250 Q425,265 415,290 Q395,310 360,305 Q330,295 315,275 Q300,255 310,240Z" fill="#1a56db" opacity="0.5"/>
      {/* City dots */}
      <circle cx="200" cy="160" r="5" fill="#1a56db"/>
      <circle cx="350" cy="130" r="5" fill="#1a56db"/>
      <circle cx="480" cy="145" r="5" fill="#1a56db"/>
      <circle cx="580" cy="155" r="5" fill="#1a56db"/>
      <circle cx="660" cy="120" r="5" fill="#1a56db"/>
      <circle cx="240" cy="255" r="4" fill="#1a56db"/>
      <circle cx="370" cy="265" r="4" fill="#1a56db"/>
      {/* Connection lines */}
      <line x1="200" y1="160" x2="350" y2="130" stroke="#1a56db" strokeWidth="1" strokeDasharray="4,3"/>
      <line x1="350" y1="130" x2="480" y2="145" stroke="#1a56db" strokeWidth="1" strokeDasharray="4,3"/>
      <line x1="480" y1="145" x2="580" y2="155" stroke="#1a56db" strokeWidth="1" strokeDasharray="4,3"/>
      <line x1="580" y1="155" x2="660" y2="120" stroke="#1a56db" strokeWidth="1" strokeDasharray="4,3"/>
      <line x1="350" y1="130" x2="240" y2="255" stroke="#1a56db" strokeWidth="1" strokeDasharray="4,3"/>
      <line x1="480" y1="145" x2="370" y2="265" stroke="#1a56db" strokeWidth="1" strokeDasharray="4,3"/>
    </svg>
  )
}
