import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Trash2, Images } from 'lucide-react'
import { useCollection } from '@/store/DataContext'
import { stagger, scaleIn } from '@/lib/motion'

import PageHeader from '@/components/common/PageHeader'
import { FilterChips } from '@/components/common/Toolbar'
import EmptyState from '@/components/common/EmptyState'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import { Input, Select } from '@/components/ui/Field'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import { Skeleton } from '@/components/ui/Spinner'

const CATEGORIES = ['Our Office', 'Projects', 'Events', 'Achievements']
const FILTERS = ['All', ...CATEGORIES]

function AddImageModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState({ src: '', caption: '', category: 'Projects' })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (open) {
      setForm({ src: '', caption: '', category: 'Projects' })
      setError('')
    }
  }, [open])

  const submit = async (e) => {
    e.preventDefault()
    if (!/^https?:\/\//.test(form.src.trim())) {
      setError('Enter a valid image URL')
      return
    }
    setSaving(true)
    try {
      await onSubmit(form)
      onClose()
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal
      open={open}
      onClose={saving ? undefined : onClose}
      title="Add image"
      description="Add a photo to the website gallery."
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          <Button form="image-form" type="submit" loading={saving}>
            Add image
          </Button>
        </>
      }
    >
      <form id="image-form" onSubmit={submit} className="space-y-4">
        <Input
          label="Image URL"
          required
          value={form.src}
          onChange={(e) => setForm({ ...form, src: e.target.value })}
          error={error}
          placeholder="https://…"
        />
        {form.src && /^https?:\/\//.test(form.src) && (
          <img
            src={form.src}
            alt="Preview"
            className="h-40 w-full rounded-xl border border-line object-cover"
          />
        )}
        <Input
          label="Caption"
          value={form.caption}
          onChange={(e) => setForm({ ...form, caption: e.target.value })}
          placeholder="Short caption"
        />
        <Select
          label="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          options={CATEGORIES}
        />
      </form>
    </Modal>
  )
}

export default function GalleryPage() {
  const { items, loading, create, remove } = useCollection('gallery')
  const [filter, setFilter] = useState('All')
  const [adding, setAdding] = useState(false)
  const [deleting, setDeleting] = useState(null)

  const shown = useMemo(
    () => (filter === 'All' ? items : items.filter((g) => g.category === filter)),
    [items, filter],
  )

  return (
    <div className="space-y-6">
      <PageHeader title="Gallery" subtitle={`${items.length} images across the website`}>
        <Button icon={Plus} onClick={() => setAdding(true)}>
          Add image
        </Button>
      </PageHeader>

      <FilterChips options={FILTERS} value={filter} onChange={setFilter} />

      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[4/3]" />
          ))}
        </div>
      ) : shown.length === 0 ? (
        <div className="panel">
          <EmptyState icon={Images} title="No images" message="Add images to populate the gallery." />
        </div>
      ) : (
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        >
          {shown.map((g) => (
            <motion.div
              key={g.id}
              variants={scaleIn}
              className="group relative overflow-hidden rounded-2xl border border-line bg-surface shadow-soft"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={g.src}
                  alt={g.caption}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-navy/85 to-transparent p-3">
                <Badge tone="green" className="mb-1">
                  {g.category}
                </Badge>
                <p className="truncate text-sm font-medium text-white">{g.caption}</p>
              </div>
              <button
                onClick={() => setDeleting(g)}
                className="absolute right-2 top-2 rounded-lg bg-white/90 p-1.5 text-danger opacity-0 shadow transition-opacity hover:bg-white group-hover:opacity-100"
                aria-label="Delete image"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}

      <AddImageModal open={adding} onClose={() => setAdding(false)} onSubmit={create} />
      <ConfirmDialog
        open={deleting != null}
        onClose={() => setDeleting(null)}
        onConfirm={() => remove(deleting.id)}
        title="Delete image?"
        message="This image will be removed from the gallery."
      />
    </div>
  )
}
