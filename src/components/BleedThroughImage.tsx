import React from 'react'
import Image from 'next/image'
import DesktopOnly from '@/components/DesktopOnly'

export type BleedThroughImageProps = {
  src: string
  width: number
  height: number
  lqip: string
}

const BleedThroughImage: React.FC<BleedThroughImageProps> = props => {
  const { src, width, height, lqip } = props

  return (
    <div className="relative" style={{ aspectRatio: `${width} / ${height}` }}>
      <DesktopOnly>
        <div
          className="absolute inset-0 blur-xl saturate-150 transform-gpu
          after:absolute after:inset-0 after:block after:bg-white/50 dark:after:bg-black/50"
        >
          <Image
            className="w-full h-full rounded-3xl"
            aria-hidden
            src={lqip}
            alt=""
            fill
            unoptimized
          />
        </div>
      </DesktopOnly>
      <Image
        className="relative rounded-xl sm:rounded-3xl"
        src={src}
        alt="Hero Image"
        fill
        unoptimized
        placeholder="blur"
        blurDataURL={lqip}
      />
      <DesktopOnly>
        <div className="absolute inset-px ring-1 ring-zinc-400/10 rounded-[23px] pointer-events-none"></div>
      </DesktopOnly>
    </div>
  )
}

export default BleedThroughImage
