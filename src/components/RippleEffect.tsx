import { useEffect, useRef } from 'react'

type Ripple = {
  x: number
  y: number
  born: number
}

const GAP_MS = 520
const LIFE_MS = 820
const MAX = 1

type RippleEffectProps = {
  enabled: boolean
}

export default function RippleEffect({ enabled }: RippleEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ripples = useRef<Ripple[]>([])
  const lastAt = useRef(0)
  const raf = useRef(0)

  useEffect(() => {
    if (!enabled) {
      ripples.current = []
      return
    }

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!finePointer.matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (now: number) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      ripples.current = ripples.current.filter((ripple) => now - ripple.born < LIFE_MS)

      for (const ripple of ripples.current) {
        const t = (now - ripple.born) / LIFE_MS
        const ease = 1 - (1 - t) * (1 - t)
        const radius = 10 + ease * 56
        const fade = 1 - t

        const glow = ctx.createRadialGradient(
          ripple.x,
          ripple.y,
          radius * 0.18,
          ripple.x,
          ripple.y,
          radius,
        )
        glow.addColorStop(0, `rgba(255, 252, 244, ${0.035 * fade})`)
        glow.addColorStop(1, 'rgba(255, 255, 255, 0)')
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(ripple.x, ripple.y, radius, 0, Math.PI * 2)
        ctx.fill()

        ctx.strokeStyle = `rgba(255, 250, 240, ${0.12 * fade})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(ripple.x, ripple.y, radius * 0.82, 0, Math.PI * 2)
        ctx.stroke()
      }

      raf.current = window.requestAnimationFrame(draw)
    }

    const spawn = (x: number, y: number) => {
      const now = performance.now()
      if (now - lastAt.current < GAP_MS) return
      lastAt.current = now
      ripples.current.push({ x, y, born: now })
      if (ripples.current.length > MAX) ripples.current.shift()
    }

    const onMove = (event: MouseEvent) => spawn(event.clientX, event.clientY)

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    raf.current = window.requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.cancelAnimationFrame(raf.current)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <canvas
      ref={canvasRef}
      className="ripple-layer pointer-events-none fixed inset-0 z-10"
      aria-hidden="true"
    />
  )
}
