import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, ClipboardCheck, Briefcase, Linkedin, Mail } from 'lucide-react'
import PageBanner from '@/components/layout/PageBanner'
import SectionHeading from '@/components/ui/SectionHeading'
import FilterTabs from '@/components/ui/FilterTabs'
import CtaBanner from '@/components/ui/CtaBanner'
import { experts, expertDepartments, slugify } from '@/data/pages'
import { scaleIn, stagger } from '@/lib/motion'

const BANNER =
  'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1920&q=80'

// Placeholder portraits  used until real headshots are added to /public/team/experts
const fallbacks = [
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&crop=faces&w=600&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&crop=faces&w=600&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&crop=faces&w=600&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&crop=faces&w=600&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&crop=faces&w=600&q=80',
  'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&crop=faces&w=600&q=80',
]

export default function ExpertsPage() {
  useEffect(() => window.scrollTo(0, 0), [])
  const [dept, setDept] = useState('All')
  const list = dept === 'All' ? experts : experts.filter((e) => e.dept === dept)

  return (
    <main>
      <PageBanner title="Team of Experts" crumb="Experts" image={BANNER} />

      <section className="section-pad">
        <div className="container-x">
          <SectionHeading
            eyebrow="Meet the specialists"
            title="Deep expertise across"
            highlight="every domain"
            subtitle="A panel of accredited EIA coordinators and functional-area experts spanning ecology, geology, chemical engineering, mining, risk and socio-economics."
            className="mx-auto text-center"
          />

          <div className="mt-10">
            <FilterTabs items={expertDepartments} active={dept} onChange={setDept} />
          </div>

          <motion.div
            key={dept}
            variants={stagger(0.06)}
            initial="hidden"
            animate="show"
            className="mt-12 grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {list.map((e, i) => {
              const director = e.dept === 'Technical Directors'
              return (
                <motion.article
                  key={e.name}
                  variants={scaleIn}
                  className="group flex flex-col overflow-hidden rounded-[1.5rem] border border-line bg-surface shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-green hover:shadow-card"
                >
                  {/* Photo */}
                  <div className="relative overflow-hidden">
                    <img
                      src={`/team/experts/${slugify(e.name)}.jpg`}
                      alt={e.name}
                      loading="lazy"
                      onError={(ev) => { ev.currentTarget.src = fallbacks[i % fallbacks.length] }}
                      className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/85 via-brand-navy/10 to-transparent" />

                    <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide shadow-soft ${director ? 'bg-brand-green text-white' : 'bg-white/90 text-brand-navy'}`}>
                      {e.role}
                    </span>

                    {/* Social icons  bottom-right, vertical */}
                    <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                      <a href="#" aria-label="LinkedIn" className="grid h-9 w-9 translate-y-2 place-items-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur-md transition-all duration-500 hover:bg-brand-green group-hover:translate-y-0 group-hover:opacity-100"><Linkedin className="h-4 w-4" /></a>
                      <a href="#" aria-label="Email" className="grid h-9 w-9 translate-y-2 place-items-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur-md transition-all delay-75 duration-500 hover:bg-brand-green group-hover:translate-y-0 group-hover:opacity-100"><Mail className="h-4 w-4" /></a>
                    </div>

                    <div className="absolute inset-x-5 bottom-4 pr-14">
                      <h3 className="font-display text-base font-bold leading-tight text-white drop-shadow">{e.name}</h3>
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-sky">
                        <Briefcase className="h-3.5 w-3.5" /> {e.exp} experience
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col p-5">
                    {/* Qualifications */}
                    <div className="flex items-start gap-2.5 rounded-xl bg-surface-2 p-3.5">
                      <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                      <p className="text-xs font-medium leading-relaxed text-ink">{e.qual}</p>
                    </div>

                    {/* EIA coordinator */}
                    {e.eia && (
                      <div className="mt-3 flex items-start gap-2.5">
                        <ClipboardCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                        <p className="text-xs leading-relaxed text-ink-soft">
                          <span className="font-semibold text-ink">EIA Co-ordinator  </span>{e.eia}
                        </p>
                      </div>
                    )}

                    {/* Functional area */}
                    {e.fa && (
                      <div className="mt-3">
                        <span className="inline-flex items-center rounded-full border border-brand-green/30 bg-brand-green/8 px-3 py-1 text-xs font-semibold text-brand-green">
                          Functional Area Expert · {e.fa}
                        </span>
                      </div>
                    )}

                    {/* Description */}
                    <p className="mt-4 border-t border-line pt-4 text-sm leading-relaxed text-ink-soft">{e.desc}</p>
                  </div>
                </motion.article>
              )
            })}
          </motion.div>

          {!list.length && <p className="mt-12 text-center text-ink-soft">No experts in this group yet.</p>}
        </div>
      </section>

      <CtaBanner title="Need a specialist for your project?" text="Our accredited experts are ready to guide your clearance and compliance journey." cta="Talk to Us" />
    </main>
  )
}
