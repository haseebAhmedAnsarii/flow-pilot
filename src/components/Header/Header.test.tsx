import { act, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { navLinks } from '../../data/navigation'
import { Header } from './Header'

const openButton = () => screen.getByRole('button', { name: /open navigation menu/i })

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('Header mobile menu', () => {
  it('is closed initially and opens when the hamburger is clicked', async () => {
    render(<Header />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(openButton()).toHaveAttribute('aria-expanded', 'false')

    await userEvent.click(openButton())

    expect(screen.getByRole('dialog', { name: /main menu/i })).toBeInTheDocument()
    expect(openButton()).toHaveAttribute('aria-expanded', 'true')
  })

  it('shows every navigation link plus Log In and Get Started', async () => {
    render(<Header />)
    await userEvent.click(openButton())
    const menu = screen.getByRole('dialog')

    for (const link of navLinks) {
      const label = link.mobileLabel ?? link.label
      expect(within(menu).getByRole('link', { name: label })).toHaveAttribute('href', link.href)
    }
    expect(within(menu).getByRole('link', { name: 'Log In' })).toBeInTheDocument()
    expect(within(menu).getByRole('link', { name: 'Get Started' })).toBeInTheDocument()
  })

  it('closes when a navigation link is selected', async () => {
    render(<Header />)
    await userEvent.click(openButton())

    await userEvent.click(within(screen.getByRole('dialog')).getByRole('link', { name: 'Pricing' }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes with the close button and with Escape, returning focus to the hamburger', async () => {
    render(<Header />)

    await userEvent.click(openButton())
    expect(screen.getByRole('button', { name: /close navigation menu/i })).toHaveFocus()
    await userEvent.click(screen.getByRole('button', { name: /close navigation menu/i }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(openButton()).toHaveFocus()

    await userEvent.click(openButton())
    await userEvent.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(openButton()).toHaveFocus()
  })

  it('keeps keyboard focus inside the open menu', async () => {
    render(<Header />)
    await userEvent.click(openButton())
    const menu = screen.getByRole('dialog')
    const closeButton = within(menu).getByRole('button', { name: /close navigation menu/i })

    await userEvent.tab({ shift: true })

    expect(menu).toContainElement(document.activeElement as HTMLElement)
    expect(closeButton).not.toHaveFocus()
  })

  it('closes the open menu when the viewport grows to desktop width', async () => {
    let onChange: (event: { matches: boolean }) => void = () => {}
    vi.stubGlobal('matchMedia', () => ({
      matches: false,
      addEventListener: (_: string, listener: typeof onChange) => {
        onChange = listener
      },
      removeEventListener: () => {},
    }))
    render(<Header />)
    await userEvent.click(openButton())
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    act(() => onChange({ matches: true }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(document.body.style.overflow).not.toBe('hidden')
  })
})
