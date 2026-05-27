// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025 germondai - https://github.com/germondai

'use client'

import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { Background } from '@/components/effects/Background'
import { EffectsLayer } from '@/components/effects/EffectsLayer'
import { NoiseBg } from '@/components/effects/NoiseBg'
import { ProfileCard } from '@/components/profile/ProfileCard'
import { FONT_FAMILY } from '@/lib/font-meta'
import { getThemeTokens } from '@/lib/themes'
import { useConfigStore } from '@/store/config'
import type { FontName } from '@/types/config'

const isDev = process.env.NODE_ENV === 'development'
const DevPanel = dynamic(() => import('@/components/dev/DevPanel').then((m) => m.DevPanel), {
  ssr: false,
})

export const PageClient = () => {
  const resolved = useConfigStore((s) => s.resolved)
  const { effects, appearance } = resolved
  const bg = appearance.background
  const bgType = bg?.type

  // update --font-base directly so the dev panel picker is instant without a rebuild
  useEffect(() => {
    const family = FONT_FAMILY[appearance.font as FontName] ?? 'Inter'
    document.documentElement.style.setProperty('--font-base', `'${family}', sans-serif`)
  }, [appearance.font])

  useEffect(() => {
    const tokens = getThemeTokens(appearance.theme)
    const accent = appearance.accentColor ?? tokens['--accent'] ?? '#7c3aed'
    const vars = appearance.accentColor
      ? { ...tokens, '--accent': accent, '--beam-color': accent, '--particle-color': accent }
      : tokens
    for (const [k, v] of Object.entries(vars)) document.body.style.setProperty(k, v)
    document.documentElement.style.setProperty('--color-primary', accent)
    document.documentElement.style.setProperty('--color-ring', accent)
  }, [appearance.theme, appearance.accentColor])

  useEffect(() => {
    if (bgType !== 'gradient') return
    if (bg?.gradientFrom) document.body.style.setProperty('--bg-from', bg.gradientFrom)
    if (bg?.gradientVia) document.body.style.setProperty('--bg-via', bg.gradientVia)
    if (bg?.gradientTo) document.body.style.setProperty('--bg-to', bg.gradientTo)
    document.body.style.setProperty('--bg-angle', `${bg?.gradientAngle ?? 135}deg`)
  }, [bgType, bg?.gradientFrom, bg?.gradientVia, bg?.gradientTo, bg?.gradientAngle])

  useEffect(() => {
    if (bgType && bgType !== 'gradient') {
      document.body.style.background = 'transparent'
    } else {
      document.body.style.removeProperty('background')
    }
  }, [bgType])

  return (
    <main className="relative min-h-dvh flex flex-col items-center justify-center overflow-hidden">
      <Background background={bg} />
      {effects.noiseTexture && <NoiseBg />}
      <EffectsLayer
        beams={effects.beams}
        particles={effects.particles}
        lensFlares={effects.lensFlares}
        backgroundAnimation={appearance.backgroundAnimation}
      />
      <ProfileCard config={resolved} />
      {isDev && <DevPanel />}
    </main>
  )
}
