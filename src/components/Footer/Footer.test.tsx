import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { footerContent, legalLinks } from '../../data/footer'
import { Footer } from './Footer'

describe('Footer', () => {
  it('shows the logo and the copyright with the current year', () => {
    render(<Footer />)
    const footer = screen.getByRole('contentinfo')

    expect(within(footer).getByRole('link', { name: 'FlowPilot' })).toHaveAttribute('href', '#')
    expect(footer).toHaveTextContent(`© ${new Date().getFullYear()} ${footerContent.companyName}`)
  })

  it('renders the Privacy, Terms and Security links', () => {
    render(<Footer />)
    const nav = screen.getByRole('navigation', { name: 'Footer' })

    expect(within(nav).getAllByRole('link').map((link) => link.textContent)).toEqual(
      legalLinks.map((link) => link.label),
    )
  })
})
