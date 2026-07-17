export default function Nav({ logoSrc, onOpenCommission }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-100 flex justify-between items-center px-6 md:px-12 py-5 backdrop-blur-md bg-cream/75 border-b border-brown/10">
      <div className="flex items-center gap-3" data-cursor-grow>
        <img
          src={logoSrc}
          alt="Franyie Art Studio"
          className="w-10 h-10 rounded-full border-2 border-pink object-cover"
        />
        <span className="font-display font-bold text-lg text-brown">
          Franyie Art Studio
        </span>
      </div>
      <ul className="hidden md:flex gap-8 list-none items-center">
        {[
          { label: 'Galería', href: '#galería' },
          { label: 'Sobre mí', href: '#sobre-mi' },
          { label: 'Precios', href: '#precios' },
        ].map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              data-cursor-grow
              className="font-semibold text-sm text-ink relative group"
            >
              {item.label}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-pink transition-all duration-300 group-hover:w-full" />
            </a>
          </li>
        ))}
        <li>
          <button
            onClick={onOpenCommission}
            data-cursor-grow
            className="font-display font-bold text-sm px-5 py-2 rounded-full bg-blush text-white transition-transform hover:-translate-y-0.5"
          >
            Comisionar
          </button>
        </li>
      </ul>
    </nav>
  )
}
