import { useEffect, useState } from 'react'

/** Returns a debounced copy of `value` that updates after `delay` ms. */
export function useDebounce(value, delay = 250) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}
