import { useEffect, useRef } from 'react'
import chevronRight from '../../assets/icons/chevron-right.svg'
import closeIcon from '../../assets/icons/close.svg'
import { getStartedHref, navLinks } from '../../data/navigation'
import { Logo } from '../Logo'

type Props = {
  id: string
  onClose: (restoreFocus: boolean) => void
}

const focusableSelector = 'a[href], button:not([disabled])'

export function MobileMenu({ id, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeButtonRef.current?.focus()

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.stopPropagation()
      onClose(true)
      return
    }
    if (event.key !== 'Tab') return

    // Keep keyboard focus inside the open menu.
    const focusable = panelRef.current?.querySelectorAll<HTMLElement>(focusableSelector)
    if (!focusable || focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <div
      id={id}
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Main menu"
      onKeyDown={handleKeyDown}
      className="animate-menu-in fixed inset-0 z-50 flex flex-col bg-white font-menu lg:hidden"
    >
      <div className="flex flex-1 flex-col overflow-y-auto">
        <div className="flex items-center justify-between px-6 pt-7 pb-[1.3125rem]">
          <Logo onClick={() => onClose(false)} />
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close navigation menu"
            onClick={() => onClose(true)}
            className="flex size-10 items-center justify-center rounded-full hover:bg-surface focus-visible:outline-[0.125rem] focus-visible:outline-offset-[0.125rem] focus-visible:outline-menu-brand"
          >
            <img src={closeIcon} alt="" className="size-5" />
          </button>
        </div>

        <nav aria-label="Main" className="px-5 pt-3">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => onClose(false)}
                  className="flex items-center justify-between rounded-xl p-3.5 text-[1.05rem] leading-[1.575rem] font-semibold text-menu-ink hover:bg-surface focus-visible:outline-[0.125rem] focus-visible:-outline-offset-[0.125rem] focus-visible:outline-menu-brand"
                >
                  {link.mobileLabel ?? link.label}
                  <img src={chevronRight} alt="" className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="flex flex-col gap-3 bg-white px-6 pt-4 pb-9">
        <a
          href="#"
          onClick={() => onClose(false)}
          className="rounded-xl border-[0.0625rem] border-menu-border px-[1.0625rem] py-[0.9375rem] text-[0.98125rem] leading-[1.47rem] font-semibold text-menu-ink hover:bg-surface focus-visible:outline-[0.125rem] focus-visible:outline-offset-[0.125rem] focus-visible:outline-menu-brand text-center"
        >
          Log In
        </a>
        <a
          href={getStartedHref}
          onClick={() => onClose(false)}
          className="rounded-xl bg-linear-to-r from-menu-brand to-menu-brand-end px-4 py-3.5 text-center text-[0.98125rem] leading-[1.47rem] font-semibold text-white shadow-menu-cta hover:brightness-110 focus-visible:outline-[0.125rem] focus-visible:outline-offset-[0.125rem] focus-visible:outline-menu-brand"
        >
          Get Started
        </a>
      </div>
    </div>
  )
}
