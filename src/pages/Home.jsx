import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { TESTIMONIALS, STATS } from '../data/testimonials'
import { ROOMS } from '../data/rooms'
import ScrollReveal from '../components/ui/ScrollReveal'

function StarRating({ count = 5 }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" width="16" height="16" fill="currentColor" className="text-gold-400" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function TestimonialCarousel() {
  const [index, setIndex] = useState(0)
  const [autoTimer, setAutoTimer] = useState(null)

  const next = useCallback(() => {
    setIndex(i => Math.min(i + 1, TESTIMONIALS.length - 1))
  }, [])

  const prev = useCallback(() => {
    setIndex(i => Math.max(i - 1, 0))
  }, [])

  const resetAuto = useCallback(() => {
    setAutoTimer(t => { if (t) clearInterval(t); return null })
    const t = setInterval(() => {
      setIndex(i => (i + 1) % TESTIMONIALS.length)
    }, 5000)
    setAutoTimer(t)
  }, [])

  useEffect(() => {
    resetAuto()
    return () => { if (autoTimer) clearInterval(autoTimer) }
  }, [])

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex gap-4 transition-transform duration-500"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="min-w-full sm:min-w-[calc(50%-0.5rem)] lg:min-w-[calc(33.333%-0.667rem)] shrink-0">
              <div className="bg-white rounded-sm p-6 shadow-sm border-l-3 border-gold-400 hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <StarRating count={t.rating} />
                <p className="font-accent italic text-lg text-navy-900 leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gold-100 shrink-0 flex items-center justify-center text-gold-600 text-xs font-bold tracking-wider">
                    {t.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-navy-900 block">{t.name}</span>
                    <span className="text-xs text-gray-500 block">{t.meta}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-6">
        <button
          onClick={() => { prev(); resetAuto() }}
          className="w-11 h-11 rounded-full border border-gold-400 text-gold-400 flex items-center justify-center hover:bg-gold-400 hover:text-navy-900 transition-all"
          aria-label="Previous testimonial"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <button
          onClick={() => { next(); resetAuto() }}
          className="w-11 h-11 rounded-full border border-gold-400 text-gold-400 flex items-center justify-center hover:bg-gold-400 hover:text-navy-900 transition-all"
          aria-label="Next testimonial"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M9 18l6-6-6-6" /></svg>
        </button>
      </div>
    </div>
  )
}

