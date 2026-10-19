import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { heroContent } from '../data/hero'
import { Hero } from './Hero'

describe('Hero', () => {
  it('renders the headline, supporting copy and trust notes', () => {
    render(<Hero />)

    expect(
      screen.getByRole('heading', { level: 1, name: /work smarter\.\s*let ai handle the repetitive work\./i }),
    ).toBeInTheDocument()
    expect(screen.getByText(heroContent.subtitle)).toBeInTheDocument()
    for (const note of heroContent.trustNotes) {
      expect(screen.getByText(note)).toBeInTheDocument()
    }
  })

  it('links the two CTAs to their page sections', () => {
    render(<Hero />)

    expect(screen.getByRole('link', { name: 'Start Free' })).toHaveAttribute('href', '#contact')
    expect(screen.getByRole('link', { name: 'See How It Works' })).toHaveAttribute(
      'href',
      '#how-it-works',
    )
  })

  it('exposes the dashboard visual as a single labelled image', () => {
    render(<Hero />)

    expect(screen.getByRole('img', { name: /dashboard preview/i })).toBeInTheDocument()
  })
})
