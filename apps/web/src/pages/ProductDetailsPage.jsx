import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, Download, ArrowUpRight, ArrowLeft } from 'lucide-react'
import PageBanner from '@/components/layout/PageBanner'
import SectionHeading from '@/components/ui/SectionHeading'
import Button from '@/components/ui/Button'
import { products, IMG } from '@/data/pages'
import { fadeUp, viewport } from '@/lib/motion'

const gallery = [IMG.turbines, IMG.water, IMG.forest, IMG.solar]

export default function ProductDetailsPage() {
  const { slug } = useParams()
  const product = products.find((p) => p.slug === slug)
  const [main, setMain] = useState(product?.image || gallery[0])

  useEffect(() => {
    window.scrollTo(0, 0)
    if (product) setMain(product.image)
  }, [slug, product])

  if (!product) {
    return (
      <main>
        <PageBanner title="Product Not Found" crumb="Products" />
        <div className="section-pad container-x text-center">
          <p className="text-ink-soft">We couldn't find that product.</p>
          <Button as={Link} to="/products" icon={ArrowLeft} className="mt-6">Back to Products</Button>
        </div>
      </main>
    )
  }

  const Icon = product.icon
  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 3)
  const thumbs = [product.image, ...gallery.filter((g) => g !== product.image)].slice(0, 4)

  return (
    <main>
      <PageBanner eyebrow="Product" title={product.name} crumb={product.category} />

      <section className="section-pad">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
            <div className="overflow-hidden rounded-[2rem] shadow-card">
              <img src={main} alt={product.name} className="aspect-[4/3] w-full object-cover" />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {thumbs.map((t, i) => (
                <button key={i} onClick={() => setMain(t)} className={`overflow-hidden rounded-xl border-2 transition ${main === t ? 'border-brand-green' : 'border-transparent opacity-70 hover:opacity-100'}`}>
                  <img src={t} alt="" className="h-20 w-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-green/10 text-brand-green"><Icon className="h-6 w-6" /></span>
              <span className="rounded-full bg-brand-green/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-green">{product.category}</span>
            </div>
            <h1 className="mt-4 font-display text-3xl font-extrabold text-ink sm:text-4xl">{product.name}</h1>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">{product.desc}</p>

            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {product.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm font-medium text-ink">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-green" /> {f}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button as={Link} to="/contact" icon={ArrowUpRight}>Enquire Now</Button>
              <a href="#" className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-brand-green hover:text-brand-green">
                <Download className="h-4 w-4" /> Download Datasheet (PDF)
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Specs */}
      <section className="section-pad pt-0">
        <div className="container-x">
          <SectionHeading align="left" eyebrow="Specifications" title="Technical" highlight="details" />
          <div className="mt-8 overflow-hidden rounded-2xl border border-line">
            <table className="w-full text-left text-sm">
              <tbody>
                {product.specs.map((s, i) => (
                  <tr key={s.label} className={i % 2 ? 'bg-surface-2' : 'bg-surface'}>
                    <th className="w-1/3 px-6 py-4 font-display font-bold text-ink">{s.label}</th>
                    <td className="px-6 py-4 text-ink-soft">{s.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="section-pad bg-surface-2 pt-0">
          <div className="container-x">
            <SectionHeading eyebrow="You may also like" title="Related" highlight="products" />
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {related.map((p) => (
                <Link key={p.slug} to={`/products/${p.slug}`} className="group overflow-hidden rounded-[1.5rem] border border-line bg-surface shadow-soft transition-all hover:-translate-y-1 hover:shadow-card">
                  <div className="h-40 overflow-hidden">
                    <img src={p.image} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-bold text-ink group-hover:text-brand-green">{p.name}</h3>
                    <p className="mt-1 text-xs text-ink-soft">{p.short}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
