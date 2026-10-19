import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { testimonials } from '../data/testimonials'
import { TestimonialSlider } from './TestimonialSlider'

const [first, second, , last] = [...testimonials, testimonials[testimonials.length - 1]]
const next = () => screen.getByRole('button', { name: /next testimonial/i })
const previous = () => screen.getByRole('button', { name: /previous testimonial/i })

describe('TestimonialSlider', () => {
  it('shows the first testimonial with the first indicator active', () => {
    render(<TestimonialSlider />)

    expect(screen.getByText(first.quote)).toBeInTheDocument()
    expect(screen.getByText(first.name)).toBeInTheDocument()
    const dots = screen.getAllByRole('button', { name: /show testimonial/i })
    expect(dots).toHaveLength(testimonials.length)
    expect(dots[0]).toHaveAttribute('aria-current', 'true')
    expect(dots[1]).not.toHaveAttribute('aria-current')
  })

  it('moves forward and back, wrapping around at both ends', async () => {
    render(<TestimonialSlider />)

    await userEvent.click(next())
    expect(screen.getByText(second.quote)).toBeInTheDocument()
    expect(screen.queryByText(first.quote)).not.toBeInTheDocument()

    await userEvent.click(previous())
    await userEvent.click(previous())
    expect(screen.getByText(last.quote)).toBeInTheDocument()

    await userEvent.click(next())
    expect(screen.getByText(first.quote)).toBeInTheDocument()
  })

  it('moves on a horizontal swipe but ignores a short drag', () => {
    render(<TestimonialSlider />)
    const slide = screen.getByRole('group', { name: `1 of ${testimonials.length}` })

    fireEvent.pointerDown(slide, { clientX: 200, pointerId: 1 })
    fireEvent.pointerUp(slide, { clientX: 180, pointerId: 1 })
    expect(screen.getByText(first.quote)).toBeInTheDocument()

    fireEvent.pointerDown(slide, { clientX: 200, pointerId: 1 })
    fireEvent.pointerUp(slide, { clientX: 100, pointerId: 1 })
    expect(screen.getByText(second.quote)).toBeInTheDocument()

    const nextSlide = screen.getByRole('group', { name: `2 of ${testimonials.length}` })
    fireEvent.pointerDown(nextSlide, { clientX: 100, pointerId: 1 })
    fireEvent.pointerUp(nextSlide, { clientX: 220, pointerId: 1 })
    expect(screen.getByText(first.quote)).toBeInTheDocument()
  })

  it('jumps to a testimonial from its indicator and updates the slide label', async () => {
    render(<TestimonialSlider />)

    await userEvent.click(screen.getByRole('button', { name: `Show testimonial 2 of ${testimonials.length}` }))

    expect(screen.getByText(second.quote)).toBeInTheDocument()
    expect(screen.getByRole('group', { name: `2 of ${testimonials.length}` })).toBeInTheDocument()
  })

  it('keeps the same live region mounted when the slide changes', async () => {
    render(<TestimonialSlider />)
    const slide = screen.getByRole('group', { name: `1 of ${testimonials.length}` })
    expect(slide).toHaveAttribute('aria-live', 'polite')

    await userEvent.click(next())

    expect(screen.getByRole('group', { name: `2 of ${testimonials.length}` })).toBe(slide)
    expect(slide).toHaveTextContent(second.quote)
  })
})
