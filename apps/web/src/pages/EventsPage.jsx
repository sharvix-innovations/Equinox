import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Users, ArrowUpRight } from 'lucide-react'
import PageBanner from '@/components/layout/PageBanner'
import SectionHeading from '@/components/ui/SectionHeading'
import { events } from '@/data/pages'
import { fadeUp, stagger, viewport } from '@/lib/motion'

function EventCard({ e }) {
  return (
    <motion.article variants={fadeUp} className="group grid overflow-hidden rounded-[1.5rem] border border-line bg-surface shadow-soft transition-all duration-500 hover:shadow-card sm:grid-cols-[minmax(0,14rem)_1fr]">
      <div className="relative h-48 overflow-hidden sm:h-full">
        <img src={e.img} alt={e.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <span className="absolute left-4 top-4 grid place-items-center rounded-2xl bg-brand-green px-4 py-2 text-center font-display text-white shadow-glow">
          <span className="text-lg font-extrabold leading-none">{e.date.split(' ')[0]}</span>
          <span className="text-[10px] uppercase tracking-wider">{e.date.split(' ')[1]}</span>
        </span>
      </div>
      <div className="flex flex-col p-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-soft">
          <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-brand-green" /> {e.time}</span>
          <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-brand-green" /> {e.location}</span>
        </div>
        <h3 className="mt-2 font-display text-lg font-bold text-ink transition-colors group-hover:text-brand-green">
          <Link to={`/events/${e.slug}`}>{e.title}</Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{e.desc}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-ink-soft"><Users className="h-4 w-4 text-brand-green" /> {e.joined} joined</span>
          <Link to={`/events/${e.slug}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green">
            {e.upcoming ? 'Join Event' : 'View Recap'} <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}

export default function EventsPage() {
  useEffect(() => window.scrollTo(0, 0), [])
  const upcoming = events.filter((e) => e.upcoming)
  const past = events.filter((e) => !e.upcoming)

  return (
    <main>
      <PageBanner eyebrow="What's on" title="Events" crumb="Events" />

      <section className="section-pad">
        <div className="container-x">
          <SectionHeading eyebrow="Upcoming Events" title="Join us in building a" highlight="cleaner future" subtitle="Workshops, summits and community drives  register to reserve your place." />
          <motion.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={viewport} className="mt-14 grid gap-6 lg:grid-cols-2">
            {upcoming.map((e) => <EventCard key={e.slug} e={e} />)}
          </motion.div>
        </div>
      </section>

      <section className="section-pad bg-surface-2 pt-0">
        <div className="container-x">
          <SectionHeading eyebrow="Archive" title="Past" highlight="events" subtitle="A look back at the events we've hosted and supported." />
          <motion.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={viewport} className="mt-14 grid gap-6 lg:grid-cols-2">
            {past.map((e) => <EventCard key={e.slug} e={e} />)}
          </motion.div>
        </div>
      </section>
    </main>
  )
}
