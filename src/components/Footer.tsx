import { footerContent, legalLinks } from '../data/footer'
import { Container } from './Container'
import { Logo } from './Logo'

const linkClass =
  'rounded-md text-[0.8125rem] leading-[1.21875rem] text-body transition-colors hover:text-ink focus-visible:outline-[0.125rem] focus-visible:outline-offset-[0.25rem] focus-visible:outline-brand'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t-[0.0625rem] border-border-soft bg-white pt-[1.5625rem] pb-6 lg:pt-[3.0625rem] lg:pb-12">
      <Container className="flex flex-col gap-[1.625rem] lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <div className="flex items-center justify-between gap-4 lg:contents">
          <Logo size="sm" />
          <p className="text-right text-[0.6875rem] leading-[1.03125rem] text-body lg:text-center lg:text-[0.8125rem] lg:leading-[1.21875rem]">
            © {year} {footerContent.companyName}
            <span className="hidden lg:inline"> {footerContent.rights}</span>
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-3 justify-items-center gap-6 lg:flex lg:gap-6">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className={linkClass}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </footer>
  )
}
