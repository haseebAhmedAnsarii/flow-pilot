import { trustedCompanies } from '../data/trustedCompanies'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { Container } from './Container'

const nameClass =
  'shrink-0 px-6 text-[0.8125rem] leading-[1.21875rem] font-semibold text-faint md:px-0 md:text-[1.125rem] md:leading-[1.6875rem] xl:text-[1.375rem] xl:leading-[2.0625rem]'

export function TrustedCompanies() {
  const { heading, names } = trustedCompanies
  // Below md the names scroll, so the strip becomes a focusable (pausable) group.
  const isMarquee = useMediaQuery('(max-width: 47.9375rem)')

  return (
    <section aria-labelledby="trusted-heading" className="bg-white py-9 xl:pt-[3.4375rem] xl:pb-14">
      <div className="flex flex-col gap-6 xl:gap-8">
        <Container>
          <h2
            id="trusted-heading"
            className="text-center text-[0.8125rem] leading-[1.21875rem] font-semibold text-body"
          >
            {heading}
          </h2>
        </Container>

        {/* Below md the names scroll edge to edge as a marquee (no side gutters); from md up they
            sit in the container. The marquee is focusable so keyboard users can stop it, and it
            also pauses while hovered or pressed. */}
        <Container
          tabIndex={isMarquee ? 0 : undefined}
          role={isMarquee ? 'group' : undefined}
          aria-labelledby={isMarquee ? 'trusted-heading' : undefined}
          className="group overflow-hidden rounded-md mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] max-md:px-0 focus-visible:outline-[0.125rem] focus-visible:outline-brand motion-reduce:overflow-x-auto motion-reduce:mask-none md:overflow-visible md:mask-none"
        >
          <ul className="flex w-max animate-marquee group-hover:[animation-play-state:paused] group-focus:[animation-play-state:paused] group-active:[animation-play-state:paused] motion-reduce:w-full motion-reduce:animate-none motion-reduce:justify-start md:w-auto md:animate-none md:flex-wrap md:justify-center md:gap-x-12 md:gap-y-6 xl:gap-x-24">
            {names.map((name) => (
              <li key={name} className={nameClass}>
                {name}
              </li>
            ))}
            {/* Duplicate set so the loop is seamless; hidden from assistive tech and when motion is reduced. */}
            {names.map((name) => (
              <li
                key={`${name}-copy`}
                aria-hidden="true"
                className={`${nameClass} motion-reduce:hidden md:hidden`}
              >
                {name}
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </section>
  )
}
