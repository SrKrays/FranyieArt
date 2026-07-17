const PARTICLES = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  left: Math.round(Math.random() * 100),
  size: 4 + Math.random() * 7,
  duration: 9 + Math.random() * 8,
  delay: Math.random() * 10,
  color: i % 3 === 0 ? 'bg-pink/50' : i % 3 === 1 ? 'bg-blush/30' : 'bg-white/70',
}))

export default function Sparkles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {PARTICLES.map((p) => (
        <span
          key={p.id}
          className={`absolute rounded-full ${p.color}`}
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            bottom: '-5%',
            animation: `float-up ${p.duration}s ${p.delay}s infinite ease-in-out`,
          }}
        />
      ))}
    </div>
  )
}
