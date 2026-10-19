import type { ReactNode } from 'react'

type Props = {
  id: string
  label: string
  error?: string
  className?: string
  children: ReactNode
}

// Label + control + validation message. The control must set aria-describedby={`${id}-error`}
// and aria-invalid itself; this component only renders the label and the message.
export function FormField({ id, label, error, className = '', children }: Props) {
  return (
    <div className={`flex flex-col gap-1 md:gap-1.5 ${className}`}>
      <label
        htmlFor={id}
        className="text-[0.75rem] leading-[1.125rem] font-medium text-ink md:text-[0.8125rem] md:leading-[1.21875rem] md:font-semibold"
      >
        {label}
        <span aria-hidden="true" className="hidden md:inline">
          {' '}
          *
        </span>
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-[0.75rem] leading-[1.125rem] text-error">
          {error}
        </p>
      )}
    </div>
  )
}

export const controlClass =
  'w-full rounded-lg border-[0.0625rem] border-border bg-surface px-[0.8125rem] text-[0.8125rem] text-ink placeholder:text-body focus-visible:outline-[0.125rem] focus-visible:outline-offset-[0.125rem] focus-visible:outline-brand aria-invalid:border-error md:bg-white md:px-[0.9375rem] md:text-[0.875rem]'
