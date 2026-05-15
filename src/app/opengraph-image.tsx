// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025 germondai - https://github.com/germondai

import { ImageResponse } from 'takumi-js/response'
import { THEMES } from '@/lib/themes'
import type { Theme } from '@/types/config'
import config from '../../links.config'

export const runtime = 'nodejs'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = `${config.profile.name} - Links`

export default async function Image() {
  const { profile, appearance, seo } = config
  const themeKey = (appearance?.theme ?? 'aurora') as Theme
  const theme = THEMES[themeKey] ?? THEMES.aurora
  const accent = appearance?.accentColor ?? theme.accent

  // Fetch avatar as base64 for embedding in the image
  let avatarSrc: string | null = null
  if (profile.avatar?.startsWith('http')) {
    try {
      const res = await fetch(profile.avatar)
      const mime = res.headers.get('content-type') ?? 'image/png'
      avatarSrc = `data:${mime};base64,${Buffer.from(await res.arrayBuffer()).toString('base64')}`
    } catch {
      /* skip on failure */
    }
  }

  const displayUrl = seo?.canonicalUrl?.replace(/^https?:\/\//, '') ?? ''

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        background: `linear-gradient(135deg, ${theme.from} 0%, ${theme.via} 50%, ${theme.to} 100%)`,
        fontFamily: 'sans-serif',
        position: 'relative',
      }}
    >
      {/* Top accent bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 5,
          background: `linear-gradient(90deg, transparent 0%, ${accent} 40%, ${accent} 60%, transparent 100%)`,
          opacity: 0.9,
        }}
      />

      {/* Bottom accent bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${accent}99, transparent)`,
        }}
      />

      {/* Main content */}
      <div
        style={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          padding: '0 88px',
          gap: 64,
        }}
      >
        {/* Avatar */}
        {avatarSrc && (
          <img
            src={avatarSrc}
            alt={profile.name}
            width={220}
            height={220}
            style={{
              borderRadius: '50%',
              flexShrink: 0,
              border: '3px solid rgba(255,255,255,0.12)',
              boxShadow: `0 0 80px ${accent}55, 0 0 160px ${accent}25`,
              objectFit: 'cover',
            }}
          />
        )}

        {/* Text */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div
            style={{
              fontSize: avatarSrc ? 68 : 84,
              fontWeight: 800,
              color: '#ffffff',
              lineHeight: 1.05,
              letterSpacing: '-2px',
              marginBottom: 12,
            }}
          >
            {profile.name}
          </div>

          <div
            style={{
              fontSize: 32,
              color: 'rgba(255,255,255,0.42)',
              marginBottom: profile.bio ? 28 : 0,
            }}
          >
            @{profile.username}
          </div>

          {profile.bio && (
            <div
              style={{
                fontSize: 29,
                color: 'rgba(255,255,255,0.62)',
                lineHeight: 1.45,
                maxWidth: avatarSrc ? 580 : 900,
              }}
            >
              {profile.bio}
            </div>
          )}

          {displayUrl && (
            <div
              style={{
                marginTop: 44,
                fontSize: 25,
                color: accent,
                opacity: 0.85,
              }}
            >
              {displayUrl}
            </div>
          )}
        </div>
      </div>
    </div>,
    { ...size },
  )
}
