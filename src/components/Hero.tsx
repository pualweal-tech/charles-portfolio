import { useEffect, useRef } from 'react'

type HeroProps = {
  active: boolean
  onEnterGraphic: () => void
  onEnterAbout: () => void
  onEnterVibe: () => void
}

const TICKER = [
  'UI设计',
  '品牌策划',
  '包装设计',
  '海报设计',
  '书籍设计',
  'AIGC',
  'GENERATIVE FORM',
]

const HIGHLIGHTS = [
  { index: '01', value: '简洁', label: 'Concise', onClick: 'about' as const },
  { index: '02', value: '实用', label: 'Practical', onClick: 'about' as const },
  { index: '03', value: '美观', label: 'Aesthetic', onClick: 'vibe' as const },
]

export default function Hero({
  active,
  onEnterGraphic,
  onEnterAbout,
  onEnterVibe,
}: HeroProps) {
  const figureRef = useRef<HTMLDivElement>(null)
  const typeRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!fine.matches) return

    const onMove = (event: MouseEvent) => {
      if (!active) return
      const x = (event.clientX / window.innerWidth - 0.5) * 2
      const y = (event.clientY / window.innerHeight - 0.5) * 2
      if (figureRef.current) {
        figureRef.current.style.transform = `translate3d(${x * 10}px, ${y * 6}px, 0)`
      }
      if (typeRef.current) {
        typeRef.current.style.transform = `translate3d(${x * -6}px, ${y * -3}px, 0)`
      }
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [active])

  const go = (target: 'about' | 'vibe') => {
    if (target === 'about') onEnterAbout()
    else onEnterVibe()
  }

  return (
    <section className="hero-stage">
      <p className="hero-watermark" aria-hidden="true">
        2026
      </p>
      <p className="hero-spine" aria-hidden="true">
        感觉 · 结构 · 生成
      </p>

      <div ref={figureRef} className="hero-figure">
        <img
          src="/works/asset-001.png"
          alt="保罗个人形象"
          className="hero-figure-img"
          fetchPriority="high"
        />
      </div>

      <ul className="hero-panel">
        {HIGHLIGHTS.map((item) => (
          <li key={item.index}>
            <button type="button" onClick={() => go(item.onClick)}>
              <span>{item.index}</span>
              <strong>{item.value}</strong>
              <em>{item.label}</em>
            </button>
          </li>
        ))}
      </ul>

      <div className="hero-copy">
        <h1 ref={typeRef} className="hero-title">
          <span>AIGC</span>
          <span>DESIGNER</span>
        </h1>
        <p className="hero-lead">
          您好，欢迎来到我的作品集。我叫张竣豪，一名AIGC设计师。
          擅长UI设计、品牌策划、海报设计等。
        </p>
        <button type="button" className="hero-enter" onClick={onEnterGraphic}>
          <span className="hero-enter-index">01</span>
          <span className="hero-enter-label">进入平面作品</span>
          <span className="hero-enter-arrow">↗</span>
        </button>
      </div>

      <div className="hero-marquee" aria-hidden="true">
        <div className="hero-marquee-track">
          {[0, 1].map((copy) => (
            <p key={copy}>
              {TICKER.map((item) => (
                <span key={`${copy}-${item}`}>{item}</span>
              ))}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
