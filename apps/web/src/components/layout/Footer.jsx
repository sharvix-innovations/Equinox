import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Linkedin, Twitter, Youtube, Instagram, MapPin, Mail, Phone, ArrowUpRight, ArrowRight, Send, Leaf,
} from 'lucide-react'
import { company, footerColumns } from '@/data/site'
import Logo from './Logo'
import { fadeUp, stagger, viewport } from '@/lib/motion'

const socialIcons = { linkedin: Linkedin, twitter: Twitter, youtube: Youtube, instagram: Instagram }

// Map footer link labels to the nearest real page.
const routeMap = {
  'About Us': '/about', 'Our Team': '/team/management', Certifications: '/about', Careers: '/team/experts',
  Contact: '/contact', 'Privacy Policy': '/privacy',
  'Environmental Clearance': '/services', 'EIA Reports': '/services', 'ETP / STP Solutions': '/services',
  'Lake Revival': '/services', 'Environmental Monitoring': '/services', 'Industrial Compliance': '/services',
  Manufacturing: '/clients', Chemical: '/clients', Infrastructure: '/clients', Mining: '/clients',
  'Renewable Energy': '/clients', 'Smart Cities': '/clients',
  'Insights & Blog': '/gallery', 'Case Studies': '/gallery', 'Downloadable Reports': '/products',
  'Resource Center': '/gallery', 'Carbon Calculator': '/products', FAQs: '/contact',
}
const scrollTop = () => (window.__lenis ? window.__lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: 'smooth' }))

export default function Footer() {
  return (
    <footer className="relative">
      {/* Overlapping CTA card */}
      <div className="container-x relative z-10 px-5 pt-10 sm:px-8 lg:px-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="relative overflow-hidden rounded-[2rem] bg-brand-gradient p-8 shadow-glow sm:p-12"
        >
          <div className="pointer-events-none absolute inset-0 bg-dotgrid opacity-10" />
          <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/15 blur-3xl" />
          <div className="relative flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                <Leaf className="h-3.5 w-3.5" /> Let's build something sustainable
              </span>
              <h3 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                Ready to build a cleaner future?
              </h3>
              <p className="mt-2 max-w-xl text-white/85">
                Talk to our environmental experts about your clearance, compliance or restoration goals.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-8 py-4 font-display font-semibold text-brand-navy shadow-soft transition-transform hover:scale-105"
            >
              Get in Touch <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Footer body */}
      <div className="relative -mt-24 overflow-hidden bg-brand-navy pt-40 text-slate-300">
        {/* Glows + watermark */}
        <div className="pointer-events-none absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-brand-green/20 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-20 right-1/4 h-72 w-72 rounded-full bg-brand-sky/15 blur-[120px]" />
        <span className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 select-none font-display text-[20vw] font-extrabold leading-none text-white/[0.03]">
          Equinox
        </span>

        <div className="container-x relative px-5 sm:px-8 lg:px-12">
          {/* Columns */}
          <motion.div
            variants={stagger(0.07)}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            className="grid gap-10 lg:grid-cols-12"
          >
            {/* Brand + newsletter */}
            <motion.div variants={fadeUp} className="lg:col-span-4">
              <Logo onDark />
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-400">
                India's leading environmental consultancy & sustainability solutions partner since {company.since}.
              </p>

              {/* Newsletter */}
              <div className="mt-6">
                <p className="text-sm font-semibold text-white">Get sustainability insights</p>
                <form onSubmit={(e) => e.preventDefault()} className="mt-3 flex items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1.5 backdrop-blur-md">
                  <input
                    type="email"
                    required
                    placeholder="Your email address"
                    className="min-w-0 flex-1 bg-transparent px-4 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none"
                  />
                  <button aria-label="Subscribe" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-green text-white transition-transform hover:scale-105">
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>

              {/* Socials */}
              <div className="mt-6 flex items-center gap-3">
                {Object.entries(company.social).map(([key, href]) => {
                  const Icon = socialIcons[key]
                  return (
                    <a
                      key={key}
                      href={href}
                      aria-label={key}
                      className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-all hover:scale-110 hover:border-brand-green hover:bg-brand-green hover:text-white"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  )
                })}
              </div>
            </motion.div>

            {/* Link columns */}
            {footerColumns.map((col) => (
              <motion.div variants={fadeUp} key={col.title} className="lg:col-span-2">
                <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
                  {col.title}
                </h4>
                <ul className="mt-5 space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <Link to={routeMap[link] || '/'} className="group inline-flex items-center gap-1.5 text-sm text-slate-400 transition-colors hover:text-brand-green">
                        <ArrowRight className="h-0 w-0 opacity-0 transition-all duration-300 group-hover:h-3.5 group-hover:w-3.5 group-hover:opacity-100" />
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact strip */}
          <div className="mt-14 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
            <a href={`tel:${company.phone}`} className="flex items-center gap-3 text-sm text-slate-300 transition-colors hover:text-white">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-white/5"><Phone className="h-4 w-4 text-brand-green" /></span>
              {company.phone}
            </a>
            <a href={`mailto:${company.email}`} className="flex items-center gap-3 text-sm text-slate-300 transition-colors hover:text-white">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-white/5"><Mail className="h-4 w-4 text-brand-green" /></span>
              {company.email}
            </a>
            <p className="flex items-center gap-3 text-sm text-slate-300">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/5"><MapPin className="h-4 w-4 text-brand-green" /></span>
              Hinjawadi Phase 2, Pune
            </p>
          </div>

          {/* Accreditations */}
          <div className="mt-8 border-t border-white/10 ">
           
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
            <p className="text-xs text-slate-500">
              © {company.since}–2026 {company.name}. All rights reserved.
            </p>
            <div className="flex items-center gap-5 text-xs text-slate-400">
              <Link to="/privacy" className="hover:text-brand-green">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-brand-green">Terms</Link>
              <button onClick={scrollTop} className="inline-flex items-center gap-1 hover:text-brand-green">
                Back to top <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
