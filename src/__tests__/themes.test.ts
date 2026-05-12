// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025 germondai - https://github.com/germondai

import { describe, expect, it } from 'bun:test'
import { getThemeTokens, THEMES } from '@/lib/themes'
import type { Theme } from '@/types/config'

const THEME_KEYS = Object.keys(THEMES) as Theme[]

describe('THEMES', () => {
  it('every theme key has required fields', () => {
    for (const key of THEME_KEYS) {
      const theme = THEMES[key]
      expect(theme).toBeDefined()
      expect(theme.from).toMatch(/^#/)
      expect(theme.via).toMatch(/^#/)
      expect(theme.to).toMatch(/^#/)
      expect(theme.accent).toMatch(/^#/)
      expect(theme.beam).toMatch(/^#/)
      expect(theme.particle).toMatch(/^#/)
    }
  })

  it('has all 15 themes', () => {
    expect(THEME_KEYS).toHaveLength(15)
  })
})

describe('getThemeTokens', () => {
  it('returns correct CSS variable map for aurora', () => {
    const tokens = getThemeTokens('aurora')
    expect(tokens['--bg-from']).toBe(THEMES.aurora.from)
    expect(tokens['--accent']).toBe(THEMES.aurora.accent)
    expect(tokens['--beam-color']).toBe(THEMES.aurora.beam)
    expect(tokens['--particle-color']).toBe(THEMES.aurora.particle)
  })

  it('returns all 6 CSS variable keys', () => {
    const tokens = getThemeTokens('midnight')
    const keys = Object.keys(tokens)
    expect(keys).toContain('--bg-from')
    expect(keys).toContain('--bg-via')
    expect(keys).toContain('--bg-to')
    expect(keys).toContain('--accent')
    expect(keys).toContain('--beam-color')
    expect(keys).toContain('--particle-color')
    expect(keys).toHaveLength(6)
  })

  it('falls back to aurora for invalid theme name', () => {
    const tokens = getThemeTokens('invalid' as Theme)
    expect(tokens['--accent']).toBe(THEMES.aurora.accent)
  })

  it('returns correct tokens for all 14 themes', () => {
    for (const key of THEME_KEYS) {
      const tokens = getThemeTokens(key)
      expect(tokens['--accent']).toBe(THEMES[key].accent)
    }
  })
})
