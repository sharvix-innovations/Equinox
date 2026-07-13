import { useState } from 'react'
import { AlertTriangle } from 'lucide-react'
import Modal from './Modal'
import Button from './Button'

/**
 * Controlled confirmation dialog. Pass an async `onConfirm`  the
 * dialog shows a spinner until it resolves, then closes.
 */
export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmLabel = 'Delete',
  variant = 'danger',
}) {
  const [busy, setBusy] = useState(false)

  const handleConfirm = async () => {
    try {
      setBusy(true)
      await onConfirm?.()
      onClose?.()
    } finally {
      setBusy(false)
    }
  }

  return (
    <Modal
      open={open}
      onClose={busy ? undefined : onClose}
      size="sm"
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={busy}>
            Cancel
          </Button>
          <Button variant={variant} loading={busy} onClick={handleConfirm}>
            {confirmLabel}
          </Button>
        </>
      }
    >
      <div className="flex gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-danger/10 text-danger">
          <AlertTriangle className="h-5 w-5" />
        </span>
        <div className="space-y-1">
          <h2 className="text-base font-semibold text-ink">{title}</h2>
          <p className="text-sm text-ink-soft">{message}</p>
        </div>
      </div>
    </Modal>
  )
}
