import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ROOMS } from '../data/rooms'

export default function Booking() {
  const [searchParams] = useSearchParams()
  const preselectId = searchParams.get('room')
  const preselect = preselectId ? ROOMS.find(r => r.id === preselectId) : null

  const [selectedRoom, setSelectedRoom] = useState(preselect || null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(2)
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const today = new Date().toISOString().split('T')[0]

  const calcNights = () => {
    if (!checkIn || !checkOut) return 0
    const diff = new Date(checkOut) - new Date(checkIn)
    return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)))
  }

  const nights = calcNights()
  const roomRate = selectedRoom ? selectedRoom.price * nights : 0
  const tax = Math.round(roomRate * 0.075)
  const total = roomRate + tax

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedRoom || !checkIn || !checkOut || !name || !email) {
      alert('Please fill in all required fields.')
      return
    }
    setSubmitted(true)
  }

  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-navy-950 pt-28 pb-12 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-radial from-gold-400/10 to-transparent pointer-events-none" />
        <div className="relative z-10">
          <span className="font-mono text-xs tracking-widest uppercase text-gold-400 mb-2 block">Reserve Your Stay</span>
          <h1 className="font-display text-[clamp(2rem,5vw,3.2rem)] font-light text-white leading-tight">
            Book a <em className="text-gold-400 italic">Room</em>
          </h1>
        </div>
      </motion.section>

      <div className="max-w-5xl mx-auto px-4 py-6 text-sm text-gray-500">
        <Link to="/" className="text-navy-900 hover:underline">Home</Link>
        <span className="mx-1.5">›</span>
        <span>Book a Room</span>
      </div>

      <main className="max-w-5xl mx-auto px-4 pb-16">
        {!submitted ? (
          <AnimatePresence mode="wait">
            <motion.div
              key="booking-form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="mb-8">
                <span className="text-xs font-mono tracking-widest uppercase text-gold-500 block mb-1">Our Rooms &amp; Rates</span>
                <h2 className="font-display text-3xl font-normal text-navy-900">Choose Your <em className="italic text-gold-500">Stay</em></h2>
                <p className="text-gray-500 mt-2">Browse our rooms below. To enquire, fill in the form and we'll get back to you within 24 hours.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
                {ROOMS.map(room => {
                  const isSelected = selectedRoom?.id === room.id
                  return (
                    <motion.div
                      key={room.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.08)' }}
                      className={`bg-white border rounded-lg overflow-hidden shadow-sm flex flex-col transition-all duration-300 ${
                        isSelected ? 'ring-2 ring-gold-500 border-gold-500' : 'border-gray-200'
                      }`}
                    >
                      <div className="relative h-48 overflow-hidden bg-navy-800/10">
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${room.image})` }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/30 via-transparent to-transparent" />
                      </div>
                      <div className="p-4 flex flex-col flex-1">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="font-display text-xl font-normal text-navy-900">{room.name}</h3>
                          <span className="text-xs font-mono uppercase px-2 py-0.5 rounded-sm bg-green-50 text-green-700 shrink-0">Available</span>
                        </div>
                        <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-2">
                          <span>{room.bedType}</span>
                          <span>{room.maxOccupancy} guests</span>
                          <span>{room.size}</span>
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-3">{room.description}</p>
                        <div className="flex items-baseline gap-1 mb-3">
                          <span className="font-display text-xl font-semibold text-navy-900">&#8358;{room.price.toLocaleString('en-NG')}</span>
                          <span className="text-xs text-gray-400">/ night</span>
                        </div>
                        <motion.button
                          onClick={() => setSelectedRoom(isSelected ? null : room)}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full py-2.5 text-xs font-semibold tracking-wider uppercase rounded-sm border-2 transition-all ${
                            isSelected
                              ? 'bg-gold-500 text-navy-900 border-gold-500'
                              : 'bg-transparent text-navy-900 border-navy-900 hover:bg-navy-900 hover:text-white'
                          }`}
                        >
                          {isSelected ? 'Selected' : 'Select Room'}
                        </motion.button>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              <AnimatePresence>
                {selectedRoom && (
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -24 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 28 }}
                    className="max-w-2xl mx-auto"
                  >
                    <div className="mb-6">
                      <span className="text-xs font-mono tracking-widest uppercase text-gold-500 block mb-1">Get In Touch</span>
                      <h2 className="font-display text-3xl font-normal text-navy-900">Send Us an <em className="italic text-gold-500">Enquiry</em></h2>
                      <p className="text-gray-500 mt-2">Have a question about our rooms, rates, or availability? Drop us a message and we'll reply within 24 hours.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 shadow-sm">
                      <span className="text-xs font-mono tracking-widest uppercase text-gold-500 block mb-4 pb-3 border-b border-gray-100">Your Details</span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-mono tracking-wider uppercase text-gray-500 font-medium" htmlFor="name">Your Name <span className="text-red-600">*</span></label>
                          <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-sm text-sm bg-gray-50 focus:border-navy-900 focus:bg-white focus:outline-none transition-all" placeholder="e.g. Emeka Okafor" required />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-mono tracking-wider uppercase text-gray-500 font-medium" htmlFor="email">Email Address <span className="text-red-600">*</span></label>
                          <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-sm text-sm bg-gray-50 focus:border-navy-900 focus:bg-white focus:outline-none transition-all" placeholder="you@example.com" required />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-mono tracking-wider uppercase text-gray-500 font-medium" htmlFor="phone">Phone Number</label>
                          <input type="tel" id="phone" value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-sm text-sm bg-gray-50 focus:border-navy-900 focus:bg-white focus:outline-none transition-all" placeholder="+234 800 000 0000" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-mono tracking-wider uppercase text-gray-500 font-medium" htmlFor="guests">Number of Guests</label>
                          <input type="number" id="guests" value={guests} onChange={e => setGuests(parseInt(e.target.value) || 1)} min="1" max="10" className="w-full px-3 py-2.5 border border-gray-200 rounded-sm text-sm bg-gray-50 focus:border-navy-900 focus:bg-white focus:outline-none transition-all" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-mono tracking-wider uppercase text-gray-500 font-medium" htmlFor="checkin">Preferred Check-in Date</label>
                          <input type="date" id="checkin" value={checkIn} onChange={e => setCheckIn(e.target.value)} min={today} className="w-full px-3 py-2.5 border border-gray-200 rounded-sm text-sm bg-gray-50 focus:border-navy-900 focus:bg-white focus:outline-none transition-all cursor-pointer" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-mono tracking-wider uppercase text-gray-500 font-medium" htmlFor="checkout">Preferred Check-out Date</label>
                          <input type="date" id="checkout" value={checkOut} onChange={e => setCheckOut(e.target.value)} min={checkIn || today} className="w-full px-3 py-2.5 border border-gray-200 rounded-sm text-sm bg-gray-50 focus:border-navy-900 focus:bg-white focus:outline-none transition-all cursor-pointer" />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5 mb-4">
                        <label className="text-xs font-mono tracking-wider uppercase text-gray-500 font-medium" htmlFor="message">Your Message <span className="text-red-600">*</span></label>
                        <textarea id="message" value={message} onChange={e => setMessage(e.target.value)} rows={4} className="w-full px-3 py-2.5 border border-gray-200 rounded-sm text-sm bg-gray-50 focus:border-navy-900 focus:bg-white focus:outline-none transition-all resize-y min-h-[90px]" placeholder="Tell us about your requirements — number of guests, stay duration, special requests…" required />
                      </div>

                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold tracking-wider uppercase rounded-sm bg-navy-900 text-white hover:bg-navy-800 transition-all"
                      >
                        Send Enquiry →
                      </motion.button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="max-w-lg mx-auto text-center py-12"
          >
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-2xl mx-auto mb-4">✓</div>
            <h2 className="font-display text-3xl font-normal text-navy-900 mb-2">Enquiry Submitted!</h2>
            <p className="text-gray-500 mb-6">
              Thank you, <strong className="text-navy-900">{name}</strong>! We've received your enquiry for the <strong className="text-navy-900">{selectedRoom?.name}</strong>.
              Our team will get back to you within 24 hours via WhatsApp or email.
            </p>
            <div className="flex gap-3 justify-center">
              <Link to="/" className="px-6 py-3 text-sm font-semibold tracking-wider uppercase rounded-sm bg-gold-500 text-navy-900 hover:bg-gold-600 transition-all">Back to Home</Link>
              <Link to="/rooms" className="px-6 py-3 text-sm font-semibold tracking-wider uppercase rounded-sm border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white transition-all">Browse Rooms</Link>
            </div>
          </motion.div>
        )}
      </main>

    </>
  )
}
