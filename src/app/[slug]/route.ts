// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025 germondai - https://github.com/germondai

import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { buildSlugParams, resolveLinkSlug, resolveSocialSlug } from '@/lib/slugs'
import config from '../../../links.config'

const { socials = [], links } = config

export const GET = async (_: NextRequest, { params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params

  // Socials take priority over custom link slugs
  const socialUrl = resolveSocialSlug(slug, socials)
  if (socialUrl) return NextResponse.redirect(socialUrl, { status: 302 })

  const linkUrl = resolveLinkSlug(slug, links)
  if (linkUrl) return NextResponse.redirect(linkUrl, { status: 302 })

  return new Response(null, { status: 404 })
}

export const generateStaticParams = () => buildSlugParams(socials, links)
