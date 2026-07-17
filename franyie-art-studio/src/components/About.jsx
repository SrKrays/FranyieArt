import { motion } from 'framer-motion'

// NOTA PARA VOS (dev): este texto es un BORRADOR. Antes de publicar,
// que Franyie lo lea y lo ajuste con sus propias palabras — la idea
// es que suene a ELLA, no a nosotros hablando por ella.

export default function About({ avatarSrc }) {
  return (
    <section id="sobre-mi" className="max-w-3xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
        className="bg-white rounded-[28px] p-8 md:p-12 shadow-[0_10px_36px_rgba(107,66,38,0.1)] relative"
      >
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <img
            src={avatarSrc}
            alt="Franyie"
            className="w-28 h-28 rounded-full object-cover border-4 border-pink-soft shrink-0 mx-auto md:mx-0"
          />
          <div>
            <h2 className="font-display font-extrabold text-brown text-3xl mb-4">
              Sobre mí
            </h2>
            <div className="space-y-4 text-[1.05rem] leading-relaxed">
              <p>
                Hola, soy Franyie 👋 Dibujo desde hace años y la ilustración
                de personajes es lo que más amo hacer: darle forma a las
                versiones de vos, de tus OCs, de tus ships, de esos mundos
                que solo existen en tu cabeza hasta que alguien los dibuja.
              </p>
              <p>
                Hago esto desde Venezuela, y como muchos artistas acá, cada
                comisión es mucho más que un encargo — es lo que me permite
                seguir haciendo lo que amo y sostenerme en un contexto que
                no siempre lo pone fácil. No te lo cuento buscando lástima,
                sino porque cada persona que confía en mí para darle vida a
                su idea está apostando por algo real, y eso lo valoro
                muchísimo.
              </p>
              <p>
                Si te gusta lo que ves en la galería, ya sabés cómo
                ayudarme más: comisionando 💛 Cada pieza la hago con el
                mismo cuidado, sea un chibi rápido o un cuerpo completo
                elaborado.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
