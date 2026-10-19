import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { contactContent, submitDelayMs } from '../../data/contact'
import { ContactForm } from './ContactForm'

const validMessage = 'We would like to see how FlowPilot fits our team.'

async function fillValidForm(user: ReturnType<typeof userEvent.setup>, teamSize = '11-50') {
  await user.type(screen.getByLabelText(/full name/i), 'Sarah Connor')
  await user.type(screen.getByLabelText(/work email/i), 'sarah@company.com')
  await user.type(screen.getByLabelText(/company name/i), 'Acme Studio')
  await user.selectOptions(screen.getByLabelText(/team size/i), teamSize)
  await user.type(screen.getByLabelText(/^message/i), validMessage)
  await user.click(screen.getByLabelText(/i agree to the/i))
}

afterEach(() => {
  vi.useRealTimers()
})

describe('ContactForm', () => {
  it('does not submit an empty form and shows an error next to each required field', async () => {
    const onSubmitted = vi.fn()
    const user = userEvent.setup()
    render(<ContactForm onSubmitted={onSubmitted} />)

    await user.click(screen.getByRole('button', { name: contactContent.submitLabel }))

    expect(await screen.findByText('Full name is required')).toBeInTheDocument()
    expect(screen.getByText('Work email is required')).toBeInTheDocument()
    expect(screen.getByText('Company name is required')).toBeInTheDocument()
    expect(screen.getByText('Select your team size')).toBeInTheDocument()
    expect(screen.getByText('Message is required')).toBeInTheDocument()
    expect(screen.getByText('You must accept the terms to continue')).toBeInTheDocument()
    expect(screen.getByLabelText(/full name/i)).toHaveAccessibleDescription(
      'Full name is required',
    )
    expect(onSubmitted).not.toHaveBeenCalled()
  })

  it('validates name length, email format and message length', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    await user.type(screen.getByLabelText(/full name/i), 'Al')
    await user.type(screen.getByLabelText(/work email/i), 'not-an-email')
    await user.type(screen.getByLabelText(/^message/i), 'too short')
    await user.click(screen.getByRole('button', { name: contactContent.submitLabel }))

    expect(await screen.findByText('Full name must be at least 3 characters')).toBeInTheDocument()
    expect(screen.getByText('Enter a valid email address')).toBeInTheDocument()
    expect(screen.getByText('Message must be at least 20 characters')).toBeInTheDocument()
  })

  it('shows a live character count for the message', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    expect(screen.getByText('0/300')).toBeInTheDocument()
    await user.type(screen.getByLabelText(/^message/i), 'Hello')
    expect(screen.getByText('5/300')).toBeInTheDocument()
  })

  it('shows a required Preferred Demo Time only when team size is 200+', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)
    expect(screen.queryByLabelText(/preferred demo time/i)).not.toBeInTheDocument()

    await fillValidForm(user, '200+')
    const demoTime = screen.getByLabelText(/preferred demo time/i)
    expect(demoTime).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: contactContent.submitLabel }))
    expect(await screen.findByText('Select a preferred demo time')).toBeInTheDocument()
    expect(screen.queryByText(contactContent.successMessage)).not.toBeInTheDocument()

    await user.selectOptions(demoTime, 'Evening')
    expect(screen.queryByText('Select a preferred demo time')).not.toBeInTheDocument()
  })

  it('hides Preferred Demo Time again and stops requiring it when team size changes', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    const onSubmitted = vi.fn()
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<ContactForm onSubmitted={onSubmitted} />)

    await fillValidForm(user, '200+')
    expect(screen.getByLabelText(/preferred demo time/i)).toBeInTheDocument()
    await user.selectOptions(screen.getByLabelText(/team size/i), '51-200')
    expect(screen.queryByLabelText(/preferred demo time/i)).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: contactContent.submitLabel }))
    await act(() => vi.advanceTimersByTimeAsync(submitDelayMs))

    expect(await screen.findByText(contactContent.successMessage)).toBeInTheDocument()
    expect(onSubmitted).toHaveBeenCalledOnce()
    expect(onSubmitted.mock.calls[0][0]).not.toHaveProperty('demoTime')
  })

  it('disables the button while submitting, ignores repeat clicks, then shows the success message', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    const onSubmitted = vi.fn()
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<ContactForm onSubmitted={onSubmitted} />)

    await fillValidForm(user)
    const button = screen.getByRole('button', { name: contactContent.submitLabel })
    await user.click(button)

    const submitting = await screen.findByRole('button', { name: contactContent.submittingLabel })
    expect(submitting).toBeDisabled()
    await user.click(submitting)
    await user.click(submitting)
    expect(onSubmitted).not.toHaveBeenCalled()

    await act(() => vi.advanceTimersByTimeAsync(submitDelayMs))

    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(contactContent.successMessage))
    expect(onSubmitted).toHaveBeenCalledOnce()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('rejects a whitespace-only message and an email without a real top-level domain', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    await user.type(screen.getByLabelText(/work email/i), 'a@b.c')
    await user.type(screen.getByLabelText(/^message/i), ' '.repeat(25))
    await user.click(screen.getByRole('button', { name: contactContent.submitLabel }))

    expect(await screen.findByText('Enter a valid email address')).toBeInTheDocument()
    expect(screen.getByText('Message must be at least 20 characters')).toBeInTheDocument()
  })

  it('moves focus to the success message so it is announced', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })
    render(<ContactForm />)

    await fillValidForm(user)
    await user.click(screen.getByRole('button', { name: contactContent.submitLabel }))
    await act(() => vi.advanceTimersByTimeAsync(submitDelayMs))

    const status = await screen.findByRole('status')
    expect(status).toHaveFocus()
  })
})
