import type { ComponentPropsWithoutRef } from 'react'

// Shared page container: centred, capped at 90rem, with the side gutters used in the designs
// (1.25rem on mobile, 2rem from sm, 4rem from lg). Use inside every section.
export function Container({ className = '', ...rest }: ComponentPropsWithoutRef<'div'>) {
  return (
    <div className={`mx-auto w-full max-w-[90rem] px-5 sm:px-8 lg:px-16 ${className}`} {...rest} />
  )
}
