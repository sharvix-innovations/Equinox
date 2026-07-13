import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Phone, Mail, MapPin, Clock, MessageCircle, Send, ArrowUpRight,
  Linkedin, Twitter, Youtube, Instagram, HeadphonesIcon, CheckCircle2,
} from 'lucide-react'
import PageBanner from '@/components/layout/PageBanner'
import { company, serviceGroups } from '@/data/site'
import { fadeUp, fromLeft, fromRight, stagger, viewport } from '@/lib/motion'

const BANNER =
  'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=1920&q=80'

const quickActions = [
  { icon: Phone, label: 'Call Us', value: company.phone, sub: 'Mon–Sat, 9–6', href: `tel:${company.phone}` },
  { icon: Mail, label: 'Email Us', value: company.email, sub: 'Replies within 24h', href: `mailto:${company.email}` },
  { icon: MessageCircle, label: 'WhatsApp', value: 'Chat instantly', sub: 'Fastest response', href: `https://wa.me/${company.whatsapp}` },
  { icon: MapPin, label: 'Visit Us', value: 'Hinjawadi, Pune', sub: 'Book a meeting', href: '#map' },
]

const socials = [
  { icon: Linkedin, href: company.social?.linkedin || '#' },
  { icon: Twitter, href: company.social?.twitter || '#' },
  { icon: Youtube, href: company.social?.youtube || '#' },
  { icon: Instagram, href: company.social?.instagram || '#' },
]

const assurances = [
  'Response within one business day',
  'No-obligation project consultation',
  'Your data is never shared',
]

