// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025 germondai - https://github.com/germondai

import type { MetadataRoute } from 'next'
import config from '../../links.config'

const robots = (): MetadataRoute.Robots => {
  const base = config.seo?.canonicalUrl ?? 'http://localhost:3000'
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${base}/sitemap.xml`,
  }
}

export default robots
