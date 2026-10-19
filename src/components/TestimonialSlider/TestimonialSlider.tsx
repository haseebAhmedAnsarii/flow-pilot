import { Fragment, useRef, useState } from 'react'
import type { KeyboardEvent, PointerEvent } from 'react'
import { testimonials, testimonialsContent } from '../../data/testimonials'
import { Container } from '../Container'

const controlClass =
  'hidden size-[2.625rem] items-center xl:flex justify-center rounded-[0.625rem] border-[0.0625rem] border-border bg-white text-[1.125rem] leading-[1.6875rem] font-semibold text-ink transition hover:bg-surface focus-visible:outline-[0.125rem] focus-visible:outline-offset-[0.125rem] focus-visible:outline-brand'

// Minimum horizontal distance (px) for a drag to count as a swipe.
const swipeThreshold = 50

export function TestimonialSlider() {
  const [index, setIndex] = useState(0)
  const total = testimonials.length
  const current = testimonials[index]

  const dragStartX = useRef<number | null>(null)

  const goPrevious = () => setIndex((i) => (i - 1 + total) % total)
  const goNext = () => setIndex((i) => (i + 1) % total)

  // Swipe (touch) or drag (mouse) on the card moves between slides.
  const handlePointerDown = (event: PointerEvent<HTMLElement>) => {
    dragStartX.current = event.clientX
    event.currentTarget.setPointerCapture?.(event.pointerId)
  }
  const handlePointerUp = (event: PointerEvent<HTMLElement>) => {
    if (dragStartX.current === null) return
    const deltaX = event.clientX - dragStartX.current
    dragStartX.current = null
    if (Math.abs(deltaX) < swipeThreshold) return
    if (deltaX < 0) goNext()
    else goPrevious()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') goPrevious()
    else if (event.key === 'ArrowRight') goNext()
  }

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="bg-white py-6 md:py-12 xl:py-20"
    >
      <Container className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between xl:gap-10">
        <div className="xl:w-[29.25rem] xl:shrink-0">
          <p className="text-[0.8125rem] leading-[1.21875rem] font-bold tracking-[0.0203125rem] text-brand uppercase">
            {testimonialsContent.eyebrow}
          </p>
          <h2
            id="testimonials-heading"
            className="pt-2 text-[1.625rem] leading-[2.8125rem] font-extrabold text-ink max-[23.4375rem]:leading-8 xl:text-[2.25rem]"
          >
            {testimonialsContent.heading}
          </h2>
          <p className="pt-[0.6875rem] text-[0.9375rem] leading-[1.40625rem] text-body">
            {testimonialsContent.subheading}
          </p>
        </div>

        <div
          role="group"
          aria-roledescription="carousel"
          aria-label="Customer testimonials"
          onKeyDown={handleKeyDown}
          className="grid w-full grid-cols-[2.625rem_1fr_2.625rem] items-center gap-x-3 gap-y-4 xl:max-w-[41.5625rem]"
        >
          {/* The figure (and its live region) stays mounted; only its contents are swapped, so
              screen readers announce each new testimonial. */}
          <figure
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${total}`}
            aria-live="polite"
            aria-atomic="true"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => {
              dragStartX.current = null
            }}
            className="relative cursor-grab touch-pan-y select-none active:cursor-grabbing xl:cursor-auto xl:select-auto col-span-3 row-start-1 flex min-h-[13.75rem] flex-col justify-between rounded-[1.125rem] bg-linear-to-r from-hero-from to-hero-to p-5 xl:col-span-1 xl:col-start-2 xl:border-[0.0625rem] xl:border-border xl:bg-none xl:bg-white xl:p-[2.0625rem] xl:shadow-soft"
          >
            <span
              aria-hidden="true"
              className="-mt-2 block h-10 text-[2.75rem] leading-[2.75rem] font-bold text-accent xl:absolute xl:top-4 xl:left-6 xl:mt-0 xl:h-auto xl:text-[3.375rem] xl:leading-[3.375rem]"
            >
              “
            </span>
            <Fragment key={current.id}>
            <blockquote className="animate-fade-in text-[0.875rem] leading-[1.1875rem] font-medium text-ink xl:pt-[0.4rem] xl:pb-6 xl:pl-7 xl:text-[1.125rem] xl:leading-[1.51875rem]">
              <p>{current.quote}</p>
            </blockquote>
            <figcaption className="animate-fade-in flex items-center justify-between pt-4 xl:pt-0 xl:pl-7">
              <span>
                <span className="block text-[0.75rem] leading-[1.125rem] font-bold text-ink xl:text-[0.8125rem] xl:leading-[1.21875rem]">
                  {current.name}
                </span>
                <span className="block text-[0.625rem] leading-[0.9375rem] text-body xl:text-[0.6875rem] xl:leading-[1.03125rem]">
                  {current.role}
                </span>
              </span>
              {/* The mobile design has no star rating. */}
              <span
                role="img"
                aria-label="5 out of 5 stars"
                className="hidden text-[0.875rem] leading-[1.3125rem] tracking-[0.0875rem] text-warning md:block"
              >
                ★★★★★
              </span>
            </figcaption>
            </Fragment>
          </figure>

          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={goPrevious}
            className={`${controlClass} col-start-1 row-start-2 xl:row-start-1`}
          >
            <span aria-hidden="true" className="inline-block rotate-180">
              ›
            </span>
          </button>

          <div
            role="group"
            aria-label="Choose testimonial"
            className="col-start-2 row-start-2 flex items-center justify-center gap-2 xl:hidden"
          >
            {testimonials.map((testimonial, i) => (
              <button
                key={testimonial.id}
                type="button"
                aria-label={`Show testimonial ${i + 1} of ${total}`}
                aria-current={i === index ? 'true' : undefined}
                onClick={() => setIndex(i)}
                className="flex size-6 items-center justify-center rounded-full focus-visible:outline-[0.125rem] focus-visible:outline-brand"
              >
                <span
                  className={`block h-2 rounded-full transition-all ${
                    i === index ? 'w-6 bg-brand' : 'w-2 bg-border'
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            aria-label="Next testimonial"
            onClick={goNext}
            className={`${controlClass} col-start-3 row-start-2 xl:row-start-1`}
          >
            <span aria-hidden="true">›</span>
          </button>
        </div>
      </Container>
    </section>
  )
}
