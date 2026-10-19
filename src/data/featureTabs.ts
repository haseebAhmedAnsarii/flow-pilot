export type FeatureTab = {
  id: string
  label: string
  title: string
  description: string
  metric: { value: string; label: string }
  // Width of the progress bar fill, in percent.
  progress: number
}

export const featureTabsContent = {
  heading: 'Plan, automate, collaborate',
  subheading: 'One workflow, three ways to move work forward.',
}

// Only the Plan tab exists in the design; the Automate and Collaborate copy is placeholder content.
export const featureTabs: FeatureTab[] = [
  {
    id: 'plan',
    label: 'Plan',
    title: 'Break goals into clear tasks',
    description: 'AI-assisted planning keeps priorities visible and actionable.',
    metric: { value: '40%', label: 'Less manual work' },
    progress: 66.6,
  },
  {
    id: 'automate',
    label: 'Automate',
    title: 'Let workflows run themselves',
    description: 'Set a rule once and FlowPilot handles the repetitive steps for you.',
    metric: { value: '65%', label: 'Faster handoffs' },
    progress: 65,
  },
  {
    id: 'collaborate',
    label: 'Collaborate',
    title: 'Keep everyone in sync',
    description: 'Shared boards and real-time updates keep the whole team aligned.',
    metric: { value: '85%', label: 'Better team alignment' },
    progress: 85,
  },
]
