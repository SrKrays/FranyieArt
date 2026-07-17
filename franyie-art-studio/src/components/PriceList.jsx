import { motion } from 'framer-motion'
import { TIERS, EXTRAS, CAN_DO, CANNOT_DO, TERMS } from '../data/artistInfo'

function Fade({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  )
}

export default function PriceList() {
  return (
    <section id="precios" className="max-w-5xl mx-auto px-6 py-24">
      <Fade>
        <h2 className="text-center font-display font-extrabold text-brown text-3xl mb-2">
          Precios y condiciones
        </h2>
        <p className="text-center text-ink/60 mb-14">
          Todo transparente, para que sepas exactamente qué esperar
        </p>
      </Fade>

      {/* Tabla de precios */}
      <div className="grid sm:grid-cols-2 gap-5 mb-16">
        {TIERS.map((tier, i) => (
          <Fade key={tier.id} delay={i * 0.08}>
            <div className="bg-white rounded-2xl p-6 shadow-[0_6px_20px_rgba(107,66,38,0.08)] h-full">
              <h3 className="font-display font-bold text-xl text-blush mb-3">
                {tier.label}
              </h3>
              <ul className="space-y-1.5">
                {tier.options.map((opt) => (
                  <li key={opt.id} className="flex justify-between text-sm">
                    <span>{opt.label}</span>
                    <span className="font-display font-bold text-brown">
                      ${opt.price}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Fade>
        ))}
      </div>

      {/* Extras */}
      <Fade>
        <div className="bg-pink-soft/40 rounded-2xl p-6 mb-16">
          <h3 className="font-display font-bold text-lg text-brown mb-4 text-center">
            Extras
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {EXTRAS.map((extra) => (
              <span
                key={extra.id}
                className="bg-white rounded-full px-4 py-2 text-sm font-semibold text-brown shadow-sm"
              >
                {extra.label} <span className="text-blush">{extra.note}</span>
              </span>
            ))}
          </div>
        </div>
      </Fade>

      {/* Puedo / No puedo hacer */}
      <div className="grid md:grid-cols-2 gap-5 mb-16">
        <Fade>
          <div className="bg-white rounded-2xl p-6 shadow-[0_6px_20px_rgba(107,66,38,0.08)] h-full">
            <h3 className="font-display font-bold text-lg text-brown mb-4">
              ✓ Puedo hacer
            </h3>
            <div className="flex flex-wrap gap-2">
              {CAN_DO.map((item) => (
                <span
                  key={item}
                  className="text-sm px-3 py-1.5 rounded-full bg-pink-soft text-brown font-semibold"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Fade>
        <Fade delay={0.1}>
          <div className="bg-white rounded-2xl p-6 shadow-[0_6px_20px_rgba(107,66,38,0.08)] h-full">
            <h3 className="font-display font-bold text-lg text-brown mb-4">
              ✕ No puedo hacer
            </h3>
            <div className="flex flex-wrap gap-2">
              {CANNOT_DO.map((item) => (
                <span
                  key={item}
                  className="text-sm px-3 py-1.5 rounded-full bg-ink/5 text-ink/70 font-semibold"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Fade>
      </div>

      {/* Términos */}
      <Fade>
        <div className="border-2 border-dashed border-pink-soft rounded-2xl p-6">
          <h3 className="font-display font-bold text-lg text-brown mb-3">
            Términos y condiciones
          </h3>
          <ul className="space-y-2 text-sm text-ink/80">
            {TERMS.map((term) => (
              <li key={term} className="flex gap-2">
                <span className="text-blush">•</span>
                <span>{term}</span>
              </li>
            ))}
          </ul>
        </div>
      </Fade>
    </section>
  )
}
