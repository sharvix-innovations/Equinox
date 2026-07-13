import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowUpRight, ArrowLeft, Phone } from 'lucide-react'
import PageBanner from '@/components/layout/PageBanner'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'
import { serviceGroups, company } from '@/data/site'
import { slugify } from '@/data/pages'
import { fadeUp, fromLeft, fromRight, stagger, viewport } from '@/lib/motion'

export default function ServiceDetailsPage() {
  const { slug } = useParams()
  useEffect(() => window.scrollTo(0, 0), [slug])

  const idx = serviceGroups.findIndex((g) => slugify(g.title) === slug)
  const cat = serviceGroups[idx]

  if (!cat) {
    return (
      <main>
        <PageBanner title="Service Not Found" crumb="Services" />
        <div className="section-pad container-x text-center">
          <p className="text-ink-soft">We couldn't find that service.</p>
          <Button as={Link} to="/services" icon={ArrowLeft} className="mt-6">Back to Services</Button>
        </div>
      </main>
    )
  }

  const Icon = cat.icon
  const related = serviceGroups.filter((_, i) => i !== idx)

  return (
    <main>
      <PageBanner title={cat.title} crumb="Services" image={cat.img} />

      {/* Overview */}
      <section className="section-pad">
        <div className="container-x grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div variants={fromLeft} initial="hidden" whileInView="show" viewport={viewport} className="relative lg:sticky lg:top-28">
            <div className="pointer-events-none absolute -bottom-5 -right-5 h-28 w-28 rounded-[1.5rem] bg-brand-green/10" />
            <div className="relative overflow-hidden rounded-[2rem] rounded-tl-[4rem] shadow-card">
              <img src={cat.img} alt={cat.title} className="aspect-[4/3] w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 to-transparent" />
              <span className="absolute left-6 top-6 grid h-14 w-14 place-items-center rounded-2xl bg-brand-green text-white shadow-glow"><Icon className="h-7 w-7" /></span>
              <span className="absolute bottom-6 right-6 font-display text-6xl font-extrabold text-white/20">{String(idx + 1).padStart(2, '0')}</span>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button as={Link} to="/contact" icon={ArrowUpRight}>Enquire Now</Button>
              <a href={`tel:${company.phone}`} className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-brand-green hover:text-brand-green"><Phone className="h-4 w-4 text-brand-green" /> Call Us</a>
            </div>
          </motion.div>

          <motion.div variants={fromRight} initial="hidden" whileInView="show" viewport={viewport}>
            <SectionHeading align="left" eyebrow={`Capability ${String(idx + 1).padStart(2, '0')}`} title="What's" highlight="included" />
            <p className="mt-4 text-base leading-relaxed text-ink-soft">{cat.desc}</p>

            <motion.ul variants={stagger(0.05)} className="mt-8 space-y-3">
              {cat.items.map((it) => (
                <motion.li key={it} variants={fadeUp} className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-brand-green">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-green/12 text-brand-green"><CheckCircle2 className="h-4 w-4" /></span>
                  <span className="text-sm font-medium text-ink">{it}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </section>

      {/* Related capabilities */}
      <section className="section-pad bg-surface-2">
        <div className="container-x">
          <SectionHeading eyebrow="Explore more" title="Our other" highlight="capabilities" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((g) => {
              const RI = g.icon
              return (
                <Link key={g.title} to={`/services/${slugify(g.title)}`} className="group flex h-full flex-col rounded-[1.5rem] border border-line bg-surface p-6 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-green hover:shadow-card">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-green/10 text-brand-green transition-all duration-500 group-hover:rotate-6 group-hover:bg-brand-green group-hover:text-white"><RI className="h-7 w-7" /></span>
                  <h3 className="mt-5 flex-1 font-display text-base font-bold leading-tight text-ink">{g.title}</h3>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green">
                    View Details <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
