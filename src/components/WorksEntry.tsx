type WorksEntryProps = {
  onEnterGraphic: () => void
}

export default function WorksEntry({ onEnterGraphic }: WorksEntryProps) {
  return (
    <section className="flex h-screen min-h-[560px] flex-col justify-end px-5 pb-16 sm:px-8 lg:px-12 lg:pb-20">
      <p className="text-[11px] tracking-[0.28em] text-[var(--ink-dim)]">SELECTED WORK</p>
      <div className="mt-8 max-w-[40rem] border-t border-[var(--line)] pt-8">
        <button type="button" className="entry-link" onClick={onEnterGraphic}>
          <span className="font-display text-[clamp(28px,4vw,48px)] tracking-[0.16em]">
            平面作品
          </span>
          <span className="entry-arrow text-[15px] tracking-[0.18em] text-[var(--ink-dim)]">
            Graphic Design
          </span>
        </button>
        <p className="mt-5 max-w-[22rem] text-[13px] leading-7 text-[var(--ink-dim)]">
          进入作品浏览空间。品牌策划已开放，其余板块稍后补全。
        </p>
      </div>
    </section>
  )
}
