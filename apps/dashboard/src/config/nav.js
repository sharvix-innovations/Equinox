import {
  LayoutDashboard,
  Package,
  Wrench,
  CalendarDays,
  Images,
  Building2,
  Users,
  Inbox,
  Settings,
} from 'lucide-react'

/**
 * Sidebar navigation. `badge` may be a string key resolved at render
 * time against live counts (e.g. open enquiries).
 */
export const navSections = [
  {
    heading: null,
    items: [{ label: 'Overview', to: '/', icon: LayoutDashboard, end: true }],
  },
  {
    heading: 'Content',
    items: [
      { label: 'Products', to: '/products', icon: Package },
      { label: 'Services', to: '/services', icon: Wrench },
      { label: 'Events', to: '/events', icon: CalendarDays },
      { label: 'Gallery', to: '/gallery', icon: Images },
    ],
  },
  {
    heading: 'Relationships',
    items: [
      { label: 'Clients', to: '/clients', icon: Building2 },
      { label: 'Team', to: '/team', icon: Users },
      { label: 'Enquiries', to: '/enquiries', icon: Inbox, badge: 'openEnquiries' },
    ],
  },
  {
    heading: 'System',
    items: [{ label: 'Settings', to: '/settings', icon: Settings }],
  },
]
