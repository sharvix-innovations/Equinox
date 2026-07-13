import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, ArrowUpRight, Briefcase, CheckCircle2, Leaf, Play, Quote, Calendar,
  ShieldCheck,
} from 'lucide-react'
import PageBanner from '@/components/layout/PageBanner'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'
import StatCounter from '@/components/ui/StatCounter'
import { company, whyChoose } from '@/data/site'
import { experts } from '@/data/pages'
import { fadeUp, fromLeft, fromRight, scaleIn, stagger, viewport } from '@/lib/motion'

// Initials from an expert name, ignoring titles like Dr./Prof./(Dr.)
const initialsOf = (name) =>
  name
    .split(/\s+/)
    .filter((w) => !/^(dr|mr|mrs|ms|prof|er|jr|sr)\.?$|^\(dr\.\)$/i.test(w))
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

const IMG = {
  forest: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=80',
  turbines: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=700&q=80',
  lake: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=700&q=80',
  water: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=80',
  landscape: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=900&q=80',
  experts: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80',
}


// ── Our Story  narrative left + bento image grid right ───────────────────
function OurStory() {
  return (
    <section className="section-pad relative overflow-hidden">
      <div className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-brand-green/10 blur-[120px]" />

      <div className="container-x grid items-center gap-16 lg:grid-cols-2">
        {/* LEFT  narrative */}
        <motion.div variants={fromLeft} initial="hidden" whileInView="show" viewport={viewport}>
          <SectionHeading
            align="left"
            eyebrow="Our Story"
            title="Two decades shaping a"
            highlight="cleaner, greener India"
          />
          <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-soft">
            <p>
              Founded in {company.since}, {company.shortName} began with a simple conviction 
              that environmental responsibility and industrial progress can, and must, advance
              together. What started as a small consultancy is today one of India's most trusted
              environmental partners.
            </p>
            <p>
              Across 18 states and 500+ projects, our multidisciplinary team has turned complex
              compliance into a clear, science-led path to sustainable growth.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border-l-4 border-brand-green bg-surface-2 p-6">
            <Quote className="h-7 w-7 text-brand-green/40" />
            <p className="mt-2 font-display text-lg font-semibold italic text-ink">
              “We don't just help projects pass compliance  we help them become genuinely better
              for the planet.”
            </p>
            <p className="mt-3 text-sm font-semibold text-brand-green"> Dr. Arvind Menon, Founder</p>
          </div>

          <Button as="a" href="/contact" icon={ArrowRight} className="mt-8">
            Work With Us
          </Button>
        </motion.div>

        {/* RIGHT  bento image grid */}
        <motion.div variants={fromRight} initial="hidden" whileInView="show" viewport={viewport} className="relative">
          <div className="pointer-events-none absolute -bottom-6 -left-6 h-24 w-24 rounded-full border-[6px] border-brand-green/15" />
          <div className="pointer-events-none absolute -right-4 -top-4 h-20 w-20 rotate-12 rounded-2xl bg-brand-green/10" />

          <div className="relative grid grid-cols-2 gap-4">
            {/* Tall image */}
            <div className="group relative row-span-2 overflow-hidden rounded-[1.5rem] rounded-tl-[3rem] shadow-card">
              <img src={IMG.water} alt="Lake ecosystem" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/55 to-transparent" />
              <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-navy shadow-soft">
                Since {company.since}
              </span>
            </div>

            {/* Top-right image */}
            <div className="group h-44 overflow-hidden rounded-[1.5rem] shadow-card">
              <img src={IMG.landscape} alt="Green landscape" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>

            {/* Green stat tile */}
            <div className="relative flex h-44 flex-col justify-center overflow-hidden rounded-[1.5rem] bg-brand-green p-5 text-white shadow-glow-green">
              <span className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/10" />
              <span className="relative grid h-10 w-10 place-items-center rounded-full bg-white/20">
                <Leaf className="h-5 w-5" />
              </span>
              <div className="relative mt-3 font-display text-3xl font-extrabold leading-none">25+</div>
              <div className="relative mt-1 text-xs leading-snug text-white/85">Years of Excellence</div>
            </div>

            {/* Wide bottom image */}
            <div className="group relative col-span-2 h-44 overflow-hidden rounded-[1.5rem] rounded-br-[3rem] shadow-card">
              <img src={IMG.experts} alt="Environmental experts" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-3 text-white">
                <span className="font-display text-2xl font-extrabold">500+</span>
                <span className="text-xs text-white/85">Projects delivered<br />across 18 states</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ── Who We Are  central image + flanking images (Econest style) ──────────
function WhoWeAre() {
  return (
    <section id="about" className="section-pad relative overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-brand-green/10 blur-[120px]" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Who We Are"
          title="Engineering a cleaner future"
          highlight="for generations"
          subtitle={`Since ${company.since}, ${company.shortName} has helped India's most ambitious industries turn complex environmental regulation into a clear, science-led path to sustainable growth.`}
        />

        {/* Image composition */}
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-14 grid items-center gap-5 lg:grid-cols-[1fr_1.6fr_1fr]"
        >
          <motion.div variants={fromLeft} className="hidden overflow-hidden rounded-[1.5rem] shadow-card lg:block">
            <img src={IMG.turbines} alt="Renewable energy" loading="lazy" className="h-64 w-full object-cover" />
          </motion.div>

          {/* Center with play */}
          <motion.div variants={scaleIn} className="group relative overflow-hidden rounded-[2rem] shadow-card">
            <img src={IMG.forest} alt="Forest ecosystem" loading="lazy" className="h-80 w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-brand-navy/25" />
            <button aria-label="Play our story" className="absolute inset-0 grid place-items-center">
              <span className="grid h-20 w-20 place-items-center rounded-full bg-white/90 text-brand-green shadow-glow transition-transform group-hover:scale-110 animate-pulse-ring">
                <Play className="h-7 w-7 translate-x-0.5 fill-current" />
              </span>
            </button>
            {/* Experience badge */}
            <div className="absolute bottom-5 left-5 flex items-center gap-3 rounded-2xl bg-brand-green px-5 py-3 text-white shadow-glow-green">
              <span className="font-display text-3xl font-extrabold leading-none">25+</span>
              <span className="text-xs leading-tight text-white/85">Years of<br />Excellence</span>
            </div>
          </motion.div>

          <motion.div variants={fromRight} className="hidden overflow-hidden rounded-[1.5rem] shadow-card lg:block">
            <img src={IMG.lake} alt="Lake restoration" loading="lazy" className="h-64 w-full object-cover" />
          </motion.div>
        </motion.div>

        {/* Checklist + CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-12 flex flex-col items-center justify-between gap-6 rounded-3xl border border-line bg-surface-2 p-8 lg:flex-row"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {['QCI-NABET & NABL accredited', 'Pan-India, 18 states served', 'In-house NABL laboratory', 'End-to-end regulatory handling'].map((t) => (
              <span key={t} className="flex items-center gap-2.5 text-sm font-semibold text-ink">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-green/12 text-brand-green">
                  <CheckCircle2 className="h-4 w-4" />
                </span>
                {t}
              </span>
            ))}
          </div>
          <Button as="a" href="/contact" icon={ArrowRight} className="shrink-0">
            Explore More
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

// ── Stats band (dark) ─────────────────────────────────────────────────────
const bandStats = [
  { value: 25, suffix: '+', label: 'Years of Experience' },
  { value: 500, suffix: '+', label: 'Projects Delivered' },
  { value: 100, suffix: '+', label: 'Industrial Clients' },
  { value: 60, suffix: '+', label: 'Experts On Team' },
]

function StatsBand() {
  return (
    <section className="relative overflow-hidden bg-brand-navy py-16">
      <div className="pointer-events-none absolute inset-0 bg-navy-radial opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-dotgrid opacity-[0.05]" />
      <div className="container-x relative grid grid-cols-2 gap-x-6 gap-y-10 text-center lg:grid-cols-4">
        {bandStats.map((s) => (
          <div key={s.label}>
            <div className="font-display text-4xl font-extrabold text-white sm:text-5xl">
              <StatCounter value={s.value} suffix={s.suffix} />
            </div>
            <div className="mx-auto mt-2 h-0.5 w-8 rounded-full bg-brand-green" />
            <div className="mt-3 text-sm font-medium text-white/70">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── Our History  year-tab timeline (Econest style) ───────────────────────
const milestones = [
  { year: '1997', img: IMG.landscape, title: 'Where it all began', desc: 'Equinox Environments was founded in Pune with a simple conviction  that environmental responsibility and industrial progress must advance together.' },
  { year: '2005', img: IMG.experts, title: 'First landmark clearances', desc: 'Secured major Environmental Clearances for industrial clients across Maharashtra, establishing our reputation for rigour and reliability.' },
  { year: '2015', img: IMG.water, title: 'Pan-India expansion', desc: 'Grew to 12 offices across 18 states and commissioned our in-house NABL-accredited laboratory for defensible baseline data.' },
  { year: '2024', img: IMG.lake, title: 'A greener legacy', desc: '500+ projects delivered, 50+ lakes revived, and a multidisciplinary team of 60+ environmental experts serving all of India.' },
]

function HistoryTimeline() {
  const [active, setActive] = useState(0)
  const m = milestones[active]
  return (
    <section className="section-pad bg-surface-2">
      <div className="container-x">
        <SectionHeading
          eyebrow="Our History"
          title="The journey that"
          highlight="started it all"
          subtitle="Two and a half decades of turning environmental compliance into competitive advantage."
        />

        {/* Year timeline */}
        <div className="relative mx-auto mt-14 max-w-3xl">
          <div className="absolute inset-x-8 top-6 hidden h-0.5 bg-line sm:block" />
          <div className="relative flex justify-between">
            {milestones.map((x, i) => (
              <button
                key={x.year}
                onClick={() => setActive(i)}
                className="flex flex-col items-center gap-3"
              >
                <span
                  className={`grid h-12 w-12 place-items-center rounded-full border-2 transition-all duration-300 ${
                    active === i
                      ? 'border-brand-green bg-brand-green text-white shadow-glow-green'
                      : 'border-line bg-surface text-ink-soft hover:border-brand-green'
                  }`}
                >
                  <Calendar className="h-5 w-5" />
                </span>
                <span
                  className={`font-display text-lg font-bold transition-colors ${
                    active === i ? 'text-brand-green' : 'text-ink-soft'
                  }`}
                >
                  {x.year}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Milestone content */}
        <div className="mt-12 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <div className="pointer-events-none absolute -bottom-5 -right-5 h-24 w-24 rounded-[1.5rem] bg-brand-green/10" />
            <div className="relative overflow-hidden rounded-[2rem] rounded-tl-[4rem] shadow-card">
              <AnimatePresence mode="wait">
                <motion.img
                  key={m.img}
                  src={m.img}
                  alt={m.title}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="h-80 w-full object-cover"
                />
              </AnimatePresence>
              <span className="absolute left-5 top-5 rounded-full bg-brand-green px-4 py-1.5 font-display text-sm font-bold text-white shadow-soft">
                {m.year}
              </span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-green/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-green">
                <Leaf className="h-3.5 w-3.5" /> Milestone {String(active + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-5 font-display text-2xl font-bold text-ink sm:text-3xl">{m.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-ink-soft">{m.desc}</p>
              <a
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold text-brand-green"
              >
                See our achievements
                <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-green/10">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

// ── Why Choose  sticky intro + image (left) + six reason cards (right) ────
function WhyChoose() {
  return (
    <section className="section-pad relative overflow-hidden">
      <div className="pointer-events-none absolute -right-24 top-24 h-80 w-80 rounded-full bg-brand-green/10 blur-[120px]" />

      <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* LEFT  sticky intro + image */}
        <motion.div
          variants={fromLeft}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="lg:sticky lg:top-28 h-fit"
        >
          <SectionHeading
            align="left"
            eyebrow="Why Choose Equinox"
            title="The partner industries"
            highlight="rely on"
            subtitle="Six reasons India's most demanding projects trust Equinox to carry their environmental responsibility  from first filing to lifelong compliance."
          />

          <div className="group relative mt-8 overflow-hidden rounded-[2rem] shadow-card">
            <img src={IMG.experts} alt="Equinox environmental experts at work" loading="lazy" className="aspect-[5/4] h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-brand-navy/20 to-transparent" />

            {/* Enhanced stat badge - bottom left */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-col items-start gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-green px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-glow-green">
                <ShieldCheck className="h-4 w-4" />
                Proven Track Record
              </span>
              <div className="rounded-2xl bg-brand-green/95 px-5 py-4 backdrop-blur-sm">
                <div className="font-display text-4xl font-extrabold leading-none text-white">
                  98%
                </div>
                <div className="mt-1.5 text-sm font-semibold text-white/90">
                  Clearances delivered on time
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT  reason cards */}
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid gap-5 sm:grid-cols-2"
        >
          {whyChoose.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl border border-line bg-surface-2 p-7 shadow-soft transition-all hover:border-brand-green/30 hover:shadow-glow"
            >
              <span className="absolute -right-3 -top-4 font-display text-7xl font-extrabold text-line/60 transition-colors group-hover:text-brand-green/10">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="relative grid h-14 w-14 place-items-center rounded-full bg-brand-green/10 text-brand-green transition-all duration-500 group-hover:rotate-6 group-hover:bg-brand-green group-hover:text-white">
                <Icon className="h-7 w-7" />
              </span>
              <h3 className="relative mt-5 font-display text-lg font-bold text-ink">{title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-ink-soft">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ── Team of Experts ───────────────────────────────────────────────────────
function TeamSection() {
  const preview = experts.slice(0, 8)
  return (
    <section className="section-pad bg-surface-2">
      <div className="container-x">
        <SectionHeading
          eyebrow="Team of Experts"
          title="Together for"
          highlight="a greener planet"
          subtitle="A multidisciplinary bench of accredited EIA coordinators and functional-area experts across ecology, geology, chemical engineering, mining, risk and socio-economics."
        />

        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {preview.map((e) => (
            <motion.article
              key={e.name}
              variants={fadeUp}
              className="group flex h-full flex-col rounded-[1.5rem] border border-line bg-surface p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-brand-green hover:shadow-card"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-navy font-display text-sm font-extrabold text-white transition-colors duration-500 group-hover:bg-brand-green">
                  {initialsOf(e.name)}
                </span>
                <div className="min-w-0">
                  <h3 className="truncate font-display text-sm font-bold text-ink">{e.name}</h3>
                  <p className="text-xs font-semibold text-brand-green">{e.role}</p>
                </div>
              </div>

              <p className="mt-4 line-clamp-2 flex-1 text-xs leading-relaxed text-ink-soft">{e.qual}</p>

              <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-soft">
                  <Briefcase className="h-3.5 w-3.5 text-brand-green" /> {e.exp}
                </span>
                {e.fa && (
                  <span className="rounded-full border border-brand-green/25 bg-brand-green/8 px-2.5 py-0.5 text-[11px] font-semibold text-brand-green">
                    {e.fa}
                  </span>
                )}
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-12 flex flex-col items-center justify-between gap-4 rounded-3xl bg-brand-navy p-8 text-center text-white sm:flex-row sm:text-left"
        >
          <p className="text-lg">
            <span className="font-display font-bold">Meet all {experts.length} experts</span>{' '}
            <span className="text-white/75">on our accredited panel.</span>
          </p>
          <Button as="a" href="/team/experts" variant="white" icon={ArrowUpRight}>
            View Team of Experts
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main>
      <PageBanner eyebrow="Get to know us" title="About Us" crumb="About Us" />
      <OurStory />
      <WhoWeAre />
      <StatsBand />
      <HistoryTimeline />
      <WhyChoose />
      <TeamSection />
    </main>
  )
}
