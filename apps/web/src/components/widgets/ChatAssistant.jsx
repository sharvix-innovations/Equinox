import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageSquare, X, Send, Sparkles, Bot } from 'lucide-react'
import { company } from '@/data/site'

// Lightweight rule-based assistant (no backend). Swap `getReply` with a real
// API call (e.g. Claude) to make it fully conversational.
const SUGGESTIONS = [
  'What is an EIA report?',
  'How long does EC take?',
  'Do you handle ETP design?',
  'Talk to a consultant',
]

function getReply(text) {
  const t = text.toLowerCase()
  if (t.includes('eia')) return 'An EIA (Environmental Impact Assessment) evaluates a project’s environmental effects before approval. As QCI-NABET accredited consultants, we prepare defensible EIA reports backed by NABL lab data. Want us to scope yours?'
  if (t.includes('ec') || t.includes('clearance') || t.includes('long')) return 'Environmental Clearance timelines vary by category, but our streamlined filings and EAC support typically cut months off the process. Share your project type and we’ll estimate it.'
  if (t.includes('etp') || t.includes('stp') || t.includes('water')) return 'Yes  we design, build and optimise ETP & STP systems, including reuse and Zero Liquid Discharge. I can connect you with our water engineering lead.'
  if (t.includes('lake') || t.includes('revival')) return 'Our Lake Revival programme has restored 50+ waterbodies using bioremediation, desilting and wetland creation. Curious about a specific lake?'
  if (t.includes('consultant') || t.includes('talk') || t.includes('call') || t.includes('contact')) return `Happy to help! Reach us at ${company.phone} or ${company.email}, or use the contact form below and we’ll respond within one business day.`
  if (t.includes('cost') || t.includes('price') || t.includes('fee')) return 'Pricing depends on project category and scope. Send us a few details via the contact form for a tailored quote  no obligation.'
  return 'Great question! Our team can give you a precise answer. You can ask about EIA, Environmental Clearance, ETP/STP, Lake Revival, or compliance  or tap “Talk to a consultant”.'
}

export default function ChatAssistant() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    { from: 'bot', text: `Hi! I’m Equi, the ${company.shortName} assistant. How can I help with your environmental project today?` },
  ])
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open])

  const send = (text) => {
    const value = (text ?? input).trim()
    if (!value) return
    setMessages((m) => [...m, { from: 'user', text: value }])
    setInput('')
    setTimeout(() => {
      setMessages((m) => [...m, { from: 'bot', text: getReply(value) }])
    }, 500)
  }

  return (
    <>
      {/* Launcher */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, type: 'spring' }}
        onClick={() => setOpen((o) => !o)}
        aria-label="Open chat assistant"
        className="fixed bottom-6 right-6 z-[70] grid h-14 w-14 place-items-center rounded-full bg-brand-gradient text-white shadow-glow animate-pulse-ring"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? 'x' : 'chat'}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {open ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-[70] flex h-[30rem] w-[min(22rem,calc(100vw-3rem))] flex-col overflow-hidden rounded-4xl border border-line bg-surface shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-brand-navy p-4 text-white">
              <span className="relative grid h-10 w-10 place-items-center rounded-full bg-white/10">
                <Bot className="h-5 w-5 text-brand-green" />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-brand-navy bg-brand-green" />
              </span>
              <div>
                <div className="font-display text-sm font-bold">Equi · AI Assistant</div>
                <div className="text-xs text-slate-400">Typically replies instantly</div>
              </div>
              <Sparkles className="ml-auto h-4 w-4 text-brand-green" />
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-surface-2 p-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.from === 'user'
                        ? 'rounded-br-md bg-brand-blue text-white'
                        : 'rounded-bl-md border border-line bg-surface text-ink'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Suggestions */}
            {messages.length < 3 && (
              <div className="flex flex-wrap gap-2 border-t border-line bg-surface px-4 pt-3">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-full border border-line bg-surface-2 px-3 py-1.5 text-xs text-ink-soft transition hover:border-brand-sky hover:text-brand-blue"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={(e) => { e.preventDefault(); send() }}
              className="flex items-center gap-2 border-t border-line bg-surface p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about our services…"
                className="flex-1 rounded-full border border-line bg-surface-2 px-4 py-2.5 text-sm text-ink outline-none focus:border-brand-blue"
              />
              <button
                type="submit"
                aria-label="Send"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-gradient text-white transition-transform hover:scale-105"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
