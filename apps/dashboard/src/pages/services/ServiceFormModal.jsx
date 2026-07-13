import { useEffect, useState } from 'react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import { Input, Textarea, Select } from '@/components/ui/Field'

const GROUPS = ['Clearances', 'Studies & Audits', 'Treatment', 'Monitoring', 'Compliance', 'CER & CSR']
const STATUSES = [
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
]

const BLANK = { title: '', group: 'Clearances', status: 'draft', short: '' }

export default function ServiceFormModal({ open, onClose, onSubmit, initial }) {
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

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) {
      setErrors({ title: 'Title is required' })
      return
    }
    setSaving(true)
    try {
      await onSubmit({ ...form, enquiries: initial?.enquiries ?? 0 })
      onClose()
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal
      open={open}
      onClose={saving ? undefined : onClose}
      title={isEdit ? 'Edit service' : 'New service'}
      description={isEdit ? initial?.title : 'Add a service offering.'}
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          <Button form="service-form" type="submit" loading={saving}>
            {isEdit ? 'Save changes' : 'Create service'}
          </Button>
        </>
      }
    >
      <form id="service-form" onSubmit={submit} className="space-y-4">
        <Input
          label="Service title"
          required
          value={form.title}
          onChange={set('title')}
          error={errors.title}
          placeholder="e.g. Environmental Clearance"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select label="Group" value={form.group} onChange={set('group')} options={GROUPS} />
          <Select label="Status" value={form.status} onChange={set('status')} options={STATUSES} />
        </div>
        <Textarea
          label="Short description"
          value={form.short}
          onChange={set('short')}
          rows={3}
          placeholder="One-line summary shown on the services page."
        />
      </form>
    </Modal>
  )
}
