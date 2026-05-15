// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025 germondai - https://github.com/germondai

// strips first subdomain: links.example.com → https://example.com
// note: .co.uk / .com.au TLDs will strip incorrectly - set mainSiteUrl explicitly
export const deriveMainDomain = (url: string): string | null => {
  try {
    const { protocol, hostname } = new URL(url)
    const parts = hostname.split('.')
    const root = parts.length > 2 ? parts.slice(-2).join('.') : hostname
    return `${protocol}//${root}`
  } catch {
    return null
  }
}

export const stripProtocol = (url: string): string => url.replace(/^https?:\/\//, '')
