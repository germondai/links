// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025 germondai - https://github.com/germondai

import { describe, expect, it } from 'bun:test'
import { circleSvg, ICON_ACCENTS, ICON_BG_COLORS } from '@/lib/icon-colors'
import { THEMES } from '@/lib/themes'
import type { Theme } from '@/types/config'

const THEME_KEYS = Object.keys(THEMES) as Theme[]

// ── ICON_ACCENTS ──────────────────────────────────────────────────────────────

describe('ICON_ACCENTS', () => {
  it('has an entry for every theme', () => {
    for (const key of THEME_KEYS) {
      expect(ICON_ACCENTS[key]).toBeDefined()
    }
  })

  it('matches THEMES.accent for every theme', () => {
    for (const key of THEME_KEYS) {
      expect(ICON_ACCENTS[key]).toBe(THEMES[key].accent)
    }
  })

  it('every value is a valid hex color', () => {
    for (const value of Object.values(ICON_ACCENTS)) {
      expect(value).toMatch(/^#[0-9a-f]{6}$/i)
    }
  })
})

// ── ICON_BG_COLORS ────────────────────────────────────────────────────────────

describe('ICON_BG_COLORS', () => {
  it('has an entry for every theme', () => {
    for (const key of THEME_KEYS) {
      expect(ICON_BG_COLORS[key]).toBeDefined()
    }
  })

  it('matches THEMES.from for every theme', () => {
    for (const key of THEME_KEYS) {
      expect(ICON_BG_COLORS[key]).toBe(THEMES[key].from)
    }
  })

  it('every value is a valid hex color', () => {
    for (const value of Object.values(ICON_BG_COLORS)) {
      expect(value).toMatch(/^#[0-9a-f]{6}$/i)
    }
  })
})

// ── circleSvg ─────────────────────────────────────────────────────────────────

describe('circleSvg', () => {
  const accent = '#7c3aed'
  const bg = '#0f0a2e'

  it('returns a Buffer', () => {
    expect(circleSvg(32, accent, bg)).toBeInstanceOf(Buffer)
  })

  it('produces valid SVG markup', () => {
    const svg = circleSvg(32, accent, bg).toString()
    expect(svg).toContain('<svg')
    expect(svg).toContain('</svg>')
    expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"')
  })

  it('sets correct width and height attributes', () => {
    for (const size of [32, 180, 192, 512]) {
      const svg = circleSvg(size, accent, bg).toString()
      expect(svg).toContain(`width="${size}"`)
      expect(svg).toContain(`height="${size}"`)
    }
  })

  it('embeds the accent color in the gradient stops', () => {
    const svg = circleSvg(64, accent, bg).toString()
    expect(svg).toContain(accent)
  })

  it('embeds the background color in the rect fill', () => {
    const svg = circleSvg(64, accent, bg).toString()
    expect(svg).toContain(bg)
  })

  it('positions circle center at half the size', () => {
    const size = 192
    const cx = size / 2
    const svg = circleSvg(size, accent, bg).toString()
    expect(svg).toContain(`cx="${cx}"`)
    expect(svg).toContain(`cy="${cx}"`)
  })

  it('circle radius is ~42% of size', () => {
    const size = 512
    const expectedR = Math.round(size * 0.42)
    const svg = circleSvg(size, accent, bg).toString()
    expect(svg).toContain(`r="${expectedR}"`)
  })

  it('contains a radial gradient definition', () => {
    const svg = circleSvg(32, accent, bg).toString()
    expect(svg).toContain('radialGradient')
    expect(svg).toContain('<defs>')
  })

  it('produces different output for different sizes', () => {
    const svg32 = circleSvg(32, accent, bg).toString()
    const svg512 = circleSvg(512, accent, bg).toString()
    expect(svg32).not.toBe(svg512)
  })

  it('produces different output for different accent colors', () => {
    const svgA = circleSvg(64, '#7c3aed', bg).toString()
    const svgB = circleSvg(64, '#f43f5e', bg).toString()
    expect(svgA).not.toBe(svgB)
  })
})
