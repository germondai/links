// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025 germondai - https://github.com/germondai

import { describe, expect, it } from 'bun:test'
import { buildSlugParams, resolveLinkSlug, resolveSocialSlug } from '@/lib/slugs'
import type { Link, SocialLink } from '@/types/config'

// ── fixtures ──────────────────────────────────────────────────────────────────

const socials: SocialLink[] = [
  { platform: 'github', url: 'https://github.com/germondai' },
  { platform: 'discord', url: 'https://discord.gg/abc' },
  { platform: 'email', url: 'mailto:hi@germondai.com' },
]

const links: Link[] = [
  { title: 'Portfolio', url: 'https://germondai.com', slug: 'portfolio' },
  { title: 'App', url: 'https://app.example.com', slug: 'app' },
  { title: 'Hidden', url: 'https://hidden.example.com', slug: 'hidden', enabled: false },
  { title: 'No Slug', url: 'https://noslug.example.com' },
]

// ── resolveSocialSlug ─────────────────────────────────────────────────────────

describe('resolveSocialSlug', () => {
  it('returns the URL for a matching social platform', () => {
    expect(resolveSocialSlug('github', socials)).toBe('https://github.com/germondai')
  })

  it('returns null for an unknown slug', () => {
    expect(resolveSocialSlug('twitter', socials)).toBeNull()
  })

  it('excludes email platform (mailto: cannot be HTTP redirect)', () => {
    expect(resolveSocialSlug('email', socials)).toBeNull()
  })

  it('returns null for an empty slug', () => {
    expect(resolveSocialSlug('', socials)).toBeNull()
  })

  it('returns null when socials list is empty', () => {
    expect(resolveSocialSlug('github', [])).toBeNull()
  })

  it('returns the first matching platform', () => {
    const dup: SocialLink[] = [
      { platform: 'github', url: 'https://github.com/first' },
      { platform: 'github', url: 'https://github.com/second' },
    ]
    expect(resolveSocialSlug('github', dup)).toBe('https://github.com/first')
  })
})

// ── resolveLinkSlug ───────────────────────────────────────────────────────────

describe('resolveLinkSlug', () => {
  it('returns the URL for a matching link slug', () => {
    expect(resolveLinkSlug('portfolio', links)).toBe('https://germondai.com')
  })

  it('returns null for an unknown slug', () => {
    expect(resolveLinkSlug('unknown', links)).toBeNull()
  })

  it('ignores disabled links (enabled: false)', () => {
    expect(resolveLinkSlug('hidden', links)).toBeNull()
  })

  it('returns null for links without a slug field', () => {
    expect(resolveLinkSlug('No Slug', links)).toBeNull()
  })

  it('returns null when links list is empty', () => {
    expect(resolveLinkSlug('portfolio', [])).toBeNull()
  })

  it('treats links without enabled field as enabled', () => {
    expect(resolveLinkSlug('app', links)).toBe('https://app.example.com')
  })
})

// ── buildSlugParams ───────────────────────────────────────────────────────────

describe('buildSlugParams', () => {
  it('includes all non-email social platforms', () => {
    const params = buildSlugParams(socials, [])
    expect(params).toContainEqual({ slug: 'github' })
    expect(params).toContainEqual({ slug: 'discord' })
    expect(params).not.toContainEqual({ slug: 'email' })
  })

  it('includes enabled links with a slug', () => {
    const params = buildSlugParams([], links)
    expect(params).toContainEqual({ slug: 'portfolio' })
    expect(params).toContainEqual({ slug: 'app' })
  })

  it('excludes disabled links', () => {
    const params = buildSlugParams([], links)
    expect(params).not.toContainEqual({ slug: 'hidden' })
  })

  it('excludes links without a slug', () => {
    const params = buildSlugParams([], links)
    const slugs = params.map((p) => p.slug)
    expect(slugs).not.toContain(undefined)
    expect(slugs).not.toContain('')
  })

  it('returns empty array for empty inputs', () => {
    expect(buildSlugParams([], [])).toEqual([])
  })

  it('socials appear before link slugs', () => {
    const params = buildSlugParams(socials, links)
    const slugs = params.map((p) => p.slug)
    const githubIdx = slugs.indexOf('github')
    const portfolioIdx = slugs.indexOf('portfolio')
    expect(githubIdx).toBeLessThan(portfolioIdx)
  })

  it('total count matches non-email socials + enabled link slugs', () => {
    const params = buildSlugParams(socials, links)
    // 2 non-email socials + 2 enabled links with slugs
    expect(params).toHaveLength(4)
  })
})
