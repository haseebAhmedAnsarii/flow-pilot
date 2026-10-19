export type TaskStatus = 'in-progress' | 'completed' | 'upcoming'

export const heroContent = {
  badge: { label: 'New', text: 'AI-powered workflow for modern teams ›' },
  headline: { lead: 'Work smarter.', rest: 'Let AI handle the repetitive work.' },
  subtitle:
    'FlowPilot helps modern teams plan work, automate repetitive tasks, and keep everyone aligned.',
  primaryCta: { label: 'Start Free', href: '#contact' },
  secondaryCta: { label: 'See How It Works', href: '#how-it-works' },
  trustNotes: ['No credit card required', 'Set up in minutes', 'Trusted by 10,000+ teams'],
}

// Content of the coded dashboard visual. `short` is the compact label used on small screens.
export const dashboard = {
  sidebar: ['Overview', 'Tasks', 'Automations', 'Team', 'Analytics', 'Settings'],
  activeSidebarItem: 'Overview',
  greeting: 'Good morning, Sarah!',
  subtitle: "Here's what is happening with your team today.",
  stats: [
    { value: '12', label: 'Active Tasks', short: 'Active Tasks' },
    { value: '4', label: 'AI Suggestions', short: 'AI Suggest.' },
    { value: '85%', label: 'Project Progress', short: 'Progress' },
  ],
  tasksTitle: "Today's Tasks",
  tasks: [
    { label: 'Design landing page', short: 'Design landing page', status: 'in-progress' },
    { label: 'Update documentation', short: 'Update docs', status: 'completed' },
    { label: 'Team sync meeting', short: 'Team sync', status: 'upcoming' },
    { label: 'Review pull requests', short: 'Review PRs', status: 'upcoming' },
  ] satisfies { label: string; short: string; status: TaskStatus }[],
}

export const taskStatusStyles: Record<TaskStatus, { text: string; className: string }> = {
  'in-progress': { text: 'In Progress', className: 'text-orange' },
  completed: { text: 'Completed', className: 'text-success' },
  upcoming: { text: 'Upcoming', className: 'text-subtle' },
}
