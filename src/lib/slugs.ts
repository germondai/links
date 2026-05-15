// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025 germondai - https://github.com/germondai

import type { Link, SocialLink } from '@/types/config'

// email excluded - mailto: can't be an HTTP redirect target
export const resolveSocialSlug = (slug: string, socials: SocialLink[]): string | null =>
  socials.find((s) => s.platform !== 'email' && s.platform === slug)?.url ?? null

export const resolveLinkSlug = (slug: string, links: Link[]): string | null =>
  links.find((l) => l.enabled !== false && l.slug === slug)?.url ?? null

export const buildSlugParams = (socials: SocialLink[], links: Link[]): { slug: string }[] => [
  ...socials.filter((s) => s.platform !== 'email').map((s) => ({ slug: s.platform })),
  ...links
    .filter((l) => l.enabled !== false && typeof l.slug === 'string' && l.slug.length > 0)
    .map((l) => ({ slug: l.slug as string })),
]
