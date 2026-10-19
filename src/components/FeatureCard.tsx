import type { Feature } from '../data/features'

const iconBox = 'size-11 shrink-0 rounded-xl md:mb-5'

function FeatureIconView({ icon }: Pick<Feature, 'icon'>) {
  if (icon.kind === 'glyph') {
    return (
      <span
        aria-hidden="true"
        className={`${iconBox} ${icon.className} flex items-center justify-center text-[1.0625rem] leading-[1.59375rem] font-bold text-white`}
      >
        {icon.glyph}
      </span>
    )
  }
  return (
    <>
      <img src={icon.mobile} alt="" className={`${iconBox} md:hidden`} />
      <img src={icon.desktop} alt="" className={`${iconBox} hidden md:block`} />
    </>
  )
}

export function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <li className="flex min-h-[4.75rem] items-center gap-3.5 rounded-[0.875rem] border-[0.0625rem] border-border bg-white p-[0.9375rem] transition duration-200 hover:shadow-card motion-safe:hover:-translate-y-0.5 md:min-h-[12.5rem] md:flex-col md:items-start md:gap-0 md:rounded-2xl md:p-6">
      <FeatureIconView icon={feature.icon} />
      <div className="min-w-0">
        <h3 className="text-[0.875rem] leading-[1.09375rem] font-bold text-ink md:pb-1.5 md:text-base md:leading-6">
          {feature.title}
        </h3>
        <p className="pt-0.5 text-[0.6875rem] leading-[1.03125rem] text-body md:pt-0 md:text-[0.8125rem] md:leading-[1.05625rem]">
          <span className="md:hidden">{feature.shortDescription}</span>
          <span className="hidden md:inline">{feature.description}</span>
        </p>
      </div>
    </li>
  )
}
