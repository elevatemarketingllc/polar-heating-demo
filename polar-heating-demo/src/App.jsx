import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Phone, Menu, X,
  Shield, Clock, Star, Wrench, CreditCard, MapPin,
  DollarSign, CheckCircle2, CheckCircle, Loader2,
  ArrowRight, Quote, Mail, ExternalLink
} from 'lucide-react'
import config from './config'

// ─── Navbar ───────────────────────────────────────────────────────────────────

// ─── Review Banner ────────────────────────────────────────────────────────────

function ReviewBanner() {
  return (
    <div style={{ backgroundColor: '#0F2347', borderBottom: '1px solid rgba(27,58,107,0.5)' }} className="fixed top-0 left-0 right-0 z-50 py-2 px-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <a href="#reviews" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <span className="text-yellow-400 text-sm tracking-tight">★★★★★</span>
          <span className="text-white text-sm font-bold">4.7</span>
          <span className="text-sm" style={{ color: 'rgba(200,220,245,0.6)' }}>· 62 Google Reviews</span>
        </a>
        <a
          href={`tel:${config.business.phoneRaw}`}
          className="hidden sm:flex items-center gap-1.5 text-xs hover:opacity-80 transition-opacity"
          style={{ color: 'rgba(200,220,245,0.6)' }}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          {config.business.phone}
        </a>
      </div>
    </div>
  )
}

const NAV_LINKS = [
  { label: 'Services',     href: '#services'  },
  { label: 'Financing',    href: '#financing' },
  { label: 'Reviews',      href: '#reviews'   },
  { label: 'Service Area', href: '#area'      },
  { label: 'Get a Quote',  href: '#quote'     },
]

