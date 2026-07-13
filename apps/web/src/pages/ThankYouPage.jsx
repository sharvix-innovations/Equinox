import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  CheckCircle2, Home, Wrench, MessageCircle, Mail, Phone,
  Inbox, ClipboardCheck, Clock, X, Leaf, Sparkles,
} from 'lucide-react'
import Button from '@/components/ui/Button'
import { company } from '@/data/site'

const REDIRECT = 8

// Faint full-bleed backdrop image so the page never reads as empty white.
const BG_IMG =
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80'

const steps = [
  { icon: Inbox, title: 'Enquiry received', desc: "It's safely logged with our team." },
  { icon: ClipboardCheck, title: 'We review it', desc: 'We map your needs to the right experts.' },
  { icon: Clock, title: 'Reply within 24h', desc: 'A specialist reaches out with next steps.' },
]

export default function ThankYouPage() {
  const navigate = useNavigate()
  const [count, setCount] = useState(REDIRECT)
  const [redirecting, setRedirecting] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (!redirecting) return
    const tick = setInterval(() => setCount((c) => (c > 0 ? c - 1 : 0)), 1000)
    const to = setTimeout(() => navigate('/'), REDIRECT * 1000)
    return () => { clearInterval(tick); clearTimeout(to) }
  }, [navigate, redirecting])

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-gradient-to-br from-[#eaf6ec] via-surface to-[#d8efdd] px-5 py-28">
      {/* Rich full-bleed backdrop */}
      <img src={BG_IMG} alt="" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.07]" />
      <div className="pointer-events-none absolute inset-0 bg-grid-fade" />
      <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-brand-green/20 blur-[130px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-brand-sky/25 blur-[130px]" />
      {/* Floating leaves */}
      <Leaf className="pointer-events-none absolute left-[8%] top-[18%] hidden h-10 w-10 -rotate-12 text-brand-green/15 lg:block animate-float" />
      <Leaf className="pointer-events-none absolute right-[10%] top-[26%] hidden h-8 w-8 rotate-12 text-brand-green/15 lg:block animate-float-slow" />
      <Leaf className="pointer-events-none absolute bottom-[16%] left-[14%] hidden h-9 w-9 rotate-45 text-brand-green/10 lg:block animate-float-slow" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-4xl text-center"
      >
        {/* Success badge */}
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.15 }}
          className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-brand-green text-white shadow-glow-green animate-pulse-ring"
        >
          <CheckCircle2 className="h-12 w-12" />
        </motion.span>

        {/* Eyebrow */}
        <span className="mt-8 inline-flex items-center gap-2 rounded-full border border-brand-green/25 bg-brand-green/8 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
          <Sparkles className="h-3.5 w-3.5" /> Message Sent
        </span>

        <h1 className="mt-5 font-display text-5xl font-extrabold leading-[0.95] text-ink sm:text-6xl lg:text-7xl">
          Thank <span className="text-gradient">You!</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-ink-soft">
          Your enquiry has been received.{' '}
          <span className="font-semibold text-brand-green">We'll respond within 24 hours.</span>
        </p>

        {/* What happens next  3 cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="group relative overflow-hidden rounded-[1.5rem] border border-line bg-surface/80 p-6 text-left shadow-soft backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand-green hover:shadow-card"
            >
              <span className="pointer-events-none absolute -right-3 -top-4 font-display text-6xl font-extrabold text-brand-green/5">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-green/10 text-brand-green transition-colors duration-500 group-hover:bg-brand-green group-hover:text-white">
                <s.icon className="h-6 w-6" />
              </span>
              <h3 className="relative mt-4 font-display text-base font-bold text-ink">{s.title}</h3>
              <p className="relative mt-1.5 text-sm leading-relaxed text-ink-soft">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button as={Link} to="/" icon={Home}>Back to Home</Button>
          <Button as={Link} to="/services" variant="ghost" icon={Wrench}>Explore Services</Button>
          <a
            href={`https://wa.me/${company.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2.5 rounded-full bg-[#25D366] py-2 pl-6 pr-2 font-display font-semibold text-white shadow-soft transition-transform hover:scale-105"
          >
            WhatsApp
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white/25">
              <MessageCircle className="h-4 w-4" />
            </span>
          </a>
        </div>

        {/* Contact shortcuts */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-soft">
          <a href={`mailto:${company.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-brand-green">
            <Mail className="h-4 w-4 text-brand-green" /> {company.email}
          </a>
          <span className="hidden h-4 w-px bg-line sm:block" />
          <a href={`tel:${company.phone}`} className="inline-flex items-center gap-2 transition-colors hover:text-brand-green">
            <Phone className="h-4 w-4 text-brand-green" /> {company.phone}
          </a>
        </div>

        {/* Redirect indicator */}
        {redirecting ? (
          <div className="mt-10">
            <div className="mx-auto h-1 w-56 overflow-hidden rounded-full bg-line">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: REDIRECT, ease: 'linear' }}
                className="h-full rounded-full bg-brand-green"
              />
            </div>
            <p className="mt-3 text-sm text-ink-soft">
              Redirecting home in{' '}
              <span className="font-bold text-brand-green">{count}</span> second{count === 1 ? '' : 's'}
              <button
                onClick={() => setRedirecting(false)}
                className="ml-3 inline-flex items-center gap-1 rounded-full border border-line bg-surface px-3 py-1 text-xs font-semibold text-ink-soft transition-colors hover:border-brand-green hover:text-brand-green"
              >
                <X className="h-3 w-3" /> Stay here
              </button>
            </p>
          </div>
        ) : (
          <p className="mt-10 inline-flex items-center gap-2 text-sm text-ink-soft">
            <CheckCircle2 className="h-4 w-4 text-brand-green" /> Auto-redirect cancelled  take your time.
          </p>
        )}
      </motion.div>
    </main>
  )
}
