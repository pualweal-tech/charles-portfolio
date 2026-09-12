import { useState } from 'react'

export const NAV_ITEMS = [
  { href: '#works', index: '01', label: '作品' },
  { href: '#method', index: '02', label: '方法' },
  { href: '#lab', index: '03', label: '实验' },
  { href: '#talk', index: '04', label: '约谈' },
] as const

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-20 flex items-start justify-between px-5 pt-5 sm:px-8 sm:pt-7 lg:px-10">
        <a href="/" className="pointer-events-auto gaze-identity gaze-shift-left block">
          <span className="font-display text-[22px] leading-none tracking-[0.18em] sm:text-[24px]">
            保罗
          </span>
          <span className="mt-1.5 block text-[11px] font-light tracking-[0.22em] text-[var(--ink-soft)]">
            视觉 / 产品 / AI
          </span>
        </a>

        <div className="pointer-events-auto flex items-center gap-8">
          <span className="font-num hidden text-[13px] tracking-[0.14em] text-[var(--ink-soft)] sm:block">
            2026
          </span>
          <button
            type="button"
            className="font-display text-[17px] tracking-[0.28em] underline decoration-[0.6px] underline-offset-4 lg:hidden"
            aria-expanded={open}
            aria-label={open ? '关闭目录' : '打开目录'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? '关闭' : '目录'}
          </button>
        </div>
      </header>

      <nav
        className="gaze-work gaze-shift-right pointer-events-none fixed top-1/2 right-8 z-20 hidden -translate-y-1/2 lg:pointer-events-auto lg:block xl:right-12"
        aria-label="页面导航"
      >
        <ul className="flex flex-col gap-4">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="nav-link font-display text-[18px]">
                <span className="font-num text-[11px] tracking-[0.14em] text-[var(--ink-soft)]">
                  {item.index}
                </span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div
        className={`menu-overlay fixed inset-0 z-30 flex flex-col justify-end px-6 pb-16 pt-24 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        style={{ pointerEvents: open ? 'auto' : 'none' }}
      >
        <nav className="flex flex-col gap-7">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={close}
              className="flex items-baseline gap-4"
            >
              <span className="font-num text-[13px] text-[var(--ink-soft)]">{item.index}</span>
              <span className="font-display text-[40px] leading-none">{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </>
  )
}
