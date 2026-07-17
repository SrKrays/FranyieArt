import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TIERS, EXTRAS, TERMS, CONTACT, calculatePrice } from '../data/artistInfo'

const STEPS = ['Tipo', 'Extras', 'Detalles', 'Resumen']

export default function CommissionWizard({ onClose }) {
  const [step, setStep] = useState(0)
  const [tierId, setTierId] = useState(null)
  const [optionId, setOptionId] = useState(null)
  const [extraIds, setExtraIds] = useState([])
  const [refFiles, setRefFiles] = useState([])
  const [description, setDescription] = useState('')
  const [contactMethod, setContactMethod] = useState('instagram')
  const [contactValue, setContactValue] = useState('')
  const [agreed, setAgreed] = useState(false)

  const tier = TIERS.find((t) => t.id === tierId)
  const option = tier?.options.find((o) => o.id === optionId)
  const basePrice = option?.price ?? 0
  const total = useMemo(() => calculatePrice(basePrice, extraIds), [basePrice, extraIds])

  const canGoNext = () => {
    if (step === 0) return !!option
    if (step === 1) return true
    if (step === 2) return description.trim().length > 4 && contactValue.trim().length > 1
    if (step === 3) return agreed
    return false
  }

  const toggleExtra = (id) => {
    setExtraIds((prev) => (prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]))
  }

  const handleFiles = (e) => {
    const files = Array.from(e.target.files || []).slice(0, 4)
    setRefFiles(files.map((f) => ({ name: f.name, url: URL.createObjectURL(f) })))
  }

  const buildMessage = () => {
    const extrasText = extraIds.length
      ? extraIds.map((id) => EXTRAS.find((e) => e.id === id)?.label).join(', ')
      : 'Ninguno'
    return [
      `¡Hola Franyie! Quiero pedirte una comisión 🎨`,
      ``,
      `Tipo: ${tier?.label} — ${option?.label}`,
      `Extras: ${extrasText}`,
      `Precio estimado: $${total}`,
      ``,
      `Descripción de lo que quiero:`,
      description,
      ``,
      `Referencias: ${refFiles.length ? `${refFiles.length} imagen(es) adjunta(s) (te las mando por acá)` : 'ninguna por ahora'}`,
      ``,
      `Mi contacto (${contactMethod}): ${contactValue}`,
      ``,
      `Entiendo y acepto las condiciones (pago adelantado, sin reembolso post-boceto, derechos de autor de la artista).`,
    ].join('\n')
  }

  const message = buildMessage()

  const sendWhatsapp = () => {
    if (!CONTACT.whatsapp) return
    window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`, '_blank')
  }
  const sendEmail = () => {
    if (!CONTACT.email) return
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      'Pedido de comisión — ' + (tier?.label ?? '')
    )}&body=${encodeURIComponent(message)}`
  }
  const copyMessage = async () => {
    await navigator.clipboard.writeText(message)
    alert('¡Pedido copiado! Pegalo donde prefieras mandárselo a Franyie.')
  }

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-ink/50 backdrop-blur-sm flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="bg-cream rounded-[28px] w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 md:p-8 relative"
      >
        <button
          onClick={onClose}
          data-cursor-grow
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white flex items-center justify-center text-brown font-bold shadow-sm hover:bg-pink-soft transition-colors"
        >
          ✕
        </button>

        <h2 className="font-display font-extrabold text-2xl text-brown mb-1">
          Armemos tu comisión
        </h2>
        <p className="text-sm text-ink/60 mb-6">
          Paso {step + 1} de {STEPS.length} · {STEPS[step]}
        </p>

        {/* progress bar */}
        <div className="flex gap-2 mb-8">
          {STEPS.map((s, i) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i <= step ? 'bg-pink' : 'bg-pink-soft/50'
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25 }}
          >
            {/* Paso 0: tipo */}
            {step === 0 && (
              <div className="space-y-4">
                {TIERS.map((t) => (
                  <div key={t.id}>
                    <button
                      data-cursor-grow
                      onClick={() => {
                        setTierId(t.id)
                        setOptionId(null)
                      }}
                      className={`w-full text-left font-display font-bold text-lg px-4 py-3 rounded-xl border-2 transition-colors ${
                        tierId === t.id
                          ? 'border-pink bg-pink-soft/40 text-brown'
                          : 'border-pink-soft/60 text-brown/70 hover:border-pink'
                      }`}
                    >
                      {t.label}
                    </button>
                    {tierId === t.id && (
                      <div className="flex gap-2 mt-2 pl-2 flex-wrap">
                        {t.options.map((opt) => (
                          <button
                            key={opt.id}
                            data-cursor-grow
                            onClick={() => setOptionId(opt.id)}
                            className={`text-sm font-semibold px-4 py-2 rounded-full border-2 transition-colors ${
                              optionId === opt.id
                                ? 'bg-blush text-white border-blush'
                                : 'bg-white text-brown border-pink-soft hover:border-pink'
                            }`}
                          >
                            {opt.label} · ${opt.price}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Paso 1: extras */}
            {step === 1 && (
              <div className="space-y-3">
                <p className="text-sm text-ink/60 mb-2">
                  Marcá lo que aplique — el total se actualiza solo.
                </p>
                {EXTRAS.map((extra) => (
                  <label
                    key={extra.id}
                    data-cursor-grow
                    className={`flex items-center justify-between px-4 py-3 rounded-xl border-2 cursor-pointer transition-colors ${
                      extraIds.includes(extra.id)
                        ? 'border-pink bg-pink-soft/40'
                        : 'border-pink-soft/60 hover:border-pink'
                    }`}
                  >
                    <span className="font-semibold text-brown text-sm">{extra.label}</span>
                    <span className="flex items-center gap-3">
                      <span className="text-blush font-bold text-sm">{extra.note}</span>
                      <input
                        type="checkbox"
                        checked={extraIds.includes(extra.id)}
                        onChange={() => toggleExtra(extra.id)}
                        className="w-5 h-5 accent-blush"
                      />
                    </span>
                  </label>
                ))}
              </div>
            )}

            {/* Paso 2: detalles */}
            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <label className="block font-semibold text-sm text-brown mb-1.5">
                    Contame tu idea *
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    placeholder="Personaje, pose, outfit, vibe que buscás..."
                    className="w-full rounded-xl border-2 border-pink-soft/60 focus:border-pink outline-none px-4 py-3 text-sm bg-white resize-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-sm text-brown mb-1.5">
                    Referencias (opcional)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFiles}
                    className="text-sm"
                  />
                  {refFiles.length > 0 && (
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {refFiles.map((f) => (
                        <img
                          key={f.name}
                          src={f.url}
                          alt={f.name}
                          className="w-16 h-16 object-cover rounded-lg border-2 border-pink-soft"
                        />
                      ))}
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-[130px_1fr] gap-3">
                  <select
                    value={contactMethod}
                    onChange={(e) => setContactMethod(e.target.value)}
                    className="rounded-xl border-2 border-pink-soft/60 px-3 py-3 text-sm bg-white font-semibold text-brown"
                  >
                    <option value="instagram">Instagram</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="email">Email</option>
                    <option value="discord">Discord</option>
                  </select>
                  <input
                    type="text"
                    value={contactValue}
                    onChange={(e) => setContactValue(e.target.value)}
                    placeholder="@tu_usuario o tu contacto"
                    className="rounded-xl border-2 border-pink-soft/60 focus:border-pink outline-none px-4 py-3 text-sm bg-white"
                  />
                </div>
              </div>
            )}

            {/* Paso 3: resumen */}
            {step === 3 && (
              <div className="space-y-5">
                <div className="bg-white rounded-2xl p-5 shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-display font-bold text-brown">
                      {tier?.label} · {option?.label}
                    </span>
                    <span className="font-display font-extrabold text-2xl text-blush">
                      ${total}
                    </span>
                  </div>
                  {extraIds.length > 0 && (
                    <ul className="text-xs text-ink/60 space-y-1">
                      {extraIds.map((id) => (
                        <li key={id}>
                          + {EXTRAS.find((e) => e.id === id)?.label} (
                          {EXTRAS.find((e) => e.id === id)?.note})
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="bg-pink-soft/30 rounded-2xl p-5">
                  <p className="font-semibold text-sm text-brown mb-2">Antes de enviar:</p>
                  <ul className="text-xs text-ink/70 space-y-1 mb-3">
                    {TERMS.map((t) => (
                      <li key={t}>• {t}</li>
                    ))}
                  </ul>
                  <label className="flex items-center gap-2 text-sm font-semibold text-brown cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="w-5 h-5 accent-blush"
                    />
                    Entiendo y acepto las condiciones
                  </label>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  <button
                    data-cursor-grow
                    disabled={!agreed || !CONTACT.whatsapp}
                    onClick={sendWhatsapp}
                    title={!CONTACT.whatsapp ? 'Falta configurar el WhatsApp de Franyie' : ''}
                    className="flex-1 min-w-[140px] font-display font-bold text-sm px-5 py-3 rounded-full bg-[#25D366] text-white disabled:opacity-40 disabled:cursor-not-allowed transition-transform hover:enabled:-translate-y-0.5"
                  >
                    Enviar por WhatsApp
                  </button>
                  <button
                    data-cursor-grow
                    disabled={!agreed || !CONTACT.email}
                    onClick={sendEmail}
                    title={!CONTACT.email ? 'Falta configurar el email de Franyie' : ''}
                    className="flex-1 min-w-[140px] font-display font-bold text-sm px-5 py-3 rounded-full bg-brown text-white disabled:opacity-40 disabled:cursor-not-allowed transition-transform hover:enabled:-translate-y-0.5"
                  >
                    Enviar por email
                  </button>
                  <button
                    data-cursor-grow
                    disabled={!agreed}
                    onClick={copyMessage}
                    className="flex-1 min-w-[140px] font-display font-bold text-sm px-5 py-3 rounded-full border-2 border-pink text-brown disabled:opacity-40 disabled:cursor-not-allowed transition-transform hover:enabled:-translate-y-0.5"
                  >
                    Copiar pedido
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navegación */}
        <div className="flex justify-between mt-8">
          <button
            data-cursor-grow
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className={`text-sm font-semibold text-brown/60 ${step === 0 ? 'invisible' : ''}`}
          >
            ← Atrás
          </button>
          {step < STEPS.length - 1 && (
            <button
              data-cursor-grow
              disabled={!canGoNext()}
              onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
              className="font-display font-bold text-sm px-6 py-2.5 rounded-full bg-blush text-white disabled:opacity-40 disabled:cursor-not-allowed transition-transform hover:enabled:-translate-y-0.5"
            >
              Siguiente →
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
