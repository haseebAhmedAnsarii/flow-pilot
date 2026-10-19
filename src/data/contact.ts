export const contactContent = {
  eyebrow: 'Get in touch',
  heading: "Let's build the future together",
  description: 'Have questions? Want a demo? Send us a message and our team will get back to you.',
  submitLabel: 'Send Message',
  submittingLabel: 'Sending…',
  successMessage: 'Thanks! Our team will contact you shortly.',
}

export const teamSizes = ['1-10', '11-50', '51-200', '200+'] as const
export const demoTimes = ['Morning', 'Afternoon', 'Evening'] as const

// Selecting this team size reveals the required "Preferred Demo Time" field.
export const demoTimeTeamSize = '200+'

export const messageLimits = { min: 20, max: 300 }

// Simulated processing time for the fake submit.
export const submitDelayMs = 1000
