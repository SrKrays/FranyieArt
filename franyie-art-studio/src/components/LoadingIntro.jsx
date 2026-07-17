import { motion } from 'framer-motion'

export default function LoadingIntro() {
  return (
    <motion.div
      className="fixed inset-0 z-[999] bg-cream flex items-center justify-center"
      exit={{ y: '-100%' }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
    >
      <svg width="130" height="130" viewBox="0 0 140 140" fill="none">
        <motion.path
          d="M70 18 L79 56 L115 63 L79 70 L70 108 L61 70 L25 63 L61 56 Z"
          stroke="#8B3A4A"
          strokeWidth="3"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0, fill: 'rgba(244,169,198,0)' }}
          animate={{
            pathLength: 1,
            opacity: 1,
            fill: 'rgba(244,169,198,0.65)',
          }}
          transition={{
            pathLength: { duration: 0.9, ease: 'easeInOut' },
            opacity: { duration: 0.25 },
            fill: { duration: 0.4, delay: 0.85 },
          }}
        />
      </svg>
    </motion.div>
  )
}
