type HeroProps = {
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
  onEnterGraphic,
  onEnterAbout,
  onEnterVibe,
}: HeroProps) {
  const go = (target: 'about' | 'vibe') => {
    if (target === 'about') onEnterAbout()
    else onEnterVibe()
  }

  return (
    <section className="hero-stage">
      <div className="hero-copy">
        <h1 className="hero-title">
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
