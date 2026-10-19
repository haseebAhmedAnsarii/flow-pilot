import { useEffect, useRef } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import checkboxCheck from '../assets/icons/checkbox-check.svg'
import selectChevron from '../assets/icons/select-chevron.svg'
import {
  contactContent,
  demoTimes,
  demoTimeTeamSize,
  messageLimits,
  submitDelayMs,
  teamSizes,
} from '../data/contact'
import { controlClass, FormField } from './FormField'

export type ContactFormValues = {
  fullName: string
  email: string
  company: string
  teamSize: string
  demoTime: string
  message: string
  terms: boolean
}

type Props = {
  // Called with the validated values after the simulated processing delay.
  onSubmitted?: (values: ContactFormValues) => void
}

// Needs something before the @ and a dot-separated domain ending in a 2+ letter TLD.
const emailPattern = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[A-Za-z]{2,}$/

// The form is replaced by this message on success. The submit button that had focus is gone,
// so focus moves here, which also makes screen readers read the message.
function SuccessMessage() {
  const ref = useRef<HTMLParagraphElement>(null)
  useEffect(() => {
    ref.current?.focus()
  }, [])

  return (
    <p
      ref={ref}
      role="status"
      tabIndex={-1}
      className="rounded-lg bg-surface-tint px-5 py-10 text-center text-base leading-6 font-semibold text-ink focus:outline-none"
    >
      {contactContent.successMessage}
    </p>
  )
}

