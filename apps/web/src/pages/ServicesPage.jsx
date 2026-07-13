import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight, ArrowUpRight, Search, ClipboardList, FileCheck2, BadgeCheck } from 'lucide-react'
import PageBanner from '@/components/layout/PageBanner'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'
import CtaBanner from '@/components/ui/CtaBanner'
import { serviceGroups } from '@/data/site'
import { slugify } from '@/data/pages'
import { fadeUp, fromLeft, fromRight, stagger, viewport } from '@/lib/motion'

const steps = [
  { icon: Search, title: 'Consultation & Scoping', desc: 'We map your project, site and regulatory triggers.' },
  { icon: ClipboardList, title: 'Assessment & Data', desc: 'On-ground survey and NABL-accredited lab analysis.' },
  { icon: FileCheck2, title: 'Documentation & Filing', desc: 'Defensible reports drafted and filed to standard.' },
  { icon: BadgeCheck, title: 'Approval & Monitoring', desc: 'Liaison, clearance and ongoing compliance.' },
]

export default function ServicesPage() {
  useEffect(() => window.scrollTo(0, 0), [])

  return (
    <main>
      <PageBanner title="Our Services" crumb="Services" />

      {/* Intro */}
      <section className="section-pad pb-4">
        <div className="container-x">
          <SectionHeading
            eyebrow="What We Do"
            title="Full-spectrum environmental"
            highlight="services & compliance"
            subtitle="Five connected capabilities that cover the entire environmental lifecycle  explore what each one includes."
            className="mx-auto text-center"
          />
        </div>
      </section>

      {/* Alternating category blocks */}
      {serviceGroups.map((cat, i) => {
        const Icon = cat.icon
        const reverse = i % 2 === 1
        return (
          <section key={cat.title} className={`section-pad ${reverse ? 'bg-surface-2' : ''}`}>
            <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Image */}
              <motion.div
                variants={reverse ? fromRight : fromLeft}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                className={`relative ${reverse ? 'lg:order-2' : ''}`}
              >
                <div className="pointer-events-none absolute -bottom-5 -right-5 h-28 w-28 rounded-[1.5rem] bg-brand-green/10" />
                <div className="relative overflow-hidden rounded-[2rem] rounded-tl-[4rem] shadow-card">
                  <img src={cat.img} alt={cat.title} loading="lazy" className="h-[24rem] w-full object-cover lg:h-[30rem]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/75 via-brand-navy/10 to-transparent" />
                  <span className="absolute left-6 top-6 grid h-14 w-14 place-items-center rounded-2xl bg-brand-green text-white shadow-glow">
                    <Icon className="h-7 w-7" />
                  </span>
                  <span className="absolute bottom-6 right-6 font-display text-6xl font-extrabold text-white/20">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                variants={reverse ? fromLeft : fromRight}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                className={reverse ? 'lg:order-1' : ''}
              >
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
                  <span className="h-px w-8 bg-brand-green/40" /> Capability {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="mt-4 font-display text-3xl font-extrabold text-ink sm:text-4xl">{cat.title}</h2>
                <p className="mt-4 text-base leading-relaxed text-ink-soft">{cat.desc}</p>

                <motion.ul variants={stagger(0.05)} className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {cat.items.map((it) => (
                    <motion.li key={it} variants={fadeUp} className="flex gap-2.5 text-sm leading-relaxed text-ink">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                      <span>{it}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button as={Link} to={`/services/${slugify(cat.title)}`} icon={ArrowRight}>View Details</Button>
                  <Button as="a" href="/contact" variant="ghost" icon={ArrowUpRight}>Enquire</Button>
                </div>
              </motion.div>
            </div>
          </section>
        )
      })}

      {/* Methodology */}
      <section className="section-pad bg-surface-2">
        <div className="container-x">
          <SectionHeading eyebrow="How We Work" title="Our proven" highlight="methodology" subtitle="A clear path from first consultation to lifelong compliance." />
          <motion.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={viewport} className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <motion.div key={s.title} variants={fadeUp} className="relative rounded-[1.5rem] border border-line bg-surface p-7 shadow-soft">
                <span className="absolute right-5 top-5 font-display text-4xl font-extrabold text-brand-green/15">{String(i + 1).padStart(2, '0')}</span>
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-green/10 text-brand-green"><s.icon className="h-7 w-7" /></span>
                <h3 className="mt-5 font-display text-lg font-bold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="pt-20"><CtaBanner title="Not sure which service you need?" text="Talk to our experts for a clear, no-obligation compliance roadmap." cta="Schedule a Call" /></div>
    </main>
  )
}
