// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025 germondai - https://github.com/germondai

import { describe, expect, it } from 'bun:test'
import { DEFAULT_APPEARANCE, DEFAULT_EFFECTS, resolveConfig } from '@/lib/config'
import type { LinksConfig } from '@/types/config'

const baseConfig: LinksConfig = {
  profile: { name: 'Test User', username: 'testuser' },
  links: [{ title: 'Website', url: 'https://example.com' }],
}

describe('resolveConfig', () => {
  it('merges defaults when fields are missing', () => {
    const result = resolveConfig(baseConfig)
    expect(result.effects).toEqual(DEFAULT_EFFECTS)
    expect(result.appearance.glassOpacity).toBe(DEFAULT_APPEARANCE.glassOpacity)
    expect(result.appearance.linkStyle).toBe(DEFAULT_APPEARANCE.linkStyle)
    expect(result.appearance.blur).toBe(DEFAULT_APPEARANCE.blur)
    expect(result.appearance.theme).toBe(DEFAULT_APPEARANCE.theme)
  })

  it('filters out links with enabled: false', () => {
    const config: LinksConfig = {
      ...baseConfig,
      links: [
        { title: 'Active', url: 'https://a.com', enabled: true },
        { title: 'Hidden', url: 'https://b.com', enabled: false },
        { title: 'Default', url: 'https://c.com' },
      ],
    }
    const result = resolveConfig(config)
    expect(result.links).toHaveLength(2)
    expect(result.links.map((l) => l.title)).toEqual(['Active', 'Default'])
  })

  it('preserves explicitly set values over defaults', () => {
    const config: LinksConfig = {
      ...baseConfig,
      appearance: { theme: 'rose', glassOpacity: 0.5, blur: 10 },
      effects: { beams: false, particles: false },
    }
    const result = resolveConfig(config)
    expect(result.appearance.theme).toBe('rose')
    expect(result.appearance.glassOpacity).toBe(0.5)
    expect(result.appearance.blur).toBe(10)
    expect(result.effects.beams).toBe(false)
    expect(result.effects.particles).toBe(false)
    expect(result.effects.lensFlares).toBe(true)
  })

  it('handles empty socials array', () => {
    const config: LinksConfig = { ...baseConfig, socials: [] }
    const result = resolveConfig(config)
    expect(result.socials).toEqual([])
  })

  it('handles missing seo field', () => {
    const result = resolveConfig(baseConfig)
    expect(result.seo).toBeUndefined()
  })

  it('passes seo field through unchanged', () => {
    const config: LinksConfig = {
      ...baseConfig,
      seo: { title: 'My Links', canonicalUrl: 'https://links.example.com' },
    }
    const result = resolveConfig(config)
    expect(result.seo?.title).toBe('My Links')
    expect(result.seo?.canonicalUrl).toBe('https://links.example.com')
  })

  it('defaults font to Inter', () => {
    const result = resolveConfig(baseConfig)
    expect(result.appearance.font).toBe('Inter')
  })

  it('respects explicitly set font', () => {
    const config: LinksConfig = {
      ...baseConfig,
      appearance: { theme: 'aurora', font: 'Poppins' },
    }
    const result = resolveConfig(config)
    expect(result.appearance.font).toBe('Poppins')
  })

  it('defaults avatarGlow and backgroundAnimation to true', () => {
    const result = resolveConfig(baseConfig)
    expect(result.appearance.avatarGlow).toBe(true)
    expect(result.appearance.backgroundAnimation).toBe(true)
  })

  it('preserves link slugs on resolved links', () => {
    const config: LinksConfig = {
      ...baseConfig,
      links: [
        { title: 'Portfolio', url: 'https://germondai.com', slug: 'portfolio' },
        { title: 'App', url: 'https://app.example.com' },
      ],
    }
    const result = resolveConfig(config)
    expect(result.links[0]?.slug).toBe('portfolio')
    expect(result.links[1]?.slug).toBeUndefined()
  })

  it('filters disabled links but keeps slugged enabled ones', () => {
    const config: LinksConfig = {
      ...baseConfig,
      links: [
        { title: 'Active', url: 'https://a.com', slug: 'a' },
        { title: 'Hidden', url: 'https://b.com', slug: 'b', enabled: false },
      ],
    }
    const result = resolveConfig(config)
    expect(result.links).toHaveLength(1)
    expect(result.links[0]?.slug).toBe('a')
  })

  it('DEFAULT_APPEARANCE has correct shape', () => {
    expect(DEFAULT_APPEARANCE.theme).toBe('aurora')
    expect(DEFAULT_APPEARANCE.font).toBe('Inter')
    expect(DEFAULT_APPEARANCE.glassOpacity).toBe(0.1)
    expect(DEFAULT_APPEARANCE.blur).toBe(20)
    expect(DEFAULT_APPEARANCE.linkStyle).toBe('default')
    expect(DEFAULT_APPEARANCE.avatarGlow).toBe(true)
    expect(DEFAULT_APPEARANCE.backgroundAnimation).toBe(true)
  })

  it('DEFAULT_EFFECTS has all effects enabled', () => {
    expect(DEFAULT_EFFECTS.beams).toBe(true)
    expect(DEFAULT_EFFECTS.particles).toBe(true)
    expect(DEFAULT_EFFECTS.lensFlares).toBe(true)
    expect(DEFAULT_EFFECTS.noiseTexture).toBe(true)
  })
})
