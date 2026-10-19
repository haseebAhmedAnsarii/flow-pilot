import checkIcon from '../assets/icons/check-mobile.svg'
import { periodSuffix, pricingContent } from '../data/pricing'
import type { BillingPeriod, Plan } from '../data/pricing'
import { Button } from './Button'

type Props = {
  plan: Plan
  period: BillingPeriod
}

export function PricingCard({ plan, period }: Props) {
  const { featured } = plan
  const price = plan.prices[period]

  return (
    <li
      className={`flex w-[17.3125rem] shrink-0 snap-start flex-col overflow-clip rounded-2xl bg-white transition duration-200 motion-safe:hover:-translate-y-0.5 lg:min-h-[18.875rem] lg:w-auto ${
        featured
          ? 'border-2 border-brand shadow-card'
          : 'border-[0.0625rem] border-border p-6 hover:shadow-card lg:p-[1.5625rem]'
      } ${featured ? 'order-first lg:order-none' : ''}`}
    >
      {featured && (
        <p className="flex h-[1.875rem] shrink-0 items-center justify-center bg-linear-to-r from-brand to-accent text-[0.75rem] leading-[1.125rem] font-bold tracking-[0.01875rem] text-white">
          {pricingContent.badge}
        </p>
      )}

      <div
        className={`flex flex-1 flex-col justify-between ${featured ? 'px-[1.625rem] pt-[1.625rem] pb-[1.625rem] lg:pt-2.5' : ''}`}
      >
        <div>
          <h3 className="text-base leading-6 font-bold text-ink">{plan.name}</h3>
          <p className="flex items-baseline gap-1 pt-1">
            <span className="text-[2.125rem] leading-[2.65625rem] font-bold text-ink lg:leading-[2.125rem]">
              ${price}
            </span>
            <span className="text-[0.75rem] leading-[1.125rem] font-medium text-body">
              {periodSuffix[period]}
            </span>
          </p>
          <p className="pt-0.5 text-[0.75rem] leading-[1.125rem] text-body">{plan.description}</p>

          <ul className="flex flex-col gap-2.5 pt-5 pb-6 lg:gap-1.5 lg:pt-3 lg:pb-0">
            {plan.features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-3 text-[0.75rem] leading-[1.125rem] text-body lg:gap-2"
              >
                <img src={checkIcon} alt="" className="h-[0.58875rem] w-[0.56875rem] shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <Button
          href={pricingContent.cta.href}
          variant={featured ? 'primary' : 'secondary'}
          className="h-10 w-full text-[0.8125rem] leading-[1.21875rem]"
        >
          {pricingContent.cta.label}
        </Button>
      </div>
    </li>
  )
}