function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{ top: '36px' }}
      className={`fixed inset-x-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-[#0A1628]/96 backdrop-blur-md shadow-sm border-b border-red-600/15' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        <a href="#" className="flex-shrink-0">
          <img
            src="/polar-logo.png"
            alt={config.business.name}
            className="h-10 w-auto object-contain"
          />
        </a>
        <nav className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.slice(0, -1).map(link => (
            <a key={link.label} href={link.href} className="text-sm font-medium text-blue-200 hover:text-white transition-colors">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2 flex-shrink-0">
          <a href={`tel:${config.business.phoneRaw}`} className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold px-4 py-2.5 rounded-xl transition-colors text-sm shadow-lg shadow-red-600/25">
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">{config.business.phone}</span>
            <span className="sm:hidden">Call Now</span>
          </a>
          <button aria-label="Toggle menu" onClick={() => setMenuOpen(o => !o)} className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors">
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div key="mobile-menu" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.22 }} className="lg:hidden overflow-hidden bg-[#0A1628] border-t border-red-600/15">
            <nav className="px-4 py-3 space-y-1">
              {NAV_LINKS.map(link => (
                <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)} className="block py-2.5 px-3 text-blue-200 font-medium rounded-lg hover:bg-white/10 transition-colors text-sm">
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.6], ['0%', '15%'])

  return (
    <section ref={ref} className="relative h-screen min-h-[660px] overflow-hidden">

      {/* Parallax background — photo + navy fallback */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 scale-110 origin-center">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url("${config.hero.backgroundImage}")`,
            backgroundColor: '#0A1628',
          }}
        />
      </motion.div>

      {/* Overlay 1 — heavy bottom anchor so text is always readable */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0A1628 0%, rgba(10,22,40,0.75) 45%, rgba(10,22,40,0.25) 100%)' }} />

      {/* Overlay 2 — left push gives text a clean lane */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(10,22,40,0.85) 0%, rgba(10,22,40,0.4) 55%, transparent 100%)' }} />

      {/* Noise texture — adds depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Diagonal line pattern — subtle brand texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.025,
          backgroundImage: 'repeating-linear-gradient(-45deg, #1B3A6B 0px, #1B3A6B 1px, transparent 1px, transparent 12px)',
        }}
      />

      {/* Main content — bottom-left anchored */}
      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="relative z-10 h-full flex flex-col justify-end pb-20 px-6 md:px-16 max-w-7xl mx-auto w-full"
      >
        {/* Animated red divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-16 h-0.5 bg-red-600 mb-6 origin-left"
        />

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-[0.65rem] tracking-[0.35em] uppercase text-red-500 mb-5 font-medium"
        >
          {config.hero.eyebrow || `${config.business.city}, Idaho · Since ${config.business.founded}`}
        </motion.p>

        {/* Headline line 1 — white, slides up from overflow hidden */}
        <div className="overflow-hidden">
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-white leading-none"
            style={{ fontSize: 'clamp(2.6rem, 6.5vw, 5.5rem)' }}
          >
            {config.hero.line1 || 'THEY JUST'}
          </motion.div>
        </div>

        {/* Headline line 2 — red, the punch */}
        <div className="overflow-hidden mb-2">
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-red-500 leading-none"
            style={{ fontSize: 'clamp(2.6rem, 6.5vw, 5.5rem)' }}
          >
            {config.hero.line2 || 'FIXED IT.'}
          </motion.div>
        </div>

        {/* Subheadline */}
        <div className="overflow-hidden mb-7">
          <motion.p
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm md:text-base max-w-lg leading-relaxed"
            style={{ color: 'rgba(147,174,210,0.8)' }}
          >
            {config.hero.subheadline}
          </motion.p>
        </div>

        {/* Urgency pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-2 px-3 py-1.5 mb-8 self-start"
          style={{ border: '1px solid rgba(200,16,46,0.4)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[0.62rem] tracking-[0.22em] uppercase text-red-400">
            {config.hero.emergencyText}
          </span>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <a
            href={`tel:${config.business.phoneRaw}`}
            className="inline-flex items-center justify-center gap-3 bg-red-600 hover:bg-red-500 text-white font-bold px-8 py-4 transition-all duration-200 text-base"
            style={{ boxShadow: '0 6px 28px rgba(200,16,46,0.45)' }}
          >
            <Phone className="w-5 h-5" />
            {config.business.phone}
          </a>
          <a
            href="#quote"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white font-medium transition-all duration-200 text-base"
            style={{ border: '1px solid rgba(255,255,255,0.22)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(200,16,46,0.6)'; e.currentTarget.style.color = '#f87171' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)'; e.currentTarget.style.color = 'white' }}
          >
            Get a Free Estimate
          </a>
        </motion.div>

        {/* Customer quote — social proof under CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.15, duration: 0.8 }}
          className="flex items-start gap-3 max-w-md"
          style={{ borderLeft: '2px solid rgba(200,16,46,0.5)', paddingLeft: '1rem' }}
        >
          <div>
            <p className="text-sm italic leading-relaxed" style={{ color: 'rgba(200,220,245,0.75)' }}>
              {config.hero.quoteText}
            </p>
            <p className="text-[0.65rem] tracking-[0.15em] uppercase mt-1.5" style={{ color: 'rgba(147,174,210,0.5)' }}>
              {config.hero.quoteAuthor}
            </p>
          </div>
        </motion.div>
      </motion.div>


      {/* Wave transition into body */}
      <div className="absolute bottom-0 inset-x-0 pointer-events-none">
        <svg viewBox="0 0 1440 72" fill="none" preserveAspectRatio="none" className="w-full h-16" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 72L1440 72L1440 32C1200 64 960 0 720 0C480 0 240 64 0 32L0 72Z" fill="#F4F6F9" />
        </svg>
      </div>
    </section>
  )
}

// ─── Trust Badges ─────────────────────────────────────────────────────────────

const TRUST_ICONS = [Shield, Clock, Star, Wrench, CreditCard, MapPin]

