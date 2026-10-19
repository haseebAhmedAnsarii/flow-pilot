import { useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { featureTabs, featureTabsContent } from '../data/featureTabs'
import { Container } from './Container'

const tabId = (id: string) => `feature-tab-${id}`
const detailPanelId = 'feature-panel-detail'

export function FeatureTabs() {
  const [activeId, setActiveId] = useState(featureTabs[0].id)
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const active = featureTabs.find((tab) => tab.id === activeId) ?? featureTabs[0]

  const select = (id: string, focus = false) => {
    setActiveId(id)
    if (focus) tabRefs.current[id]?.focus()
  }

  // Arrow keys / Home / End move between tabs (roving tabindex, automatic activation).
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = featureTabs.findIndex((tab) => tab.id === activeId)
    const last = featureTabs.length - 1
    const targets: Record<string, number> = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    }
    const next = targets[event.key]
    if (next === undefined) return
    event.preventDefault()
    select(featureTabs[next].id, true)
  }

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="bg-white py-6 md:py-14"
    >
      <Container>
        <div className="flex flex-col gap-6 rounded-3xl bg-linear-to-r from-hero-from to-hero-to p-6 sm:p-8 xl:flex-row xl:items-center xl:justify-between xl:gap-10 xl:p-10">
          <div className="flex min-w-0 flex-col xl:flex-1">
            <h2
              id="how-it-works-heading"
              className="text-[1.875rem] leading-[2.34375rem] font-extrabold text-ink"
            >
              {featureTabsContent.heading}
            </h2>
            <p className="pt-2 pb-6 text-[0.875rem] leading-[1.3125rem] text-body">
              {featureTabsContent.subheading}
            </p>

            <div
              role="tablist"
              aria-label="Workflow stages"
              onKeyDown={handleKeyDown}
              className="-mx-6 -mt-1 mb-6 flex scroll-px-6 gap-3 overflow-x-auto px-6 py-1 [scrollbar-width:none] sm:-mx-8 sm:scroll-px-8 sm:px-8 xl:mx-0 xl:mt-0 xl:mb-8 xl:overflow-visible xl:px-0 xl:py-0 [&::-webkit-scrollbar]:hidden"
            >
              {featureTabs.map((tab) => {
                const selected = tab.id === activeId
                return (
                  <button
                    key={tab.id}
                    ref={(node) => {
                      tabRefs.current[tab.id] = node
                    }}
                    id={tabId(tab.id)}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls={detailPanelId}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => select(tab.id)}
                    className={`h-10 w-[6.75rem] shrink-0 rounded-[0.625rem] text-[0.75rem] leading-[1.125rem] font-semibold transition focus-visible:outline-[0.125rem] focus-visible:outline-offset-[0.125rem] focus-visible:outline-brand ${
                      selected
                        ? 'border-[0.0625rem] border-transparent bg-linear-to-r from-brand to-accent text-white shadow-cta'
                        : 'border-[0.0625rem] border-transparent bg-white text-ink hover:border-border hover:bg-surface'
                    }`}
                  >
                    {tab.label}
                  </button>
                )
              })}
            </div>

            <div
              key={active.id}
              id={detailPanelId}
              role="tabpanel"
              tabIndex={0}
              aria-labelledby={tabId(active.id)}
              className="animate-fade-in flex min-h-20 max-w-[35rem] flex-col justify-center rounded-[0.875rem] border-[0.0625rem] border-border bg-white px-6 py-3 focus-visible:outline-[0.125rem] focus-visible:outline-offset-[0.125rem] focus-visible:outline-brand"
            >
              <h3 className="text-base leading-[1.375rem] font-bold text-ink">{active.title}</h3>
              <p className="text-[0.75rem] leading-[1.125rem] text-body">{active.description}</p>
            </div>
          </div>

          <div
            key={`${active.id}-metric`}
            className="animate-fade-in flex flex-col justify-center rounded-2xl border-[0.0625rem] border-border bg-white p-8 xl:h-[13.125rem] xl:w-[30.4375rem] xl:shrink-0 xl:p-[2.0625rem]"
          >
            <p className="pb-1 text-[2.5rem] leading-10 font-extrabold text-ink">
              {active.metric.value}
            </p>
            <p className="pb-6 text-[0.8125rem] leading-[1.21875rem] font-medium text-body">
              {active.metric.label}
            </p>
            <div className="h-4 w-full max-w-[26.25rem] overflow-clip rounded-lg bg-surface-track">
              <div
                role="presentation"
                className="h-full rounded-lg bg-linear-to-r from-brand to-accent"
                style={{ width: `${active.progress}%` }}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
