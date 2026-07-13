import { useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Users, ArrowLeft, Send } from 'lucide-react'
import PageBanner from '@/components/layout/PageBanner'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'
import { events } from '@/data/pages'
import { fadeUp, viewport } from '@/lib/motion'

export default function EventDetailsPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  useEffect(() => window.scrollTo(0, 0), [slug])

  const event = events.find((e) => e.slug === slug)

  if (!event) {
    return (
      <main>
        <PageBanner title="Event Not Found" crumb="Events" />
        <div className="section-pad container-x text-center">
          <Button as={Link} to="/events" icon={ArrowLeft}>Back to Events</Button>
        </div>
      </main>
    )
  }

  const meta = [
    { icon: Calendar, label: 'Date', value: event.date },
    { icon: Clock, label: 'Time', value: event.time },
    { icon: MapPin, label: 'Location', value: event.location },
    { icon: Users, label: 'Registered', value: `${event.joined} people` },
  ]

  return (
    <main>
      <PageBanner eyebrow={event.upcoming ? 'Upcoming Event' : 'Past Event'} title={event.title} crumb="Events" />

      <section className="section-pad">
        <div className="container-x grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          {/* Details */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
            <div className="overflow-hidden rounded-[2rem] shadow-card">
              <img src={event.img} alt={event.title} className="aspect-[16/9] w-full object-cover" />
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {meta.map((m) => (
                <div key={m.label} className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-green/10 text-brand-green"><m.icon className="h-5 w-5" /></span>
                  <div>
                    <div className="text-xs text-ink-soft">{m.label}</div>
                    <div className="font-display text-sm font-bold text-ink">{m.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <SectionHeading align="left" className="mt-10" eyebrow="About the event" title="What to" highlight="expect" />
            <p className="mt-5 text-base leading-relaxed text-ink-soft">{event.desc}</p>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              Sessions include expert-led talks, live Q&amp;A, and networking with practitioners from across
              India's environmental and industrial community. Certificates of participation provided.
            </p>
          </motion.div>

          {/* Register form */}
          <motion.aside variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport} className="h-fit lg:sticky lg:top-28">
            <div className="rounded-[2rem] border border-line bg-surface-2 p-7 shadow-soft">
              <h3 className="font-display text-xl font-bold text-ink">{event.upcoming ? 'Register for this event' : 'Missed it? Stay in the loop'}</h3>
              <p className="mt-2 text-sm text-ink-soft">{event.upcoming ? 'Reserve your seat  we\'ll email you the details.' : 'Register your interest for future events like this.'}</p>
              <form onSubmit={(e) => { e.preventDefault(); navigate('/thank-you') }} className="mt-5 space-y-3">
                <input required placeholder="Full name" className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm outline-none focus:border-brand-green" />
                <input required type="email" placeholder="Email address" className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm outline-none focus:border-brand-green" />
                <input required placeholder="Phone" className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm outline-none focus:border-brand-green" />
                <input placeholder="Organisation" className="w-full rounded-xl border border-line bg-surface px-4 py-3 text-sm outline-none focus:border-brand-green" />
                <button className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-green px-6 py-3.5 font-display font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]">
                  {event.upcoming ? 'Register Now' : 'Notify Me'} <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.aside>
        </div>
      </section>
    </main>
  )
}
