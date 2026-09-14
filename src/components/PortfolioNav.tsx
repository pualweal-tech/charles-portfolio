import { PORTFOLIO_SECTIONS, type PortfolioSection } from '../data/projects'

type PortfolioNavProps = {
  active: PortfolioSection
  onChange: (section: PortfolioSection) => void
}

export default function PortfolioNav({ active, onChange }: PortfolioNavProps) {
  return (
    <aside className="pointer-events-none z-30 lg:pointer-events-auto lg:fixed lg:top-1/2 lg:right-8 lg:-translate-y-1/2 xl:right-12">
      <div className="hidden w-[9.5rem] lg:block">
        <p className="mb-3 pr-2 text-right font-en text-[10px] tracking-[0.28em] text-[var(--ink-dim)]">
          ARCHIVE
        </p>
        <p className="mb-4 pr-2 text-right text-[11px] tracking-[0.22em] text-[var(--ink-dim)]">
          平面作品
        </p>
        <div className="mb-5 ml-auto h-px w-10 bg-[var(--line)]" />
        <nav aria-label="作品板块">
          <ul>
            {PORTFOLIO_SECTIONS.map((section, index) => (
              <li key={section.id}>
                <button
                  type="button"
                  className="nav-item font-display text-[15px] tracking-[0.08em]"
                  data-active={section.id === active}
                  onClick={() => onChange(section.id)}
                >
                  <span className="nav-index">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>{section.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="pointer-events-auto fixed inset-x-0 bottom-0 z-30 border-t border-[var(--line)] bg-[rgba(5,5,5,0.88)] px-3 py-3 backdrop-blur-md lg:hidden">
        <nav className="flex gap-1 overflow-x-auto" aria-label="作品板块">
          {PORTFOLIO_SECTIONS.map((section) => (
            <button
              key={section.id}
              type="button"
              className="shrink-0 px-3 py-2 text-[12px] tracking-[0.12em] transition-opacity duration-200"
              style={{ opacity: section.id === active ? 1 : 0.4 }}
              onClick={() => onChange(section.id)}
            >
              {section.label}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  )
}
