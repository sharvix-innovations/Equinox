import { createContext, useCallback, useContext, useRef, useState } from 'react'

const ToastContext = createContext(null)

let counter = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const timers = useRef({})

  const dismiss = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id))
    clearTimeout(timers.current[id])
    delete timers.current[id]
  }, [])

  const push = useCallback(
    (toast) => {
      const id = ++counter
      const item = { id, variant: 'success', duration: 3500, ...toast }
      setToasts((t) => [...t, item])
      if (item.duration) {
        timers.current[id] = setTimeout(() => dismiss(id), item.duration)
      }
      return id
    },
    [dismiss],
  )

  const toast = {
    success: (message, title) => push({ variant: 'success', message, title }),
    error: (message, title) => push({ variant: 'error', message, title }),
    info: (message, title) => push({ variant: 'info', message, title }),
    push,
    dismiss,
  }

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>')
  return ctx.toast
}

export function useToastState() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToastState must be used within <ToastProvider>')
  return { toasts: ctx.toasts, dismiss: ctx.dismiss }
}
