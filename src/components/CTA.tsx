export default function CTA() {
  return (
    <>
      <div className="paper-dock pointer-events-none fixed inset-x-0 bottom-0 z-20 px-5 pb-[max(1.1rem,env(safe-area-inset-bottom))] pt-4 backdrop-blur-md lg:hidden">
        <div className="mb-2 flex items-center justify-between gap-4">
          <p className="font-display text-[26px] leading-snug">把感觉做成能被使用的形状</p>
          <span className="font-num shrink-0 text-[11px] tracking-[0.12em] text-[var(--ink-soft)]">
            <span data-scrub-frame>001</span>
            <span> / 073</span>
          </span>
        </div>
        <p className="mt-2 max-w-[22rem] text-[13px] font-light leading-6 text-[var(--ink-soft)]">
          品牌、界面、AI。少一点表演，多一点结构。
        </p>
        <div className="relative mt-3 h-5 text-[11px] tracking-[0.14em] text-[var(--ink-soft)]">
          <p className="hint-instruction absolute inset-0">左右滑动，他会转过身来</p>
          <div className="hint-state relative h-5">
            <p className="hint-band hint-band-you">他在看你</p>
            <p className="hint-band hint-band-turn">视线正在偏移</p>
            <p className="hint-band hint-band-work">他看向作品</p>
          </div>
        </div>
        <div className="pointer-events-auto mt-4 flex flex-wrap items-center gap-2.5">
          <a href="#works" className="cta-solid">
            进入作品
            <span aria-hidden="true">→</span>
          </a>
          <a href="#talk" className="cta-ghost">
            约谈合作
          </a>
        </div>
      </div>

      <div className="pointer-events-none fixed bottom-8 left-10 z-20 hidden lg:block">
        <div className="pointer-events-auto flex items-center gap-3">
          <a href="#works" className="cta-solid">
            进入作品
            <span aria-hidden="true">→</span>
          </a>
          <a href="#talk" className="cta-ghost">
            约谈合作
          </a>
        </div>
      </div>
    </>
  )
}
