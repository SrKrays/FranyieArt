import { motion } from 'framer-motion'

export default function PieceCard({ src, category, index }) {
  return (
    <motion.div
      data-cursor-grow
      className="break-inside-avoid mb-5 rounded-[20px] overflow-hidden relative bg-white shadow-[0_6px_20px_rgba(107,66,38,0.08)] group"
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: (index % 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <img
        src={src}
        alt={category}
        className="w-full block transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08] group-hover:-rotate-[0.5deg]"
      />
      <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-ink/75 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-white font-display font-semibold text-sm">
          {category}
        </span>
      </div>
    </motion.div>
  )
}
