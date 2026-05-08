// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025 germondai - https://github.com/germondai

import type { Appearance, Effects, Link, LinksConfig } from '@/types/config'

export const DEFAULT_EFFECTS: Required<Effects> = {
  beams: true,
  particles: true,
  lensFlares: true,
  noiseTexture: true,
}

export const DEFAULT_APPEARANCE: Required<Appearance> = {
  theme: 'aurora',
  font: 'Inter',
  background: { type: 'gradient' },
  accentColor: undefined as unknown as string,
  glassOpacity: 0.1,
  linkStyle: 'default',
  blur: 20,
  avatarGlow: true,
  backgroundAnimation: true,
}

export type ResolvedConfig = Omit<LinksConfig, 'appearance' | 'effects' | 'links'> & {
  appearance: Required<Appearance>
  effects: Required<Effects>
  links: Link[]
}

export const resolveConfig = (raw: LinksConfig): ResolvedConfig => ({
  ...raw,
  appearance: { ...DEFAULT_APPEARANCE, ...raw.appearance },
  effects: { ...DEFAULT_EFFECTS, ...raw.effects },
  links: raw.links.filter((l) => l.enabled !== false),
})
