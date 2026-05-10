// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025 germondai - https://github.com/germondai

import type { MetadataRoute } from 'next'
import config from '../../links.config'

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: config.seo?.canonicalUrl ?? 'http://localhost:3000',
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
  },
]

export default sitemap
