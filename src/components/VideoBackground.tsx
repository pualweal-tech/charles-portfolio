import type { RefObject } from 'react'

type VideoBackgroundProps = {
  videoRef: RefObject<HTMLVideoElement | null>
}

export default function VideoBackground({ videoRef }: VideoBackgroundProps) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <video
        ref={videoRef}
        src="/portrait.mp4"
        poster="/poster.jpg"
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        controls={false}
        className="video-stage h-full w-full object-cover"
      />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#f3efe6]/55 to-transparent md:h-20" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#f3efe6]/80 to-transparent md:h-24 md:from-[#f3efe6]/35" />
    </div>
  )
}
