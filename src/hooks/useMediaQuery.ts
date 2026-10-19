import { useSyncExternalStore } from 'react'

// True while the media query matches. Always false where matchMedia is unavailable (for example
// in the jsdom test environment).
export function useMediaQuery(query: string): boolean {
  const subscribe = (onChange: () => void) => {
    if (typeof window.matchMedia !== 'function') return () => {}
    const list = window.matchMedia(query)
    list.addEventListener('change', onChange)
    return () => list.removeEventListener('change', onChange)
  }
  const getSnapshot = () =>
    typeof window.matchMedia === 'function' && window.matchMedia(query).matches

  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}
