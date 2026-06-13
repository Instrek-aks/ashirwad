export default function StatsBar() {
  const stats = [
    { num: '2000+', label: 'Products Available' },
    { num: '15+', label: 'Years Experience' },
    { num: '50+', label: 'Countries Served' },
    { num: '500+', label: 'Satisfied Clients' },
    { num: '100%', label: 'Quality Guaranteed' },
  ]

  return (
    <div className="stats-bar">
      <div className="stats-inner">
        {stats.map((s, i) => (
          <div className="stat-item" key={i}>
            <span className="stat-num">{s.num}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
