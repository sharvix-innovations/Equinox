import { useEffect, useState } from 'react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import { Input, Textarea, Select, Field } from '@/components/ui/Field'
import Toggle from '@/components/ui/Toggle'

const CATEGORIES = ['Monitoring', 'Treatment', 'Testing', 'Software']
const STATUSES = [
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
  { value: 'archived', label: 'Archived' },
]

const BLANK = {
  name: '',
  category: 'Monitoring',
  price: '',
  stock: '',
  status: 'draft',
  short: '',
  featured: false,
}

export default function ProductFormModal({ open, onClose, onSubmit, initial }) {
  const isEdit = Boolean(initial)
  const [form, setForm] = useState(BLANK)
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (open) {
      setForm(initial ? { ...BLANK, ...initial } : BLANK)
      setErrors({})
    }
  }, [open, initial])

  const set = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e?.target ? e.target.value : e }))

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Name is required'
    if (form.price === '' || Number(form.price) < 0) next.price = 'Enter a valid price'
    if (form.stock === '' || Number(form.stock) < 0) next.stock = 'Enter a valid quantity'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSaving(true)
    try {
      await onSubmit({
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      })
      onClose()
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal
      open={open}
      onClose={saving ? undefined : onClose}
      title={isEdit ? 'Edit product' : 'New product'}
      description={isEdit ? initial?.name : 'Add a product to the catalog.'}
      size="lg"
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          <Button form="product-form" type="submit" loading={saving}>
            {isEdit ? 'Save changes' : 'Create product'}
          </Button>
        </>
      }
    >
      <form id="product-form" onSubmit={submit} className="space-y-4">
        <Input
          label="Product name"
          required
          value={form.name}
          onChange={set('name')}
          error={errors.name}
          placeholder="e.g. Continuous Emission Monitoring System"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select label="Category" value={form.category} onChange={set('category')} options={CATEGORIES} />
          <Select label="Status" value={form.status} onChange={set('status')} options={STATUSES} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Price (₹)"
            type="number"
            min="0"
            value={form.price}
            onChange={set('price')}
            error={errors.price}
            placeholder="0"
          />
          <Input
            label="Stock / availability"
            type="number"
            min="0"
            value={form.stock}
            onChange={set('stock')}
            error={errors.stock}
            placeholder="0"
          />
        </div>

        <Textarea
          label="Short description"
          value={form.short}
          onChange={set('short')}
          rows={3}
          placeholder="One-line summary shown on the products page."
        />

        <Field label="Featured" hint="Featured products are highlighted on the website.">
          <div className="flex items-center gap-3 pt-1">
            <Toggle checked={form.featured} onChange={(v) => setForm((f) => ({ ...f, featured: v }))} />
            <span className="text-sm text-ink-soft">
              {form.featured ? 'Shown in featured section' : 'Not featured'}
            </span>
          </div>
        </Field>
      </form>
    </Modal>
  )
}
