import { useState, useEffect } from 'react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={`fixed bottom-[96px] right-6 z-30 flex items-center justify-center w-11 h-11 rounded-full border border-gold-400 bg-navy-950 text-gold-400 text-xl leading-none cursor-pointer transition-all duration-300 ${
        visible ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none translate-y-3'
      }`}
    >
      &uarr;
    </button>
  )
}
