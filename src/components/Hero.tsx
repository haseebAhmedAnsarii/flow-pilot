import checkDesktop from '../assets/icons/check-desktop.svg'
import checkMobile from '../assets/icons/check-mobile.svg'
import { heroContent } from '../data/hero'
import { Button } from './Button'
import { Container } from './Container'
import { DashboardMockup } from './DashboardMockup'

export function Hero() {
  const { badge, headline, subtitle, primaryCta, secondaryCta, trustNotes } = heroContent

  return (
    <section
      aria-labelledby="hero-heading"
      className="bg-linear-to-r from-hero-from to-hero-to pt-8 pb-10 md:pt-12 md:pb-14 xl:flex xl:min-h-[37.5rem] xl:items-center xl:py-1"
    >
      <Container className="flex flex-col xl:flex-row xl:items-center xl:justify-between xl:gap-10">
        <div className="xl:w-[30.6875rem] xl:shrink-0">
          <p className="mb-6 inline-flex h-[1.625rem] items-center gap-2 rounded-full bg-surface-pill px-2.5 text-[0.625rem] leading-none whitespace-nowrap max-[23.4375rem]:gap-1.5 max-[23.4375rem]:px-2 max-[23.4375rem]:text-[0.5625rem] xl:mb-7 xl:h-7 xl:px-3.5 xl:text-[0.6875rem]">
            <span className="font-bold text-brand">{badge.label}</span>
            <span className="font-medium text-body">{badge.text}</span>
          </p>

          <h1
            id="hero-heading"
            className="mb-4 text-[1.875rem] leading-[1.875rem] font-extrabold min-[23.4375rem]:text-[2.25rem] min-[23.4375rem]:leading-[2.25rem] tracking-[-0.05625rem] text-ink md:text-[3rem] md:leading-[3.25rem] xl:mb-5 xl:text-[3.625rem] xl:leading-[3.915rem] xl:tracking-[-0.09062rem]"
          >
            <span className="block">{headline.lead}</span>
            <span className="block text-balance xl:text-wrap">{headline.rest}</span>
          </h1>

          <p className="mb-7 max-w-[21.25rem] text-[0.875rem] leading-5 text-body md:max-w-[31.25rem] xl:mb-8 xl:text-[1.125rem] xl:leading-[1.82813rem]">
            {subtitle}
          </p>

          <div className="mb-8 flex gap-3.5 md:max-w-[31.25rem] xl:mb-9 xl:gap-4">
            <Button
              href={primaryCta.href}
              className="h-11 flex-1 text-[0.8125rem] leading-[1.21875rem] xl:h-12 xl:w-[9.375rem] xl:flex-none xl:text-[0.875rem] xl:leading-[1.3125rem]"
            >
              {primaryCta.label}
            </Button>
            <Button
              href={secondaryCta.href}
              variant="secondary"
              className="h-11 flex-1 text-[0.75rem] leading-[1.125rem] xl:h-12 xl:w-[10.625rem] xl:flex-none xl:text-[0.875rem] xl:leading-[1.3125rem]"
            >
              {secondaryCta.label}
            </Button>
          </div>

          <ul className="mb-8 flex flex-col gap-2.5 md:flex-row md:flex-wrap md:gap-x-6 md:gap-y-2 xl:mb-0 xl:gap-y-2">
            {trustNotes.map((note) => (
              <li
                key={note}
                className="flex items-center gap-3 text-[0.75rem] leading-[1.125rem] text-body xl:gap-2 xl:text-[0.8125rem] xl:leading-[1.21875rem]"
              >
                <img src={checkMobile} alt="" className="h-[0.58875rem] w-[0.56875rem] xl:hidden" />
                <img src={checkDesktop} alt="" className="hidden h-[1.40625rem] w-[0.9375rem] xl:block" />
                {note}
              </li>
            ))}
          </ul>
        </div>

        <DashboardMockup />
      </Container>
    </section>
  )
}
