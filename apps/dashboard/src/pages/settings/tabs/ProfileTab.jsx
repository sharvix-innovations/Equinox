import { useRef, useState } from 'react'
import { Building2, Save, ShieldCheck, Upload, ImageIcon, Trash2 } from 'lucide-react'
import { useToast } from '@/store/ToastContext'
import { useAuth } from '@/store/AuthContext'

import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input, Textarea, Field } from '@/components/ui/Field'
import Button from '@/components/ui/Button'
import Avatar from '@/components/ui/Avatar'

const INITIAL = {
  name: 'Equinox Environments India Pvt Ltd',
  tagline: 'Engineering a Cleaner Future for Generations',
  phone: '+91 98765 43210',
  email: 'info@equinoxenvi.com',
  address: 'Equinox House, Hinjawadi Phase 2, Pune, Maharashtra 411057, India',
  linkedin: 'https://linkedin.com/company/equinox',
  twitter: 'https://twitter.com/equinox',
}

const MAX_MB = 2

function LogoUpload({ logo, onChange }) {
  const inputRef = useRef(null)
  const toast = useToast()

  const pick = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      toast.error('Please choose an image file')
      return
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      toast.error(`Image must be under ${MAX_MB} MB`)
      return
    }
    const reader = new FileReader()
    reader.onload = () => onChange(reader.result)
    reader.readAsDataURL(file)
  }

  return (
    <Field label="Company logo" hint={`PNG, JPG or SVG · up to ${MAX_MB} MB`}>
      <div className="flex items-center gap-4">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-line bg-surface-2">
          {logo ? (
            <img src={logo} alt="Company logo" className="h-full w-full object-contain p-1.5" />
          ) : (
            <ImageIcon className="h-7 w-7 text-ink-soft/60" />
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={pick}
            className="hidden"
          />
          <Button type="button" variant="outline" size="sm" icon={Upload} onClick={() => inputRef.current?.click()}>
            {logo ? 'Change logo' : 'Upload logo'}
          </Button>
          {logo && (
            <Button type="button" variant="ghost" size="sm" icon={Trash2} onClick={() => onChange(null)}>
              Remove
            </Button>
          )}
        </div>
      </div>
    </Field>
  )
}

export default function ProfileTab() {
  const toast = useToast()
  const { user } = useAuth()
  const [company, setCompany] = useState(INITIAL)
  const [logo, setLogo] = useState('/logo.png')
  const [saving, setSaving] = useState(false)

  const set = (k) => (e) => setCompany((c) => ({ ...c, [k]: e.target.value }))

  const save = async (e) => {
    e.preventDefault()
    setSaving(true)
    await new Promise((r) => setTimeout(r, 700))
    setSaving(false)
    toast.success('Company profile saved')
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-1">
        <CardBody className="flex flex-col items-center text-center">
          <Avatar name={user?.name} size="lg" />
          <p className="mt-3 font-semibold text-ink">{user?.name}</p>
          <p className="text-sm text-ink-soft">{user?.role}</p>
          <p className="mt-1 text-xs text-ink-soft">{user?.email}</p>
          <div className="mt-4 w-full rounded-xl bg-surface-2 p-3 text-left">
            <p className="flex items-center gap-2 text-xs font-medium text-ink-soft">
              <ShieldCheck className="h-4 w-4 text-brand-green" />
              Full administrator access
            </p>
          </div>
        </CardBody>
      </Card>

      <form onSubmit={save} className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-brand-green" /> Company profile
            </CardTitle>
            <Button type="submit" size="sm" icon={Save} loading={saving}>
              Save
            </Button>
          </CardHeader>
          <CardBody className="space-y-4">
            <LogoUpload logo={logo} onChange={setLogo} />
            <div className="h-px bg-line" />
            <Input label="Company name" value={company.name} onChange={set('name')} />
            <Input label="Tagline" value={company.tagline} onChange={set('tagline')} />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="Phone" value={company.phone} onChange={set('phone')} />
              <Input label="Email" type="email" value={company.email} onChange={set('email')} />
            </div>
            <Textarea label="Address" rows={2} value={company.address} onChange={set('address')} />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input label="LinkedIn" value={company.linkedin} onChange={set('linkedin')} />
              <Input label="Twitter / X" value={company.twitter} onChange={set('twitter')} />
            </div>
          </CardBody>
        </Card>
      </form>
    </div>
  )
}
