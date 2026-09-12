import type { View } from '../types'

type HeaderProps = {
  view: View
  onHome: () => void
  onGraphic: () => void
  onAbout: () => void
  onCareer: () => void
  onVibe: () => void
}

export default function Header({
  view,
  onHome,
  onGraphic,
  onAbout,
  onCareer,
  onVibe,
}: HeaderProps) {
  const links = [
    { id: 'graphic' as const, label: '平面作品', onClick: onGraphic },
    { id: 'about' as const, label: '个人简介', onClick: onAbout },
    { id: 'career' as const, label: '工作经历', onClick: onCareer },
    { id: 'vibe' as const, label: 'vibe coding案例', onClick: onVibe },
  ]

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 pt-5 sm:px-8 sm:pt-6 lg:px-10">
      {view === 'home' ? (
        <button
          type="button"
          onClick={onHome}
          className="brand-mark pointer-events-auto text-left"
          aria-label="张竣豪作品集首页"
        >
          <span className="brand-zh">张竣豪</span>
          <span className="brand-en">（charles）</span>
          <span className="brand-en-wide">PORTFOLIO</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={onHome}
          className="back-arrow pointer-events-auto"
          aria-label="返回主界面"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M15.2 3.2 5.1 12l10.1 8.8 2.2-2.5L11.2 12l6.2-6.3-2.2-2.5Z"
              fill="currentColor"
            />
          </svg>
        </button>
      )}

      <nav className="pointer-events-auto flex max-w-[70%] flex-wrap items-center justify-end gap-x-5 gap-y-2 text-[11px] sm:gap-x-8 sm:text-[12px] lg:gap-x-10">
        {links.map((item) => (
          <button
            key={item.id}
            type="button"
            className="header-link"
            data-active={view === item.id}
            onClick={item.onClick}
          >
            {item.label}
          </button>
        ))}
        <button
          type="button"
          className="header-arrow"
          aria-label="进入平面作品"
          onClick={onGraphic}
        >
          →
        </button>
      </nav>
    </header>
  )
}
