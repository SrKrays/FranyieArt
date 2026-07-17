import Magnetic from './Magnetic'

export default function Footer({ onOpenCommission }) {
  return (
    <footer id="comisiones" className="bg-brown text-cream text-center px-6 pt-20 pb-12">
      <h2 className="font-display font-extrabold text-3xl mb-3">
        ¿Le damos vida a tu idea?
      </h2>
      <p className="opacity-85 max-w-md mx-auto mb-8">
        Contame qué tenés en mente y armamos algo juntos, a tu estilo.
      </p>
      <Magnetic>
        <button
          onClick={onOpenCommission}
          data-cursor-grow
          className="font-display font-bold px-8 py-3.5 rounded-full inline-block bg-pink text-brown shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-transform hover:scale-[1.03]"
        >
          Solicitar comisión
        </button>
      </Magnetic>
      <div className="mt-12 text-xs opacity-50">
        Franyie Art Studio · hecho con cariño ✨
      </div>
    </footer>
  )
}
