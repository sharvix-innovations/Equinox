import { useEffect, useState } from 'react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import { Input, Select } from '@/components/ui/Field'
import { slugify } from '@/lib/utils'

const STATUSES = [
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'past', label: 'Past' },
]

const BLANK = {
  title: '',
  date: '',
  location: '',
  capacity: '',
  registrations: 0,
  status: 'upcoming',
}

export default function EventFormModal({ open, onClose, onSubmit, initial }) {
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

  const validate = () => {
    const next = {}
    if (!form.title.trim()) next.title = 'Title is required'
    if (!form.date) next.date = 'Pick a date'
    if (!form.location.trim()) next.location = 'Location is required'
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
        slug: initial?.slug || slugify(form.title),
        capacity: Number(form.capacity) || 0,
        registrations: Number(form.registrations) || 0,
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
      title={isEdit ? 'Edit event' : 'New event'}
      description={isEdit ? initial?.title : 'Schedule an event or workshop.'}
      size="lg"
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          <Button form="event-form" type="submit" loading={saving}>
            {isEdit ? 'Save changes' : 'Create event'}
          </Button>
        </>
      }
    >
      <form id="event-form" onSubmit={submit} className="space-y-4">
        <Input
          label="Event title"
          required
          value={form.title}
          onChange={set('title')}
          error={errors.title}
          placeholder="e.g. Zero Liquid Discharge Masterclass"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Date" type="date" required value={form.date} onChange={set('date')} error={errors.date} />
          <Select label="Status" value={form.status} onChange={set('status')} options={STATUSES} />
        </div>
        <Input
          label="Location"
          required
          value={form.location}
          onChange={set('location')}
          error={errors.location}
          placeholder="e.g. Equinox HQ, Pune"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input label="Capacity" type="number" min="0" value={form.capacity} onChange={set('capacity')} placeholder="0" />
          <Input
            label="Registrations"
            type="number"
            min="0"
            value={form.registrations}
            onChange={set('registrations')}
            placeholder="0"
          />
        </div>
      </form>
    </Modal>
  )
}
