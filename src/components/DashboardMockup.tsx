import { dashboard, taskStatusStyles } from '../data/hero'

// Purely decorative product visual. Compact sizes below xl, full sizes from xl up.
export function DashboardMockup() {
  return (
    // The wrapper is a size container: the sidebar is dropped when the card is narrower than the
    // 20.9rem (335px) the mobile design assumes, so it adapts to the page gutters, not just the screen.
    <div className="@container w-full max-w-[35rem] xl:w-[39.3rem] xl:max-w-none">
      <div
        role="img"
        aria-label="FlowPilot dashboard preview showing stats and today's tasks"
        className="flex w-full overflow-clip rounded-[1.125rem] border-[0.0625rem] border-border bg-white p-[0.9375rem] shadow-card xl:h-[26.875rem] xl:gap-4 xl:p-[1.0625rem]"
      >
        <div className="flex w-[6.875rem] shrink-0 flex-col @max-[20.9rem]:hidden gap-1.5 rounded-[0.875rem] border-[0.0625rem] border-border-soft bg-surface p-[0.6875rem] xl:w-[9.375rem] xl:gap-1 xl:border-0 xl:p-4">
          <p className="p-1 pb-2 text-[0.8125rem] leading-[1.21875rem] font-bold text-ink xl:p-0 xl:pb-3 xl:text-[1.0625rem] xl:leading-[1.59375rem]">
            FlowPilot
          </p>
          {dashboard.sidebar.map((item) => {
            const active = item === dashboard.activeSidebarItem
            return (
              <p
                key={item}
                className={`rounded-lg px-2 text-[0.6875rem] leading-[1.03125rem] xl:px-3 xl:text-[0.8125rem] xl:leading-[1.21875rem] ${
                  active
                    ? 'bg-surface-icon py-[0.3125rem] font-semibold text-brand xl:py-[0.3125rem]'
                    : 'py-1 font-medium text-body xl:py-[0.375rem]'
                }`}
              >
                {item}
              </p>
            )
          })}
        </div>

        <div className="min-w-0 flex-1 pl-3 @max-[20.9rem]:pl-0 xl:py-2 xl:pr-2 xl:pl-0">
          <p className="text-[0.875rem] leading-[1.3125rem] font-bold text-ink xl:text-[1.25rem] xl:leading-[1.5625rem]">
            {dashboard.greeting}
          </p>
          <p className="mt-[0.0625rem] text-[0.59375rem] leading-[0.7425rem] text-body xl:mt-1 xl:text-[0.6875rem] xl:leading-[1.03125rem]">
            {dashboard.subtitle}
          </p>

          <div className="flex gap-1.5 pt-[0.5375rem] xl:gap-2.5 xl:pt-3">
            {dashboard.stats.map((stat) => (
              <div
                key={stat.label}
                className="flex min-w-0 flex-1 flex-col items-center rounded-lg border-[0.0625rem] border-border bg-surface-raised p-[0.3125rem] text-center xl:h-[5.125rem] xl:items-start xl:justify-center xl:rounded-xl xl:px-[0.8125rem] xl:text-left"
              >
                <p className="text-[0.875rem] leading-[0.875rem] font-bold text-ink xl:text-[1.3125rem] xl:leading-[1.64063rem]">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-[0.5rem] leading-[0.625rem] font-medium text-body xl:mt-1 xl:text-[0.6875rem] xl:leading-[1.03125rem]">
                  <span className="xl:hidden">{stat.short}</span>
                  <span className="hidden xl:inline">{stat.label}</span>
                </p>
              </div>
            ))}
          </div>

          <p className="pt-[0.6625rem] text-[0.6875rem] leading-[1.03125rem] font-bold text-ink xl:pt-5 xl:pb-2 xl:text-[0.875rem] xl:leading-[1.3125rem]">
            {dashboard.tasksTitle}
          </p>
          <ul className="mt-1 xl:mt-0 xl:border-t-[0.0625rem] xl:border-divider">
            {dashboard.tasks.map((task) => {
              const status = taskStatusStyles[task.status]
              return (
                <li
                  key={task.label}
                  className="flex items-center justify-between border-t-[0.0625rem] border-divider pt-[0.3125rem] pb-1 xl:border-t-0 xl:border-b-[0.0625rem] xl:py-2 xl:last:border-b-0"
                >
                  <span className="flex items-center gap-1.5 pr-1 xl:gap-3">
                    <span className="size-3.5 shrink-0 rounded-[0.25rem] bg-surface-tint xl:size-[1.125rem] xl:rounded-md" />
                    <span className="text-[0.59375rem] leading-[0.89063rem] font-medium whitespace-nowrap text-ink xl:text-[0.75rem] xl:leading-[1.125rem]">
                      <span className="xl:hidden">{task.short}</span>
                      <span className="hidden xl:inline">{task.label}</span>
                    </span>
                  </span>
                  <span
                    className={`text-[0.53125rem] leading-[0.79688rem] font-semibold whitespace-nowrap xl:text-[0.6875rem] xl:leading-[1.03125rem] ${status.className}`}
                  >
                    {status.text}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
