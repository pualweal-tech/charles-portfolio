import { useEffect, useRef } from 'react'

type HeroProps = {
  onEnterGraphic: () => void
}

export default function Hero({ onEnterGraphic }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const video = videoRef.current
    const wrap = wrapRef.current
    if (!video || !wrap) return

    video.muted = true
    video.playsInline = true
    video.pause()

    const target = { current: 0 }
    const hovering = { current: false }
    const rafId = { current: 0 }

    const tick = () => {
      rafId.current = 0
      if (!video.duration || !Number.isFinite(video.duration)) return
      const ease = hovering.current ? 0.22 : 0.16
      const next = video.currentTime + (target.current - video.currentTime) * ease
      if (Math.abs(next - video.currentTime) > 0.001) {
        video.currentTime = next
      }
      if (Math.abs(target.current - video.currentTime) > 0.012) {
        rafId.current = window.requestAnimationFrame(tick)
      } else {
        video.currentTime = target.current
      }
    }

    const queue = () => {
      if (!rafId.current) rafId.current = window.requestAnimationFrame(tick)
    }

    const aimFromX = (clientX: number) => {
      if (!video.duration) return
      const rect = wrap.getBoundingClientRect()
      const x = (clientX - rect.left) / Math.max(rect.width, 1)
      const t = 1 - Math.min(1, Math.max(0, x))
      target.current = t * video.duration
      queue()
    }

    const onEnter = (event: PointerEvent) => {
      hovering.current = true
      aimFromX(event.clientX)
    }

    const onMove = (event: PointerEvent) => {
      if (!hovering.current) return
      aimFromX(event.clientX)
    }

    const onLeave = () => {
      hovering.current = false
      target.current = 0
      queue()
    }

    wrap.addEventListener('pointerenter', onEnter)
    wrap.addEventListener('pointermove', onMove)
    wrap.addEventListener('pointerleave', onLeave)
    wrap.addEventListener('pointercancel', onLeave)

    return () => {
      if (rafId.current) window.cancelAnimationFrame(rafId.current)
      wrap.removeEventListener('pointerenter', onEnter)
      wrap.removeEventListener('pointermove', onMove)
      wrap.removeEventListener('pointerleave', onLeave)
      wrap.removeEventListener('pointercancel', onLeave)
    }
  }, [])

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
        <div
          ref={wrapRef}
          className="pointer-events-auto w-[min(72vw,820px)]"
        >
          <video
            ref={videoRef}
            src="/portrait.mp4"
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            controls={false}
            aria-label="保罗个人形象"
            className="ml-auto block h-[78vh] max-h-[860px] w-auto object-contain object-bottom select-none lg:h-[86vh]"
          />
        </div>
      </div>
    </section>
  )
}
