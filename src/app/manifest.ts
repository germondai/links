// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025 germondai - https://github.com/germondai

import type { MetadataRoute } from 'next'
import { resolveConfig } from '@/lib/config'
import { getThemeTokens } from '@/lib/themes'
import config from '../../links.config'

const resolved = resolveConfig(config)

const manifest = (): MetadataRoute.Manifest => {
  const tokens = getThemeTokens(resolved.appearance.theme)
  const themeColor = resolved.appearance.accentColor ?? tokens['--accent'] ?? '#7c3aed'
  const avatarUrl = resolved.profile.avatar?.startsWith('http') ? resolved.profile.avatar : null

  return {
    name: `${resolved.profile.name} - Links`,
    short_name: resolved.profile.username,
    description: resolved.profile.bio ?? `${resolved.profile.name}'s personal link page`,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#09090b',
    theme_color: themeColor,
    categories: ['social', 'personal'],
    prefer_related_applications: false,
    icons: [
      ...(avatarUrl ? [{ src: avatarUrl, sizes: 'any', type: 'image/png' }] : []),
      { src: '/icon-192.webp', sizes: '192x192', type: 'image/webp' },
      { src: '/icon-512.webp', sizes: '512x512', type: 'image/webp' },
      { src: '/icon-512.webp', sizes: '512x512', type: 'image/webp', purpose: 'maskable' as const },
      { src: '/apple-touch-icon.webp', sizes: '180x180', type: 'image/webp' },
    ],
  }
}

export default manifest
