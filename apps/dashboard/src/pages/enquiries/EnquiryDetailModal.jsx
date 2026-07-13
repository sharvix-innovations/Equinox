import { Mail, Phone, Building2, Wrench, Clock, Trash2 } from 'lucide-react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import Avatar from '@/components/ui/Avatar'
import Badge, { StatusBadge } from '@/components/ui/Badge'
import { Select } from '@/components/ui/Field'
import { formatDate } from '@/lib/utils'

const STATUS_OPTIONS = [
  { value: 'new', label: 'New' },
  { value: 'in_progress', label: 'In progress' },
  { value: 'resolved', label: 'Resolved' },
]
const PRIORITY_OPTIONS = [
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
]

function Line({ icon: Icon, children }) {
  return (
    <div className="flex items-center gap-2.5 text-sm text-ink">
      <Icon className="h-4 w-4 shrink-0 text-ink-soft" />
      {children}
    </div>
  )
}

export default function EnquiryDetailModal({ enquiry, open, onClose, onUpdate, onDelete }) {
  if (!enquiry) return null

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="lg"
      footer={
        <>
          <Button variant="danger" icon={Trash2} onClick={onDelete}>
            Delete
          </Button>
          <div className="flex-1" />
          <Button
            as="a"
            href={`mailto:${enquiry.email}`}
            variant="outline"
            icon={Mail}
          >
            Reply
          </Button>
        </>
      }
    >
      <div className="space-y-5">
        <div className="flex items-start gap-4">
          <Avatar name={enquiry.name} size="lg" />
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-semibold text-ink">{enquiry.name}</h2>
            <p className="text-sm text-ink-soft">{enquiry.company}</p>
          </div>
          <StatusBadge status={enquiry.status} />
        </div>

        <div className="grid grid-cols-1 gap-2.5 rounded-xl bg-surface-2 p-4 sm:grid-cols-2">
          <Line icon={Mail}>
            <a href={`mailto:${enquiry.email}`} className="truncate hover:text-brand-green">
              {enquiry.email}
            </a>
          </Line>
          <Line icon={Phone}>{enquiry.phone}</Line>
          <Line icon={Building2}>{enquiry.company}</Line>
          <Line icon={Wrench}>{enquiry.service}</Line>
          <Line icon={Clock}>{formatDate(enquiry.createdAt, { dateStyle: 'medium' })}</Line>
        </div>

        <div>
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-ink-soft">
            Subject
          </p>
          <p className="font-medium text-ink">{enquiry.subject}</p>
        </div>

        <div>
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-ink-soft">
            Message
          </p>
          <p className="rounded-xl border border-line bg-surface p-4 text-sm leading-relaxed text-ink">
            {enquiry.message}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select
            label="Status"
            value={enquiry.status}
            onChange={(e) => onUpdate({ status: e.target.value })}
            options={STATUS_OPTIONS}
          />
          <Select
            label="Priority"
            value={enquiry.priority}
            onChange={(e) => onUpdate({ priority: e.target.value })}
            options={PRIORITY_OPTIONS}
          />
        </div>
      </div>
    </Modal>
  )
}