export function ContactForm({ onSubmitted }: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactFormValues>({
    mode: 'onTouched',
    // Unmounted fields (the demo time) are dropped from the values and no longer validated.
    shouldUnregister: true,
    defaultValues: { teamSize: '', demoTime: '', message: '', terms: false },
  })

  const teamSize = useWatch({ control, name: 'teamSize' })
  const message = useWatch({ control, name: 'message' })
  const demoTime = useWatch({ control, name: 'demoTime' })
  const messageLength = (message ?? '').length
  const needsDemoTime = teamSize === demoTimeTeamSize

  const submit = async (values: ContactFormValues) => {
    // Simulated request.
    await new Promise((resolve) => setTimeout(resolve, submitDelayMs))
    onSubmitted?.(values)
  }

  if (isSubmitSuccessful) return <SuccessMessage />

  const invalid = (name: keyof ContactFormValues) => (errors[name] ? true : undefined)
  const describedBy = (name: keyof ContactFormValues) =>
    errors[name] ? `${name}-error` : undefined

  return (
    <form
      onSubmit={handleSubmit(submit)}
      noValidate
      aria-busy={isSubmitting}
      className="flex flex-col gap-3.5 md:gap-[1.1875rem]"
    >
      <div className="flex flex-col gap-3.5 md:grid md:grid-cols-2 md:gap-5">
        <FormField id="fullName" label="Full Name" error={errors.fullName?.message}>
          <input
            id="fullName"
            type="text"
            autoComplete="name"
            placeholder="John Doe"
            aria-required="true"
            aria-invalid={invalid('fullName')}
            aria-describedby={describedBy('fullName')}
            className={`${controlClass} h-10 md:h-[2.875rem]`}
            {...register('fullName', {
              required: 'Full name is required',
              minLength: { value: 3, message: 'Full name must be at least 3 characters' },
              setValueAs: (value: string) => value.trim(),
            })}
          />
        </FormField>

        <FormField id="email" label="Work Email" error={errors.email?.message}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            aria-required="true"
            aria-invalid={invalid('email')}
            aria-describedby={describedBy('email')}
            className={`${controlClass} h-10 md:h-[2.875rem]`}
            {...register('email', {
              required: 'Work email is required',
              pattern: { value: emailPattern, message: 'Enter a valid email address' },
            })}
          />
        </FormField>

        <FormField id="company" label="Company Name" error={errors.company?.message}>
          <input
            id="company"
            type="text"
            autoComplete="organization"
            placeholder="Acme Inc."
            aria-required="true"
            aria-invalid={invalid('company')}
            aria-describedby={describedBy('company')}
            className={`${controlClass} h-10 md:h-[2.875rem]`}
            {...register('company', {
              required: 'Company name is required',
              setValueAs: (value: string) => value.trim(),
            })}
          />
        </FormField>

        <FormField id="teamSize" label="Team Size" error={errors.teamSize?.message}>
          <div className="relative">
            <select
              id="teamSize"
              aria-required="true"
              aria-invalid={invalid('teamSize')}
              aria-describedby={describedBy('teamSize')}
              className={`${controlClass} h-10 appearance-none pr-10 md:h-[2.875rem] ${
                teamSize ? '' : 'text-body'
              }`}
              {...register('teamSize', { required: 'Select your team size' })}
            >
              <option value="">Select team size</option>
              {teamSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <img
              src={selectChevron}
              alt=""
              className="pointer-events-none absolute top-1/2 right-2 size-[1.21875rem] -translate-y-1/2 md:size-[1.3125rem]"
            />
          </div>
        </FormField>

        {needsDemoTime && (
          <FormField
            id="demoTime"
            label="Preferred Demo Time"
            error={errors.demoTime?.message}
            className="md:col-span-2"
          >
            <div className="relative">
              <select
                id="demoTime"
                aria-required="true"
                aria-invalid={invalid('demoTime')}
                aria-describedby={describedBy('demoTime')}
                className={`${controlClass} h-10 appearance-none pr-10 md:h-[2.875rem] ${
                  demoTime ? '' : 'text-body'
                }`}
                {...register('demoTime', { required: 'Select a preferred demo time' })}
              >
                <option value="">Select a time</option>
                {demoTimes.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              <img
                src={selectChevron}
                alt=""
                className="pointer-events-none absolute top-1/2 right-2 size-[1.21875rem] -translate-y-1/2 md:size-[1.3125rem]"
              />
            </div>
          </FormField>
        )}
      </div>

      <FormField id="message" label="Message" error={errors.message?.message}>
        <div className="relative">
          <textarea
            id="message"
            placeholder="Tell us about your needs…"
            aria-required="true"
            aria-invalid={invalid('message')}
            aria-describedby={[describedBy('message'), 'message-count']
              .filter(Boolean)
              .join(' ')}
            className={`${controlClass} h-24 resize-none py-[0.6875rem] placeholder:text-neutral md:h-[4.875rem] md:py-[0.8125rem]`}
            {...register('message', {
              required: 'Message is required',
              // Measured without surrounding whitespace, so spaces alone cannot satisfy the minimum.
              validate: (value) =>
                value.trim().length >= messageLimits.min ||
                `Message must be at least ${messageLimits.min} characters`,
              maxLength: {
                value: messageLimits.max,
                message: `Message must be ${messageLimits.max} characters or fewer`,
              },
            })}
          />
          <span
            id="message-count"
            className={`absolute -top-[1.375rem] right-0 text-[0.6875rem] leading-[1.03125rem] md:top-auto md:right-3 md:bottom-2.5 ${
              messageLength > messageLimits.max ? 'text-error' : 'text-body'
            }`}
          >
            {messageLength}/{messageLimits.max}
          </span>
        </div>
      </FormField>

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 pt-0.5 md:pt-1">
          <span className="relative mt-0.5 flex size-3.5 shrink-0 md:mt-0 md:size-4">
            <input
              id="terms"
              type="checkbox"
              aria-required="true"
              aria-invalid={invalid('terms')}
              aria-describedby={describedBy('terms')}
              className="peer size-full cursor-pointer appearance-none rounded-[0.25rem] border-[0.0625rem] border-neutral bg-white checked:border-brand checked:bg-brand focus-visible:outline-[0.125rem] focus-visible:outline-offset-[0.125rem] focus-visible:outline-brand aria-invalid:border-error md:rounded-[0.1875rem]"
              {...register('terms', { required: 'You must accept the terms to continue' })}
            />
            <img
              src={checkboxCheck}
              alt=""
              className="pointer-events-none absolute inset-0 hidden size-full peer-checked:block"
            />
          </span>
          <label
            htmlFor="terms"
            className="cursor-pointer text-[0.6875rem] leading-[0.859375rem] text-body md:leading-[1.03125rem]"
          >
            I agree to the <span className="text-brand">Terms of Service</span> and{' '}
            <span className="text-brand">Privacy Policy</span>
            <span aria-hidden="true" className="hidden md:inline">
              {' '}
              *
            </span>
          </label>
        </div>
        {errors.terms && (
          <p id="terms-error" role="alert" className="text-[0.75rem] leading-[1.125rem] text-error">
            {errors.terms.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 flex h-[2.625rem] w-full items-center justify-center rounded-[0.625rem] bg-linear-to-r from-brand to-accent text-[0.8125rem] leading-[1.21875rem] font-semibold text-white shadow-cta transition hover:brightness-110 focus-visible:outline-[0.125rem] focus-visible:outline-offset-[0.125rem] focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-70 md:mt-0 md:h-[2.6875rem]"
      >
        {isSubmitting ? contactContent.submittingLabel : contactContent.submitLabel}
      </button>
    </form>
  )
}
