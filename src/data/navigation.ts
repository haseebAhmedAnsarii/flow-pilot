export type NavLink = {
  label: string
  // Longer label used in the mobile menu, where there is room for it.
  mobileLabel?: string
  href: string
}

// Section ids used here must match the ids of the page sections.
export const navLinks: NavLink[] = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', mobileLabel: 'FAQ & Contact', href: '#contact' },
]

export const getStartedHref = '#contact'
