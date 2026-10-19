import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { plans, pricingContent } from '../data/pricing'
import { Pricing } from './Pricing'

describe('Pricing', () => {
  it('shows the three plans with their monthly prices', () => {
    render(<Pricing />)

    const names = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent)
    expect(names).toEqual(plans.map((p) => p.name))
    expect(screen.getByText('$0')).toBeInTheDocument()
    expect(screen.getByText('$19')).toBeInTheDocument()
    expect(screen.getByText('$49')).toBeInTheDocument()
    expect(screen.getAllByText('/month')).toHaveLength(plans.length)
  })

  it('marks Pro as the most popular plan and links every plan to the contact form', () => {
    render(<Pricing />)

    expect(screen.getByText(pricingContent.badge)).toBeInTheDocument()
    const ctas = screen.getAllByRole('link', { name: pricingContent.cta.label })
    expect(ctas).toHaveLength(plans.length)
    for (const cta of ctas) expect(cta).toHaveAttribute('href', '#contact')
  })

  it('switches every price between monthly and yearly with the toggle', async () => {
    render(<Pricing />)

    const monthly = screen.getByRole('button', { name: 'Monthly' })
    const yearly = screen.getByRole('button', { name: 'Yearly' })
    expect(monthly).toHaveAttribute('aria-pressed', 'true')
    expect(yearly).toHaveAttribute('aria-pressed', 'false')

    await userEvent.click(yearly)
    expect(yearly).toHaveAttribute('aria-pressed', 'true')
    expect(monthly).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByText('$0')).toBeInTheDocument()
    expect(screen.getByText('$190')).toBeInTheDocument()
    expect(screen.getByText('$490')).toBeInTheDocument()
    expect(screen.getAllByText('/year')).toHaveLength(plans.length)
    expect(screen.queryByText('/month')).not.toBeInTheDocument()

    await userEvent.click(monthly)
    expect(screen.getByText('$19')).toBeInTheDocument()
    expect(screen.getAllByText('/month')).toHaveLength(plans.length)
  })
})
