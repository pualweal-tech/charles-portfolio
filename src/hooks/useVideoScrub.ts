import { useEffect, type RefObject } from 'react'

const SENSITIVITY = 2.2
const FPS = 24

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function setGazeBand(progress: number) {
  const root = document.documentElement
  const next = progress < 0.38 ? 'you' : progress < 0.72 ? 'turn' : 'work'
  if (root.dataset.gaze !== next) {
    root.dataset.gaze = next
  }
}

export function useVideoScrub(videoRef: RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const root = document.documentElement
    root.dataset.gaze = 'you'

    video.muted = true
    video.playsInline = true
    video.controls = false

    const prevX = { current: null as number | null }
    const targetTime = { current: 0 }
    const seeking = { current: false }
    const rafId = { current: 0 }

    const frameEls = () => document.querySelectorAll<HTMLElement>('[data-scrub-frame]')

    const applyProgress = (time: number, duration: number) => {
      const progress = duration > 0 ? time / duration : 0
      root.style.setProperty('--gaze', progress.toFixed(4))
      setGazeBand(progress)
      const label = String(Math.min(999, Math.round(time * FPS) + 1)).padStart(3, '0')
      frameEls().forEach((el) => {
        el.textContent = label
      })
    }

    const seekTo = (time: number) => {
      const duration = video.duration
      if (!duration || !Number.isFinite(duration)) return
      const clamped = clamp(time, 0, duration)
      if (Math.abs(video.currentTime - clamped) < 0.001) {
        applyProgress(clamped, duration)
        return
      }
      seeking.current = true
      video.currentTime = clamped
      applyProgress(clamped, duration)
    }

    const flush = () => {
      rafId.current = 0
      if (!seeking.current) seekTo(targetTime.current)
    }

    const queueSeek = () => {
      if (rafId.current) return
      rafId.current = window.requestAnimationFrame(flush)
    }

    const onPointerDelta = (clientX: number) => {
      if (prevX.current === null) {
        prevX.current = clientX
        return
      }

      const deltaX = clientX - prevX.current
      prevX.current = clientX

      const duration = video.duration
      if (!duration || !Number.isFinite(duration)) return

      targetTime.current = clamp(
        targetTime.current + (deltaX / window.innerWidth) * SENSITIVITY * duration,
        0,
        duration,
      )
      queueSeek()
    }

    const markMoved = () => {
      if (!root.dataset.moved) root.dataset.moved = '1'
    }

    const onMouseMove = (event: MouseEvent) => {
      markMoved()
      onPointerDelta(event.clientX)
    }

    const isUiTarget = (target: EventTarget | null) =>
      target instanceof Element && Boolean(target.closest('a, button'))

    const onTouchStart = (event: TouchEvent) => {
      if (isUiTarget(event.target)) {
        prevX.current = null
        return
      }
      prevX.current = event.touches[0]?.clientX ?? null
    }

    const onTouchMove = (event: TouchEvent) => {
      if (isUiTarget(event.target) || prevX.current === null) return
      const x = event.touches[0]?.clientX
      if (x === undefined) return
      markMoved()
      event.preventDefault()
      onPointerDelta(x)
    }

    const onTouchEnd = () => {
      prevX.current = null
    }

    const onSeeked = () => {
      seeking.current = false
      if (Math.abs(video.currentTime - targetTime.current) > 0.001) {
        seekTo(targetTime.current)
      }
    }

    const onLoaded = () => {
      targetTime.current = video.currentTime || 0
      applyProgress(targetTime.current, video.duration || 1)
    }

    video.addEventListener('seeked', onSeeked)
    video.addEventListener('loadedmetadata', onLoaded)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onTouchEnd)
    window.addEventListener('touchcancel', onTouchEnd)

    if (video.readyState >= 1) onLoaded()

    return () => {
      if (rafId.current) window.cancelAnimationFrame(rafId.current)
      video.removeEventListener('seeked', onSeeked)
      video.removeEventListener('loadedmetadata', onLoaded)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('touchcancel', onTouchEnd)
    }
  }, [videoRef])
}
