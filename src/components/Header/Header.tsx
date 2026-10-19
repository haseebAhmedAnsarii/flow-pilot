import { useEffect, useRef, useState } from 'react'
import menuIcon from '../../assets/icons/menu.svg'
import { getStartedHref, navLinks } from '../../data/navigation'
import { Container } from '../Container'
import { Logo } from '../Logo'
import { MobileMenu } from '../MobileMenu'

const menuId = 'mobile-menu'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  // The mobile menu is hidden from lg up, so close it if the viewport grows past that while it is
  // open (rotation, resize); otherwise it would keep locking page scroll behind the desktop nav.
  useEffect(() => {
    if (!menuOpen || typeof window.matchMedia !== 'function') return
    const desktop = window.matchMedia('(min-width: 64rem)')
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false)
    }
    desktop.addEventListener('change', closeOnDesktop)
    return () => desktop.removeEventListener('change', closeOnDesktop)
  }, [menuOpen])

  const closeMenu = (restoreFocus: boolean) => {
    setMenuOpen(false)
    if (restoreFocus) menuButtonRef.current?.focus()
  }

  return (
    <header className="sticky top-0 z-40 border-b-[0.0625rem] border-border-soft bg-white">
      <Container className="flex h-16 items-center justify-between lg:h-[4.75rem]">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-md text-[0.8125rem] leading-[1.21875rem] font-medium text-body transition-colors hover:text-ink focus-visible:outline-[0.125rem] focus-visible:outline-offset-[0.25rem] focus-visible:outline-brand"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <a
            href="#"
            className="rounded-md text-[0.8125rem] leading-[1.21875rem] font-semibold text-ink focus-visible:outline-[0.125rem] focus-visible:outline-offset-[0.25rem] focus-visible:outline-brand"
          >
            Log In
          </a>
          <a
            href={getStartedHref}
            className="flex h-[2.625rem] w-[9.375rem] items-center justify-center rounded-[0.625rem] bg-linear-to-r from-brand to-accent text-[0.8125rem] leading-[1.21875rem] font-semibold text-white shadow-cta transition hover:brightness-110 focus-visible:outline-[0.125rem] focus-visible:outline-offset-[0.125rem] focus-visible:outline-brand"
          >
            Get Started
          </a>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={() => setMenuOpen(true)}
          className="-mr-2 rounded-md p-2 focus-visible:outline-[0.125rem] focus-visible:outline-offset-[0.125rem] focus-visible:outline-brand lg:hidden"
        >
          <img src={menuIcon} alt="" className="h-[1.53125rem] w-[1.61875rem]" />
        </button>
      </Container>

      {menuOpen && <MobileMenu id={menuId} onClose={closeMenu} />}
    </header>
  )
}
