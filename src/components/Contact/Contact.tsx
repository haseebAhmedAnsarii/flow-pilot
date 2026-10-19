import { contactContent } from '../../data/contact'
import { ContactForm } from '../ContactForm'
import { Container } from '../Container'

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-white pt-4 pb-12 md:bg-linear-to-r md:from-hero-from md:to-hero-to md:py-14 xl:py-20"
    >
      <Container className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between xl:gap-10">
        <div className="flex flex-col xl:w-[26.8125rem] xl:shrink-0 xl:pt-4">
          <p className="hidden pb-2 text-[0.75rem] leading-[1.125rem] font-bold tracking-[0.0375rem] text-brand uppercase md:block">
            {contactContent.eyebrow}
          </p>
          <h2
            id="contact-heading"
            className="text-[1.5rem] leading-[1.875rem] font-extrabold text-ink md:text-[2.125rem] md:leading-[2.3375rem]"
          >
            {contactContent.heading}
          </h2>
          <p className="max-w-[25rem] pt-1 text-[0.75rem] leading-[1.125rem] font-medium text-body md:pt-3.5 md:text-[0.8125rem] md:leading-[1.320625rem] md:font-normal">
            {contactContent.description}
          </p>
        </div>

        <div className="md:rounded-2xl md:border-[0.0625rem] md:border-border md:bg-white md:p-8 md:shadow-soft xl:w-[42.201rem] xl:shrink-0 xl:p-[2.0625rem]">
          <ContactForm />
        </div>
      </Container>
    </section>
  )
}
