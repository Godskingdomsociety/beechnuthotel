import { useState } from 'react'
import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ui/ScrollReveal'

const CATEGORIES = ['all', 'rooms', 'dining', 'events', 'facilities']

const GALLERY_ITEMS = Array.from({ length: 18 }, (_, i) => ({
  id: i + 1,
  category: CATEGORIES[1 + (i % 4)],
  caption: `Gallery image ${i + 1}`,
}))

export default function Gallery() {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? GALLERY_ITEMS : GALLERY_ITEMS.filter(item => item.category === filter)

  return (
    <>
      <section className="relative h-[60vh] min-h-[380px] flex flex-col items-center justify-center text-center overflow-hidden bg-navy-950">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950" />
        <div className="relative z-10 px-4 animate-fade-up">
          <span className="text-xs font-semibold tracking-[0.28em] uppercase text-gold-400 mb-3 block">Beechnut Hotel Warri</span>
          <h1 className="font-display text-[clamp(2.8rem,6vw,4.4rem)] font-bold text-white leading-tight mb-4">
            Photo <em className="italic text-gold-400 not-italic">Gallery</em>
          </h1>
          <nav className="flex items-center justify-center gap-2 text-sm text-white/50" aria-label="Breadcrumb">
            <Link to="/" className="text-white/70 hover:text-gold-400 transition-colors">Home</Link>
            <span className="text-gold-400/60">›</span>
            <span className="text-gold-400 font-medium">Gallery</span>
          </nav>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-semibold tracking-[0.24em] uppercase text-gold-500 block mb-2">Moments Captured</span>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-navy-900 mb-3">A Visual Journey Through <em className="text-gold-500 not-italic">Beechnut</em></h2>
              <div className="w-12 h-0.5 bg-gold-400 mx-auto mb-4" />
            </div>
          </ScrollReveal>

          <div className="flex items-center justify-center gap-2 flex-wrap mb-8" role="group" aria-label="Filter gallery by category">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 text-xs font-semibold tracking-wider uppercase rounded-full border transition-all duration-300 ${
                  filter === cat
                    ? 'bg-navy-900 text-gold-400 border-navy-900 shadow-md'
                    : 'bg-transparent text-gray-600 border-navy-900/15 hover:border-gold-400 hover:text-gold-500'
                }`}
              >
                {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map(item => (
              <div
                key={item.id}
                className="group relative aspect-square bg-navy-800/10 overflow-hidden cursor-zoom-in hover:shadow-md transition-all duration-300 rounded-sm"
              >
                <div className="absolute inset-0 flex items-center justify-center text-navy-900/20 text-xs uppercase tracking-widest">
                  {item.category}
                </div>
                <div className="absolute inset-0 bg-gold-500/0 group-hover:bg-gold-500/60 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
