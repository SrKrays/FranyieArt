import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Sparkles from './Sparkles'
import Magnetic from './Magnetic'

export default function Hero({ avatarSrc, onOpenCommission }) {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const avatarY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <header
      ref={heroRef}
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-32 pb-16 relative overflow-hidden"
    >
      <Sparkles />

      <motion.div
        style={{ y: avatarY, opacity: fade }}
        initial={{ opacity: 0, scale: 0.7, y: 20 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
        className="w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-[0_12px_40px_rgba(139,58,74,0.18)] mb-7 relative z-10"
      >
        <img src={avatarSrc} alt="Avatar" className="w-full h-full object-cover" />
      </motion.div>

      <motion.h1
        style={{ y: textY, opacity: fade }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="font-display font-extrabold text-brown leading-[1.05] text-4xl md:text-6xl relative z-10"
      >
        Dibujando <span className="text-blush">mundos</span>
        <br />a tu medida
      </motion.h1>

      <motion.p
        style={{ y: textY, opacity: fade }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-5 text-lg max-w-lg relative z-10"
      >
        Ilustración de personajes con estilo propio — comisiones abiertas
        para darle vida a tus ideas.
      </motion.p>

      <motion.div
        style={{ y: textY, opacity: fade }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="mt-9 flex gap-4 relative z-10"
      >
        <Magnetic>
          <button
            onClick={onOpenCommission}
            data-cursor-grow
            className="font-display font-bold px-8 py-3.5 rounded-full bg-blush text-white shadow-[0_8px_24px_rgba(139,58,74,0.3)] transition-transform hover:scale-[1.03]"
          >
            Pedir comisión
          </button>
        </Magnetic>
        <Magnetic strength={0.25}>
          <a
            href="#galería"
            data-cursor-grow
            className="font-display font-bold px-8 py-3.5 rounded-full border-2 border-pink text-brown transition-colors hover:bg-pink-soft inline-block"
          >
            Ver galería
          </a>
        </Magnetic>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-9 text-sm text-brown/60 z-10"
      >
        ↓ scrolleá
      </motion.div>
    </header>
  )
}
