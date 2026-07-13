import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, Briefcase, CalendarCheck, CheckCircle2, Layers, Leaf, Linkedin, Mail, MapPin, MessageSquareText, Phone, Play, Quote, Sparkles, Star, Users } from 'lucide-react'
import { Autoplay, EffectFade } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import Button from '@/components/ui/Button'
import SectionHeading from '@/components/ui/SectionHeading'
import StatCounter from '@/components/ui/StatCounter'
import { company, industries, partners, serviceGroups, testimonials } from '@/data/site'
import { events, management } from '@/data/pages'
import { fadeUp, fromLeft, fromRight, scaleIn, stagger, viewport } from '@/lib/motion'
import 'swiper/css'
import 'swiper/css/effect-fade'

// == Hero ==
// Full-screen fade slider  each slide carries its own headline & imagery.
const heroSlides = [
  {
    img: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1920&q=80',
    eyebrow: `Environmental Consultancy Since ${company.since}`,
    title: 'Engineering a',
    highlight: 'Cleaner Future',
    text: 'Turning complex environmental regulation into a clear, science-led path to sustainable growth across India.',
  },
  {
    img: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1920&q=80',
    eyebrow: 'Clearances · Compliance · Monitoring',
    title: 'Compliance made',
    highlight: 'effortless',
    text: 'End-to-end EIA, consents and clearances handled by QCI-NABET & NABL accredited experts.',
  },
  {
    img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1920&q=80',
    eyebrow: '50+ Lakes Revived Across India',
    title: 'Restoring nature,',
    highlight: 'reviving lakes',
    text: 'Science-led restoration that brings water quality, biodiversity and community pride back to life.',
  },
]