function TrustBadges() {
  return (
    <section className="bg-[#F4F6F9] border-b border-slate-200 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {config.trustBadges.map((badge, i) => {
            const Icon = TRUST_ICONS[i % TRUST_ICONS.length]
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ delay: i * 0.07, duration: 0.4 }} className="flex flex-col items-center text-center gap-2.5">
                <div className="w-11 h-11 bg-blue-100 rounded-full flex items-center justify-center">
                  <Icon className="w-5 h-5 text-red-500" />
                </div>
                <p className="text-xs font-semibold text-slate-700 leading-tight">{badge}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Services Grid ────────────────────────────────────────────────────────────

function ServicesGrid() {
  return (
    <section id="services" className="bg-white py-20 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="text-center mb-14">
          <span className="inline-block bg-red-50 text-red-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">What We Do</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Full-Service HVAC for {config.business.city} Homeowners</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">From emergency repairs to full system installs — we handle every heating and cooling need in the Treasure Valley.</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {config.services.map((service, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ delay: i * 0.08, duration: 0.5 }} whileHover={{ y: -5, transition: { duration: 0.2 } }} className="group relative bg-slate-50 hover:bg-white border border-slate-100 hover:border-blue-200 hover:shadow-xl rounded-2xl p-6 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              <div className="relative z-10">
                <div className="text-4xl mb-5">{service.icon}</div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors mb-2">{service.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">{service.description}</p>
                <a href="#quote" className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-600 group-hover:text-red-700 transition-colors">
                  Request service <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="mt-12 text-center">
          <p className="text-slate-500 mb-4">Don't see what you need? We likely do it.</p>
          <a href={`tel:${config.business.phoneRaw}`} className="inline-flex items-center gap-2 bg-[#0F2347] hover:bg-[#1B3A6B] text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm">
            Call {config.business.phone}
          </a>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Financing Badge ──────────────────────────────────────────────────────────

const PERKS = [
  'Low monthly payments that fit your budget',
  'Quick approval — apply right over the phone',
  'Available on full system replacements',
  'Multiple lender options to fit your situation',
]

function FinancingBadge() {
  if (!config.financing) return null
  return (
    <section id="financing" className="bg-gradient-to-br from-blue-900 via-slate-900 to-blue-950 py-20 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/30 text-red-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
              <DollarSign className="w-4 h-4" /> Flexible Financing Available
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">{config.financing.headline}</h2>
            <p className="text-blue-200 text-lg leading-relaxed mb-8">{config.financing.body}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={`tel:${config.business.phoneRaw}`} className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-3.5 rounded-xl transition-colors shadow-lg shadow-red-600/20">
                <Phone className="w-5 h-5" /> {config.financing.ctaText}
              </a>
              <a href="#quote" className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors text-sm">
                Get a Free Quote
              </a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-7">
              <p className="text-white font-bold text-lg mb-6">Why homeowners choose {config.business.name}</p>
              <ul className="space-y-4">
                {PERKS.map((perk, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.08 }} className="flex items-start gap-3 text-blue-100">
                    <CheckCircle2 className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm leading-relaxed">{perk}</span>
                  </motion.li>
                ))}
              </ul>
              {config.business.financeNote && (
                <p className="mt-6 pt-5 border-t border-white/15 text-blue-300/70 text-xs leading-relaxed">{config.business.financeNote}</p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Bryant authorized badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-14 flex flex-col items-center gap-3"
        >
          <p className="text-blue-300/50 text-xs tracking-[0.2em] uppercase">Authorized Dealer</p>
          <img
            src="/bryant-logo.png"
            alt="Bryant Heating & Cooling — Authorized Dealer"
            className="h-16 w-auto object-contain opacity-80"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </motion.div>
      </div>
    </section>
  )
}

// ─── Reviews ──────────────────────────────────────────────────────────────────

function StarRating({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < count ? 'text-red-500 fill-red-500' : 'text-slate-200 fill-slate-200'}`} />
      ))}
    </div>
  )
}

function ReviewsSection() {
  return (
    <section id="reviews" className="bg-slate-50 py-20 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            <Star className="w-4 h-4 fill-red-600" /> 5-Star Rated by Your Neighbors
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">What {config.business.city} Homeowners Are Saying</h2>
          <p className="text-slate-500 text-lg">Real customers, real results — right here in the Treasure Valley.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {config.reviews.map((review, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ delay: i * 0.1, duration: 0.5 }} className="relative bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col">
              <Quote className="absolute top-5 right-5 w-8 h-8 text-blue-50 fill-blue-50" />
              <StarRating count={review.rating} />
              <p className="text-slate-700 text-sm leading-relaxed mt-4 mb-6 flex-1">"{review.text}"</p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                <div>
                  <p className="font-bold text-slate-900 text-sm">{review.name}</p>
                  {review.source && <p className="text-slate-400 text-xs mt-0.5">via {review.source}</p>}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                  <span className="text-xs font-semibold text-slate-500">{review.rating}.0</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="mt-12 text-center">
          <p className="text-slate-400 text-sm">Trusted by homeowners across {config.serviceArea.cities.slice(0, 4).join(', ')} and the entire Treasure Valley.</p>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Quote Form ───────────────────────────────────────────────────────────────

const schema = z.object({
  name:    z.string().min(2,  'Please enter your name'),
  phone:   z.string().min(10, 'Please enter your phone number'),
  email:   z.string().email(  'Please enter a valid email address'),
  zip:     z.string().min(5,  'Please enter your ZIP code'),
  service: z.string().min(1,  'Please select a service'),
  message: z.string().optional(),
})

const CHECKLIST = [
  'Free estimates on all new system installs',
  'Same-day response on most service calls',
  'No pressure — just honest recommendations',
  `Licensed & insured in ${config.business.state}`,
]

const inputClass = 'w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-shadow bg-white'

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  )
}

function QuoteForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm({ resolver: zodResolver(schema) })
  const onSubmit = async () => { await new Promise(r => setTimeout(r, 900)) }
  return (
    <section id="quote" className="bg-white py-20 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="inline-block bg-red-50 text-red-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-5">Free Estimates</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">{config.quote.headline}</h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-8">{config.quote.subheadline}</p>
            <ul className="space-y-3 mb-10">
              {CHECKLIST.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
              <p className="text-slate-500 text-sm mb-3">Need someone now? Call directly:</p>
              <a href={`tel:${config.business.phoneRaw}`} className="inline-flex items-center gap-3 text-slate-900 font-bold text-xl hover:text-blue-700 transition-colors">
                <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                {config.business.phone}
              </a>
              {config.business.emergencyService && <p className="text-slate-400 text-xs mt-2 ml-[52px]">24/7 emergency service available</p>}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="bg-slate-50 border border-slate-100 rounded-2xl p-7 sm:p-8 shadow-sm">
            {isSubmitSuccessful ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-5">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Request Received!</h3>
                <p className="text-slate-500 mb-6 max-w-xs">We'll reach out within a few hours — usually much sooner.</p>
                <button onClick={reset} className="text-blue-700 font-semibold text-sm hover:underline">Submit another request</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Your Name *" error={errors.name}><input {...register('name')} placeholder="Jane Smith" className={inputClass} /></Field>
                  <Field label="Phone Number *" error={errors.phone}><input {...register('phone')} type="tel" placeholder="(208) 555-0100" className={inputClass} /></Field>
                </div>
                <Field label="Email Address *" error={errors.email}><input {...register('email')} type="email" placeholder="jane@example.com" className={inputClass} /></Field>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="ZIP Code *" error={errors.zip}><input {...register('zip')} placeholder="83642" maxLength={5} className={inputClass} /></Field>
                  <Field label="Service Needed *" error={errors.service}>
                    <select {...register('service')} className={`${inputClass} cursor-pointer`}>
                      <option value="">Select a service...</option>
                      {config.services.map((s, i) => <option key={i} value={s.title}>{s.title}</option>)}
                    </select>
                  </Field>
                </div>
                <Field label="Tell Us More (optional)" error={errors.message}><textarea {...register('message')} rows={3} placeholder="What's going on with your system? Any details help." className={`${inputClass} resize-none`} /></Field>
                <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 disabled:bg-red-300 text-white font-bold text-base py-4 rounded-xl transition-colors shadow-md shadow-red-600/20">
                  {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" />Sending...</> : config.hero.ctaText || 'Get My Free Quote'}
                </button>
                <p className="text-center text-slate-400 text-xs">No spam. No commitment. We respond within 24 hours.</p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── Service Area Pills ───────────────────────────────────────────────────────

function ServiceAreaPills() {
  return (
    <section id="area" className="bg-slate-50 border-t border-slate-100 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="inline-flex items-center gap-2 text-slate-400 text-sm font-medium mb-2">
            <MapPin className="w-4 h-4" /> {config.serviceArea.headline}
          </div>
          <p className="text-slate-500 text-sm mb-8">Proudly serving every corner of the Treasure Valley.</p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {config.serviceArea.cities.map((city, i) => (
              <motion.span key={i} initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${city === config.business.city ? 'bg-red-600 text-white shadow-sm shadow-red-600/20' : 'bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-700'}`}>
                {city === config.business.city ? `📍 ${city}` : city}
              </motion.span>
            ))}
          </div>
          <p className="text-slate-400 text-xs mt-6">Not sure if we cover your area? Call us — we probably do.</p>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <div>
            <h3 className="text-white font-bold text-xl mb-1">{config.business.name}</h3>
            <p className="text-slate-400 text-sm mb-1">{config.business.tagline}</p>
            <p className="text-slate-500 text-xs mb-5">{config.business.license}</p>
            {config.business.emergencyService && (
              <div className="inline-flex items-center gap-2 bg-red-600/15 border border-red-500/20 text-red-500 text-xs font-semibold px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" /> 24/7 Emergency Service
              </div>
            )}
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3">
              <li><a href={`tel:${config.business.phoneRaw}`} className="flex items-center gap-2.5 hover:text-white transition-colors text-sm"><Phone className="w-4 h-4 text-red-600 flex-shrink-0" />{config.business.phone}</a></li>
              {config.business.email && <li><a href={`mailto:${config.business.email}`} className="flex items-center gap-2.5 hover:text-white transition-colors text-sm break-all"><Mail className="w-4 h-4 text-red-600 flex-shrink-0" />{config.business.email}</a></li>}
              <li className="flex items-start gap-2.5 text-sm"><MapPin className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" /><address className="not-italic text-slate-400">{config.business.address}<br />{config.business.city}, {config.business.state} {config.business.zip}</address></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Services</h4>
            <ul className="space-y-2">
              {config.services.map((s, i) => <li key={i}><a href="#quote" className="text-sm hover:text-white transition-colors">{s.title}</a></li>)}
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-xs">© {year} {config.business.name}. All rights reserved.</p>
          <a href={config.footer.creditUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-400 text-xs transition-colors">
            {config.footer.credit} <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </footer>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  useEffect(() => {
    document.title = config.meta.title
    const existing = document.querySelector('meta[name="description"]')
    if (existing) existing.setAttribute('content', config.meta.description)
    else {
      const m = document.createElement('meta')
      m.name = 'description'
      m.content = config.meta.description
      document.head.appendChild(m)
    }
  }, [])

  return (
    <div className="font-sans antialiased">
      <ReviewBanner />
      <NavBar />
      <HeroSection />
      <TrustBadges />
      <ServicesGrid />
      <FinancingBadge />
      <ReviewsSection />
      <QuoteForm />
      <ServiceAreaPills />
      <Footer />
    </div>
  )
}
