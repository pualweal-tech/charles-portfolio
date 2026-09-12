type HeroProps = {
  onEnterGraphic: () => void
}

export default function Hero({ onEnterGraphic }: HeroProps) {
  return (
    <section className="relative flex h-screen min-h-[640px] items-center px-5 sm:px-8 lg:px-12">
      <div className="relative z-20 max-w-[22rem] lg:max-w-[28rem]">
        <p className="text-[11px] tracking-[0.32em] text-[var(--ink-dim)]">PAUL · 2026</p>
        <h1 className="font-en mt-5 text-[clamp(42px,7.4vw,92px)] leading-[0.92] font-semibold tracking-[-0.04em]">
          AIGC
          <br />
          DESIGNER
        </h1>
        <p className="mt-7 max-w-[16rem] text-[13px] leading-7 text-[var(--ink-dim)] lg:max-w-[18rem]">
          把感觉做成能被使用的形状。品牌、界面与生成式工具之间，少一点表演，多一点结构。
        </p>
        <button type="button" className="entry-link mt-10" onClick={onEnterGraphic}>
          <span className="font-display text-[22px] tracking-[0.18em]">平面作品</span>
          <span className="entry-arrow font-en text-[13px] tracking-[0.2em]">→</span>
        </button>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex justify-end">
        <img
          src="/works/asset-001.png"
          alt="保罗个人形象"
          className="h-[78vh] max-h-[860px] w-auto object-contain object-bottom select-none lg:h-[86vh]"
          fetchPriority="high"
        />
      </div>
    </section>
  )
}
