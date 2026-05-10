// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2025 germondai - https://github.com/germondai

const Loading = () => (
  <main className="relative min-h-dvh flex flex-col items-center justify-center">
    <div className="flex flex-col items-center gap-6 w-full max-w-md px-4">
      <div className="w-24 h-24 rounded-full bg-white/10 animate-pulse" />
      <div className="flex flex-col items-center gap-2">
        <div className="h-7 w-40 rounded-lg bg-white/10 animate-pulse" />
        <div className="h-4 w-24 rounded-lg bg-white/10 animate-pulse" />
        <div className="h-4 w-56 rounded-lg bg-white/10 animate-pulse" />
      </div>
      <div className="flex gap-3">
        {(['s1', 's2', 's3', 's4'] as const).map((id) => (
          <div key={id} className="w-5 h-5 rounded-full bg-white/10 animate-pulse" />
        ))}
      </div>
      <div className="flex flex-col gap-3 w-full">
        {(['l1', 'l2', 'l3', 'l4', 'l5'] as const).map((id) => (
          <div key={id} className="h-16 w-full rounded-xl bg-white/10 animate-pulse" />
        ))}
      </div>
    </div>
  </main>
)

export default Loading
