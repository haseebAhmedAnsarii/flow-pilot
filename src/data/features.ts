import collaborateIcon from '../assets/icons/feature-collaborate.svg'
import planDesktopIcon from '../assets/icons/feature-plan-desktop.svg'
import planMobileIcon from '../assets/icons/feature-plan-mobile.svg'

// An icon is either a ready-made SVG (with its own background) or a glyph on a palette colour.
export type FeatureIcon =
  | { kind: 'image'; desktop: string; mobile: string }
  | { kind: 'glyph'; glyph: string; className: string }

export type Feature = {
  title: string
  description: string
  // Shorter copy used in the stacked mobile cards.
  shortDescription: string
  icon: FeatureIcon
}

export const featuresContent = {
  heading: 'Everything your team needs to move faster',
  subheading: 'Powerful features to help you plan, automate and collaborate, all in one place.',
}

export const features: Feature[] = [
  {
    title: 'Smart Task Planning',
    description: 'Automatically break down goals into actionable tasks with AI.',
    shortDescription: 'Break goals into actionable tasks.',
    icon: { kind: 'image', desktop: planDesktopIcon, mobile: planMobileIcon },
  },
  {
    title: 'AI Suggestions',
    description: 'Get intelligent suggestions to improve your workflow.',
    shortDescription: 'Get intelligent workflow suggestions.',
    icon: { kind: 'glyph', glyph: 'AI', className: 'bg-violet' },
  },
  {
    title: 'Team Collaboration',
    description: 'Keep everyone aligned with real-time updates.',
    shortDescription: 'Keep everyone aligned in real time.',
    icon: { kind: 'image', desktop: collaborateIcon, mobile: collaborateIcon },
  },
  {
    title: 'Automated Workflows',
    description: 'Save time by automating repetitive tasks.',
    shortDescription: 'Automate repetitive work.',
    icon: { kind: 'glyph', glyph: '⚙', className: 'bg-orange' },
  },
]
