export default function InteractionRail() {
  return (
    <div className="pointer-events-none fixed right-5 bottom-6 z-20 hidden items-end gap-6 sm:right-8 sm:bottom-8 sm:flex lg:right-10">
      <div className="w-28">
        <div className="mb-2 flex items-center justify-between text-[10px] tracking-[0.18em] text-[var(--ink-soft)]">
          <span>注视</span>
          <span className="font-num">
            <span data-scrub-frame>001</span>
            <span> / 073</span>
          </span>
        </div>
        <div className="relative h-px bg-[var(--line)]">
          <span className="tick" />
        </div>
      </div>
    </div>
  )
}
