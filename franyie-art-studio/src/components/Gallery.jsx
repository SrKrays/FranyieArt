import { useState } from 'react'
import PieceCard from './PieceCard'

const CATEGORIES = ['Todo', 'Personajes', 'Fanart', 'Mascotas', 'Parejas']

export default function Gallery({ pieces }) {
  const [active, setActive] = useState('Todo')

  const filtered =
    active === 'Todo' ? pieces : pieces.filter((p) => p.category === active)

  return (
    <section id="galería" className="max-w-6xl mx-auto px-6 pb-28">
      <h2 className="text-center font-display font-extrabold text-brown text-3xl mb-2">
        Galería
      </h2>
      <p className="text-center text-ink/60 mb-11">
        Una selección de piezas — filtrá por categoría
      </p>

      <div className="flex gap-3 justify-center flex-wrap mb-12">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            data-cursor-grow
            onClick={() => setActive(cat)}
            className={`font-display font-semibold text-sm px-5 py-2.5 rounded-full border-2 transition-all ${
              active === cat
                ? 'bg-pink border-pink text-white'
                : 'bg-white border-pink-soft text-brown hover:bg-pink hover:text-white hover:border-pink'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-5">
        {filtered.map((piece, i) => (
          <PieceCard key={piece.src} src={piece.src} category={piece.category} index={i} />
        ))}
      </div>
    </section>
  )
}
