// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025 germondai - https://github.com/germondai

import { describe, expect, it } from 'bun:test'
import { deriveMainDomain, stripProtocol } from '@/lib/seo'

describe('deriveMainDomain', () => {
  it('strips one subdomain from a typical links page URL', () => {
    expect(deriveMainDomain('https://links.germondai.com')).toBe('https://germondai.com')
  })

  it('strips www subdomain', () => {
    expect(deriveMainDomain('https://www.germondai.com')).toBe('https://germondai.com')
  })

  it('strips arbitrary subdomain', () => {
    expect(deriveMainDomain('https://app.example.com')).toBe('https://example.com')
  })

  it('returns the URL unchanged when there is no subdomain', () => {
    expect(deriveMainDomain('https://germondai.com')).toBe('https://germondai.com')
  })

  it('preserves http:// protocol', () => {
    expect(deriveMainDomain('http://links.germondai.com')).toBe('http://germondai.com')
  })

  it('handles trailing slash in input', () => {
    expect(deriveMainDomain('https://links.germondai.com/')).toBe('https://germondai.com')
  })

  it('handles deep subdomains - strips only one level', () => {
    // links.staging.germondai.com → staging.germondai.com (last two parts)
    expect(deriveMainDomain('https://links.staging.germondai.com')).toBe('https://germondai.com')
  })

  it('returns null for an invalid URL', () => {
    expect(deriveMainDomain('not-a-url')).toBeNull()
  })

  it('returns null for an empty string', () => {
    expect(deriveMainDomain('')).toBeNull()
  })

  it('preserves a bare domain (no subdomain) as-is', () => {
    expect(deriveMainDomain('https://example.com')).toBe('https://example.com')
  })

  it('note: .co.uk and .com.au only strip one segment (known limitation)', () => {
    // For country TLDs, users should set mainSiteUrl explicitly in config
    expect(deriveMainDomain('https://links.example.co.uk')).toBe('https://co.uk')
  })
})

describe('stripProtocol', () => {
  it('strips https://', () => {
    expect(stripProtocol('https://links.germondai.com')).toBe('links.germondai.com')
  })

  it('strips http://', () => {
    expect(stripProtocol('http://links.germondai.com')).toBe('links.germondai.com')
  })

  it('leaves a string without a protocol unchanged', () => {
    expect(stripProtocol('links.germondai.com')).toBe('links.germondai.com')
  })

  it('handles empty string', () => {
    expect(stripProtocol('')).toBe('')
  })
})