export default function Home() {
  const [slideIndex, setSlideIndex] = useState(0)
  const heroSlides = ['/images/hero-slide-1.webp', '/images/hero-slide-2.webp']

  useEffect(() => {
    const t = setInterval(() => setSlideIndex(i => (i + 1) % heroSlides.length), 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <>
      <section className="relative h-screen min-h-[680px] flex items-center justify-center overflow-hidden bg-navy-950" aria-label="Welcome to Beechnut Hotel Warri">
        {heroSlides.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${i === slideIndex ? 'opacity-100' : 'opacity-0'}`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950/70 via-navy-950/40 to-navy-950/65 z-10" />
        <div className="relative z-20 text-center max-w-3xl px-4 animate-fade-up">
          <span className="font-body text-xs font-semibold tracking-[0.25em] uppercase text-gold-400 block mb-3">Welcome to Warri's Finest</span>
          <h1 className="font-display text-[clamp(3rem,8vw,6.5rem)] font-normal text-white leading-none tracking-tight mb-4">
            Beechnut<br />Hotel Warri
          </h1>
          <p className="font-body text-lg text-white/80 font-light tracking-wider mb-8">Where Nigerian warmth meets world-class luxury</p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link to="/booking" className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold tracking-wider uppercase rounded-sm bg-gold-500 text-navy-900 hover:bg-gold-600 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(161,98,7,0.25)]">
              Reserve a Room
            </Link>
            <a href="#rooms" className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold tracking-wider uppercase rounded-sm border-2 border-gold-400 text-white hover:bg-gold-400 hover:text-navy-900 transition-all duration-300">
              Explore Rooms
            </a>
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/55 text-xs tracking-wider uppercase">
          <span>Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-gold-400/70 animate-scroll-line" />
        </div>
      </section>

      <section className="bg-gold-500 py-10" aria-label="Hotel highlights">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            {STATS.map((stat, i) => (
              <div key={stat.label} className={`reveal ${i > 0 ? `transition-delay-${i}00` : ''}`}>
                <span className="font-display text-4xl font-semibold text-navy-900 leading-none block">{stat.value}</span>
                <span className="text-sm font-medium tracking-widest uppercase text-navy-900/75 mt-2 block">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-surface" id="rooms" aria-labelledby="rooms-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="eyebrow">Accommodation</span>
              <h2 id="rooms-heading" className="section-title">Rooms &amp; Suites</h2>
              <div className="w-12 h-0.5 bg-gold-400 mx-auto my-3" />
              <p className="section-subtitle mx-auto">Each space is a carefully composed sanctuary — blending contemporary design with the warmth of Warri's spirit.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ROOMS.slice(0, 3).map((room, i) => (
              <ScrollReveal key={room.id} delay={0.1 * (i + 1)}>
                <article className="bg-white rounded-sm overflow-hidden shadow-sm hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 group">
                  <div className="overflow-hidden relative">
                    <div className="aspect-[4/3] bg-navy-800/20 flex items-center justify-center text-white/30 text-sm uppercase tracking-wider">
                      {room.name}
                    </div>
                    {room.badge !== 'Standard' && (
                      <span className={`absolute top-3 left-3 z-10 text-[0.65rem] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full ${
                        room.badge === 'Most Popular' ? 'bg-gold-400 text-navy-900' : 'bg-navy-950 text-white'
                      }`}>
                        {room.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-semibold tracking-widest uppercase text-gold-500 block mb-1">{room.type === 'standard' ? 'Standard' : room.type === 'deluxe' ? 'Deluxe' : room.type === 'suite' ? 'Suite' : 'Presidential'}</span>
                    <h3 className="font-display text-xl text-navy-900 mb-2">{room.name}</h3>
                    <div className="flex flex-wrap gap-3 mb-3">
                      {room.amenities.slice(0, 4).map((a) => (
                        <span key={a} className="flex items-center gap-1 text-xs text-gray-500">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold-500 shrink-0">{/* icon */}</svg>
                          {a}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed mb-3">{room.description}</p>
                    <div className="flex items-baseline gap-1.5 mb-3">
                      <span className="font-display text-xl font-semibold text-navy-900">&#8358;{room.price.toLocaleString('en-NG')}</span>
                      <span className="text-xs text-gray-400">/ night</span>
                    </div>
                    <div className="flex gap-2">
                      <Link to={`/rooms#${room.id}`} className="flex-1 text-center px-3 py-2 text-xs font-semibold tracking-wider uppercase rounded-sm border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white transition-all">View Details</Link>
                      <Link to={`/booking?room=${room.id}`} className="flex-1 text-center px-3 py-2 text-xs font-semibold tracking-wider uppercase rounded-sm bg-gold-500 text-navy-900 hover:bg-gold-600 transition-all">Book Now</Link>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/rooms" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold tracking-wider uppercase rounded-sm border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white transition-all">
              View All Rooms &amp; Suites
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="usp-heading" id="why-us">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px] overflow-hidden">
          <div className="bg-surface p-8 lg:p-12 flex flex-col justify-center">
            <span className="text-xs font-semibold tracking-[0.18em] uppercase text-gold-500 block mb-3">Our Promise</span>
            <h2 id="usp-heading" className="font-display text-3xl font-medium text-navy-900 mb-3">Hospitality Rooted in Warri's Soul</h2>
            <div className="w-12 h-0.5 bg-gold-400 mb-3" />
            <p className="text-navy-900/70 mb-3">From the moment you arrive, every interaction is crafted with intention. Our team brings the city's legendary warmth and community spirit into every room, every plate, every smile.</p>
            <p className="text-navy-900/70 mb-4">We don't just host guests — we welcome family.</p>
            <Link to="/about" className="self-start px-6 py-3 text-sm font-semibold tracking-wider uppercase rounded-sm border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white transition-all">Our Story</Link>
          </div>
          <div className="bg-navy-800/20 min-h-[300px] lg:min-h-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px] overflow-hidden bg-navy-900">
          <div className="order-2 lg:order-1 bg-navy-900 p-8 lg:p-12 flex flex-col justify-center">
            <span className="text-xs font-semibold tracking-[0.18em] uppercase text-gold-300 block mb-3">Location</span>
            <h2 className="font-display text-3xl font-medium text-white mb-3">At the Heart of Warri</h2>
            <div className="w-12 h-0.5 bg-gold-400 mb-3" />
            <p className="text-white/70 mb-3">Strategically positioned in the commercial and cultural centre of Warri, Beechnut places you minutes from key business hubs, entertainment districts, and the vibrant energy that defines this city.</p>
            <p className="text-white/70 mb-4">Whether you're here for business or leisure, our location is your advantage.</p>
            <Link to="/contact" className="self-start px-6 py-3 text-sm font-semibold tracking-wider uppercase rounded-sm border-2 border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-navy-900 transition-all">Get Directions</Link>
          </div>
          <div className="order-1 lg:order-2 bg-navy-800/20 min-h-[300px] lg:min-h-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px] overflow-hidden">
          <div className="bg-surface p-8 lg:p-12 flex flex-col justify-center">
            <span className="text-xs font-semibold tracking-[0.18em] uppercase text-gold-500 block mb-3">Facilities</span>
            <h2 className="font-display text-3xl font-medium text-navy-900 mb-3">World-Class Amenities</h2>
            <div className="w-12 h-0.5 bg-gold-400 mb-3" />
            <p className="text-navy-900/70 mb-3">A fully-equipped fitness centre, temperature-controlled swimming pool, full-service business centre, event spaces for up to 500 guests, and 24-hour room service — all under one roof.</p>
            <p className="text-navy-900/70 mb-4">Excellence is not an amenity here. It is the standard.</p>
            <Link to="/facilities" className="self-start px-6 py-3 text-sm font-semibold tracking-wider uppercase rounded-sm border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white transition-all">Explore Facilities</Link>
          </div>
          <div className="bg-navy-800/20 min-h-[300px] lg:min-h-full" />
        </div>
      </section>

      <section className="relative min-h-[580px] flex items-center bg-navy-950 overflow-hidden" id="dining" aria-labelledby="dining-heading">
        <div className="absolute inset-0 bg-navy-950/60 z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
          <div className="max-w-xl">
            <span className="text-xs font-semibold tracking-[0.18em] uppercase text-gold-400 block mb-3">Culinary Experiences</span>
            <h2 id="dining-heading" className="font-display text-4xl font-medium text-white mb-3">Flavours That Tell a Story</h2>
            <div className="w-12 h-0.5 bg-gold-400 mb-3" />
            <blockquote className="font-accent text-2xl italic text-gold-300 leading-relaxed mb-4 border-l-3 border-gold-400 pl-4">
              &ldquo;Food is memory, culture, and celebration — we serve all three.&rdquo;
            </blockquote>
            <p className="text-white/70 mb-6">Three distinct dining venues — from an elegant à la carte restaurant celebrating Nigerian cuisine with a fine-dining twist, to a relaxed poolside grill and a rooftop cocktail bar with Warri's best skyline views.</p>
            <div className="flex gap-3 flex-wrap">
              <Link to="/dining" className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold tracking-wider uppercase rounded-sm bg-gold-500 text-navy-900 hover:bg-gold-600 transition-all">Explore Dining</Link>
              <Link to="/dining#reservations" className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold tracking-wider uppercase rounded-sm border-2 border-gold-400 text-white hover:bg-gold-400 hover:text-navy-900 transition-all">Reserve a Table</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-surface-alt" id="testimonials" aria-labelledby="testimonials-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="eyebrow">Guest Stories</span>
              <h2 id="testimonials-heading" className="section-title">What Our Guests Say</h2>
              <div className="w-12 h-0.5 bg-gold-400 mx-auto my-3" />
            </div>
          </ScrollReveal>
          <TestimonialCarousel />
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-navy-950 text-center relative overflow-hidden" id="book" aria-labelledby="cta-heading">
        <div className="absolute -top-2/4 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-radial from-gold-400/7 to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-center gap-4 mb-8">
            {[0, 1, 2].map(i => <div key={i} className="w-2 h-2 bg-gold-400 rotate-45 shrink-0" />)}
          </div>
          <span className="text-xs font-semibold tracking-[0.18em] uppercase text-gold-400 block mb-3">Your Stay Awaits</span>
          <h2 id="cta-heading" className="font-display text-4xl lg:text-5xl font-normal text-white leading-tight mb-3">
            Experience Warri's Finest.<br />Book Your Stay Today.
          </h2>
          <p className="text-white/65 mb-8 max-w-lg mx-auto">Flexible rates, special packages, and personalised service — every reservation is crafted just for you.</p>
          <div className="flex gap-3 justify-center flex-wrap mb-8">
            <Link to="/booking" className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold tracking-wider uppercase rounded-sm bg-gold-500 text-navy-900 hover:bg-gold-600 transition-all">Reserve a Room</Link>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold tracking-wider uppercase rounded-sm border-2 border-gold-400 text-white hover:bg-gold-400 hover:text-navy-900 transition-all">Speak to Us</Link>
          </div>
          <div className="flex gap-6 justify-center flex-wrap">
            {[
              { icon: 'shield', label: 'Best Rate Guaranteed' },
              { icon: 'check', label: 'Free Cancellation Available' },
              { icon: 'phone', label: '24 / 7 Reservations' },
            ].map(({ icon, label }) => (
              <span key={label} className="flex items-center gap-1.5 text-xs tracking-wider text-white/45">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  {icon === 'shield' && <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />}
                  {icon === 'check' && <><circle cx="12" cy="12" r="10" /><path d="M9 12l2 2 4-4" /></>}
                  {icon === 'phone' && <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.07 9.81a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 2 .99h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L6.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />}
                </svg>
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
