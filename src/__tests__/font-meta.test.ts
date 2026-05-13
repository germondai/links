// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025 germondai - https://github.com/germondai

import { describe, expect, it } from 'bun:test'
import { FONT_FAMILY, FONT_NAMES, fontLabel } from '@/lib/font-meta'
import type { FontName } from '@/types/config'

const EXPECTED_COUNT = 41

describe('FONT_FAMILY', () => {
  it(`has all ${EXPECTED_COUNT} fonts`, () => {
    expect(Object.keys(FONT_FAMILY)).toHaveLength(EXPECTED_COUNT)
  })

  it('every value is a non-empty CSS family string', () => {
    for (const [key, family] of Object.entries(FONT_FAMILY)) {
      expect(typeof family).toBe('string')
      expect(family.length).toBeGreaterThan(0)
      // key should map to a reasonable family name (no trailing/leading spaces)
      expect(family).toBe(family.trim())
      // underscore keys map to space-separated names
      if (key.includes('_')) {
        expect(family).toContain(' ')
      }
    }
  })

  it('Space_Grotesk maps to "Space Grotesk"', () => {
    expect(FONT_FAMILY.Space_Grotesk).toBe('Space Grotesk')
  })

  it('JetBrains_Mono maps to "JetBrains Mono"', () => {
    expect(FONT_FAMILY.JetBrains_Mono).toBe('JetBrains Mono')
  })

  it('Inter maps to "Inter"', () => {
    expect(FONT_FAMILY.Inter).toBe('Inter')
  })
})

describe('FONT_NAMES', () => {
  it(`has ${EXPECTED_COUNT} entries`, () => {
    expect(FONT_NAMES).toHaveLength(EXPECTED_COUNT)
  })

  it('matches the keys of FONT_FAMILY', () => {
    expect(FONT_NAMES.sort()).toEqual((Object.keys(FONT_FAMILY) as FontName[]).sort())
  })

  it('contains expected fonts from each category', () => {
    // geometric sans
    expect(FONT_NAMES).toContain('Inter')
    expect(FONT_NAMES).toContain('Urbanist')
    expect(FONT_NAMES).toContain('Bricolage_Grotesque')
    // humanist sans
    expect(FONT_NAMES).toContain('Poppins')
    expect(FONT_NAMES).toContain('Open_Sans')
    expect(FONT_NAMES).toContain('Manrope')
    // professional sans
    expect(FONT_NAMES).toContain('Plus_Jakarta_Sans')
    expect(FONT_NAMES).toContain('Lexend')
    // techy sans
    expect(FONT_NAMES).toContain('Space_Grotesk')
    expect(FONT_NAMES).toContain('Oxanium')
    // monospace
    expect(FONT_NAMES).toContain('JetBrains_Mono')
    expect(FONT_NAMES).toContain('Fira_Code')
    // serif
    expect(FONT_NAMES).toContain('Playfair_Display')
    expect(FONT_NAMES).toContain('Merriweather')
    // display
    expect(FONT_NAMES).toContain('Bebas_Neue')
    expect(FONT_NAMES).toContain('Anton')
  })
})

describe('fontLabel', () => {
  it('returns the CSS family string for a given FontName', () => {
    expect(fontLabel('Inter')).toBe('Inter')
    expect(fontLabel('Space_Grotesk')).toBe('Space Grotesk')
    expect(fontLabel('DM_Serif_Display')).toBe('DM Serif Display')
    expect(fontLabel('Cormorant_Garamond')).toBe('Cormorant Garamond')
    expect(fontLabel('IBM_Plex_Mono')).toBe('IBM Plex Mono')
    expect(fontLabel('Plus_Jakarta_Sans')).toBe('Plus Jakarta Sans')
    expect(fontLabel('Bricolage_Grotesque')).toBe('Bricolage Grotesque')
  })

  it('returns the same value as FONT_FAMILY for every key', () => {
    for (const name of FONT_NAMES) {
      expect(fontLabel(name)).toBe(FONT_FAMILY[name])
    }
  })
})
