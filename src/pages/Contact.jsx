import { useState } from 'react'
import { Link } from 'react-router-dom'
import ScrollReveal from '../components/ui/ScrollReveal'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <section className="relative h-[60vh] min-h-[380px] flex flex-col items-center justify-center text-center overflow-hidden bg-navy-950">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950" />
        <div className="relative z-10 px-4 animate-fade-up">
          <span className="text-xs font-semibold tracking-[0.28em] uppercase text-gold-400 mb-3 block">Beechnut Hotel Warri</span>
          <h1 className="font-display text-[clamp(2.8rem,6vw,4.4rem)] font-bold text-white leading-tight mb-4">
            Get in <em className="italic text-gold-400 not-italic">Touch</em>
          </h1>
          <nav className="flex items-center justify-center gap-2 text-sm text-white/50" aria-label="Breadcrumb">
            <Link to="/" className="text-white/70 hover:text-gold-400 transition-colors">Home</Link>
            <span className="text-gold-400/60">›</span>
            <span className="text-gold-400 font-medium">Contact</span>
          </nav>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-semibold tracking-[0.24em] uppercase text-gold-500 block mb-2">Contact Us</span>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-navy-900 mb-3">We'd Love to Hear From You</h2>
              <div className="w-12 h-0.5 bg-gold-400 mx-auto mb-4" />
              <p className="text-gray-500">Whether you're planning a stay, organising an event, or simply have a question — our team is ready to help.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <ScrollReveal>
              <div className="space-y-6">
                {[
                  { icon: 'map', label: 'Address', value: '[Street Address], Warri, Delta State, Nigeria' },
                  { icon: 'phone', label: 'Phone', value: '+234 (0) 000 000 0000', href: 'tel:+2340000000000' },
                  { icon: 'mail', label: 'Email', value: 'info@beechnuthotelwarri.com', href: 'mailto:info@beechnuthotelwarri.com' },
                  { icon: 'clock', label: 'Reception', value: 'Open 24 hours — 7 days a week' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-gold-600">
                        {item.icon === 'map' && <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>}
                        {item.icon === 'phone' && <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.07 9.81a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 2 .99h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L6.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />}
                        {item.icon === 'mail' && <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>}
                        {item.icon === 'clock' && <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>}
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-navy-900 mb-0.5">{item.label}</h3>
                      {item.href ? (
                        <a href={item.href} className="text-gray-500 hover:text-gold-500 transition-colors">{item.value}</a>
                      ) : (
                        <p className="text-gray-500">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              {!submitted ? (
                <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 shadow-sm">
                  <span className="text-xs font-mono tracking-widest uppercase text-gold-500 block mb-4 pb-3 border-b border-gray-100">Send a Message</span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono tracking-wider uppercase text-gray-500 font-medium" htmlFor="contact-name">Your Name <span className="text-red-600">*</span></label>
                      <input type="text" id="contact-name" className="w-full px-3 py-2.5 border border-gray-200 rounded-sm text-sm bg-gray-50 focus:border-navy-900 focus:bg-white focus:outline-none" placeholder="e.g. Emeka Okafor" required />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono tracking-wider uppercase text-gray-500 font-medium" htmlFor="contact-email">Email <span className="text-red-600">*</span></label>
                      <input type="email" id="contact-email" className="w-full px-3 py-2.5 border border-gray-200 rounded-sm text-sm bg-gray-50 focus:border-navy-900 focus:bg-white focus:outline-none" placeholder="you@example.com" required />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 mb-4">
                    <label className="text-xs font-mono tracking-wider uppercase text-gray-500 font-medium" htmlFor="contact-subject">Subject</label>
                    <input type="text" id="contact-subject" className="w-full px-3 py-2.5 border border-gray-200 rounded-sm text-sm bg-gray-50 focus:border-navy-900 focus:bg-white focus:outline-none" placeholder="How can we help you?" />
                  </div>

                  <div className="flex flex-col gap-1.5 mb-4">
                    <label className="text-xs font-mono tracking-wider uppercase text-gray-500 font-medium" htmlFor="contact-message">Message <span className="text-red-600">*</span></label>
                    <textarea id="contact-message" rows={5} className="w-full px-3 py-2.5 border border-gray-200 rounded-sm text-sm bg-gray-50 focus:border-navy-900 focus:bg-white focus:outline-none resize-y min-h-[120px]" placeholder="Tell us how we can assist you…" required />
                  </div>

                  <button type="submit" className="px-8 py-3 text-sm font-semibold tracking-wider uppercase rounded-sm bg-gold-500 text-navy-900 hover:bg-gold-600 transition-all">
                    Send Message
                  </button>
                </form>
              ) : (
                <div className="bg-white border border-gray-200 rounded-lg p-8 text-center shadow-sm">
                  <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-2xl mx-auto mb-4">✓</div>
                  <h3 className="font-display text-2xl font-semibold text-navy-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-500">Thank you for reaching out. Our team will respond within 24 hours.</p>
                </div>
              )}
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="h-[400px] bg-navy-800/20 flex items-center justify-center text-white/20 text-lg uppercase tracking-widest">
        Map Placeholder — Google Maps Integration
      </section>
    </>
  )
}
