import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ui/ScrollReveal'

const TEAM = [
  { name: 'Adebayo Ogunlesi', role: 'General Manager', desc: 'Over 20 years of luxury hospitality experience across Nigeria and West Africa.' },
  { name: 'Chef Emeka Oduya', role: 'Executive Chef', desc: 'A culinary artist trained in Paris and Lagos, passionate about reimagining Nigerian cuisine.' },
  { name: 'Ngozi Eze', role: 'Head of Guest Relations', desc: 'Ensuring every guest feels the warmth of Warri from the moment they arrive.' },
  { name: 'Tunde Bakare', role: 'Events Director', desc: 'Specialist in curating unforgettable corporate and social events.' },
]

export default function About() {
  return (
    <>
      <section className="relative h-[60vh] min-h-[380px] flex flex-col items-center justify-center text-center overflow-hidden bg-navy-950">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950" />
        <div className="relative z-10 px-4 animate-fade-up">
          <span className="text-xs font-semibold tracking-[0.28em] uppercase text-gold-400 mb-3 block">Beechnut Hotel Warri</span>
          <h1 className="font-display text-[clamp(2.8rem,6vw,4.4rem)] font-bold text-white leading-tight mb-4">
            Our <em className="italic text-gold-400 not-italic">Story</em>
          </h1>
          <nav className="flex items-center justify-center gap-2 text-sm text-white/50" aria-label="Breadcrumb">
            <Link to="/" className="text-white/70 hover:text-gold-400 transition-colors">Home</Link>
            <span className="text-gold-400/60">›</span>
            <span className="text-gold-400 font-medium">About</span>
          </nav>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-semibold tracking-[0.24em] uppercase text-gold-500 block mb-2">About Beechnut</span>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-navy-900 mb-4">Where Warri's Spirit Meets <em className="text-gold-500 not-italic">World-Class Luxury</em></h2>
              <div className="w-12 h-0.5 bg-gold-400 mx-auto mb-4" />
              <p className="text-gray-600 leading-relaxed">
                Nestled in the heart of Warri, Delta State, Beechnut Hotel is more than a place to stay — it is a celebration of Nigerian warmth, cultural richness, and uncompromising hospitality. Since opening our doors over a decade ago, we have welcomed guests from every corner of Nigeria and beyond, earning a reputation as Warri's definitive luxury destination.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-16">
              <div className="h-[400px] bg-cover bg-center" style={{ backgroundImage: 'url(/images/gallery/facilities/gallery-facility-1.webp)' }} />
              <div>
                <h3 className="font-display text-2xl font-bold text-navy-900 mb-3">Our Philosophy</h3>
                <div className="w-12 h-0.5 bg-gold-400 mb-4" />
                <p className="text-gray-600 mb-4">Every detail at Beechnut is intentional — from the curated art in our lobbies to the locally sourced ingredients in our kitchen, from the way our staff are trained to remember your name to the precision of our turndown service.</p>
                <p className="text-gray-600">We believe that true luxury is not about opulence alone. It is about feeling seen, valued, and cared for. It is the warmth of a genuine smile after a long journey. It is a space that respects your privacy while anticipating your needs. This is the Beechnut difference.</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="text-center mb-10">
              <span className="text-xs font-semibold tracking-[0.24em] uppercase text-gold-500 block mb-2">Our Team</span>
              <h2 className="font-display text-3xl font-bold text-navy-900">The People Behind the <em className="text-gold-500 not-italic">Experience</em></h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TEAM.map((member, i) => (
                <ScrollReveal key={member.name} delay={0.1 * i}>
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 text-center p-6">
                    <div className="w-20 h-20 rounded-full bg-navy-800/10 mx-auto mb-4 flex items-center justify-center text-navy-900/30 text-2xl font-display">
                      {member.name.charAt(0)}
                    </div>
                    <h3 className="font-display text-lg font-semibold text-navy-900">{member.name}</h3>
                    <span className="text-xs font-semibold tracking-wider uppercase text-gold-500 block mb-2">{member.role}</span>
                    <p className="text-sm text-gray-500">{member.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
