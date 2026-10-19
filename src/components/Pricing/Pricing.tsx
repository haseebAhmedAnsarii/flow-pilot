import { useState } from 'react'
import { billingPeriods, plans, pricingContent } from '../../data/pricing'
import type { BillingPeriod } from '../../data/pricing'
import { Container } from '../Container'
import { PricingCard } from '../PricingCard'

export function Pricing() {
  const [period, setPeriod] = useState<BillingPeriod>('monthly')

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="bg-white py-6 md:py-12 xl:py-20"
    >
      <Container className="flex flex-col gap-4 lg:gap-14">
        <div className="flex flex-col gap-1.5 lg:items-center lg:gap-2 lg:text-center">
          <h2
            id="pricing-heading"
            className="text-[1.625rem] leading-7 font-extrabold text-balance text-ink lg:text-[2.25rem] lg:leading-[3.375rem]"
          >
            {pricingContent.heading}
          </h2>
          <p className="text-[0.75rem] leading-[1.125rem] text-body lg:text-[0.875rem] lg:leading-[1.3125rem]">
            {pricingContent.subheading}
          </p>

          <div
            role="group"
            aria-label="Billing period"
            className="flex gap-2 pt-3.5 lg:pt-4"
          >
            {billingPeriods.map((option) => {
              const selected = option.id === period
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setPeriod(option.id)}
                  className={`h-9 rounded-[0.625rem] text-[0.75rem] leading-[1.125rem] font-semibold transition focus-visible:outline-[0.125rem] focus-visible:outline-offset-[0.125rem] focus-visible:outline-brand ${
                    selected
                      ? 'w-[5.75rem] cursor-default bg-linear-to-r from-brand to-accent text-white shadow-cta'
                      : 'w-20 border-[0.0625rem] border-border bg-white text-ink hover:bg-surface'
                  }`}
                >
                  {option.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Below lg the plans scroll sideways (cards bleed to the screen edge); from lg they form a 3-column grid. */}
        <ul className="-mx-5 flex snap-x snap-mandatory scroll-px-5 items-stretch gap-6 overflow-x-auto px-5 pt-2 pb-4 [scrollbar-width:none] sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pt-0 lg:pb-0 xl:gap-10 [&::-webkit-scrollbar]:hidden">
          {plans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} period={period} />
          ))}
        </ul>
      </Container>
    </section>
  )
}
