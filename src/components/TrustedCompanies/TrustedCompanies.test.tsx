import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { trustedCompanies } from '../../data/trustedCompanies'
import { TrustedCompanies } from './TrustedCompanies'

describe('TrustedCompanies', () => {
  it('renders the heading and one list item per company', () => {
    render(<TrustedCompanies />)

    expect(screen.getByRole('heading', { name: trustedCompanies.heading })).toBeInTheDocument()
    const items = within(screen.getByRole('list')).getAllByRole('listitem')
    expect(items.map((item) => item.textContent)).toEqual(trustedCompanies.names)
  })
})
