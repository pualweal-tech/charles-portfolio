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
    { id: 'graphic' as const, index: '01', label: '平面作品', onClick: onGraphic },
    { id: 'about' as const, index: '02', label: '个人简介', onClick: onAbout },
    { id: 'career' as const, index: '03', label: '工作经历', onClick: onCareer },
    { id: 'vibe' as const, index: '04', label: 'vibe coding', onClick: onVibe },
  ]

  return (
    <header className="site-header">
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

      <nav className="site-nav" aria-label="主导航">
        {links.map((item) => (
          <button
            key={item.id}
            type="button"
            className="header-link"
            data-active={view === item.id}
            onClick={item.onClick}
          >
            <span className="header-index">{item.index}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </header>
  )
}
