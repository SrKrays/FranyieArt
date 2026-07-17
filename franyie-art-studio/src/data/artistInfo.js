// ─────────────────────────────────────────────────────────
// Info real de Franyie — sacada directo de sus historias de
// comisiones. Si algo cambia (precios, condiciones, contacto),
// se edita SOLO acá y se actualiza en todo el sitio.
// ─────────────────────────────────────────────────────────

// TODO: completar con el contacto real antes de publicar.
export const CONTACT = {
  instagram: '@franyie.art.studio',
  whatsapp: '', // ej: '584121234567' (código de país + número, sin +)
  email: '', // ej: 'franyie.art@gmail.com'
}

export const TIERS = [
  {
    id: 'chibi',
    label: 'Chibi',
    options: [{ id: 'full', label: 'Full Render', price: 5 }],
  },
  {
    id: 'primer_plano',
    label: 'Primer Plano',
    options: [
      { id: 'simple', label: 'Color Simple', price: 7 },
      { id: 'full', label: 'Full Render', price: 14 },
    ],
  },
  {
    id: 'plano_medio',
    label: 'Plano Medio',
    options: [
      { id: 'simple', label: 'Color Simple', price: 14 },
      { id: 'full', label: 'Full Render', price: 21 },
    ],
  },
  {
    id: 'plano_completo',
    label: 'Plano Completo',
    options: [
      { id: 'simple', label: 'Color Simple', price: 21 },
      { id: 'full', label: 'Full Render', price: 28 },
    ],
  },
]

export const EXTRAS = [
  { id: 'personaje_extra', label: 'Personaje extra', type: 'percent', value: 0.5, note: '+50%' },
  { id: 'uso_comercial', label: 'Uso comercial', type: 'percent', value: 0.2, note: '+20%' },
  { id: 'nsfw', label: 'Contenido NSFW', type: 'percent', value: 0.4, note: '+40%' },
  { id: 'diseno_complejo', label: 'Diseño complejo', type: 'flat', value: 2, note: '+$2' },
  { id: 'fondo_complejo', label: 'Fondo complejo', type: 'flat', value: 5, note: '+$5' },
]

export const CAN_DO = ['OC', 'Ships', 'Selfships', 'NSFW', 'Furry', 'Gore (soft)', 'Violencia (leve)']

export const CANNOT_DO = [
  'Discursos de odio',
  'Fetiches extremos',
  'Fondos muy complejos',
  'Funas',
  'Uso de IA',
  'Loli / Shotacon',
  'Mechas',
  'Armaduras',
  'Imitación de estilo (depende, consultar)',
]

export const TERMS = [
  'Pago completo por adelantado.',
  'No se hacen reembolsos después de iniciar el boceto.',
  'Uso personal únicamente (uso comercial disponible con acuerdo previo, ver extras).',
  'La artista conserva todos los derechos de autor para distribución y uso.',
]

// Calcula el precio final a partir de un precio base + extras seleccionados
export function calculatePrice(basePrice, selectedExtraIds) {
  let percentSum = 0
  let flatSum = 0
  EXTRAS.forEach((extra) => {
    if (selectedExtraIds.includes(extra.id)) {
      if (extra.type === 'percent') percentSum += extra.value
      if (extra.type === 'flat') flatSum += extra.value
    }
  })
  const total = basePrice * (1 + percentSum) + flatSum
  return Math.round(total * 100) / 100
}
