import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { featureTabs } from '../../data/featureTabs'
import { FeatureTabs } from './FeatureTabs'

const [plan, automate, collaborate] = featureTabs

describe('FeatureTabs', () => {
  it('starts on the Plan tab with only one tab selected', () => {
    render(<FeatureTabs />)

    const tabs = screen.getAllByRole('tab')
    expect(tabs.map((tab) => tab.textContent)).toEqual(featureTabs.map((t) => t.label))
    expect(tabs.filter((tab) => tab.getAttribute('aria-selected') === 'true')).toHaveLength(1)
    expect(screen.getByRole('tab', { name: plan.label })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText(plan.title)).toBeInTheDocument()
  })

  it('changes the displayed content when another tab is clicked', async () => {
    render(<FeatureTabs />)

    await userEvent.click(screen.getByRole('tab', { name: automate.label }))

    expect(screen.getByRole('tab', { name: automate.label })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tab', { name: plan.label })).toHaveAttribute('aria-selected', 'false')
    expect(screen.getByText(automate.title)).toBeInTheDocument()
    expect(screen.getByText(automate.metric.value)).toBeInTheDocument()
    expect(screen.queryByText(plan.title)).not.toBeInTheDocument()
  })

  it('supports arrow-key navigation between tabs', async () => {
    render(<FeatureTabs />)

    screen.getByRole('tab', { name: plan.label }).focus()
    await userEvent.keyboard('{ArrowRight}{ArrowRight}')

    expect(screen.getByRole('tab', { name: collaborate.label })).toHaveFocus()
    expect(screen.getByText(collaborate.title)).toBeInTheDocument()

    await userEvent.keyboard('{ArrowRight}')
    expect(screen.getByRole('tab', { name: plan.label })).toHaveFocus()
  })

  it('exposes a single tab panel that is labelled by the selected tab', async () => {
    render(<FeatureTabs />)

    const panel = screen.getByRole('tabpanel')
    expect(panel).toHaveAccessibleName(plan.label)

    await userEvent.click(screen.getByRole('tab', { name: automate.label }))
    expect(screen.getByRole('tabpanel')).toHaveAccessibleName(automate.label)
  })
})