export default function ContactPage() {
  useEffect(() => window.scrollTo(0, 0), [])
  const navigate = useNavigate()

  return (
    <main>
      <PageBanner title="Contact Us" crumb="Contact" image={BANNER} />

      {/* Quick action tiles */}
      <section className="section-pad pb-0">
        <div className="container-x">
          <motion.div
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {quickActions.map((a) => (
              <motion.a
                key={a.label}
                variants={fadeUp}
                href={a.href}
                target={a.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="group relative flex flex-col gap-4 overflow-hidden rounded-[1.5rem] border border-line bg-surface p-6 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-green hover:shadow-card"
              >
                <span className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-brand-green/5 transition-transform duration-500 group-hover:scale-150" />
                <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-brand-green/10 text-brand-green transition-all duration-500 group-hover:rotate-6 group-hover:bg-brand-green group-hover:text-white">
                  <a.icon className="h-7 w-7" />
                </span>
                <div className="relative">
                  <div className="text-xs font-semibold uppercase tracking-wider text-ink-soft">{a.label}</div>
                  <div className="mt-1 font-display text-lg font-bold text-ink">{a.value}</div>
                  <div className="mt-0.5 text-sm text-ink-soft">{a.sub}</div>
                </div>
                <ArrowUpRight className="absolute right-5 top-5 h-5 w-5 text-ink-soft opacity-0 transition-opacity group-hover:opacity-100" />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Split contact card: info panel + form */}
      <section className="section-pad">
        <div className="container-x">
          <div className="grid overflow-hidden rounded-[2.5rem] border border-line shadow-card lg:grid-cols-[0.9fr_1.1fr]">
            {/* Left  dark info panel */}
            <motion.div
              variants={fromLeft}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              className="relative overflow-hidden bg-brand-navy p-8 text-white sm:p-10 lg:p-12"
            >
              <div className="pointer-events-none absolute inset-0 bg-dotgrid opacity-10" />
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-green/25 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-brand-sky/15 blur-3xl" />

              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-brand-sky ring-1 ring-white/15">
                  <HeadphonesIcon className="h-3.5 w-3.5" /> Get in touch
                </span>
                <h2 className="mt-6 font-display text-3xl font-extrabold leading-tight sm:text-4xl">
                  Let's engineer your <span className="text-brand-sky">cleaner future</span>
                </h2>
                <p className="mt-4 max-w-md text-white/70">
                  Tell us about your project, site or compliance need. Our environmental specialists
                  will get back to you with a clear next step.
                </p>

                <div className="mt-9 space-y-5">
                  <a href={`tel:${company.phone}`} className="group flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-brand-sky ring-1 ring-white/15 transition-colors group-hover:bg-brand-green group-hover:text-white"><Phone className="h-5 w-5" /></span>
                    <span>
                      <span className="block text-xs uppercase tracking-wider text-white/50">Phone</span>
                      <span className="font-display font-bold">{company.phone}</span>
                    </span>
                  </a>
                  <a href={`mailto:${company.email}`} className="group flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-brand-sky ring-1 ring-white/15 transition-colors group-hover:bg-brand-green group-hover:text-white"><Mail className="h-5 w-5" /></span>
                    <span>
                      <span className="block text-xs uppercase tracking-wider text-white/50">Email</span>
                      <span className="font-display font-bold">{company.email}</span>
                    </span>
                  </a>
                  <div className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-brand-sky ring-1 ring-white/15"><MapPin className="h-5 w-5" /></span>
                    <span>
                      <span className="block text-xs uppercase tracking-wider text-white/50">Office</span>
                      <span className="font-display font-bold leading-snug">{company.address}</span>
                    </span>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-brand-sky ring-1 ring-white/15"><Clock className="h-5 w-5" /></span>
                    <span>
                      <span className="block text-xs uppercase tracking-wider text-white/50">Working hours</span>
                      <span className="font-display font-bold">Mon–Sat · 9:00 AM – 6:00 PM</span>
                    </span>
                  </div>
                </div>

                <div className="mt-9 border-t border-white/10 pt-6">
                  <span className="text-xs uppercase tracking-wider text-white/50">Follow us</span>
                  <div className="mt-3 flex items-center gap-2.5">
                    {socials.map(({ icon: Icon, href }, i) => (
                      <a key={i} href={href} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/15 transition-colors hover:bg-brand-green">
                        <Icon className="h-4 w-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right  form */}
            <motion.div
              variants={fromRight}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              className="bg-surface p-8 sm:p-10 lg:p-12"
            >
              <h3 className="font-display text-2xl font-bold text-ink">Send us a message</h3>
              <p className="mt-2 text-sm text-ink-soft">Fields marked * are required.</p>

              <form onSubmit={(e) => { e.preventDefault(); navigate('/thank-you') }} className="mt-7 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full Name *"><input required placeholder="Your name" className={inputCls} /></Field>
                  <Field label="Company"><input placeholder="Organisation" className={inputCls} /></Field>
                  <Field label="Email *"><input required type="email" placeholder="you@company.com" className={inputCls} /></Field>
                  <Field label="Phone *"><input required placeholder="+91 00000 00000" className={inputCls} /></Field>
                </div>
                <Field label="Service of interest">
                  <select required defaultValue="" className={`${inputCls} text-ink-soft`}>
                    <option value="" disabled>Select a service</option>
                    {serviceGroups.map((s) => <option key={s.title} value={s.title}>{s.title}</option>)}
                    <option value="Products">Products / Equipment</option>
                    <option value="Other">Other</option>
                  </select>
                </Field>
                <Field label="Your message *">
                  <textarea required rows={4} placeholder="Tell us about your project…" className={inputCls} />
                </Field>
                <button className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-green px-6 py-4 font-display font-semibold text-white shadow-glow transition-transform hover:scale-[1.02]">
                  Send Enquiry <Send className="h-4 w-4" />
                </button>
              </form>

              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                {assurances.map((a) => (
                  <li key={a} className="flex items-center gap-1.5 text-xs font-medium text-ink-soft">
                    <CheckCircle2 className="h-4 w-4 text-brand-green" /> {a}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map with floating address card */}
      <section id="map" className="relative">
        <iframe
          title="Equinox location"
          src={company.mapEmbed}
          className="h-[30rem] w-full grayscale-[0.2]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="pointer-events-none absolute inset-0 flex items-center">
          <div className="container-x">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              className="pointer-events-auto max-w-sm rounded-[2rem] border border-line bg-surface/95 p-8 shadow-card backdrop-blur"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-green/10 text-brand-green"><MapPin className="h-6 w-6" /></span>
              <h3 className="mt-5 font-display text-xl font-bold text-ink">Visit our office</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{company.address}</p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Hinjawadi+Phase+2+Pune"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-green px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.03]"
              >
                Get Directions <ArrowUpRight className="h-4 w-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WhatsApp floating */}
      <a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" className="fixed bottom-6 left-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-glow transition-transform hover:scale-110">
        <MessageCircle className="h-7 w-7" />
      </a>
    </main>
  )
}

const inputCls =
  'w-full rounded-xl border border-line bg-surface-2 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-brand-green focus:bg-surface'

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-ink-soft">{label}</span>
      {children}
    </label>
  )
}
