import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { features, featuresContent } from '../data/features'
import { Features } from './Features'

describe('Features', () => {
  it('renders the section heading and one card per feature', () => {
    render(<Features />)

    expect(screen.getByRole('heading', { level: 2, name: featuresContent.heading })).toBeInTheDocument()
    const cards = within(screen.getByRole('list')).getAllByRole('listitem')
    expect(cards).toHaveLength(features.length)
    expect(screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent)).toEqual(
      features.map((f) => f.title),
    )
  })

  it('is the target of the #features navigation link', () => {
    const { container } = render(<Features />)

    expect(container.querySelector('section#features')).toBeInTheDocument()
  })
})
