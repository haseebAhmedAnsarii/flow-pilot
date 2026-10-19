export type BillingPeriod = 'monthly' | 'yearly'

export type Plan = {
  id: string
  name: string
  // Price per billing period.
  prices: Record<BillingPeriod, number>
  description: string
  features: string[]
  featured?: boolean
}

export const pricingContent = {
  heading: 'Simple, transparent pricing',
  subheading: 'Choose the plan that works best for your team.',
  badge: 'Most Popular',
  cta: { label: 'Get Started', href: '#contact' },
}

export const billingPeriods: { id: BillingPeriod; label: string }[] = [
  { id: 'monthly', label: 'Monthly' },
  { id: 'yearly', label: 'Yearly' },
]

export const periodSuffix: Record<BillingPeriod, string> = {
  monthly: '/month',
  yearly: '/year',
}

export const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    prices: { monthly: 0, yearly: 0 },
    description: 'For individuals getting started',
    features: ['Up to 3 projects', 'Basic AI suggestions', 'Community support'],
  },
  {
    id: 'pro',
    name: 'Pro',
    prices: { monthly: 19, yearly: 190 },
    description: 'For growing teams',
    features: [
      'Unlimited projects',
      'Advanced AI suggestions',
      'Team collaboration',
      'Priority support',
    ],
    featured: true,
  },
  {
    id: 'business',
    name: 'Business',
    prices: { monthly: 49, yearly: 490 },
    description: 'For larger organizations',
    features: [
      'Everything in Pro',
      'Advanced automations',
      'Custom integrations',
      'Dedicated support',
    ],
  },
]
