import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { FileText } from 'lucide-react'
import PageBanner from '@/components/layout/PageBanner'
import { fadeUp, viewport } from '@/lib/motion'

// Shared layout for Privacy Policy & Terms  content-editable via the `sections` prop.
export default function LegalPage({ title, crumb, updated, intro, sections }) {
  useEffect(() => window.scrollTo(0, 0), [])
  return (
    <main>
      <PageBanner eyebrow="Legal" title={title} crumb={crumb || title} />

      <section className="section-pad">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_2.4fr]">
          {/* TOC */}
          <aside className="h-fit lg:sticky lg:top-28">
            <div className="rounded-2xl border border-line bg-surface-2 p-6">
              <p className="flex items-center gap-2 font-display text-sm font-bold text-ink">
                <FileText className="h-4 w-4 text-brand-green" /> Contents
              </p>
              <ol className="mt-4 space-y-2 text-sm">
                {sections.map((s, i) => (
                  <li key={s.h}>
                    <a href={`#s${i + 1}`} className="text-ink-soft transition-colors hover:text-brand-green">
                      {i + 1}. {s.h}
                    </a>
                  </li>
                ))}
              </ol>
              <p className="mt-6 border-t border-line pt-4 text-xs text-ink-soft">Last updated: {updated}</p>
            </div>
          </aside>

          {/* Body */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport} className="max-w-3xl">
            {intro && <p className="text-base leading-relaxed text-ink-soft">{intro}</p>}
            <div className="mt-8 space-y-10">
              {sections.map((s, i) => (
                <div key={s.h} id={`s${i + 1}`} className="scroll-mt-28">
                  <h2 className="font-display text-xl font-bold text-ink sm:text-2xl">
                    <span className="text-brand-green">{i + 1}.</span> {s.h}
                  </h2>
                  {s.p.map((para, j) => (
                    <p key={j} className="mt-3 text-base leading-relaxed text-ink-soft">{para}</p>
                  ))}
                </div>
              ))}
            </div>
            <p className="mt-12 rounded-2xl border border-line bg-surface-2 p-5 text-sm text-ink-soft">
              This document is provided as a structured template. Final legal copy should be reviewed and
              provided by the client, and is intended to be admin-editable via the CMS.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
