import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Plus, Download, ArrowRight, CalendarClock, Video, Pause, Play, Square,
  CalendarDays, UserPlus,
} from 'lucide-react'
import { useData } from '@/store/DataContext'
import { analytics } from '@/mocks/db'
import { formatDate } from '@/lib/utils'
import { stagger } from '@/lib/motion'

import StatCard from '@/components/common/StatCard'
import { Card, CardBody, CardHeader, CardTitle } from '@/components/ui/Card'
import { StatusBadge } from '@/components/ui/Badge'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import Spinner from '@/components/ui/Spinner'
import PillBarChart from '@/components/charts/PillBarChart'
import GaugeChart from '@/components/charts/GaugeChart'

const EVT_TONES = [
  'bg-brand-sky/20 text-brand-green',
  'bg-info/10 text-info',
  'bg-warning/15 text-warning',
  'bg-brand-navy/10 text-brand-navy',
  'bg-danger/10 text-danger',
]

/* ── Dark textured "session" tracker (mirrors the reference Time Tracker) ── */
function SessionTracker() {
  const [secs, setSecs] = useState(5048)
  const [running, setRunning] = useState(true)

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setSecs((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [running])

  const hh = String(Math.floor(secs / 3600)).padStart(2, '0')
  const mm = String(Math.floor((secs % 3600) / 60)).padStart(2, '0')
  const ss = String(secs % 60).padStart(2, '0')

  return (
    <div className="relative h-full overflow-hidden rounded-2xl bg-navy-radial p-5 text-white">
      <div className="absolute -right-10 top-4 h-40 w-40 rounded-full bg-brand-green/20 blur-2xl" />
      <div className="absolute inset-0 bg-dotgrid opacity-[0.08]" />
      <div className="relative flex h-full flex-col">
        <p className="text-sm font-semibold text-white/90">Session Tracker</p>
        <p className="mt-6 font-display text-4xl font-bold tabular-nums tracking-tight sm:text-5xl">
          {hh}:{mm}:{ss}
        </p>
        <div className="mt-auto flex items-center gap-2 pt-5">
          <button
            onClick={() => setRunning((r) => !r)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-navy transition-transform hover:scale-105"
            aria-label={running ? 'Pause' : 'Resume'}
          >
            {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <button
            onClick={() => {
              setRunning(false)
              setSecs(0)
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-danger text-white transition-transform hover:scale-105"
            aria-label="Reset"
          >
            <Square className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function DashboardHome() {
  const { data, loading } = useData()

  const stats = useMemo(() => {
    const e = data.enquiries
    return {
      total: e.length,
      resolved: e.filter((x) => x.status === 'resolved').length,
      inProgress: e.filter((x) => x.status === 'in_progress').length,
      neu: e.filter((x) => x.status === 'new').length,
    }
  }, [data.enquiries])

  const upcoming = useMemo(
    () =>
      [...data.events]
        .filter((e) => e.status === 'upcoming')
        .sort((a, b) => new Date(a.date) - new Date(b.date)),
    [data.events],
  )
  const nextEvent = upcoming[0]

  const teamPreview = data.team.slice(0, 4)

  if (loading) {
    return (
      <div className="grid h-[60vh] place-items-center">
        <Spinner label="Loading overview…" />
      </div>
    )
  }

  const resolvedPct = stats.total ? Math.round((stats.resolved / stats.total) * 100) : 0

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-ink">Dashboard</h1>
          <p className="mt-1 text-sm text-ink-soft">
            Plan, prioritize, and manage your content with ease.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <Button as={Link} to="/products" icon={Plus} size="lg" className="rounded-full">
            Add Product
          </Button>
          <Button as={Link} to="/enquiries" variant="outline" icon={Download} size="lg" className="rounded-full">
            View Enquiries
          </Button>
        </div>
      </div>

      {/* KPI row */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <StatCard filled label="Total Enquiries" value={stats.total} delta={5} to="/enquiries" />
        <StatCard label="Resolved" value={stats.resolved} delta={6} to="/enquiries" />
        <StatCard label="In Progress" value={stats.inProgress} delta={2} to="/enquiries" />
        <StatCard label="New / Pending" value={stats.neu} deltaLabel="Awaiting response" to="/enquiries" />
      </motion.div>

      {/* Analytics · Reminders · Events */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <Card className="lg:col-span-6">
          <CardHeader>
            <CardTitle>Enquiry Analytics</CardTitle>
            <span className="text-xs text-ink-soft">This week</span>
          </CardHeader>
          <CardBody>
            <PillBarChart data={analytics.enquiriesWeek} />
          </CardBody>
        </Card>

        {/* Reminders */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Reminders</CardTitle>
          </CardHeader>
          <CardBody className="flex h-[calc(100%-3.75rem)] flex-col">
            {nextEvent ? (
              <>
                <p className="text-lg font-semibold leading-snug text-ink">{nextEvent.title}</p>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-ink-soft">
                  <CalendarClock className="h-4 w-4" />
                  {formatDate(nextEvent.date)} · {nextEvent.location}
                </p>
                <Button as={Link} to="/events" icon={Video} className="mt-auto w-full rounded-xl">
                  View event
                </Button>
              </>
            ) : (
              <p className="text-sm text-ink-soft">No upcoming events.</p>
            )}
          </CardBody>
        </Card>

        {/* Upcoming events list */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Events</CardTitle>
            <Button as={Link} to="/events" variant="ghost" size="sm" icon={Plus}>
              New
            </Button>
          </CardHeader>
          <CardBody className="space-y-3.5 py-4">
            {upcoming.slice(0, 4).map((ev, i) => (
              <Link key={ev.id} to="/events" className="flex items-start gap-2.5 group">
                <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${EVT_TONES[i % EVT_TONES.length]}`}>
                  <CalendarDays className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-ink group-hover:text-brand-green">
                    {ev.title}
                  </p>
                  <p className="text-xs text-ink-soft">Due: {formatDate(ev.date)}</p>
                </div>
              </Link>
            ))}
          </CardBody>
        </Card>
      </div>

      {/* Team · Progress · Tracker */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Team */}
        <Card className="lg:col-span-5">
          <CardHeader>
            <CardTitle>Team</CardTitle>
            <Button as={Link} to="/team" variant="ghost" size="sm" icon={UserPlus}>
              Add member
            </Button>
          </CardHeader>
          <CardBody className="divide-y divide-line py-0">
            {teamPreview.map((m) => (
              <div key={m.id} className="flex items-center gap-3 py-3">
                <Avatar name={m.name} size="md" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-ink">{m.name}</p>
                  <p className="truncate text-xs text-ink-soft">
                    <span className="text-ink-soft">Focus: </span>
                    <span className="font-medium text-ink">{m.spec}</span>
                  </p>
                </div>
                <StatusBadge status={m.status} />
              </div>
            ))}
          </CardBody>
        </Card>

        {/* Progress gauge */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Enquiry Progress</CardTitle>
          </CardHeader>
          <CardBody className="flex items-center justify-center py-6">
            <GaugeChart
              centerValue={`${resolvedPct}%`}
              centerLabel="Resolved"
              segments={[
                { label: 'Completed', value: stats.resolved, color: '#2E9E43' },
                { label: 'In Progress', value: stats.inProgress, color: '#0F3320' },
              ]}
            />
          </CardBody>
        </Card>

        {/* Tracker */}
        <div className="lg:col-span-3">
          <SessionTracker />
        </div>
      </div>

      {/* Latest enquiries */}
      <Card>
        <CardHeader>
          <CardTitle>Latest enquiries</CardTitle>
          <Link
            to="/enquiries"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-green hover:underline"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </CardHeader>
        <CardBody className="p-0">
          <div className="divide-y divide-line">
            {[...data.enquiries]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 5)
              .map((e) => (
                <Link
                  key={e.id}
                  to="/enquiries"
                  className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-brand-gray/50"
                >
                  <Avatar name={e.name} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-ink">{e.name}</p>
                    <p className="truncate text-xs text-ink-soft">{e.subject}</p>
                  </div>
                  <span className="hidden text-xs text-ink-soft sm:block">{e.service}</span>
                  <StatusBadge status={e.status} />
                </Link>
              ))}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
