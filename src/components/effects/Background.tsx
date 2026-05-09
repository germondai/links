// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025 germondai - https://github.com/germondai

'use client'

import type { Background as BackgroundConfig } from '@/types/config'

export const Background = ({ background }: { background?: BackgroundConfig }) => {
  if (!background || background.type === 'gradient') return null

  const overlay = background.overlayOpacity ?? 0.5

  if (background.type === 'color')
    return (
      <div
        className="fixed inset-0 -z-10"
        style={{ background: background.src ?? '#09090b' }}
        aria-hidden="true"
      />
    )

  if (background.type === 'image')
    return (
      <div className="fixed inset-0 -z-10" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${background.src})`,
            backgroundSize: background.fit === 'contain' ? 'contain' : 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div className="absolute inset-0 bg-black" style={{ opacity: overlay }} />
      </div>
    )

  if (background.type === 'video')
    return (
      <div className="fixed inset-0 -z-10" aria-hidden="true">
        {background.src && (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            src={background.src}
          />
        )}
        <div className="absolute inset-0 bg-black" style={{ opacity: overlay }} />
      </div>
    )

  return null
}