function Hero() {
  const swiperRef = useRef(null)
  const [active, setActive] = useState(0)
  const total = heroSlides.length

  return (
    <section id="home" className="relative h-screen min-h-[40rem] w-full overflow-hidden bg-brand-navy">
      {/* Background fade slider */}
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={1200}
        loop
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        onSwiper={(s) => (swiperRef.current = s)}
        onSlideChange={(s) => setActive(s.realIndex)}
        className="absolute inset-0 z-0 h-full w-full [&_.swiper-slide]:h-full"
      >
        {heroSlides.map((s, i) => (
          <SwiperSlide key={i}>
            <img
              src={s.img}
              alt={s.highlight}
              className="h-full w-full object-cover"
              loading={i === 0 ? 'eager' : 'lazy'}
              fetchPriority={i === 0 ? 'high' : 'auto'}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Dark green legibility overlays */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-brand-navy/92 via-brand-navy/70 to-brand-navy/40" />
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-brand-navy/85 via-transparent to-brand-navy/50" />

      {/* Content */}
      <div className="absolute inset-0 z-20 mx-auto flex max-w-[100rem] flex-col overflow-y-auto px-5 pb-8 pt-24 sm:px-8 lg:px-12 lg:pb-10">
        {/* Headline  keyed to active slide so it re-animates */}
        <div className="mt-auto max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              variants={stagger(0.12)}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
            >
              <motion.span
                variants={fadeUp}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                {heroSlides[active].eyebrow}
              </motion.span>

              <motion.h1
                variants={fadeUp}
                className="mt-5 font-display text-[2.5rem] font-extrabold uppercase leading-[0.92] tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl xl:text-7xl"
              >
                {heroSlides[active].title}
                <br />
                <span className="text-brand-green">{heroSlides[active].highlight}</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base"
              >
                {heroSlides[active].text}
              </motion.p>

              <motion.div variants={fadeUp} className="mt-6 flex flex-wrap items-center gap-4">
                <Button as="a" href="/contact" icon={ArrowRight}>
                  Get a Consultation
                </Button>
                <Button as="a" href="/services" variant="glass" icon={ArrowUpRight}>
                  Our Services
                </Button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slider controls + thumbnails */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          {/* Arrows + counter */}
          <div className="flex items-center gap-5">
            <button
              aria-label="Previous slide"
              onClick={() => swiperRef.current?.slidePrev()}
              className="grid h-12 w-12 place-items-center rounded-full border border-white/25 text-white backdrop-blur-md transition hover:border-brand-green hover:bg-brand-green"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              aria-label="Next slide"
              onClick={() => swiperRef.current?.slideNext()}
              className="grid h-12 w-12 place-items-center rounded-full border border-white/25 text-white backdrop-blur-md transition hover:border-brand-green hover:bg-brand-green"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
            <span className="ml-1 font-display text-sm font-semibold text-white/80">
              <span className="text-brand-green">{String(active + 1).padStart(2, '0')}</span>
              <span className="mx-1 text-white/40">/</span>
              {String(total).padStart(2, '0')}
            </span>
          </div>

          {/* Thumbnail previews */}
          <div className="flex items-center gap-3">
            {heroSlides.map((s, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => swiperRef.current?.slideToLoop(i)}
                className={`group relative h-14 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-300 sm:h-16 sm:w-24 ${
                  active === i
                    ? 'border-brand-green shadow-glow'
                    : 'border-white/25 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={s.img} alt={s.highlight} className="h-full w-full object-cover" />
                <span
                  className={`absolute inset-0 transition-colors ${
                    active === i ? 'bg-brand-navy/10' : 'bg-brand-navy/45 group-hover:bg-brand-navy/25'
                  }`}
                />
                <span className="absolute inset-x-1.5 bottom-1 truncate text-left font-display text-[10px] font-bold uppercase capitalize tracking-wide text-white drop-shadow">
                  {s.highlight}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// == About ==
const IMG_MAIN =
  'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=900&q=80'
const IMG_SUB =
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=700&q=80'

const checklist = [
  'QCI-NABET & NABL accredited experts',
  'End-to-end regulatory handling',
  'In-house NABL laboratory & data',
  'Pan-India presence across 18 states',
]

const stats = [
  { value: 25, suffix: '+', label: 'Years' },
  { value: 500, suffix: '+', label: 'Projects' },
  { value: 100, suffix: '+', label: 'Clients' },
]

function About() {
  return (
    <section id="about" className="section-pad relative overflow-hidden">
      {/* Decorative accents */}
      <div className="pointer-events-none absolute -left-20 top-10 h-80 w-80 rounded-full bg-brand-green/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-80 w-80 rounded-full bg-brand-sky/10 blur-[120px]" />

      <div className="container-x grid items-center gap-16 lg:grid-cols-2">
        {/* LEFT  two-image collage */}
        <motion.div
          variants={fromLeft}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="relative"
        >
          {/* Decorative accents */}
          <div className="pointer-events-none absolute -left-5 -top-5 h-24 w-24 rounded-full border-[6px] border-brand-green/15" />
          <div className="pointer-events-none absolute -right-4 top-1/3 h-16 w-16 rotate-12 rounded-2xl bg-brand-green/10" />

          <div className="relative grid grid-cols-5 gap-4">
            {/* Left  tall image */}
            <div className="col-span-3">
              <div className="group relative h-full overflow-hidden rounded-[2rem] rounded-tr-[3.5rem] shadow-card">
                <img
                  src={IMG_MAIN}
                  alt="Lush green landscape with a solar array"
                  loading="lazy"
                  className="aspect-[3/4] h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/45 via-transparent to-transparent" />
                {/* Play pill */}
                <button className="absolute bottom-5 left-5 inline-flex items-center gap-3 rounded-full bg-white/90 py-2 pl-2 pr-5 font-display text-sm font-semibold text-brand-navy shadow-soft backdrop-blur-md transition-transform hover:scale-105">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-green text-white">
                    <Play className="h-4 w-4 translate-x-0.5 fill-current" />
                  </span>
                  Our Story
                </button>
              </div>
            </div>

            {/* Right  stacked image + green stat card */}
            <div className="col-span-2 flex flex-col gap-4">
              <div className="group overflow-hidden rounded-[1.5rem] rounded-bl-[3rem] shadow-card">
                <img
                  src={IMG_SUB}
                  alt="Equinox environmental experts collaborating"
                  loading="lazy"
                  className="aspect-[3/4] h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="relative flex flex-1 flex-col justify-center overflow-hidden rounded-[1.5rem] rounded-tr-[2.5rem] bg-brand-green p-5 text-white shadow-glow-green">
                <span className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/10" />
                <span className="pointer-events-none absolute inset-2 rounded-[1.25rem] border border-dashed border-white/25" />
                <span className="relative grid h-11 w-11 place-items-center rounded-full bg-white/20">
                  <Leaf className="h-5 w-5" />
                </span>
                <div className="relative mt-3 font-display text-4xl font-extrabold leading-none">25+</div>
                <div className="relative mt-1.5 text-xs font-medium leading-snug text-white/90">
                  Years of environmental excellence
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT  content */}
        <motion.div
          variants={fromRight}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
        >
          <SectionHeading
            align="left"
            eyebrow="About Equinox"
            title="Two decades of"
            highlight="environmental leadership"
            subtitle={`Since ${company.since}, ${company.shortName} has helped India's most ambitious industries turn complex environmental regulation into competitive advantage  with science, technology and an unwavering commitment to the planet.`}
          />

          {/* Checklist */}
          <motion.ul variants={stagger(0.08)} className="mt-8 grid gap-3 sm:grid-cols-2">
            {checklist.map((t) => (
              <motion.li
                key={t}
                variants={fadeUp}
                className="flex items-center gap-3 text-sm font-semibold text-ink"
              >
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-green/12 text-brand-green">
                  <CheckCircle2 className="h-4 w-4" />
                </span>
                {t}
              </motion.li>
            ))}
          </motion.ul>

          {/* Stats strip */}
          <div className="mt-8 flex w-fit divide-x divide-line rounded-3xl border border-line bg-surface">
            {stats.map((s) => (
              <div key={s.label} className="px-6 py-3 text-center">
                <div className="font-display text-2xl font-extrabold text-brand-green">
                  <StatCounter value={s.value} suffix={s.suffix} />
                </div>
                <div className="text-[11px] font-medium uppercase tracking-wide text-ink-soft">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Dual CTA  button + "Need Help?" phone (Wastex signature) */}
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Button as="a" href="/contact" icon={ArrowRight}>
              About More
            </Button>
            <a href={`tel:${company.phone}`} className="group flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-line bg-surface-2 text-brand-green transition-colors group-hover:bg-brand-green group-hover:text-white">
                <Phone className="h-5 w-5" />
              </span>
              <span className="leading-tight">
                <span className="block text-xs text-ink-soft">Need Help?</span>
                <span className="block font-display text-sm font-bold text-ink">{company.phone}</span>
              </span>
            </a>
          </div>

          {/* Signature accent */}
          <p className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand-green">
            <Leaf className="h-4 w-4" /> Committed to a sustainable India since {company.since}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// == Services ==
function Services() {
  const [active, setActive] = useState(0)
  const cat = serviceGroups[active]
  const CatIcon = cat.icon
  return (
    <section id="services" className="section-pad bg-surface-2">
      <div className="container-x">
        <SectionHeading
          eyebrow="Our Services"
          title="End-to-end environmental"
          highlight="services & compliance"
          subtitle="From statutory clearances to monitoring, audits and specialised studies  one accountable partner across the full environmental lifecycle."
        />

        {/* Category tabs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-10 flex flex-wrap items-center justify-center gap-2.5"
        >
          {serviceGroups.map((g, i) => {
            const Icon = g.icon
            return (
              <button
                key={g.title}
                onClick={() => setActive(i)}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 ${
                  active === i
                    ? 'bg-brand-green text-white shadow-glow'
                    : 'border border-line bg-surface text-ink-soft hover:border-brand-green hover:text-brand-green'
                }`}
              >
                <Icon className="h-4 w-4" /> {g.tab}
              </button>
            )
          })}
        </motion.div>

        {/* Active panel */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-14"
        >
          {/* Image */}
          <div className="relative">
            <div className="pointer-events-none absolute -bottom-5 -left-5 h-24 w-24 rounded-[1.5rem] bg-brand-green/10" />
            <div className="relative overflow-hidden rounded-[2rem] rounded-tr-[4rem] shadow-card">
              <AnimatePresence mode="wait">
                <motion.img
                  key={cat.img}
                  src={cat.img}
                  alt={cat.title}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="h-[24rem] w-full object-cover lg:h-[30rem]"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/10 to-transparent" />
              <span className="absolute left-6 top-6 grid h-14 w-14 place-items-center rounded-2xl bg-brand-green text-white shadow-glow">
                <CatIcon className="h-7 w-7" />
              </span>
              <div className="absolute inset-x-6 bottom-6 flex items-end justify-between text-white">
                <span className="font-display text-xl font-bold leading-tight">{cat.title}</span>
                <span className="font-display text-5xl font-extrabold text-white/25">
                  {String(active + 1).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-green/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-green">
                Capability {String(active + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 font-display text-2xl font-bold text-ink sm:text-3xl">{cat.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-ink-soft">{cat.desc}</p>

              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {cat.items.map((it) => (
                  <li key={it} className="flex gap-2.5 text-sm leading-relaxed text-ink">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button as="a" href="/contact" icon={ArrowRight}>Enquire About This</Button>
                <Button as="a" href="/services" variant="ghost" icon={ArrowUpRight}>All Services</Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

// == Industries ==
// Project counts per industry  adds credibility & richness to each card.
const counts = ['120+', '85+', '90+', '70+', '45+', '60+', '40+', '55+', '30+', '65+']

function Industries() {
  return (
    <section id="industries" className="section-pad relative overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-brand-green/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-brand-sky/10 blur-[120px]" />

      <div className="container-x relative">
        {/* Two-column header */}
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            align="left"
            eyebrow="Industries We Serve"
            title="Trusted across"
            highlight="every sector"
            subtitle="Deep domain knowledge across the industries that shape India's growth  each with its own regulatory landscape, and our expertise to navigate it."
          />
          <Button as="a" href="/contact" icon={ArrowRight} className="hidden shrink-0 lg:inline-flex">
            Talk to Specialists
          </Button>
        </div>

        <motion.div
          variants={stagger(0.05)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        >
          {industries.map(({ icon: Icon, name }, i) => (
            <motion.a
              href="/contact"
              key={name}
              variants={scaleIn}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-[1.5rem] border border-line bg-surface p-6 shadow-soft transition-all duration-500 hover:border-brand-green hover:bg-brand-green hover:shadow-glow-green"
            >
              {/* Large ghost-icon watermark */}
              <Icon className="pointer-events-none absolute -bottom-4 -right-3 h-28 w-28 text-brand-green/[0.05] transition-colors duration-500 group-hover:text-white/10" />

              {/* Arrow  slides in on hover */}
              <span className="absolute right-5 top-5 -translate-y-1 text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <ArrowUpRight className="h-5 w-5" />
              </span>

              <div className="relative">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-green/10 transition-all duration-500 group-hover:rotate-6 group-hover:bg-white/20">
                  <Icon className="h-7 w-7 text-brand-green transition-colors duration-500 group-hover:text-white" />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-ink transition-colors duration-500 group-hover:text-white">
                  {name}
                </h3>
                <p className="mt-1 text-sm text-ink-soft transition-colors duration-500 group-hover:text-white/80">
                  {counts[i]} projects delivered
                </p>
              </div>
            </motion.a>
          ))}

          {/* Featured card  spans two columns */}
          <motion.a
            href="/contact"
            variants={fadeUp}
            whileHover={{ y: -6 }}
            className="group relative col-span-2 flex flex-col justify-between overflow-hidden rounded-[1.5rem] bg-brand-navy p-6 text-white shadow-card transition-transform duration-500"
          >
            <div className="pointer-events-none absolute inset-0 bg-dotgrid opacity-10" />
            <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-brand-green/30 blur-3xl transition-transform duration-700 group-hover:scale-150" />
            <div className="relative">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-brand-green backdrop-blur-md">
                <Layers className="h-7 w-7" />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold">Don't see your sector?</h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/75">
                We tailor environmental clearance, compliance and monitoring to virtually
                any industry in India.
              </p>
            </div>
            <span className="relative mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-green transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight className="h-4 w-4" />
              </span>
              Talk to our specialists
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

// == LakeRevival ==
const projects = [
  {
    img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
    name: 'Bellandur Lake Revival',
    location: 'Bengaluru, Karnataka',
    year: '2024',
    category: 'Lake Revival',
    desc: 'A chronically polluted urban lake transformed into a thriving ecosystem with floating wetlands and aeration.',
  },
  {
    img: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80',
    name: 'Powai Lake Rejuvenation',
    location: 'Mumbai, Maharashtra',
    year: '2023',
    category: 'Wetland Creation',
    desc: 'Engineered treatment wetlands and bank stabilisation that revived biodiversity and community pride.',
  },
  {
    img: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=1200&q=80',
    name: 'Ulsoor Lake Restoration',
    location: 'Bengaluru, Karnataka',
    year: '2022',
    category: 'Bioremediation',
    desc: 'Bioremediation and desilting that reversed decades of degradation, returning clear water and birdlife.',
  },
  {
    img: 'https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?auto=format&fit=crop&w=1200&q=80',
    name: 'Hussain Sagar Programme',
    location: 'Hyderabad, Telangana',
    year: '2023',
    category: 'Desilting + Aeration',
    desc: 'A large-scale desilting and cascade-aeration programme that revived a landmark heart-shaped lake.',
  },
]

function ProjectCard({ p, index }) {
  return (
    <div className="group relative h-[30rem] overflow-hidden rounded-[1.75rem] shadow-card">
      <img
        src={p.img}
        alt={p.name}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/30 to-transparent" />

      {/* Number badge */}
      <span className="absolute right-4 top-4 rounded-full bg-brand-navy/70 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
        No  {String(index + 1).padStart(2, '0')}
      </span>
      {/* Category pill */}
      <span className="absolute left-4 top-4 rounded-full bg-brand-green px-3 py-1.5 text-xs font-semibold text-white shadow-soft">
        {p.category}
      </span>

      {/* Bottom content panel */}
      <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/10 bg-brand-navy/55 p-5 backdrop-blur-md">
        <div className="flex items-center gap-1.5 text-xs text-white/70">
          <MapPin className="h-3.5 w-3.5 text-brand-sky" /> {p.location} · {p.year}
        </div>
        <h3 className="mt-1.5 font-display text-xl font-bold text-white transition-colors duration-300 group-hover:text-brand-sky">
          {p.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/75">{p.desc}</p>

        {/* Reveal button on hover */}
        <div className="grid grid-rows-[0fr] transition-all duration-500 group-hover:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <a
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-green px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105"
            >
              View Project
              <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function LakeRevival() {
  const swiperRef = useRef(null)
  const [active, setActive] = useState(0)

  return (
    <section id="lake-revival" className="relative">
      {/* Dark green header band */}
      <div className="relative overflow-hidden bg-brand-navy pb-52 pt-20 lg:pt-24">
        <div className="pointer-events-none absolute inset-0 bg-navy-radial opacity-60" />
        <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-brand-green/20 blur-[120px]" />
        <div className="pointer-events-none absolute right-10 bottom-20 h-72 w-72 rounded-full bg-brand-sky/10 blur-[120px]" />
        <div className="pointer-events-none absolute inset-0 bg-dotgrid opacity-[0.05]" />

        <div className="container-x relative px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <span className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.2em] text-brand-sky">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-sky/15">
                  <Leaf className="h-3.5 w-3.5" />
                </span>
                Completed Projects
                <span className="h-px w-8 bg-brand-sky/40" />
              </span>
              <h2 className="mt-5 max-w-2xl font-display text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl">
                Explore our successful{' '}
                <span className="text-brand-sky">environmental projects</span>
              </h2>
            </div>
            <Button as="a" href="/contact" icon={ArrowRight} className="shrink-0">
              View All Projects
            </Button>
          </div>
        </div>
      </div>

      {/* Cards  overlap the band onto the white below */}
      <div className="container-x relative z-10 -mt-40 px-5 sm:px-8 lg:px-12">
        <Swiper
          modules={[Autoplay]}
          onSwiper={(s) => (swiperRef.current = s)}
          onSlideChange={(s) => setActive(s.activeIndex)}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          spaceBetween={24}
          breakpoints={{
            0: { slidesPerView: 1.1 },
            640: { slidesPerView: 2.1 },
            1024: { slidesPerView: 3 },
          }}
          className="!overflow-visible"
        >
          {projects.map((p, i) => (
            <SwiperSlide key={p.name}>
              <ProjectCard p={p} index={i} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            aria-label="Previous project"
            onClick={() => swiperRef.current?.slidePrev()}
            className="grid h-12 w-12 place-items-center rounded-full border border-line bg-surface text-ink shadow-soft transition hover:border-brand-green hover:bg-brand-green hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            {projects.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Go to project ${idx + 1}`}
                onClick={() => swiperRef.current?.slideTo(idx)}
                className={`h-2 rounded-full transition-all ${
                  active === idx ? 'w-7 bg-brand-green' : 'w-2 bg-line hover:bg-brand-green/40'
                }`}
              />
            ))}
          </div>
          <button
            aria-label="Next project"
            onClick={() => swiperRef.current?.slideNext()}
            className="grid h-12 w-12 place-items-center rounded-full border border-line bg-surface text-ink shadow-soft transition hover:border-brand-green hover:bg-brand-green hover:text-white"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}

// == Team (Management) ==
function Team() {
  return (
    <section className="section-pad relative overflow-hidden">
      <div className="pointer-events-none absolute right-0 top-1/4 h-80 w-80 rounded-full bg-brand-green/10 blur-[120px]" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-brand-sky/5 blur-[120px]" />

      <div className="container-x relative">
        <SectionHeading
          eyebrow="Leadership"
          title="The minds behind"
          highlight="every clearance"
          subtitle="Meet the leadership steering Equinox  decades of environmental and engineering expertise guiding every project."
        />

        <motion.div
          variants={stagger(0.15)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-14 grid gap-6 lg:grid-cols-2"
        >
          {management.map((m) => (
            <motion.article
              key={m.name}
              variants={fadeUp}
              className="group relative flex overflow-hidden rounded-[2rem] border border-line shadow-soft transition-all duration-500 hover:border-brand-green hover:shadow-card"
            >
              {/* Background gradient */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-surface to-surface-2" />

              {/* Portrait Section */}
              <div className="relative w-2/5 overflow-hidden">
                <img
                  src={m.photo}
                  alt={m.name}
                  loading="lazy"
                  onError={(e) => { e.currentTarget.src = m.photoFallback }}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-surface/40" />

                {/* Role Badge - positioned absolutely */}
                <span className="absolute left-5 top-5 rounded-full bg-brand-green px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-soft">
                  {m.role}
                </span>
              </div>

              {/* Content Section */}
              <div className="relative flex w-3/5 flex-col justify-between p-7 sm:p-8">
                <div>
                  {/* Name & Title */}
                  <h3 className="font-display text-2xl font-bold text-ink">{m.name}</h3>
                  <div className="mt-2 flex items-center gap-2.5">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-green/10 text-brand-green">
                      <Briefcase className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm font-semibold text-brand-green">
                      {m.exp} · {m.expLabel}
                    </span>
                  </div>

                  {/* Bio */}
                  <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-ink-soft">{m.bio}</p>

                  {/* Credentials - only show first 3 */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {m.credentials.slice(0, 3).map((c) => (
                      <span
                        key={c}
                        className="rounded-full border border-line/50 bg-surface-2 px-2.5 py-1 text-[10px] font-semibold text-ink-soft"
                      >
                        {c}
                      </span>
                    ))}
                    {m.credentials.length > 3 && (
                      <span className="rounded-full bg-brand-green/15 px-2.5 py-1 text-[10px] font-semibold text-brand-green">
                        +{m.credentials.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer: Social Links & CTA */}
                <div className="mt-6 flex items-center justify-between border-t border-line/40 pt-5">
                  <div className="flex items-center gap-2">
                    <a
                      href="#"
                      aria-label={`${m.name} on LinkedIn`}
                      className="grid h-8 w-8 place-items-center rounded-full bg-white/50 text-ink-soft transition-all duration-300 hover:bg-brand-green hover:text-white"
                    >
                      <Linkedin className="h-3.5 w-3.5" />
                    </a>
                    <a
                      href={`mailto:${company.email}`}
                      aria-label="Email"
                      className="grid h-8 w-8 place-items-center rounded-full bg-white/50 text-ink-soft transition-all duration-300 hover:bg-brand-green hover:text-white"
                    >
                      <Mail className="h-3.5 w-3.5" />
                    </a>
                  </div>
                  <a
                    href="/team/management"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-green transition-colors hover:text-brand-green/70"
                  >
                    View profile
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// == Testimonials ==
function Testimonials() {
  const [i, setI] = useState(0)
  const n = testimonials.length
  const t = testimonials[i]

  const go = (dir) => setI((p) => (p + dir + n) % n)

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % n), 6000)
    return () => clearInterval(id)
  }, [n])

  return (
    <section id="testimonials" className="section-pad relative overflow-hidden">
      <div className="pointer-events-none absolute -left-24 top-1/3 h-80 w-80 rounded-full bg-brand-green/10 blur-[120px]" />

      <div className="container-x relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* ── LEFT  intro ─────────────────────────────────────────── */}
        <motion.div variants={fromLeft} initial="hidden" whileInView="show" viewport={viewport}>
          <span className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-green/12">
              <Leaf className="h-3.5 w-3.5" />
            </span>
            Testimonials
            <span className="h-px w-8 bg-brand-green/40" />
          </span>

          <h2 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] text-ink sm:text-5xl">
            Why they believe
            <br />
            <span className="mr-3 inline-grid h-12 w-12 -translate-y-1 place-items-center rounded-full bg-brand-green align-middle text-white sm:h-14 sm:w-14">
              <Quote className="h-6 w-6 fill-current sm:h-7 sm:w-7" />
            </span>
            in us
          </h2>

          <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">
            Our clients are highly satisfied and recommend our environmental and
            compliance services across India.
          </p>

          {/* Positive reviews stat */}
          <div className="mt-9 flex items-center gap-4">
            <span className="font-display text-5xl font-extrabold text-brand-green/25">99%</span>
            <span className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-green text-white">
                <Leaf className="h-4 w-4" />
              </span>
              <span className="font-display text-lg font-bold text-ink">Positive Reviews</span>
            </span>
          </div>

          {/* Write a review pill */}
          <a
            href="/contact"
            className="group mt-8 inline-flex items-center gap-3 rounded-2xl border border-line bg-surface px-5 py-4 shadow-soft transition-transform hover:scale-[1.02]"
          >
            <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-green/10 text-brand-green">
              <MessageSquareText className="h-5 w-5" />
            </span>
            <span className="font-display text-sm font-semibold text-ink">
              Write your honest review
            </span>
            <ArrowRight className="h-4 w-4 text-brand-green transition-transform group-hover:translate-x-0.5" />
          </a>
        </motion.div>

        {/* ── RIGHT  text testimonial card ────────────────────────── */}
        <motion.div
          variants={fromRight}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="relative px-4 sm:px-6"
        >
          {/* Layered cards behind  peek left & right */}
          <div className="absolute inset-x-0 top-3 bottom-0 -translate-x-5 scale-[0.94] rounded-[2rem] border border-line bg-surface-2 shadow-soft" />
          <div className="absolute inset-x-0 top-3 bottom-0 translate-x-5 scale-[0.94] rounded-[2rem] border border-line bg-surface-2 shadow-soft" />
          <div className="absolute inset-x-0 top-1.5 bottom-1 scale-[0.97] rounded-[2rem] bg-brand-navy/40" />

          {/* Main card */}
          <div className="relative overflow-hidden rounded-[2rem] bg-brand-navy p-7 text-white shadow-card sm:p-9">
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-green/20 blur-3xl" />
            <Quote className="pointer-events-none absolute right-8 top-8 h-16 w-16 fill-current text-white/5" />

            <div className="relative">
              {/* Rating pill */}
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-white/20 px-3.5 py-1.5 text-sm">
                Rating
                <Star className="h-4 w-4 fill-brand-green text-brand-green" />
                <span className="font-bold">{t.rating}.0</span>
              </span>

              <AnimatePresence mode="wait">
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.35 }}
                >
                  <blockquote className="mt-6 text-xl font-medium leading-relaxed text-white/95 sm:text-2xl">
                    “{t.quote}”
                  </blockquote>

                  <div className="mt-7 flex items-center gap-4">
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-brand-green font-display text-lg font-bold text-white">
                      {t.initials}
                    </span>
                    <div>
                      <div className="font-display text-lg font-bold text-white">{t.name}</div>
                      <div className="text-sm text-white/70">{t.title}</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Nav + dots */}
            <div className="relative mt-7 flex items-center justify-between border-t border-white/10 pt-5">
              <div className="flex items-center gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    aria-label={`Go to review ${idx + 1}`}
                    onClick={() => setI(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === i ? 'w-6 bg-brand-green' : 'w-2 bg-white/25 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  aria-label="Previous review"
                  onClick={() => go(-1)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/25 text-white transition hover:border-brand-green hover:bg-brand-green"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  aria-label="Next review"
                  onClick={() => go(1)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/25 text-white transition hover:border-brand-green hover:bg-brand-green"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// == Events ==
// Card matching the split "latest posts" reference: image with status pill +
// two-tone date badge, then title, excerpt and a Read More / attendees row.
function EventCard({ e }) {
  const [day, month, year] = e.date.split(' ')
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-line bg-surface shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-card">
      <div className="relative h-56 overflow-hidden">
        <img
          src={e.img}
          alt={e.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/45 to-transparent" />

        {/* Status pill */}
        <span className="absolute left-4 top-4 rounded-full bg-brand-navy/65 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
          {e.upcoming ? 'Upcoming' : 'Past Event'}
        </span>

        {/* Two-tone date badge */}
        <div className="absolute -bottom-6 right-5 z-10 overflow-hidden rounded-2xl shadow-card">
          <div className="bg-brand-navy px-4 pb-1.5 pt-2.5 text-center text-white">
            <div className="font-display text-2xl font-extrabold leading-none">{day}</div>
            <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-wide">{month}</div>
          </div>
          <div className="bg-brand-green py-1 text-center font-display text-[11px] font-bold tracking-[0.25em] text-white">
            {year}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 pt-7">
        <h3 className="font-display text-xl font-bold text-ink transition-colors group-hover:text-brand-green">
          <a href={`/events/${e.slug}`}>{e.title}</a>
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-ink-soft">{e.desc}</p>

        <div className="mt-5 flex items-center justify-between">
          <a
            href={`/events/${e.slug}`}
            className="inline-flex items-center gap-2 rounded-full border border-line py-1.5 pl-5 pr-1.5 font-display text-sm font-semibold text-ink transition-colors hover:border-brand-green hover:text-brand-green"
          >
            Read More
            <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-green text-white transition-transform duration-300 group-hover:translate-x-0.5">
              <ArrowRight className="h-4 w-4" />
            </span>
          </a>
          <span className="flex items-center gap-1.5 text-sm font-semibold text-ink-soft">
            <Users className="h-4 w-4 text-brand-green" /> {e.joined}
          </span>
        </div>
      </div>
    </article>
  )
}

function Events() {
  const swiperRef = useRef(null)
  const [progress, setProgress] = useState(0)

  return (
    <section id="events" className="section-pad relative overflow-hidden">
      <div className="pointer-events-none absolute -left-24 top-20 h-80 w-80 rounded-full bg-brand-green/10 blur-[120px]" />

      <div className="container-x relative grid gap-12 lg:grid-cols-[0.8fr_1.6fr] lg:gap-10">
        {/* LEFT  intro */}
        <motion.div
          variants={fromLeft}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="lg:pr-6"
        >
          <span className="mb-5 inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.2em] text-brand-green">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-green/12">
              <Leaf className="h-3.5 w-3.5" />
            </span>
             Events
          </span>
          <h2 className="font-display text-4xl font-extrabold leading-[1.05] text-ink sm:text-5xl">
            Check Our Latest <span className="text-brand-green">Events</span>
          </h2>
          <p className="mt-6 max-w-sm text-base leading-relaxed text-ink-soft">
            Workshops, summits and community drives  join us as we turn environmental
            compliance into a cleaner, greener future.
          </p>
          <Button as="a" href="/events" icon={ArrowRight} className="mt-8">
            Explore All Events
          </Button>
        </motion.div>

        {/* RIGHT  carousel */}
        <motion.div
          variants={fromRight}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="min-w-0"
        >
          <Swiper
            modules={[Autoplay]}
            onSwiper={(s) => (swiperRef.current = s)}
            onProgress={(_, p) => setProgress(p)}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            spaceBetween={24}
            breakpoints={{
              0: { slidesPerView: 1.15 },
              640: { slidesPerView: 2 },
              1280: { slidesPerView: 2.35 },
            }}
            className="!-mx-2 !px-2 !py-2"
          >
            {events.map((e) => (
              <SwiperSlide key={e.slug} className="!h-auto">
                <EventCard e={e} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Progress bar */}
          <div className="relative mt-12 h-1.5 w-full overflow-hidden rounded-full bg-line">
            <div
              className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-brand-green transition-transform duration-300"
              style={{ transform: `translateX(${Math.min(Math.max(progress, 0), 1) * 200}%)` }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// == Partners ==
// Wordmark styled as a partner "logo" on a dark card.
function PartnerCard({ name }) {
  return (
    <div className="group grid h-24 w-52 shrink-0 place-items-center rounded-2xl bg-brand-navy px-6 shadow-soft transition-colors duration-500 hover:bg-brand-green">
      <span className="text-center font-display text-lg font-extrabold tracking-tight text-white/90 transition-colors group-hover:text-white">
        {name}
      </span>
    </div>
  )
}

function Partners() {
  const loop = [...partners, ...partners]
  return (
    <section className="relative overflow-hidden pb-20 pt-4 sm:pb-24">
      <div className="container-x">
        {/* Heading with flanking lines */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="flex items-center gap-6"
        >
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-brand-green/30" />
          <h3 className="whitespace-nowrap font-display text-2xl font-bold text-ink sm:text-3xl">
            Major Partners
          </h3>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-brand-green/30" />
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="mask-fade-x mt-10 overflow-hidden">
        <div className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]">
          {loop.map((name, idx) => (
            <PartnerCard key={idx} name={name} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Industries />
      <LakeRevival />
      <Team />
      <Events />
      <Testimonials />
      <Partners />
    </main>
  )
}
