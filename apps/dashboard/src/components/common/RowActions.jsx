import { MoreHorizontal, Pencil, Trash2, Eye } from 'lucide-react'
import Dropdown, { MenuItem, MenuDivider } from '../ui/Dropdown'

/**
 * Standard "…" actions menu for a table row. Any handler left undefined
 * hides its item.
 */
export default function RowActions({ onView, onEdit, onDelete }) {
  return (
    <Dropdown
      trigger={
        <button
          className="rounded-lg p-1.5 text-ink-soft hover:bg-brand-gray hover:text-ink"
          aria-label="Row actions"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreHorizontal className="h-4.5 w-4.5" />
        </button>
      }
    >
      {onView && (
        <MenuItem icon={Eye} onClick={onView}>
          View
        </MenuItem>
      )}
      {onEdit && (
        <MenuItem icon={Pencil} onClick={onEdit}>
          Edit
        </MenuItem>
      )}
      {onDelete && (
        <>
          {(onView || onEdit) && <MenuDivider />}
          <MenuItem icon={Trash2} danger onClick={onDelete}>
            Delete
          </MenuItem>
        </>
      )}
    </Dropdown>
  )
}
