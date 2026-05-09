// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025 germondai - https://github.com/germondai

'use client'

import dynamic from 'next/dynamic'

const BeamEffect = dynamic(() => import('./BeamEffect').then((m) => m.BeamEffect), {
  ssr: false,
  loading: () => null,
})
const ParticleField = dynamic(() => import('./ParticleField').then((m) => m.ParticleField), {
  ssr: false,
  loading: () => null,
})
const LightFlare = dynamic(() => import('./LightFlare').then((m) => m.LightFlare), {
  ssr: false,
  loading: () => null,
})

interface EffectsLayerProps {
  beams: boolean
  particles: boolean
  lensFlares: boolean
  backgroundAnimation: boolean
}

export const EffectsLayer = ({
  beams,
  particles,
  lensFlares,
  backgroundAnimation,
}: EffectsLayerProps) => (
  <>
    {beams && backgroundAnimation && <BeamEffect />}
    {particles && backgroundAnimation && <ParticleField />}
    {lensFlares && <LightFlare />}
  </>
)
