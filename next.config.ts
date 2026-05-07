// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025 germondai - https://github.com/germondai

import type { NextConfig } from 'next'

const config: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
    minimumCacheTTL: 86400,
  },
  // takumi-js uses a native Rust binary - must not be bundled by Next.js
  serverExternalPackages: ['@takumi-rs/core'],
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  headers: async () => {
    const isProd = process.env.NODE_ENV === 'production'
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          // HSTS - tells browsers to use HTTPS for 1 year (adjust if self-hosting HTTP-only)
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
        ],
      },
      // Cache headers only in production — Next.js dev server handles caching itself
      ...(isProd ? [
        {
          source: '/_next/static/(.*)',
          headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
        },
        {
          source: '/:path(favicon\\.ico|og\\.webp|icon\\.webp|icon-.*\\.webp|apple-touch-icon\\.webp)',
          headers: [
            { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
          ],
        },
      ] : []),
    ]
  },
}

export default config
