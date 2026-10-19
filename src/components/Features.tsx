import { features, featuresContent } from '../data/features'
import { Container } from './Container'
import { FeatureCard } from './FeatureCard'

export function Features() {
  return (
    <section id="features" aria-labelledby="features-heading" className="bg-white py-4 md:py-16">
      <Container className="flex flex-col gap-4 md:gap-12">
        <div className="pb-1 md:mx-auto md:max-w-3xl md:pb-0 md:text-center">
          <h2
            id="features-heading"
            className="text-[1.625rem] leading-7 font-extrabold text-balance text-ink md:text-[2.125rem] md:leading-[3.1875rem] md:tracking-[-0.053125rem]"
          >
            {featuresContent.heading}
          </h2>
          {/* The mobile design has no sub-heading. */}
          <p className="mt-[0.6875rem] hidden text-[0.9375rem] leading-[1.40625rem] text-body md:block">
            {featuresContent.subheading}
          </p>
        </div>

        <ul className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </ul>
      </Container>
    </section>
  )
}
