import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, MessageSquareText } from 'lucide-react'
import PageBanner from '@/components/layout/PageBanner'
import SectionHeading from '@/components/ui/SectionHeading'
import FilterTabs from '@/components/ui/FilterTabs'
import CtaBanner from '@/components/ui/CtaBanner'
import { products, productCategories } from '@/data/pages'
import { fadeUp, stagger } from '@/lib/motion'

export default function ProductsPage() {
  useEffect(() => window.scrollTo(0, 0), [])
  const [cat, setCat] = useState('All')
  const list = cat === 'All' ? products : products.filter((p) => p.category === cat)

  return (
    <main>
      <PageBanner eyebrow="What we offer" title="Our Products" crumb="Products" />

      <section className="section-pad relative overflow-hidden">
        <div className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-brand-green/10 blur-[120px]" />
        <div className="container-x relative">
          <SectionHeading
            eyebrow="Product Catalog"
            title="Environmental technology"
            highlight="that delivers"
            subtitle="Advanced monitoring, treatment, testing, and software solutions engineered for maximum compliance and peak performance."
          />

          <div className="mt-10">
            <FilterTabs items={productCategories} active={cat} onChange={setCat} />
          </div>

          <motion.div key={cat} variants={stagger(0.05)} initial="hidden" animate="show" className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => {
              const Icon = p.icon
              return (
                <motion.article
                  key={p.slug}
                  variants={fadeUp}
                  whileHover={{ y: -12 }}
                  className="group relative flex h-96 flex-col overflow-hidden rounded-3xl shadow-soft transition-all duration-500 hover:shadow-card"
                >
                  {/* Full image background with overlay */}
                  <div className="absolute inset-0">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-125"
                    />
                    {/* Multi-layer overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/20 to-transparent" />
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-brand-green/10" />
                  </div>

                  {/* Content overlay - positioned at bottom */}
                  <div className="relative flex h-full flex-col justify-between p-8">
                    {/* Top section - Icon and Category */}
                    <div className="flex items-start justify-between">
                      {/* Category Badge */}
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md border border-white/30 px-4 py-2"
                      >
                        <span className="h-2 w-2 rounded-full bg-brand-green animate-pulse" />
                        <span className="text-sm font-semibold text-white">{p.category}</span>
                      </motion.div>

                      {/* Icon Circle */}
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-green to-brand-green/70 text-white shadow-glow"
                      >
                        <Icon className="h-8 w-8" />
                      </motion.div>
                    </div>

                    {/* Bottom section - Content and buttons */}
                    <div className="space-y-4">
                      {/* Title */}
                      <div>
                        <h3 className="font-display text-2xl font-bold text-white drop-shadow-lg mb-2 leading-tight">
                          {p.name}
                        </h3>
                        <p className="text-sm leading-relaxed text-white/80 drop-shadow">
                          {p.short}
                        </p>
                      </div>

                      {/* Buttons */}
                      <div className="flex flex-col sm:flex-row gap-2 pt-2">
                        <button
                          className="group/btn relative inline-flex items-center justify-center gap-2 flex-1 rounded-lg bg-brand-green px-4 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-brand-green/90 active:scale-95 shadow-lg hover:shadow-glow overflow-hidden"
                        >
                          <span className="relative z-10">View Details</span>
                          <ArrowUpRight className="h-4 w-4 relative z-10 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                        </button>
                        <button
                          className="group/btn inline-flex items-center justify-center gap-2 flex-1 rounded-lg bg-white/20 backdrop-blur-sm border border-white/40 px-4 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-white/30 hover:border-white/60"
                        >
                          <MessageSquareText className="h-4 w-4" />
                          <span>Get in Touch</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Hover shine effect */}
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-20 bg-gradient-to-r from-transparent via-white to-transparent" />
                </motion.article>
              )
            })}
          </motion.div>
        </div>
      </section>
    </main>
  )
}
