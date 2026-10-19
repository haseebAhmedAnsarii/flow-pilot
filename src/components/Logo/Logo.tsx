type Props = {
  size?: 'md' | 'sm'
  className?: string
  onClick?: () => void
}

const sizes = {
  md: 'text-[1.0625rem] leading-[1.59375rem] tracking-[-0.02656rem]',
  sm: 'text-[0.8125rem] leading-[1.21875rem]',
}

export function Logo({ size = 'md', className = '', onClick }: Props) {
  return (
    <a
      href="#"
      onClick={onClick}
      className={`rounded-md font-bold text-ink focus-visible:outline-[0.125rem] focus-visible:outline-offset-[0.25rem] focus-visible:outline-brand ${sizes[size]} ${className}`}
    >
      <span aria-hidden="true">▰ </span>FlowPilot
    </a>
  )
}
