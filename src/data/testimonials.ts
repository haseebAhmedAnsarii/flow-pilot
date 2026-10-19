export type Testimonial = {
  id: string
  quote: string
  name: string
  role: string
}

export const testimonialsContent = {
  eyebrow: 'Testimonials',
  heading: 'Loved by modern teams',
  subheading: 'See how FlowPilot helps teams work smarter and save time.',
}

// Only the first testimonial is in the design; the other two are placeholder content.
export const testimonials: Testimonial[] = [
  {
    id: 'jessica-lee',
    quote:
      'FlowPilot has completely changed how our team works. We’re more organized, more productive, and spend less time on repetitive tasks.',
    name: 'Jessica Lee',
    role: 'Product Manager, Acme Inc.',
  },
  {
    id: 'marcus-chen',
    quote:
      'Our planning meetings are half as long now. The AI suggestions surface blockers before they slow the team down.',
    name: 'Marcus Chen',
    role: 'Engineering Lead, Northwind',
  },
  {
    id: 'priya-patel',
    quote:
      'Automations took the busywork off our plate, so we can focus on the projects that actually move the needle.',
    name: 'Priya Patel',
    role: 'Operations Director, Brightside',
  },
]
