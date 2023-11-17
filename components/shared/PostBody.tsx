import { motion, useScroll, useSpring } from 'framer-motion'

import { CustomPortableText } from './CustomPortableText'

interface PostBodyProps {
  body: any // Replace "any" with the appropriate type for your Post body content
}

export function PostBody(props: PostBodyProps) {
  const { body } = props
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const progressBarStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(to right, #ff416c, #ff4b2b)',
    transformOrigin: '0%',
    zIndex: 9999, // Add this line
    boxShadow: '0 0 10px #ff416c', // Add a glow effect
    transition: 'width 0.2s ease-in-out', // Smooth the width changes
  }

  return (
    <>
      <div className="max-w-3xl mx-auto my-8 relative w-full px-6 py-12 shadow-xl shadow-slate-700/10 ring-1 ring-gray-900/5 md:max-w-3xl md:mx-auto lg:max-w-4xl lg:pt-16 lg:pb-28">
        {body && (
          <>
            <motion.div className="" style={{ ...progressBarStyle, scaleX }} />
            <CustomPortableText
              paragraphClasses="prose font-serif text-gray-600 text-xl leading-relaxed"
              value={body}
            />
          </>
        )}
      </div>
    </>
  )
}
