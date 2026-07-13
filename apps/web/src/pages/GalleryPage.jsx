import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Expand } from 'lucide-react'
import PageBanner from '@/components/layout/PageBanner'
import SectionHeading from '@/components/ui/SectionHeading'
import FilterTabs from '@/components/ui/FilterTabs'
import { gallery, galleryCategories } from '@/data/pages'
import { scaleIn, stagger } from '@/lib/motion'

export default function GalleryPage() {
  useEffect(() => window.scrollTo(0, 0), [])
  const [cat, setCat] = useState('All')
  const [lb, setLb] = useState(-1) // lightbox index into `list`

  const list = cat === 'All' ? gallery : gallery.filter((g) => g.cat === cat)
  const close = () => setLb(-1)
  const nav = (d) => setLb((i) => (i + d + list.length) % list.length)

  useEffect(() => {
    const onKey = (e) => {
      if (lb < 0) return
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') nav(1)
      if (e.key === 'ArrowLeft') nav(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }) // eslint-disable-line

  return (
    <main>
      <PageBanner eyebrow="Moments" title="Gallery" crumb="Gallery" />

      <section className="section-pad">
        <div className="container-x">
          <SectionHeading eyebrow="Our Gallery" title="A look at" highlight="our work & world" subtitle="Our office, events, projects and achievements  all in one place." />

          <div className="mt-10">
            <FilterTabs items={galleryCategories} active={cat} onChange={(c) => { setCat(c); }} />
          </div>

          {/* Masonry grid */}
          <motion.div key={cat} variants={stagger(0.05)} initial="hidden" animate="show" className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
            {list.map((g, i) => (
              <motion.button
                key={g.caption}
                variants={scaleIn}
                onClick={() => setLb(i)}
                className="group relative block w-full overflow-hidden rounded-[1.25rem] shadow-soft"
              >
                <img src={g.src} alt={g.caption} loading="lazy" className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${i % 3 === 0 ? 'h-72' : i % 3 === 1 ? 'h-56' : 'h-64'}`} />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-brand-navy/80 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-green text-white"><Expand className="h-5 w-5" /></span>
                  <p className="mt-3 font-display text-sm font-bold text-white">{g.caption}</p>
                  <span className="text-xs text-white/70">{g.cat}</span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lb >= 0 && list[lb] && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] grid place-items-center bg-brand-navy/90 p-4 backdrop-blur-md"
            onClick={close}
          >
            <button onClick={close} className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"><X className="h-5 w-5" /></button>
            <button onClick={(e) => { e.stopPropagation(); nav(-1) }} className="absolute left-4 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-brand-green sm:left-8"><ChevronLeft className="h-6 w-6" /></button>
            <button onClick={(e) => { e.stopPropagation(); nav(1) }} className="absolute right-4 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white hover:bg-brand-green sm:right-8"><ChevronRight className="h-6 w-6" /></button>
            <motion.figure
              key={lb}
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-4xl overflow-hidden rounded-2xl"
            >
              <img src={list[lb].src} alt={list[lb].caption} className="max-h-[75vh] w-full object-contain" />
              <figcaption className="bg-brand-navy px-6 py-4 text-center text-white">
                <span className="font-display font-bold">{list[lb].caption}</span>
                <span className="ml-3 text-sm text-white/60">{list[lb].cat}</span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
