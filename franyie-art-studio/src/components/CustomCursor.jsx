import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [grow, setGrow] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 500, damping: 40 })
  const springY = useSpring(y, { stiffness: 500, damping: 40 })

  useEffect(() => {
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const onEnter = (e) => {
      if (e.target.closest('[data-cursor-grow]')) setGrow(true)
    }
    const onLeave = (e) => {
      if (e.target.closest('[data-cursor-grow]')) setGrow(false)
    }
    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
    }
  }, [x, y])

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] rounded-full pointer-events-none border-2 border-blush hidden md:block"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        width: grow ? 64 : 22,
        height: grow ? 64 : 22,
        backgroundColor: grow ? 'rgba(244,169,198,0.25)' : 'rgba(0,0,0,0)',
        borderColor: grow ? '#F4A9C6' : '#8B3A4A',
      }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    />
  )
}
