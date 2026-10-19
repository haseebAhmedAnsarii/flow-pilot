import type { ReactNode } from 'react'

type Props = {
  href: string
  variant?: 'primary' | 'secondary'
  className?: string
  children: ReactNode
}

const base =
  'inline-flex items-center justify-center rounded-[0.625rem] font-semibold transition focus-visible:outline-[0.125rem] focus-visible:outline-offset-[0.125rem] focus-visible:outline-brand'

const variants = {
  primary: 'bg-linear-to-r from-brand to-accent text-white shadow-cta hover:brightness-110',
  secondary: 'border-[0.0625rem] border-border bg-white text-ink hover:bg-surface',
}

export function Button({ href, variant = 'primary', className = '', children }: Props) {
  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </a>
  )
}
