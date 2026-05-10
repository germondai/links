// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025 germondai - https://github.com/germondai

import Link from 'next/link'

const NotFound = () => (
  <main className="relative min-h-dvh flex flex-col items-center justify-center px-4">
    <div
      className="flex flex-col items-center gap-4 text-center rounded-2xl border border-white/10 p-10"
      style={{
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <span className="text-6xl font-black text-white/10">404</span>
      <h1 className="text-xl font-bold text-white">Page not found</h1>
      <p className="text-sm text-white/50">This page doesn&apos;t exist.</p>
      <Link
        href="/"
        className="mt-2 px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors border border-white/10"
      >
        Go home
      </Link>
    </div>
  </main>
)

export default NotFound
